/* eslint-disable no-undef */
const mqtt = require('mqtt');
require('dotenv').config();

const options = {
    username: process.env.USERNAMEMQTT,
    password: process.env.PASSWORDMQTT 
};

const client = mqtt.connect(process.env.LINKMQTT, options);

client.on('connect', () => {
    console.log("Connected to MQTT broker");

    // Array of topics to subscribe to
    const topics = [
        process.env.TOPIC_BUOYS,
        process.env.TOPIC_BUOYG,
        process.env.TOPIC_BUOYC,
        process.env.TOPIC_BUOYSC,
        process.env.TOPIC_BUOYM,
    ];

    // Subscribe to each topic
    topics.forEach((topic, index) => {
        if (topic) {
            client.subscribe(topic, (err) => {
                if (err) {
                    console.error(`Error subscribing to ${topic} :`, err);
                } else {
                    console.log(`${index + 1}. MQTT terhubung pada:`, topic);
                }
            });
        } else {
            console.error(`Topic ${index + 1} is undefined or empty.`);
        }
    });
});

module.exports = client;
