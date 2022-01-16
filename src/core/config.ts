import { workspace } from 'vscode';

export type Config = {
    testType: string;
    autoReference: boolean;
};

export function getConfig(): Config {
    const ymltotest = workspace.getConfiguration('ymltotest');
    return {
        testType: ymltotest.get('testType', 'jest'),
        autoReference: ymltotest.get('autoReference', true),
    };
}
