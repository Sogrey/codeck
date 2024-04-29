import { BaseConfigNode } from "../../../parsers/Codeck/ICodeckConfig";

export default class CodeCheckerAddErrorNode extends BaseConfigNode {
    onCreate(): void { }

    public parseCode(param: any): string[] {
        let row = this.getInputProperty("row") ?? this.nodeData.data?.row ?? 0;
        let rowEnd = this.getInputProperty("rowEnd") ?? this.nodeData.data?.rowEnd ?? 0;
        let col = this.getInputProperty("col") ?? this.nodeData.data?.col ?? 0;
        let colEnd = this.getInputProperty("colEnd") ?? this.nodeData.data?.colEnd ?? 0;
        let str_en = this.getInputProperty("str_en") ?? this.nodeData.data?.str_en ?? '';
        if (str_en == '') str_en = 'null';
        let str_cn = this.getInputProperty("str_cn") ?? this.nodeData.data?.str_cn ?? '';
        if (str_cn == '') str_cn = 'null';
        let type = this.getInputProperty("type") ?? this.nodeData.data?.type ?? '';
        if (!type || type == '') type = 'null';
        let suggest = this.getInputProperty("suggest") ?? this.nodeData.data?.suggest ?? undefined;
        if (!suggest || suggest == '') suggest = 'null';

        this.addCode(`result.addError({
            row: ${row},
            rowEnd: ${rowEnd},
            col: ${col},
            colEnd: ${colEnd},
            str: Global.lang == 'cn' ? ${str_cn} : ${str_en},
            type: ${type},
            suggest: ${suggest}
        });`
        );

        return this.codes;
    }
}