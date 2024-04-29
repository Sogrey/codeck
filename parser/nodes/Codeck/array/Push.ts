import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class PushNode extends BaseConfigNode {
    onCreate(): void { }

    parseCode(param?: any): string[] {
        let array: string = this.getInputProperty("array");
        let value: string = this.getInputProperty("value") ?? this.nodeData.data?.value ?? null;
        this.addCode(`${array}.push("${this.fixEscapedChars(value)}");`);
        return this.codes;
    }
}