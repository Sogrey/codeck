import { BaseConfigNode } from "../../../parsers/UnityVisualScripting/IUVSConfig";

export default class BetterIfNode extends BaseConfigNode {
    inputKey: string = "In";
    outputKey: string = "Finished";

    onCreate(): void { }
    public parseCode(param: any): string[] {
        let conditionsParam: string = this.getInputProperty("Condition");
        let trueCodes: string[] = this.getOutputCodes("True", param);
        let falseCodes: string[] = this.getOutputCodes("False", param);

        this.addCode(`
            if (${conditionsParam})
            {
                ${trueCodes.join('\n')}
            }
            else {
                ${falseCodes.join('\n')}
            }`
        );

        return this.codes;
    }
}