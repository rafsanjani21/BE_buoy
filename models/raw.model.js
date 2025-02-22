module.exports = (sequelize, DataTypes) => {
    const raw = sequelize.define('raw', {
      timestamp: { type: DataTypes.DATE },
      MPa: { type: DataTypes.FLOAT },
      kPa: { type: DataTypes.FLOAT }, 
      hPa: { type: DataTypes.FLOAT },
      bar: { type: DataTypes.FLOAT },
      mbar: { type: DataTypes.FLOAT },
      kg_cm2: { 
        type: DataTypes.FLOAT,
        field: 'kg/cm2' // Nama kolom di database tetap 'kg/cm2'
      },
      psi: { type: DataTypes.FLOAT },
      mH2O: { type: DataTypes.FLOAT },
      mmH2O: { type: DataTypes.FLOAT },
    }, {
      tableName: 'raw',
      timestamps: false
    });

    return raw;
};
