"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notice = exports.warning = exports.crit = exports.alert = exports.emerg = exports.silly = exports.input = exports.verbose = exports.http = exports.prompt = exports.debug = exports.info = exports.data = exports.help = exports.warn = exports.error = exports.log = exports.logger = void 0;
const winston_1 = require("winston");
const SecMarker_1 = require("./SecMarker");
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
const logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
    })),
    transports: [new winston_1.transports.Console()],
});
exports.logger = logger;
logger[SecMarker_1.SecMarker] = true;
const log = logger.log;
exports.log = log;
const error = logger.error;
exports.error = error;
const warn = logger.warn;
exports.warn = warn;
const help = logger.help;
exports.help = help;
const data = logger.data;
exports.data = data;
const info = logger.info;
exports.info = info;
const debug = logger.debug;
exports.debug = debug;
const prompt = logger.prompt;
exports.prompt = prompt;
const http = logger.http;
exports.http = http;
const verbose = logger.verbose;
exports.verbose = verbose;
const input = logger.input;
exports.input = input;
const silly = logger.silly;
exports.silly = silly;
const emerg = logger.emerg;
exports.emerg = emerg;
const alert = logger.alert;
exports.alert = alert;
const crit = logger.crit;
exports.crit = crit;
const warning = logger.warning;
exports.warning = warning;
const notice = logger.notice;
exports.notice = notice;
//# sourceMappingURL=SecLogger.js.map