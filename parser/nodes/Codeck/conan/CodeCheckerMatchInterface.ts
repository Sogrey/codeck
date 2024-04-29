import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class CodeCheckerDisableInterfaceNode extends BaseConfigNode {
    onCreate(): void { }

    public parseCode(param: any): string[] {
        let content = this.getInputProperty("content") ?? this.nodeData.data?.content ?? '';
        let filePath = this.getInputProperty("filePath") ?? this.nodeData.data?.filePath ?? '';
        let interfaces = this.getInputProperty("interfaces") ?? this.nodeData.data?.interfaces ?? '';
        let matchedCodes: string[] = this.getOutputCodes("matched", param);

        let funcs = this.getProperty('funcs');
        let chunk = this.getProperty('chunk');
        let wrapper = this.getProperty('wrapper');
        let checkFunc = this.getProperty('checkFunc');
        let index = this.getProperty('index');
        let rowNum = this.getProperty('rowNum');
        let rowEndNum = this.getProperty('rowEndNum');
        let colNum = this.getProperty('colNum');
        let colEndNum = this.getProperty('colEndNum');

        this.addCode(`
        let ${chunk} = FileCache.parse(${filePath});
        let ${wrapper} = new ChunkWrapper(${chunk});
        let ${checkFunc} = function (codes, loc) {
            let lineAdd = 0;
            for (let line of codes) {
                for (let ${index} in constKeys) {
                    let constKey = ${interfaces}[${index}];
                    let code = line.split('--')[0].trim();
                    if (line.includes(constKey)) {
                        let ${rowNum} = loc.start.line + lineAdd;
                        let ${rowEndNum} = loc.start.line + lineAdd;
                        let ${colNum} = line.indexOf(constKey);
                        let ${colEndNum} = line.indexOf(constKey) + constKey.length;
                        ${matchedCodes.join('\n')}
                    }
                }
                lineAdd++;
            }
        };
        let ${funcs} = ${wrapper}.findAll(${chunk}, 'FunctionDeclaration');
        for (let func of ${funcs}) {
            let bodyStart = func.loc.start;
            let bodyEnd = func.loc.end;
            let bodyStartLine = bodyStart.line;
            let bodyEndLine = bodyEnd.line;
            let bodyContent = content.split('\\n').slice(bodyStartLine, bodyEndLine - 1);
            ${checkFunc}(bodyContent, func.loc);
        }`
        );
        return this.codes;
    }
}