import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class MathMinhNode extends BaseConfigNode {
    onCreate(): void { }

    parseCode(param?: any): string[] {
        let a: string = this.getInputProperty("a") ?? this.fixEscapedChars(this.nodeData.data?.a);
        let b: string = this.getInputProperty("b") ?? this.fixEscapedChars(this.nodeData.data?.b);
        this.addCode(`let ${this.getProperty("value")} = Math.min(${a}, ${b});`);
        return this.codes;
    }
}