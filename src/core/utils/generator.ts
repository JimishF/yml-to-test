import config from '../config.json';
import { workspace } from 'vscode';

export class Generator {
    static get config() {
        const ymltotest = workspace.getConfiguration('ymltotest');
        return {
            testType: ymltotest.get('testType'),
            autoReference: ymltotest.get('autoReference')
        };
    };

    private static attemptTitleToReference(title: string) {
        const referenceRegex = new RegExp(/given (a|an)?\s?(?<reference>[A-Z][a-z\d]+)+$/gi);
        const match = referenceRegex.exec(title);
        const ref = match?.groups?.reference;
        if (ref) {
            return `${ref}.name`;
        }
        return `'${title}'`;
    };

    private static get todoFnName() {
        switch (this.config.testType) {
            case 'jest':
                return '.todo';
            case 'mocha':
                return '.skip';
            default:
                return '';
        }
    }

    private static describeStart = (title: string) => {
        if (this.config.autoReference) {
            title = this.attemptTitleToReference(title);
        }else{
            title = `'${title}'`;
        }
        return `describe(${title}, ()=> {`;
    };
    private static describeEnd = () => `});`;

    
    // public members 
    static it(title: string) {
        return `it${this.todoFnName}('${title}');`;
    }
    static describe(title: string, child: string) {
        return `${this.describeStart(title)} ${child} ${this.describeEnd()}`;
    }

} 