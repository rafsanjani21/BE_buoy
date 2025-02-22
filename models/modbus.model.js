module.exports = (sequelize, DataTypes) => {
  const Modbus = sequelize.define('Modbus', {
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    WaterLevel: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
      field: 'water column height',
    },
    AnemometerSpeed: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Beaufort_scale: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Angle: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Direction: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    tableName: 'modbusnew', 
  });

  return Modbus;
};
