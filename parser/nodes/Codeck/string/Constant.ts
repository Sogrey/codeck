import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class StringConstanthNode extends BaseConfigNode {
    onCreate(): void {
        let string: string = this.getInputProperty("string") ?? this.nodeData.data?.string;
        this.setProperty("value", string);
    }
}