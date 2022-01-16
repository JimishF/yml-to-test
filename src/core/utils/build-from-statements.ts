import { getConfig } from "../config";
import { Statement } from "../types/statement";
import { TemplateAgent } from "./template-agent";

export const buildFromStatements = (statementOrStatements: Statement | Statement[]): string => {
    let statements: Statement[] = Array.isArray(statementOrStatements) ? statementOrStatements : [statementOrStatements];

    const config = getConfig();
    const templateAgent = new TemplateAgent(config);

    return statements.reduce((output, statement) => output += statement.toString(templateAgent), '');
};