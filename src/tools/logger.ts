import * as winston from 'winston';

if(! process.env.LOGLEVEL){
  process.env.LOGLEVEL = "debug"
}


if (!Object.prototype.hasOwnProperty.call(winston.config.npm.levels, process.env.LOGLEVEL)) {
  throw new Error("process.env.LOGLEVEL is not a valid Loglevel: " + process.env.LOGLEVEL);
}


const logger = winston.createLogger({
  level: process.env.LOGLEVEL || 'info',
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
          const levelColor = {
              error: '\x1b[31m', // Red
              warn: '\x1b[33m',  // Yellow
              info: '\x1b[32m',  // Green
              debug: '\x1b[36m', // Cyan
              default: '\x1b[37m' // White
          }[level] || '\x1b[37m';

          // Remove colors for file logging
          const coloredLevel = `${levelColor}${level.padEnd(5, ' ')}\x1b[0m`;
          const plainLevel = level.padEnd(5, ' ');

          if (process.stdout.isTTY) {
              return `${timestamp}    ${coloredLevel}    ${message}`;
          } else {
              return `${timestamp}    ${plainLevel}    ${message}`;
          }
      })
  ),
  transports: [
      new winston.transports.Console(),  // Console output
      new winston.transports.File({ filename: 'logs/error.log', level: 'error', options: { flags: 'w+' } }),  // error log
      new winston.transports.File({ filename: 'logs/info.log', options: { flags: 'w+' } })  // Info log
  ],
});

export default logger;
