import * as winston from 'winston';
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
declare const logger: winston.Logger;
export default logger;
