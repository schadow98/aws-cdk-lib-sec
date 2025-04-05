import { createLogger, format, transports, } from "winston";
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
    format: format.combine(format.timestamp(), format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
    })),
    transports: [new transports.Console()],
});
logger[SecMarker] = true;
const log = logger.log;
const error = logger.error;
const warn = logger.warn;
const help = logger.help;
const data = logger.data;
const info = logger.info;
const debug = logger.debug;
const prompt = logger.prompt;
const http = logger.http;
const verbose = logger.verbose;
const input = logger.input;
const silly = logger.silly;
const emerg = logger.emerg;
const alert = logger.alert;
const crit = logger.crit;
const warning = logger.warning;
const notice = logger.notice;
export { logger, log, error, warn, help, data, info, debug, prompt, http, verbose, input, silly, emerg, alert, crit, warning, notice, };
//# sourceMappingURL=SecLogger.js.map