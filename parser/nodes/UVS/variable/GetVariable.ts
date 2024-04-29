import { BaseConfigNode } from "../../../parsers/UnityVisualScripting/IUVSConfig";

export default class GetVariableNode extends BaseConfigNode {
    inputKey: string = null;
    outputKey: string = null;
    properties: { [key: string]: any }[] = [
        { "value": "{valName}" }
    ];

    onCreate(): void {
        if (this.nodeData && this.nodeData.defaultValues && this.nodeData.defaultValues.name) {
            this.setProperty("value", this.nodeData.defaultValues.name.$content);
        }
    }
}