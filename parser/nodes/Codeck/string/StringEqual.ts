import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class StringEqualNode extends BaseConfigNode {
    onCreate(): void {
        let input1: string = this.getInputProperty("input1") ?? this.nodeData.data?.input1;
        let input2: string = this.getInputProperty("input2") ?? this.nodeData.data?.input2;
        this.setProperty("value", `${input1} === ${input2}`);
    }
}