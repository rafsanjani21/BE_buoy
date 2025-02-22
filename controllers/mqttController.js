// Import required modules
const mqtt = require('mqtt');
const db = require('../models'); // Import database models
require('dotenv').config();

// Fungsi untuk membersihkan data pesan MQTT
function sanitizeMessage(messageString) {
    try {
        // Parsing JSON dan validasi data
        const parsedData = JSON.parse(messageString);
        return parsedData;
    } catch (error) {
        console.error('Error saat mem-parsing pesan JSON:', error.message);
        return null;
    }
}

// Konfigurasi MQTT
const client = mqtt.connect(process.env.LINKMQTT, {
    username: process.env.USERNAMEMQTT,
    password: process.env.PASSWORDMQTT,
});

// Models
const SerialModel = db.serial;
const GpsModel = db.gps;
const CpuModel = db.cpu;
const SccModel = db.scc;
const ModbusModel = db.modbus;
const RawModel = db.raw;

// Listener untuk koneksi MQTT
client.on('connect', () => {
    console.log('Terhubung dengan broker MQTT');

    // Subscribe ke topik yang relevan
    const topics = [
        process.env.TOPIC_BUOYS,
        process.env.TOPIC_BUOYG,
        process.env.TOPIC_BUOYC,
        process.env.TOPIC_BUOYSC,
        process.env.TOPIC_BUOYM,
        process.env.TOPIC_BUOYR,
    ];

    topics.forEach((topic) => {
        if (topic) {
            client.subscribe(topic, (error) => {
                if (error) {
                    console.error(`Gagal berlangganan ke ${topic}:`, error.message);
                } else {
                    console.log(`Berlangganan ke ${topic}`);
                }
            });
        } else {
            console.error('Topik MQTT tidak valid:', topic);
        }
    });
});

// Listener untuk pesan MQTT
client.on('message', async (topic, message) => {
    const messageString = message.toString();
    const sanitizedData = sanitizeMessage(messageString);

    if (!sanitizedData) {
        console.error('Pesan tidak dapat diproses menjadi JSON:', messageString);
        return;
    }

    console.log(`Pesan diterima pada topic ${topic}:`, sanitizedData);

    try {
        if (topic === process.env.TOPIC_BUOYS) {
            if (sanitizedData.yangle !== undefined) {
                await SerialModel.create({
                    timestamp: sanitizedData.timestamp,
                    TS_raspi: sanitizedData.TS_raspi,
                    xacc: sanitizedData.xacc,
                    yacc: sanitizedData.yacc,
                    zacc: sanitizedData.zacc,
                    xgyro: sanitizedData.xgyro,
                    ygyro: sanitizedData.ygyro,
                    zgyro: sanitizedData.zgyro,
                    xangle: sanitizedData.xangle,
                    yangle: sanitizedData.yangle,
                    zangle: sanitizedData.zangle,
                    temperature: sanitizedData.temperature,
                    pressure: sanitizedData.pressure,
                    altitude: sanitizedData.altitude,
                });
            } else {
                console.error('Data Serial tidak lengkap:', sanitizedData);
            }
        } else if (topic === process.env.TOPIC_BUOYG) {
            const normalizedData = {
                timestamp: sanitizedData.timestamp,
                latitude: sanitizedData.latitude.toFixed(5),
                longitude: sanitizedData.longitude.toFixed(5),
                altitude: sanitizedData.altitude,
                epv: sanitizedData.epv,
                ept: sanitizedData.ept,
                speed: sanitizedData.speed,
                climb: sanitizedData.climb,
                track: sanitizedData.track,
            };

            if (normalizedData.timestamp && normalizedData.latitude !== undefined && normalizedData.longitude !== undefined) {
                console.log('Data GPS siap diproses:', normalizedData);
                await GpsModel.create(normalizedData);
            } else {
                console.error('Data GPS tidak lengkap:', normalizedData);
            }
        } else if (topic === process.env.TOPIC_BUOYC) {
            await CpuModel.create({
                timestamp: sanitizedData.timestamp,
                cpu_usage: sanitizedData.cpu_usage,
                mem_gpu: sanitizedData.mem_gpu,
                mem_arm: sanitizedData.mem_arm,
                temp: sanitizedData.temp,
                total_space: (sanitizedData.total_space).toFixed(2),
                used_space: (sanitizedData.used_space).toFixed(2),
                free_space: (sanitizedData.free_space).toFixed(2),
            });
        } else if (topic === process.env.TOPIC_BUOYR) {
            await RawModel.create({
                timestamp: sanitizedData.timestamp,
                MPa: sanitizedData.MPa,
                kPa: sanitizedData.kPa,
                hPa: sanitizedData.hPa,
                bar: sanitizedData.bar,
                mbar: (sanitizedData.mbar),
                kg_cm2: sanitizedData["kg/cm2"],
                psi: (sanitizedData.psi),
                mH2O: (sanitizedData.mH2O),
                mmH2O: (sanitizedData.mmH2O),
            });
        } else if (topic === process.env.TOPIC_BUOYSC) {
            await SccModel.create({
                timestamp: sanitizedData.timestamp,
                pv_voltage: sanitizedData.pv_voltage,
                pv_current: sanitizedData.pv_current,
                pv_power: sanitizedData.pv_power,
                battery_voltage: sanitizedData.battery_voltage,
                battery_charge_current: sanitizedData.battery_charge_current,
                device_current: sanitizedData.device_current,
                device_power: sanitizedData.device_power,
            });
        } else if (topic === process.env.TOPIC_BUOYM) {
            const normalizedData = {                 
                timestamp: sanitizedData.timestamp,                 
                WaterLevel: sanitizedData.WaterLevel,                 
                AnemometerSpeed: sanitizedData.AnemometerSpeed / 10,                 
                Beaufort_scale: sanitizedData.Beaufort_scale,                 
                Angle: sanitizedData.Angle,                 
                Direction: sanitizedData.Direction,             
            };
            

            if (
                normalizedData.timestamp &&
                normalizedData.WaterLevel !== undefined &&
                normalizedData.AnemometerSpeed !== undefined &&
                normalizedData.Angle !== undefined &&
                normalizedData.Direction
            ) {
                await ModbusModel.create(normalizedData);
                console.log('Data Modbus berhasil disimpan:', normalizedData);
            } else {
                console.error('Data Modbus tidak lengkap:', normalizedData);
            }
        }
    } catch (error) {
        console.error('Error memproses pesan:', error.message);
        console.log('Pesan yang gagal diproses:', sanitizedData);
    }
});

// Validasi konfigurasi environment
if (!process.env.LINKMQTT || !process.env.USERNAMEMQTT || !process.env.PASSWORDMQTT) {
    console.error('Konfigurasi MQTT tidak lengkap di file .env');
    process.exit(1);
}
