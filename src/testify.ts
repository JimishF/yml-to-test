import { load } from 'js-yaml';
import { window, ExtensionContext } from 'vscode';
import { transform } from './core/utils/transform';
import { buildFromStatements } from './core/utils/build-from-statements';
import { format } from 'prettier';

export const execute = (context: ExtensionContext) => {
    const editor = window.activeTextEditor!;

    const text = editor.document.getText(editor.selection);
    if (!text) {
        window.showInformationMessage("Select Text and run again.");
        return;
    }


    let doc;
    try {
        doc = load(text);
    } catch (e) {
        window.showInformationMessage("Invalid Yaml");
        return;
    }

    const statements = transform(doc);
    const str = buildFromStatements(statements);

    let formattedStr: string;
    try {
        formattedStr = format(str, { parser: 'babel' });
    } catch (error) {
        window.showErrorMessage("Prettification failed");
        return;
    }


    // replace
    editor.edit(builder => {
        for (const selection of editor.selections) {
            builder.replace(selection, formattedStr);
        }
    });

};

