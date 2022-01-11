
export enum StatementType {
    describe = 'describe',
    todo = 'todo'
}

export interface TodoStatement {
    typeName: StatementType.todo,
    title: string;
    children?: never
}

export interface DescribeStatement {
    typeName: StatementType.describe,
    children: Statement[]
    title: string
}
export type StatementOptions = TodoStatement | DescribeStatement;

const attemptTitleToReference = (title: string) => {
    //TODO: try to check if title is className or function name like, and decide on double quotes 
    const referenceRegex = new RegExp(/given (a|an)?\s?(?<reference>[A-Z][a-z\d]+)+/gi);
    const match = referenceRegex.exec(title);
    const ref = match?.groups?.reference;
    if (ref) {
        return `${ref}.prototype.name`;
    }
    return `'${title}'`;
};

const describeStart = (title: string) => {
    title = attemptTitleToReference(title);
    return `describe(${title}, ()=> {`;
};

const describeEnd = () => `});`;


export class Statement {
    public readonly typeName: StatementType;
    public children: Statement[];
    public title: string;

    constructor(statementOptions: StatementOptions) {
        this.typeName = statementOptions.typeName;
        this.children = statementOptions?.children ?? [];
        this.title = statementOptions.title;
    }

    toString() {
        if (this.typeName === StatementType.todo) {
            return `it.todo('${this.title}');`;
        }
        else if (this.typeName === StatementType.describe) {
            const mappedChildren: string = this.children.reduce((acc, child) => acc + child.toString(), '');
            return `${describeStart(this.title)} ${mappedChildren} ${describeEnd()}`;
        }
    }
}

