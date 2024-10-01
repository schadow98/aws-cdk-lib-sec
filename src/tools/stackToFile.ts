import * as cdk from 'aws-cdk-lib';
import * as fs from 'fs';
import * as path from 'path';
import { App, Stack } from 'aws-cdk-lib';
import  logger  from '../tools/logger';

// function to convert a stack to a yaml and write it into an file
function writeStackToYaml(stack: Stack, outputDir: string): void {
 // Creating of the stack template.
  const app = stack.node.root as cdk.App; 
  const assembly = app.synth();          
  const stackArtifact = assembly.getStackArtifact(stack.artifactId); 
  // Write the stack to the file
  const outputPath = path.join(outputDir, stackArtifact.templateFile)
  fs.writeFileSync(outputPath, JSON.stringify(stackArtifact.template, null, 2));
  logger.info(`cloudformation stack get written into file: ${outputPath}`);
}

async function fileToStack(filePath: string): Promise<Stack[]>{
    filePath = path.join(process.cwd(), filePath)
    if (! fs.existsSync(filePath)) {
        const consoleMsg: string = `The configFile doesn't exists: ${filePath}`
        
        logger.warn(consoleMsg);
        throw Error(consoleMsg)
      } 

    // Dynamic import of configFile
    logger.info("Parsing configFile: " + filePath)
    const stackModule = await import(filePath);
    var stacks: Stack[] = []


    //Find all classes of a stack
    for (const exportName in stackModule) {
        logger.debug(`Checking ${exportName}`)
        const exportedClass = stackModule[exportName];
        // check if it is a stack
        if (typeof exportedClass === 'function' && exportedClass.prototype instanceof Stack) {

            logger.info(`found stack ${exportName} in ${exportedClass}`)
            const app = new cdk.App();
            var stack;
            try {
                stack = new exportedClass(app, exportName)
            } catch (error) {
                throw Error(`config and parsing error  ${exportName} in ${exportedClass}`)
            }
            
            stacks.push( stack);
        }
    }

    if (stacks.length === 0){
        throw new Error('No valid Stack class found in the module.');
    }else{
        return stacks;
    }

    
}


export async function stackToFile(stackFilePath: string, outputDir: string="./output"): Promise<null> {

    var stacks:Stack[] = await fileToStack(stackFilePath)
    for(var index in stacks){
        writeStackToYaml(stacks[index], outputDir)
    }

    return null
  }