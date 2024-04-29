import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class GreaterNode extends BaseConfigNode {
    onCreate(): void {
        let input1: any = this.getInputProperty("input1") ?? this.nodeData.data?.input1;
        let input2: any = this.getInputProperty("input2") ?? this.nodeData.data?.input2;
        this.setProperty("output", `(${input1} > ${input2})`);
    }
}