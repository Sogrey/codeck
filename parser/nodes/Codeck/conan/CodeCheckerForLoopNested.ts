import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class CodeCheckerForLoopNestedNode extends BaseConfigNode {
    onCreate(): void { }

    public parseCode(param: any): string[] {
        let content = this.getInputProperty("content") ?? this.nodeData.data?.content ?? '';
        let nestedNum = this.getInputProperty("nestedNum") ?? this.nodeData.data?.nestedNum ?? 0;
        let matchedCodes: string[] = this.getOutputCodes("matched", param);

        let lines = this.getProperty('lines');
        let line = this.getProperty('line');
        let lineTemp = this.getProperty('lineTemp');
        let trimmedLine = this.getProperty('trimmedLine');
        let stack = this.getProperty('stack');
        let iLineNumber = this.getProperty('iLineNumber');
        let iMaxLayer = this.getProperty('iMaxLayer');
        let iMaxLayerTemp = this.getProperty('iMaxLayerTemp');
        let iBeginCount = this.getProperty('iBeginCount');
        let iEndCount = this.getProperty('iEndCount');
        let bStartCheck = this.getProperty('bStartCheck');

        let iMarkLine = this.getProperty('iMarkLine');
        let iMarkEndLine = this.getProperty('iMarkEndLine');
        let value = this.getProperty('value');

        this.addCode(`
        let ${lines} = ${content}.split('\\n');
        let ${stack} = [];
        let ${iLineNumber} = 0;
        
        let ${iMaxLayer} = 0;
        let ${iMaxLayerTemp} = 0;
        
        let ${iBeginCount} = 0;
        let ${iEndCount} = 0;
        let ${bStartCheck} = false;

        let ${iMarkLine} = -1;
        let ${iMarkEndLine} = -1;
        for (const ${line} of ${lines}) {
            const ${lineTemp} = ${line}.split('--')[0];
            const ${trimmedLine} = ${lineTemp}.trim();
            if (${trimmedLine}.startsWith('for ') && ${trimmedLine}.includes(' do')) {
                ${iBeginCount}++;
                ${bStartCheck} = true;
                ${stack}.push('for');
                if ((${iMarkLine} == -1)) {
                    ${iMarkLine} = ${iLineNumber};
                }
                ${iMaxLayerTemp}++;
            } else if (${bStartCheck} && ${trimmedLine}.startsWith('function ')) {
                ${stack}.push({ type: 'function'});
            } else if (${bStartCheck} && ${trimmedLine}.startsWith('if ')) {
                ${stack}.push({ type: 'if'});
            } else if (${bStartCheck} && ${trimmedLine}.startsWith('while ')) {
                ${stack}.push({ type: 'while'});
            } else if (${bStartCheck} && ${trimmedLine} === 'end') {
                let ${value} = ${stack}.pop();
                if (${value} === 'for') {
                    ${iEndCount}++;
                    ${iMarkEndLine} = ${iLineNumber};
                    ${iMaxLayer} = Math.max(${iMaxLayerTemp}, ${iMaxLayer});
                    ${iMaxLayerTemp}--;
                    if (${stack}.length <= 0) {
                        if (${iMaxLayer} >= ${nestedNum} && ${iBeginCount} == ${iEndCount}) {
                            let ${this.getProperty('rowNum')} = ${iMarkLine};
                            let ${this.getProperty('rowEndNum')} = ${iMarkEndLine};
                            let ${this.getProperty('colNum')} = 0;
                            let ${this.getProperty('colEndNum')} = ${lines}[${iMarkEndLine}].length - 1;
                            ${matchedCodes.join('\n')}
                        }
                        ${iBeginCount} = 0;
                        ${iEndCount} = 0;
                        ${iMaxLayer} = 0;
                        ${iMaxLayerTemp} = 0;
                        ${bStartCheck} = false;
                        ${iMarkLine} = -1;
                    }
                }
            }
            ${iLineNumber}++;
        }`
        );

        return this.codes;
    }
}