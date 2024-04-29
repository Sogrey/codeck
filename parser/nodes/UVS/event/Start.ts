import { CodeVariable } from "../../../parsers/UnityVisualScripting/UVSElement";
import { BaseConfigNode } from "../../../parsers/UnityVisualScripting/IUVSConfig";

export default class StartNode extends BaseConfigNode {
    inputKey: string = null;
    outputKey: string = "trigger";

    onCreate(): void { }

    public parseCode(param?: any): string[] {
        for (let variable of this.variables) {
            this.addCode(`let ${variable.name} = ${this.parseVariableByType(variable)};`);
        }
        return this.codes;
    }

    public parseVariableByType(variable: CodeVariable): any {
        if (variable.type == "System.String") {
            return `\"${variable.value}\"`;
        }
        if (variable.type == "System.Boolean") {
            return variable.value == "true";
        }
        if (variable.type == "System.Int32") {
            return Number.parseInt(variable.value);
        }
        if (variable.type == "System.Single") {
            return Number.parseFloat(variable.value);
        }
        return variable.value;
    }
}