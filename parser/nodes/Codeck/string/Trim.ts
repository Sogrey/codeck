import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class TrimNode extends BaseConfigNode {
    onCreate(): void { }

    parseCode(param?: any): string[] {
        let string: string = this.getInputProperty("string") ?? this.fixEscapedChars(this.nodeData.data?.string);
        this.addCode(`let ${this.getProperty("trimed")} = ${string}.trim();`);
        return this.codes;
    }
}