import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class LengthNode extends BaseConfigNode {
    onCreate(): void {
        let array: string = this.getInputProperty("array");
        this.setProperty("stdLength", `${array}.length`);
    }
}