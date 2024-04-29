import { BaseConfigNode } from "../../../parsers/UnityVisualScripting/IUVSConfig";

export default class AndNode extends BaseConfigNode {
    inputKey: string = null;
    outputKey: string = null;

    onCreate(): void {
        let paramA: string = this.getInputProperty("a");
        let paramB: string = this.getInputProperty("b");

        this.setProperty("result", `(${paramA} && ${paramB})`);
    }
}