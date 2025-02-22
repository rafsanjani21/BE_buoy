// Mengimpor Sequelize dan dotenv untuk konfigurasi database
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Mengimpor model-model yang telah didefinisikan
const serial = require('./serial.model.js');  
const scc = require('./scc.model.js');     
const cpu = require('./cpu.model.js');     
const gps = require('./gps.model.js');     
const modbus = require('./modbus.model.js');     
const raw = require('./raw.model.js');     

// Membuat instansi Sequelize untuk koneksi ke database PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false, // Menonaktifkan log SQL untuk kebersihan output
    }
);

// Mengekspor objek db yang berisi koneksi dan model-model
module.exports = {
    sequelize,
    serial: serial(sequelize, DataTypes),
    scc: scc(sequelize, DataTypes),
    cpu: cpu(sequelize, DataTypes),
    gps: gps(sequelize, DataTypes),
    modbus: modbus(sequelize, DataTypes),
    raw: raw(sequelize, DataTypes),
};

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
