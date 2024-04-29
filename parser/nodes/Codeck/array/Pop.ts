import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class PopNode extends BaseConfigNode {
    onCreate(): void { }

    parseCode(param?: any): string[] {
        let array: string = this.getInputProperty("array") ?? [];
        this.addCode(`let ${this.getProperty("value")} = ${array}.pop();`);
        return this.codes;
    }
}