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
    }
    const statements = transform(doc);
    const str = buildFromStatements(statements);
    try {
        const formattedStr = format(str, { parser:'babel'});
        
        // replace
        editor.edit(builder => {
            for (const selection of editor.selections) {
                builder.replace(selection, formattedStr);
            }
        });

    } catch (error) {
        console.log(error);
        window.showErrorMessage("Prettification failed");

    }
};

