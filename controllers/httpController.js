const { Sequelize } = require('sequelize');
const {Op} = require ('sequelize');
const db = require('../models');  // Impor model
const { response } = require('express');


// definition for databases
const serial = db.serial;
const scc = db.scc;
const cpu = db.cpu;
const gps = db.gps;
const modbus = db.modbus;
const raw = db.raw;


//CONTROLLER FOR BUOY

exports.seriallatest = (request, response) => {
        serial.findOne({
          order: [['id', 'DESC']],
        })
        .then((result) => {
          if (result) {
            response.json({
              id: result.id,               // Gunakan "result" bukan "item"
              timestamp: result.timestamp,
              TS_raspi: result.TS_raspi,
              xacc: result.xacc,
              yacc: result.yacc,
              zacc: result.zacc,
              xgyro: result.xgyro,
              ygyro: result.ygyro,
              zgyro: result.zgyro,
              xangle: result.xangle,
              yangle: result.yangle,
              zangle: result.zangle,
              temperature: result.temperature,
              pressure: result.pressure,
              depth: result.altitude,
              createdAt: result.createdAt,
              updatedAt: result.updatedAt
            });
          } else {
            response.json({ message: "No data found" }); // Tambahkan pesan jika data kosong
          }
        })
          
          .catch((error) => {
            response.status(500).json({ error: 'Internal server error' });
          });
      };

    exports.seriallatest10 = (request, response) => {
        serial.findAll({
            limit: 10,
          order: [['id', 'DESC']],
        })
        .then((result) => {
          // response.json(result);
          const modifiedResult = result.map(item => ({
            id: item.id,
            timestamp: item.timestamp,
            xacc: item.xacc,
            yacc: item.yacc,
            zacc: item.zacc,
            xgyro: item.xgyro,
            ygyro: item.ygyro,
            zgyro: item.zgyro,
            xangle: item.xangle,
            yangle: item.yangle,
            zangle: item.zangle,
            temperature: item.temperature,
            pressure: item.pressure,
            depth: item.altitude,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          }));
          
          response.json(modifiedResult);
          
        })
          .catch((error) => {
            response.status(500).json({ error: 'Internal server error' });
          });
      };

    exports.serialdaily = (request, response) => {
      const currentDate = new Date();
      const startdate = new Date(currentDate);
      startdate.setDate(currentDate.getDate() - 1);
      const endDate = new Date(currentDate);

      serial.findAll({
        where: {
          createdAt: {
            [Op.between]: [startdate, endDate],
          },
        },
        order: [['id', 'DESC']],
      })
      .then((result) => {
        const modifiedResult = result.map(item => ({
          id: item.id,
          timestamp: item.timestamp,
          xacc: item.xacc,
          yacc: item.yacc,
          zacc: item.zacc,
          xgyro: item.xgyro,
          ygyro: item.ygyro,
          zgyro: item.zgyro,
          xangle: item.xangle,
          yangle: item.yangle,
          zangle: item.zangle,
          temperature: item.temperature,
          pressure: item.pressure,
          depth: item.altitude,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }));
      
        response.json(modifiedResult);
      })
      .catch((error) => {
        response.status(500).json({ error: 'Internal server error' });
      });
    };

      exports.serialweekly = (request, response) => {
        const currentDate = new Date();
        const startdate = new Date(currentDate);
        startdate.setDate(currentDate.getDate() - 7);
        const endDate = new Date(currentDate);
      
        serial.findAll({
          where: {
            createdAt: {
              [Op.between]: [startdate, endDate],
            },
          },
          order: [['id', 'DESC']],
        })
        .then((result) => {
          const modifiedResult = result.map(item => ({
            id: item.id,
            timestamp: item.timestamp,
            xacc: item.xacc,
            yacc: item.yacc,
            zacc: item.zacc,
            xgyro: item.xgyro,
            ygyro: item.ygyro,
            zgyro: item.zgyro,
            xangle: item.xangle,
            yangle: item.yangle,
            zangle: item.zangle,
            temperature: item.temperature,
            pressure: item.pressure,
            depth: item.altitude,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          }));
        
          response.json(modifiedResult);
        })
        .catch((error) => {
          response.status(500).json({ error: 'Internal server error' });
        });
      };
      
      exports.serialmonthly = (request, response) => {
        const currentDate = new Date();
        const startdate = new Date(currentDate);
        startdate.setDate(currentDate.getDate() - 30);
        const endDate = new Date(currentDate);
      
        serial.findAll({
          where: {
            createdAt: {
              [Op.between]: [startdate, endDate],
            },
          },
          order: [['id', 'DESC']],
        })
        .then((result) => {
          const modifiedResult = result.map(item => ({
            id: item.id,
            timestamp: item.timestamp,
            xacc: item.xacc,
            yacc: item.yacc,
            zacc: item.zacc,
            xgyro: item.xgyro,
            ygyro: item.ygyro,
            zgyro: item.zgyro,
            xangle: item.xangle,
            yangle: item.yangle,
            zangle: item.zangle,
            temperature: item.temperature,
            pressure: item.pressure,
            depth: item.altitude,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          }));
        
          response.json(modifiedResult);
        })
        .catch((error) => {
          response.status(500).json({ error: 'Internal server error' });
        });
      };  

