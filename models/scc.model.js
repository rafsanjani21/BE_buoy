module.exports = (sequelize, DataTypes) => {
  const scc = sequelize.define('scc', {
    timestamp: { type: DataTypes.DATE,},
    pv_voltage: { type: DataTypes.FLOAT,},
    pv_current: { type: DataTypes.FLOAT,}, 
    pv_power: { type: DataTypes.FLOAT,},
    battery_voltage: { type: DataTypes.FLOAT,},
    battery_charge_current: { type: DataTypes.FLOAT,},
    device_current: { type: DataTypes.FLOAT,},
    device_power: { type: DataTypes.FLOAT,},
  }, {
    tableName: 'scc'
  });

  return scc;
  };
  

// module.exports = (sequelize, Sequelize) => {
//   const fc = sequelize.define('fc', {
//       Time: { type: Sequelize.TIME,},
//       Date: { type: Sequelize.DATE,},
//       latitude: { type: Sequelize.FLOAT,}, 
//       longtitude: { type: Sequelize.FLOAT,},
//       vx: { type: Sequelize.FLOAT,},
//       vy: { type: Sequelize.FLOAT,},
//       vz: { type: Sequelize.FLOAT,},
//       roll: { type: Sequelize.FLOAT,},
//       pitch: { type: Sequelize.FLOAT,},
//       kompas: { type: Sequelize.FLOAT,},
//       yaw: { type: Sequelize.FLOAT,},
//       xacc: { type: Sequelize.FLOAT,},
//       yacc: { type: Sequelize.FLOAT,},          
//       zacc: { type: Sequelize.FLOAT,},
//   }, {
//     tableName: 'fc'
//   });

//   return fc;
//   };
  