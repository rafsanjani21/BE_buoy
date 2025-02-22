module.exports = (sequelize, DataTypes) => {
  const cpu = sequelize.define('cpu', {
    timestamp: { type: DataTypes.DATE,},
    cpu_usage: { type: DataTypes.FLOAT,}, 
    mem_gpu: { type: DataTypes.FLOAT,},
    mem_arm: { type: DataTypes.FLOAT,},
    temp: { type: DataTypes.FLOAT,},
    total_space: { type: DataTypes.FLOAT,},
    used_space: { type: DataTypes.FLOAT,},
    free_space: { type: DataTypes.FLOAT,},
  }, {
    tableName: 'cpu'
  });

  return cpu;
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
  