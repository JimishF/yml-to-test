import config from './config.json';

export class Generator {
    static type: string = config?.testType ?? 'jest';

    private static attemptTitleToReference(title: string) {
        const referenceRegex = new RegExp(/given (a|an)?\s?(?<reference>[A-Z][a-z\d]+)+/gi);
        const match = referenceRegex.exec(title);
        const ref = match?.groups?.reference;
        if (ref) {
            return `${ref}.prototype.name`;
        }
        return `'${title}'`;
    };

    private static get todoFnName() {

        switch (this.type) {
            case 'jest':
                return '.todo';
            case 'mocha':
                return '.skip';
            default:
                return '';
        }
    }

    private static describeStart = (title: string) => {
        if (!config?.disableAutoReference) {
            title = this.attemptTitleToReference(title);
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