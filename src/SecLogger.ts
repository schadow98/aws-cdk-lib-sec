import {
  createLogger,
  format,
  LeveledLogMethod,
  LogMethod,
  transports,
} from "winston";
import { SecMarker } from "./SecMarker";

/**
 * Centralized application logger using Winston.
 * 
 * Configured to:
 * - Include timestamps in all log messages
 * - Format logs as: `<timestamp> [<level>]: <message>`
 * - Output logs to the console
 * 
 * Useful for consistent and readable logging across all components.
 */
const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [new transports.Console()],
});

(logger as any)[SecMarker] = true;

const log: LogMethod = logger.log;

const error: LeveledLogMethod = logger.error;
const warn: LeveledLogMethod = logger.warn;
const help: LeveledLogMethod = logger.help;
const data: LeveledLogMethod = logger.data;
const info: LeveledLogMethod = logger.info;
const debug: LeveledLogMethod = logger.debug;
const prompt: LeveledLogMethod = logger.prompt;
const http: LeveledLogMethod = logger.http;
const verbose: LeveledLogMethod = logger.verbose;
const input: LeveledLogMethod = logger.input;
const silly: LeveledLogMethod = logger.silly;

const emerg: LeveledLogMethod = logger.emerg;
const alert: LeveledLogMethod = logger.alert;
const crit: LeveledLogMethod = logger.crit;
const warning: LeveledLogMethod = logger.warning;
const notice: LeveledLogMethod = logger.notice;

export {
  logger,
  log,
  error,
  warn,
  help,
  data,
  info,
  debug,
  prompt,
  http,
  verbose,
  input,
  silly,
  emerg,
  alert,
  crit,
  warning,
  notice,
};
