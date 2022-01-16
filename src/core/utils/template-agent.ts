import { Config, getConfig } from '../config';

export class TemplateAgent {
    config: Config;

    constructor( config?: Config ) {
        this.config = config ?? getConfig();
    }
    
    private attemptTitleToReference(title: string) {
        const referenceRegex = new RegExp(/given (a|an)?\s?(?<reference>[A-Z][a-z\d]+)+$/gi);
        const match = referenceRegex.exec(title);
        const ref = match?.groups?.reference;
        if (ref) {
            return `${ref}.name`;
        }
        return `'${title}'`;
    };

    private get todoFnName() {
        switch (this.config.testType) {
            case 'jest':
                return '.todo';
            case 'mocha':
                return '.skip';
            default:
                return '';
        }
    }

    private describeStart = (title: string) => {
        title = this.config.autoReference ? this.attemptTitleToReference(title) : `'${title}'`;
        return `describe(${title}, ()=> {`;
    };
    private describeEnd = () => `});`;  


    // public members 
    it(title: string) {
        return `it${this.todoFnName}('${title}');`;
    }
    describe(title: string, child: string) {
        return `${this.describeStart(title)} ${child} ${this.describeEnd()}`;
    }

} 