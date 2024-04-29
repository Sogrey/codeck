import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class IfNode extends BaseConfigNode {
    onCreate(): void { }

    public parseCode(param: any): string[] {
        let conditionsParam: string = this.getInputProperty("condition");
        let trueCodes: string[] = this.getOutputCodes("true", param);
        let falseCodes: string[] = this.getOutputCodes("false", param);

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