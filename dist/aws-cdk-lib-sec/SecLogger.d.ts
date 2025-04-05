import { LeveledLogMethod, LogMethod } from "winston";
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
declare const logger: import("winston").Logger;
declare const log: LogMethod;
declare const error: LeveledLogMethod;
declare const warn: LeveledLogMethod;
declare const help: LeveledLogMethod;
declare const data: LeveledLogMethod;
declare const info: LeveledLogMethod;
declare const debug: LeveledLogMethod;
declare const prompt: LeveledLogMethod;
declare const http: LeveledLogMethod;
declare const verbose: LeveledLogMethod;
declare const input: LeveledLogMethod;
declare const silly: LeveledLogMethod;
declare const emerg: LeveledLogMethod;
declare const alert: LeveledLogMethod;
declare const crit: LeveledLogMethod;
declare const warning: LeveledLogMethod;
declare const notice: LeveledLogMethod;
export { logger, log, error, warn, help, data, info, debug, prompt, http, verbose, input, silly, emerg, alert, crit, warning, notice, };
