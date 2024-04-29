import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class LogicAndNode extends BaseConfigNode {
    onCreate(): void {
        let input1: string = this.getInputProperty("input1") ?? this.fixEscapedChars(this.nodeData.data?.input1) ?? false;
        let input2: string = this.getInputProperty("input2") ?? this.fixEscapedChars(this.nodeData.data?.input2) ?? false;
        this.setProperty("output", `(${input1} && ${input2})`);
    }
}