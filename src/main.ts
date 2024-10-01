import { stackToFile } from "./tools/stackToFile";
import logger from "./tools/logger";
import { OptionValues } from 'commander';
import * as fs from "fs"

export async function main(options: OptionValues): Promise<void> {
  logger.info("parsed arguments " + JSON.stringify(options, null, 2));
  if (! fs.existsSync(options.outputDir)) {
    fs.mkdirSync(options.outputDir)
  } 

  if (options.cloudFormation){
     await stackToFile(options.configFile, options.outputDir)
    };
}
