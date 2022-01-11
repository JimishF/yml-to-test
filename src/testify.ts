import * as yaml from 'js-yaml';
import * as vscode from 'vscode';
import { transform } from './core/transform';
import { Statement } from './core/types/Statement';
import { buildFromStatements } from './core/build-from-statements';
import * as prettier from 'prettier';

export const execute = (context: vscode.ExtensionContext) => {
    const editor = vscode.window.activeTextEditor!;

    const text = editor.document.getText(editor.selection);
    if (!text) {
        vscode.window.showInformationMessage("Select Text and run again.");
        return;
    }

    let doc;
    try {
        doc = yaml.load(text);
        console.log(doc);
        
    } catch (e) {
        vscode.window.showInformationMessage("Invalid Yaml");
    }
    const statements = transform(doc);
    const str = buildFromStatements(statements);
    try {
        const formattedStr = prettier.format(str);
        
        // replace
        editor.edit(builder => {
            for (const selection of editor.selections) {
                builder.replace(selection, formattedStr);
            }
        });

    } catch (error) {
        console.log(error);
        vscode.window.showErrorMessage("Prettification failed");

    }
};

