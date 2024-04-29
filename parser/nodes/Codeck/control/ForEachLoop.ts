import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class ForEachLoopNode extends BaseConfigNode {
    onCreate(): void { }

    public parseCode(param: any): string[] {
        let array: string = this.getInputProperty("array");
        let bodyCodes: string[] = this.getOutputCodes("iteration", param);

        this.addCode(`
            for (let ${this.getProperty("item")} of ${array})
            {
                ${bodyCodes.join('\n')}
            }`
        );

        return this.codes;
    }
}