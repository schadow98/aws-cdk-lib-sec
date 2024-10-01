import { writeStackToYaml, praseFileToStack } from "./tools/stackToFile";
import logger from "./tools/logger";
import { OptionValues } from 'commander';
import * as fs from "fs"
import { Stack } from 'aws-cdk-lib';
export async function main(options: OptionValues): Promise<void> {
  logger.info("parsed arguments " + JSON.stringify(options, null, 2));
  if (! fs.existsSync(options.outputDir)) {
    fs.mkdirSync(options.outputDir)
  } 

  const stacks: Stack[] =  await praseFileToStack(options.configFile)

  for(var index in stacks){
    writeStackToYaml(stacks[index], options.outputDir)
  }

}
