import { log } from 'console';
import { config, createLogger, format, transports } from 'winston';

if(! process.env.LOGLEVEL){
  throw new Error("Not a valid logLevel: please enter a string or use default: " + process.env.LOGLEVEL)
}


if (! config.npm.levels.hasOwnProperty(process.env.LOGLEVEL)){
  throw new Error("process.env.LOGLEVEL is not a valid Loglevel: " + process.env.LOGLEVEL)
}
const logger = createLogger({
  level: process.env.LOGLEVEL,
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),  // Console output
    new transports.File({ filename: 'logs/error.log', level: 'error', options: { flags: 'w+' } }),  // error log
    new transports.File({ filename: 'logs/info.log', options: { flags: 'w+' }  })  // Info log
  ],
});

export default logger;
