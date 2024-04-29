import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class SplitNode extends BaseConfigNode {
    onCreate(): void {
        this.setProperty("array", `_${this.nodeData.id}_array`);
    }

    parseCode(param?: any): string[] {
        let string: string = this.getInputProperty("string") ?? this.fixEscapedChars(this.nodeData.data?.string);
        let separator: string = this.getInputProperty("separator") ?? this.nodeData.data?.separator;
        this.addCode(`let ${this.getProperty("array")} = ${string}.split(${separator});`);
        return this.codes;
    }
}