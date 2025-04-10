// const winston = require("winston");
// const format = winston.format;

// const myFormat = format.printf(({level, message, label, timestamp})=>{
//     return `${timestamp}, ${label}, ${level}, ${message}`;
// });

// const logger = winston.createLogger({
//     level:"debug",
//     format: format.combine(
//         format.label({label:"dev env"}),
//         format.timestamp(),
//         myFormat

//     ),
//     defaultMeta: { service: 'user-service' },
//     transports: [
//         new winston.transports.Console({  format: format.combine
//         (   winston.format.colorize(),
//             winston.format.simple())
//         }),
//         new winston.transports.File({filename: './logger/error.log', level:'error', format:  format.json()}),
//         new winston.transports.File({filename: './logger/combined.log',  format: format.json()}),

//     ],

// });

// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//       format: winston.format.simple(),
//     }));
//   }

// module.exports = logger;

const winston = require("winston");
const format = winston.format;

const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message}`;
  })
);

const logger = winston.createLogger({
  level: "debug",
  format: format.combine(format.colorize(), format.timestamp(), format.json()),
  transports: [
    new winston.transports.Console({
      format: consoleLogFormat,
    }),
    new winston.transports.File({ filename: "./logger/combined.log" }),
    new winston.transports.File({
      filename: "./logger/error.log",
      level: "error",
    }),
  ],
});

module.exports = logger;
