import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class CodeCheckerInputNode extends BaseConfigNode {
    onCreate(): void {
        this.setProperty("filePath", "tmpPath");
        this.setProperty("codeContent", "content");
    }
}