//CONTROLLER FOR SCC
exports.scclatest = (request, response) => {
  scc.findOne({
    order: [['id', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.scclatest10 = (request, response) => {
  scc.findAll({
      limit: 10,
    order: [['id', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.sccdaily = (request, response) => {
  const currentDate = new Date();
  const startdate = new Date(currentDate);
  startdate.setDate(currentDate.getDate() - 1);
  startdate.setHours(0, 0, 0, 0); // Mulai dari 00:00:00

  const endDate = new Date(currentDate);
  endDate.setHours(23, 59, 59, 999); // Sampai 23:59:59

  scc.findAll({
    where: {
      createdAt: { // Gunakan createdAt tanpa tanda kutip di Sequelize
        [Op.between]: [startdate, endDate],
      },
    },
    order: [['createdAt', 'DESC']], // Pastikan ini sesuai dengan DB
  })
  .then((result) => {
    response.json(result);
  }) 
  .catch((error) => {
    response.status(500).json({ error: 'Internal server error' });
  });
};

exports.sccweekly = (request, response) => {
  const currentDate = new Date();
  const startdate = new Date(currentDate);
  startdate.setDate(currentDate.getDate() - 7);
  const endDate = new Date(currentDate);

  scc.findAll({
    where: {
      createdAt: {
        [Op.between]: [startdate, endDate],
      },
    },
    order: [['id', 'DESC']],
  })
  .then((result) => {
    response.json(result);
  }) 
  .catch((error) => {
    response.status(500).json({ error: 'Internal server error' });
  });
};

exports.sccmonthly = (request, response) => {
  const currentDate = new Date();
  const startdate = new Date(currentDate);
  startdate.setDate(currentDate.getDate() - 30);
  const endDate = new Date(currentDate);

  scc.findAll({
    where: {
      createdAt: {
        [Op.between]: [startdate, endDate],
      },
    },
    order: [['id', 'DESC']],
  })
  .then((result) => {
    response.json(result);
  }) 
  .catch((error) => {
    response.status(500).json({ error: 'Internal server error' });
  });
};  

//CONTROLLER FOR CPU
exports.cpulatest = (request, response) => {
  cpu.findOne({
    order: [['id', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.cpulatest10 = (request, response) => {
  cpu.findAll({
      limit: 10,
    order: [['id', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.cpudaily = (request, response) => {
const currentDate = new Date();
const startdate = new Date(currentDate);
startdate.setDate(currentDate.getDate() - 1);
const endDate = new Date(currentDate);

cpu.findAll({
  where: {
    createdAt: {
      [Op.between]: [startdate, endDate],
    },
  },
  order: [['id', 'DESC']],
})
.then((result) => {
  response.json(result);
}) 
.catch((error) => {
  response.status(500).json({ error: 'Internal server error' });
});
};

exports.cpuweekly = (request, response) => {
  const currentDate = new Date();
  const startdate = new Date(currentDate);
  startdate.setDate(currentDate.getDate() - 7);
  const endDate = new Date(currentDate);

  cpu.findAll({
    where: {
      createdAt: {
        [Op.between]: [startdate, endDate],
      },
    },
    order: [['id', 'DESC']],
  })
  .then((result) => {
    response.json(result);
  }) 
  .catch((error) => {
    response.status(500).json({ error: 'Internal server error' });
  });
};

exports.cpumonthly = (request, response) => {
  const currentDate = new Date();
  const startdate = new Date(currentDate);
  startdate.setDate(currentDate.getDate() - 30);
  const endDate = new Date(currentDate);

  cpu.findAll({
    where: {
      createdAt: {
        [Op.between]: [startdate, endDate],
      },
    },
    order: [['id', 'DESC']],
  })
  .then((result) => {
    response.json(result);
  }) 
  .catch((error) => {
    response.status(500).json({ error: 'Internal server error' });
  });
};  
//CONTROLLER FOR GPS
exports.gpslatest = (request, response) => {
  gps.findOne({
    order: [['id', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.gpslatest10 = (request, response) => {
  gps.findAll({
      limit: 10,
    order: [['id', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.gpsdaily = (request, response) => {
const currentDate = new Date();
const startdate = new Date(currentDate);
startdate.setDate(currentDate.getDate() - 1);
const endDate = new Date(currentDate);

gps.findAll({
  where: {
    createdAt: {
      [Op.between]: [startdate, endDate],
    },
  },
  order: [['id', 'DESC']],
})
.then((result) => {
  response.json(result);
}) 
.catch((error) => {
  response.status(500).json({ error: 'Internal server error' });
});
};

exports.gpsweekly = (request, response) => {
  const currentDate = new Date();
  const startdate = new Date(currentDate);
  startdate.setDate(currentDate.getDate() - 7);
  const endDate = new Date(currentDate);

  gps.findAll({
    where: {
      createdAt: {
        [Op.between]: [startdate, endDate],
      },
    },
    order: [['id', 'DESC']],
  })
  .then((result) => {
    response.json(result);
  }) 
  .catch((error) => {
    response.status(500).json({ error: 'Internal server error' });
  });
};

exports.gpsmonthly = (request, response) => {
  const currentDate = new Date();
  const startdate = new Date(currentDate);
  startdate.setDate(currentDate.getDate() - 30);
  const endDate = new Date(currentDate);

  gps.findAll({
    where: {
      createdAt: {
        [Op.between]: [startdate, endDate],
      },
    },
    order: [['id', 'DESC']],
  })
  .then((result) => {
    response.json(result);
  }) 
  .catch((error) => {
    response.status(500).json({ error: 'Internal server error' });
  });
};  

//CONTROLLER FOR MODBUS
exports.modbuslatest = (request, response) => {
  modbus.findOne({
    order: [['id', 'DESC']],
  })
    .then((result) => {
      // response.json(result);
      if (result) {
        response.json({
          id: result.id,
          timestamp: result.timestamp,
          water_column_height: result.WaterLevel, // Ubah nama field
          AnemometerSpeed: result.AnemometerSpeed,
          Beaufort_scale: result.Beaufort_scale,
          Angle: result.Angle,
          Direction: result.Direction,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt
        });
      } else {
        response.json({});
      }
      
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.modbuslatest10 = (request, response) => {
  modbus.findAll({
      limit: 10,
    order: [['id', 'DESC']],
  })
    .then((result) => {
      // response.json(result);
      const modifiedResult = result.map(item => ({
        id: item.id,
        timestamp: item.timestamp,
        water_column_height: item.WaterLevel, // Ubah nama field
        AnemometerSpeed: item.AnemometerSpeed,
        Beaufort_scale: item.Beaufort_scale,
        Angle: item.Angle,
        Direction: item.Direction,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }));
      
      response.json(modifiedResult);
      
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.modbusdaily = (request, response) => {
const currentDate = new Date();
const startdate = new Date(currentDate);
startdate.setDate(currentDate.getDate() - 1);
const endDate = new Date(currentDate);

modbus.findAll({
  where: {
    createdAt: {
      [Op.between]: [startdate, endDate],
    },
  },
  order: [['id', 'DESC']],
})
// .then((result) => {
//   response.json(result);
// }) 
.then((result) => {
  const modifiedResult = result.map(item => ({
    id: item.id,
    timestamp: item.timestamp,
    water_column_height: item.WaterLevel, // Ubah nama field
    AnemometerSpeed: item.AnemometerSpeed,
    Beaufort_scale: item.Beaufort_scale,
    Angle: item.Angle,
    Direction: item.Direction,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  }));

  response.json(modifiedResult);
})

.catch((error) => {
  response.status(500).json({ error: 'Internal server error' });
});
};

exports.modbusweekly = (request, response) => {
  const currentDate = new Date();
  const startdate = new Date(currentDate);
  startdate.setDate(currentDate.getDate() - 7);
  const endDate = new Date(currentDate);

  modbus.findAll({
    where: {
      createdAt: {
        [Op.between]: [startdate, endDate],
      },
    },
    order: [['id', 'DESC']],
  })
  // .then((result) => {
  //   response.json(result);
  // }) 
  .then((result) => {
    const modifiedResult = result.map(item => ({
      id: item.id,
      timestamp: item.timestamp,
      water_column_height: item.WaterLevel, // Ubah nama field
      AnemometerSpeed: item.AnemometerSpeed,
      Beaufort_scale: item.Beaufort_scale,
      Angle: item.Angle,
      Direction: item.Direction,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));
  
    response.json(modifiedResult);
  })
  
  .catch((error) => {
    response.status(500).json({ error: 'Internal server error' });
  });
};

exports.modbusmonthly = (request, response) => {
  const currentDate = new Date();
  const startdate = new Date(currentDate);
  startdate.setDate(currentDate.getDate() - 30);
  const endDate = new Date(currentDate);

  modbus.findAll({
    where: {
      createdAt: {
        [Op.between]: [startdate, endDate],
      },
    },
    order: [['id', 'DESC']],
  })
  // .then((result) => {
  //   response.json(result);
  // }) 
  .then((result) => {
    const modifiedResult = result.map(item => ({
      id: item.id,
      timestamp: item.timestamp,
      water_column_height: item.WaterLevel, // Ubah nama field
      AnemometerSpeed: item.AnemometerSpeed,
      Beaufort_scale: item.Beaufort_scale,
      Angle: item.Angle,
      Direction: item.Direction,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));
  
    response.json(modifiedResult);
  })
  
  .catch((error) => {
    response.status(500).json({ error: 'Internal server error' });
  });
};  

//CONTROLLER FOR RAW
exports.rawlatest = (request, response) => {
  modbus.findOne({
    order: [['id', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.rawlatest10 = (request, response) => {
  raw.findAll({
      limit: 10,
    order: [['id', 'DESC']],
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error' });
    });
};

exports.rawdaily = (request, response) => {
const currentDate = new Date();
const startdate = new Date(currentDate);
startdate.setDate(currentDate.getDate() - 1);
const endDate = new Date(currentDate);

raw.findAll({
  where: {
    createdAt: {
      [Op.between]: [startdate, endDate],
    },
  },
  order: [['id', 'DESC']],
})
.then((result) => {
  response.json(result);
}) 
.catch((error) => {
  response.status(500).json({ error: 'Internal server error' });
});
};

exports.rawweekly = (request, response) => {
  const currentDate = new Date();
  const startdate = new Date(currentDate);
  startdate.setDate(currentDate.getDate() - 7);
  const endDate = new Date(currentDate);

  raw.findAll({
    where: {
      createdAt: {
        [Op.between]: [startdate, endDate],
      },
    },
    order: [['id', 'DESC']],
  })
  .then((result) => {
    response.json(result);
  }) 
  .catch((error) => {
    response.status(500).json({ error: 'Internal server error' });
  });
};

exports.rawmonthly = (request, response) => {
  const currentDate = new Date();
  const startdate = new Date(currentDate);
  startdate.setDate(currentDate.getDate() - 30);
  const endDate = new Date(currentDate);

  raw.findAll({
    where: {
      createdAt: {
        [Op.between]: [startdate, endDate],
      },
    },
    order: [['id', 'DESC']],
  })
  .then((result) => {
    response.json(result);
  }) 
  .catch((error) => {
    response.status(500).json({ error: 'Internal server error' });
  });
};  

