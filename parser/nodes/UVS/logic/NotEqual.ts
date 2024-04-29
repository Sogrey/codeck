import { BaseConfigNode } from "../../../parsers/UnityVisualScripting/IUVSConfig";

export default class NotEqualNode extends BaseConfigNode {
    inputKey: string = null;
    outputKey: string = null;

    onCreate(): void {
        let paramA: string = this.getInputProperty("a");
        if (!paramA) {
            paramA = this.nodeData.defaultValues["a"].$content;
        }
        let paramB: string = this.getInputProperty("b");
        if (!paramB) {
            paramB = this.nodeData.defaultValues["b"].$content;
        }

        this.setProperty("comparison", `(${paramA} != ${paramB})`);
    }
}