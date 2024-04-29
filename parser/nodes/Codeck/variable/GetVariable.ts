import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class GetVariableNode extends BaseConfigNode {
    inputKey: string = null;
    outputKey: string = null;

    onCreate(): void {
        this.setProperty("variable", this.fixEscapedChars(this.nodeData.data?.name));
    }
}