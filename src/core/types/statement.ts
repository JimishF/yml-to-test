import { TemplateAgent } from '../utils/template-agent';

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
export class Statement {
    public readonly typeName: StatementType;
    public children: Statement[];
    public title: string;

    constructor(statementOptions: StatementOptions) {
        this.typeName = statementOptions.typeName;
        this.children = statementOptions?.children ?? [];
        this.title = statementOptions.title;
    }

    toString(templateAgent: TemplateAgent) {
        if (this.typeName === StatementType.todo) {
            return templateAgent.it(this.title);
        }
        else if (this.typeName === StatementType.describe) {
            const mappedChildren: string = this.children.reduce((acc, child) => acc + child.toString(templateAgent), '');
            return templateAgent.describe(this.title, mappedChildren);
        }
    }
}

