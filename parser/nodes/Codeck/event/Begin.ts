import { CodeVariable } from "../../../parsers/Codeck/CodeckElement";
import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class BeginNode extends BaseConfigNode {
    inputKey: string = null;
    outputKey: string = "$pin_exec_out";

    onCreate(): void { }

    public parseCode(param?: any): string[] {
        for (let variable of this.variables) {
            let str = `let ${variable.name}`
            if (variable.defaultValue != null) {
                str += ` = ${this.parseVariableByType(variable)};`;
            }
            this.addCode(str);
        }
        return this.codes;
    }

    public parseVariableByType(variable: CodeVariable): any {
        if (variable.type == "string") {
            return `\"${variable.defaultValue}\"`;
        }
        if (variable.type == "boolean") {
            return variable.defaultValue == "true";
        }
        if (variable.type == "number") {
            return Number.parseFloat(variable.defaultValue);
        }
        if (variable.type == "array") {
            let val = JSON.parse(variable.defaultValue);
            return JSON.stringify(val);
        }
        return variable.defaultValue;
    }
}