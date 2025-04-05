import { Stack } from 'aws-cdk-lib';
export declare function writeStackToFile(stack: Stack, outputDir: string): void;
export declare function praseFileToStack(filePath: string): Promise<Stack[]>;
export declare function stackToFile(stackFilePath: string, outputDir?: string): Promise<null>;
