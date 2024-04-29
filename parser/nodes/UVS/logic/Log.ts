import { BaseConfigNode } from "../../../parsers/UnityVisualScripting/IUVSConfig";

export default class LogNode extends BaseConfigNode {
    inputKey: string = "input";
    outputKey: string;

    onCreate(): void { }

    public parseCode(param?: any): string[] {
        let type: string = this.nodeData.type;
        let logContent = this.nodeData.defaultValues.format.content

        if (type === 'Warning') {
            this.addCode(`
                result.addWarn(
                    row: ${param.row},
                    rowEnd: ${param.rowEnd},
                    col: ${param.col},
                    colEnd: ${param.colEnd},
                    str: "${logContent}",
                    type: "deprecated-text",
                    suggest: null
                )`
            )
        }
        else if (type === 'Error') {
            this.addCode(`
                result.addError(
                    row: ${param.row},
                    rowEnd: ${param.rowEnd},
                    col: ${param.col},
                    colEnd: ${param.colEnd},
                    str: "${logContent}",
                    type: "deprecated-text",
                    suggest: null
                )`
            )
        }

        return this.codes;
    }
}