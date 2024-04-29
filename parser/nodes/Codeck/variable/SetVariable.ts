import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class SetVariableNode extends BaseConfigNode {
    onCreate(): void { }

    parseCode(param?: any): string[] {
        let target = this.fixEscapedChars(this.nodeData.data?.name);
        let variable = this.getInputProperty("value") ?? this.fixEscapedChars(this.nodeData.data?.value);

        this.addCode(`${target} = ${variable};`);
        return this.codes;
    }
}