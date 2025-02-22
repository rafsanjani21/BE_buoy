module.exports = (sequelize, DataTypes) => {
  const gps = sequelize.define('gps', {
    timestamp: { type: DataTypes.DATE,},
      latitude: { type: DataTypes.FLOAT,},
      longitude: { type: DataTypes.FLOAT,},
      altitude: { type: DataTypes.FLOAT,},
      epv: { type: DataTypes.FLOAT,},
      ept: { type: DataTypes.FLOAT,},
      speed: { type: DataTypes.FLOAT,},
      climb: { type: DataTypes.FLOAT,},
      track: { type: DataTypes.FLOAT,},
  }, {
    tableName: 'gpsnew'
  });

  return gps;
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
  