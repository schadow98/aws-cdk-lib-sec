import logger from "./logger";

export class LogError{
  public static errorMessages: (string | undefined)[] = [];

  constructor(message: string | undefined) {
    logger.error(message);
    LogError.errorMessages.push(message);
    if (!process.env.DEBUG) {
      new Error(message);
    }
  }
}
