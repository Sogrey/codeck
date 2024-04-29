import { BaseConfigNode } from "../../../parsers/UnityVisualScripting/IUVSConfig";

export default class ForEachLoopNode extends BaseConfigNode {
    inputKey: string = "enter";
    outputKey: string = "exit";

    onCreate(): void {
        this.setProperty("index", "index");
        this.setProperty("currentItem", "item");
    }

    public parseCode(param: any): string[] {
        let collectionCode: string = this.getInputProperty("collection");
        let bodyCodes: string[] = this.getOutputCodes("body", param);

        let strIndex = this.getPropery("index");
        let strItem = this.getPropery("currentItem");

        this.addCode(`
            for (let ${strIndex} = 0; ${strIndex} < ${collectionCode}.length; ${strIndex}++) 
            {
                let ${strItem} = ${collectionCode}[${strIndex}];
                ${bodyCodes.join('\n')}
            }`
        );

        return this.codes;
    }
}