import { writeStackToFile, praseFileToStack } from "./tools/stackToFile";
import { checkStackClass } from "./tools/validator";
import logger from "./tools/logger";
import { OptionValues } from 'commander';
import * as fs from "fs"
import { Stack } from 'aws-cdk-lib';
import { compareJSONTemplate } from "./tools/comparseStacks";
export async function main(options: OptionValues): Promise<void> {
  logger.info("parsed arguments " + JSON.stringify(options, null, 2));
  if (! fs.existsSync(options.outputDir)) {
    fs.mkdirSync(options.outputDir)
  } 

  const stacks: Stack[] =  await praseFileToStack(options.configFile)

  compareJSONTemplate(stacks[0], stacks[1], options.outputDir)
  for(var index in stacks){
    checkStackClass(stacks[index])
    writeStackToFile(stacks[index], options.outputDir)
  }

  

}
