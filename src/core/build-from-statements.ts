import { Statement } from "./types/Statement";

export const buildFromStatements = (statementOrStatements: Statement | Statement[]): string => {
    if (!Array.isArray(statementOrStatements)) {
        statementOrStatements = [statementOrStatements];
    }

    return statementOrStatements.reduce((output, statement) => output += statement.toString(), '');
};