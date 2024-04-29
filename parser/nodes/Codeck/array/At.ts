import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class AtNode extends BaseConfigNode {
    onCreate(): void { }

    parseCode(param?: any): string[] {
        let array: string = this.getInputProperty("array");
        let index: number = this.getInputProperty("index") ?? this.nodeData.data?.index ?? 0;
        this.addCode(`let ${this.getProperty("value")} = ${array}[${index}];`);
        return this.codes;
    }
}