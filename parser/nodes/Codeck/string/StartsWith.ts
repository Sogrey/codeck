import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class StartsWithNode extends BaseConfigNode {
    onCreate(): void {
        let string: string = this.getInputProperty("string");
        let target: string = this.getInputProperty("target") ?? this.fixEscapedChars(this.nodeData.data?.target);
        this.setProperty("match", `${string}.startsWith("${target}")`);
    }
}