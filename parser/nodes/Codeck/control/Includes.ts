import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class IncludesNode extends BaseConfigNode {
    onCreate(): void {
        let data: string = this.getInputProperty("data");
        let item: string = this.getInputProperty("item") ?? this.fixEscapedChars(this.nodeData.data?.item) ?? null;
        this.setProperty("has", `${data}.includes("${item}")`);
    } 
}