import React from 'react';
import { CodeckNodeDefinition } from '../../../../store/node';
import { BaseNode } from '../../../BaseNode';
import { CONAN_CODE_CATEGORY } from '../../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../../utils/size-helper';
import { standard } from '../../../..';

const width = 300;
const height = buildNodeHeight(18);

export const CodeCheckerAddWarningNodeDefinition: CodeckNodeDefinition = {
    name: 'codeCheckerAddWarning',
    label: 'Conan.Checker.AddWarning',
    type: 'return',
    component: BaseNode,
    width,
    height,
    category: CONAN_CODE_CATEGORY,
    inputs: [
        standard.execPinInput(width),
        standard
            .pin({
                name: 'row',
                label: 'Row',
                width,
                position: 1,
            })
            .port.input.number(),
        standard
            .pin({
                name: 'rowEnd',
                label: 'Row End',
                width,
                position: 3,
            })
            .port.input.number(),
        standard
            .pin({
                name: 'col',
                label: 'Column',
                width,
                position: 5,
            })
            .port.input.number(),
        standard
            .pin({
                name: 'colEnd',
                label: 'Column End',
                width,
                position: 7,
            })
            .port.input.number(),
        standard
            .pin({
                name: 'str_en',
                label: 'tips_en',
                width,
                position: 9,
            })
            .port.input.text(),
        standard
            .pin({
                name: 'str_cn',
                label: 'tips_cn',
                width,
                position: 11,
            })
            .port.input.text(),
        standard
            .pin({
                name: 'type',
                label: 'Type',
                width,
                position: 13,
            })
            .port.input.text(),
        standard
            .pin({
                name: 'suggest',
                label: 'Suggest',
                width,
                position: 15,
            })
            .port.input.text(),
        standard
            .pin({
                name: 'alarm',
                label: 'Alarm',
                width,
                position: 17,
            })
            .port.input.boolean(),
    ],
    outputs: [
        standard.execPinOutput(width),
    ],
    code: ({ node, getConnectionInput }) => {
        const row = getConnectionInput('row') ?? node.data?.row ?? 0;
        const rowEnd = getConnectionInput('rowEnd') ?? node.data?.rowEnd ?? 0;
        const col = getConnectionInput('col') ?? node.data?.col ?? 0;
        const colEnd = getConnectionInput('colEnd') ?? node.data?.colEnd ?? 0;
        const str_en = getConnectionInput('str_en') ?? node.data?.str_en ?? '""';
        const str_cn = getConnectionInput('str_cn') ?? node.data?.str_cn ?? '""';
        const type = getConnectionInput('type') ?? node.data?.type ?? '""';
        const suggest = getConnectionInput('suggest') ?? node.data?.suggest ?? null;
        const alarm = getConnectionInput('alarm') ?? node.data?.alarm ?? false;
        return `result.addWarn({
    row: ${row},
    rowEnd: ${rowEnd},
    col: ${col},
    colEnd: ${colEnd},
    str: Global.lang == 'cn' ? ${str_cn} : ${str_en},
    type: ${type},
    suggest: ${suggest || 'null'}
    alarm: ${alarm || 'false'}
});`;
    },
};
