import * as winston from 'winston';
/**
 * Ensures that `process.env.LOGLEVEL` is set and valid.
 *
 * - Defaults to `'debug'` if no value is set.
 * - Validates that the value matches one of Winston's supported log levels (`winston.config.npm.levels`).
 * - Throws an error if the provided log level is invalid.
 */
if (!process.env.LOGLEVEL) {
    process.env.LOGLEVEL = "debug";
}
if (!Object.prototype.hasOwnProperty.call(winston.config.npm.levels, process.env.LOGLEVEL)) {
    throw new Error("process.env.LOGLEVEL is not a valid Loglevel: " + process.env.LOGLEVEL);
}
/**
 * Central Winston logger for structured and colored application logging.
 *
 * Features:
 * - Uses `LOGLEVEL` from environment variables, defaults to `'info'`.
 * - Adds timestamps to all log messages.
 * - Applies color-coded log levels in TTY (interactive terminal) environments:
 *   - `error`: Red
 *   - `warn`: Yellow
 *   - `info`: Green
 *   - `debug`: Cyan
 * - Falls back to plain text in non-TTY environments (e.g. CI/CD, file output).
 *
 * Outputs logs to:
 * - Console (all levels)
 * - `logs/error.log` (only errors)
 * - `logs/info.log` (info and above)
 */
const logger = winston.createLogger({
    level: process.env.LOGLEVEL || 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.printf(({ timestamp, level, message }) => {
        const levelColor = {
            error: '\x1b[31m', // Red
            warn: '\x1b[33m', // Yellow
            info: '\x1b[32m', // Green
            debug: '\x1b[36m', // Cyan
            default: '\x1b[37m' // White
        }[level] || '\x1b[37m';
        // Remove colors for file logging
        const coloredLevel = `${levelColor}${level.padEnd(5, ' ')}\x1b[0m`;
        const plainLevel = level.padEnd(5, ' ');
        if (process.stdout.isTTY) {
            return `${timestamp}    ${coloredLevel}    ${message}`;
        }
        else {
            return `${timestamp}    ${plainLevel}    ${message}`;
        }
    })),
    transports: [
        new winston.transports.Console(), // Console output
        new winston.transports.File({ filename: 'logs/error.log', level: 'error', options: { flags: 'w+' } }), // error log
        new winston.transports.File({ filename: 'logs/info.log', level: 'info', options: { flags: 'w+' } }) // Info log
    ],
});
export default logger;
//# sourceMappingURL=logger.js.map