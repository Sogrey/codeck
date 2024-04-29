import { BaseConfigNode } from "../../../parsers/UnityVisualScripting/IUVSConfig";

export default class IfNode extends BaseConfigNode {
    inputKey: string = "In";
    outputKey: string = null;
    properties: { [key: string]: any }[] = [];

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