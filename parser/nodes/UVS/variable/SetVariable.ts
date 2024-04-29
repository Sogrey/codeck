import { BaseConfigNode } from "../../../parsers/UnityVisualScripting/IUVSConfig";

export default class SetVariableNode extends BaseConfigNode {
    inputKey: string = "assign";
    outputKey: string = "assigned";

    onCreate(): void {
        let target = this.getInputProperty("name");
        if (!target) {
            target = this.nodeData.defaultValues.name.$content;
        }
        this.setProperty("name", target);

        let variable = this.getInputProperty("input");
        if (!variable) {
            variable = "{value}";
        }
        this.setProperty("output", variable);
    }

    parseCode(param?: any): string[] {
        let target = this.getInputProperty("name");
        if (!target) {
            target = this.nodeData.defaultValues.name.$content;
        }
        this.setProperty("name", target);

        let variable = this.getInputProperty("input");
        if (!variable) {
            variable = "{value}";
        }
        this.setProperty("output", variable);

        this.addCode(`let ${target} = ${variable};`);
        return this.codes;
    }
}