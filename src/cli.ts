import { Command } from 'commander';

// Initialisiere Commander.js
const program = new Command();

// Beispiel: Ein einfacher Befehl
program
  .name('Secure AWS Deployment')   // Name des Tools
  .description('A tool t deploy secure applications to AWS \nIt updates the aws-cdk kit to a secure version\nIt deploys the application via cloudformation')
  .version('1.0.0')
  .option('-c, --configFile <any>', 'A path to the configFile', "./index.ts")
  .option('-o, --outputDir <any>', 'A path to where the output gets written', "./output")
  .option('-l, --logLevel <any>', 'Defines the logLevel', "INFO")
  .option('-f, --cloudFormation', 'Return the CloudFormation Template', false)


program.parse(process.argv);
const options = program.opts()

//set loglevel
process.env.LOGLEVEL = options.logLevel.toLowerCase()

import { main } from './main';
main(options)
