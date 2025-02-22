module.exports = (sequelize, DataTypes) => {
  const serial = sequelize.define('serial', {
      timestamp: { type: DataTypes.DATE, allowNull: true },
      TS_raspi: { type: DataTypes.DATE, allowNull: true },
      xacc: { type: DataTypes.FLOAT, allowNull: true },
      yacc: { type: DataTypes.FLOAT, allowNull: true },
      zacc: { type: DataTypes.FLOAT, allowNull: true },
      xgyro: { type: DataTypes.FLOAT, allowNull: true,},
      ygyro: { type: DataTypes.FLOAT, allowNull: true },
      zgyro: { type: DataTypes.FLOAT, allowNull: true },
      xangle: { type: DataTypes.FLOAT, allowNull: true },
      yangle: { type: DataTypes.FLOAT, allowNull: true },
      zangle: { type: DataTypes.FLOAT, allowNull: true },
      temperature: { type: DataTypes.FLOAT, allowNull: true },
      pressure: { type: DataTypes.FLOAT, allowNull: true },
      altitude: { type: DataTypes.FLOAT, allowNull: true, field:'depth' },
  }, {
    tableName: 'serialnew',
  });

  return serial;
};