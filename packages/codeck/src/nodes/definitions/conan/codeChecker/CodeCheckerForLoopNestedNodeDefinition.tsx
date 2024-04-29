import React from 'react';
import { CodeckNodeDefinition } from '../../../../store/node';
import { BaseNode } from '../../../BaseNode';
import { CONAN_CODE_CATEGORY } from '../../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../../..';

const width = 300;
const height = buildNodeHeight(5);

export const CodeCheckerForLoopNestedNodeDefinition: CodeckNodeDefinition = {
    name: 'codeCheckerLoop',
    label: 'Conan.Checker.ForLoopNested',
    type: 'return',
    component: BaseNode,
    width,
    height,
    category: CONAN_CODE_CATEGORY,
    inputs: [
        standard.execPinInput(width),
        standard
            .pin({
                name: 'content',
                label: 'Content',
                width,
                position: 1,
            })
            .port.input.base(),
        standard
            .pin({
                name: 'nestedNum',
                label: 'Nested Num',
                width,
                position: 2,
            })
            .port.input.number(),
    ],
    outputs: [
        standard.execPinOutput(width),
        standard
            .pin({
                name: 'matched',
                label: 'Matched',
                width,
                position: 1,
            })
            .exec.output(),
        standard
            .pin({
                name: 'rowNum',
                label: 'Row',
                width,
                position: 2,
            })
            .port.output.base(),
        standard
            .pin({
                name: 'rowEndNum',
                label: 'Row End',
                width,
                position: 3,
            })
            .port.output.base(),
        standard
            .pin({
                name: 'colNum',
                label: 'Column',
                width,
                position: 4,
            })
            .port.output.base(),
        standard
            .pin({
                name: 'colEndNum',
                label: 'Column End',
                width,
                position: 5,
            })
            .port.output.base(),
    ],
    code: ({ node, buildPinVarName, getConnectionInput, getConnectionExecOutput }) => {
        const content = getConnectionInput('content') ?? node.data?.content ?? '""';
        const nestedNum = getConnectionInput('nestedNum') ?? node.data?.nestedNum ?? 0;
        const matched = formatFunctionIndent(getConnectionExecOutput('matched'), 20);
        const rowNum = buildPinVarName('rowNum');
        const rowEndNum = buildPinVarName('rowEndNum');
        const colNum = buildPinVarName('colNum');
        const colEndNum = buildPinVarName('colEndNum');

        const lines = buildPinVarName('lines');
        const line = buildPinVarName('line');
        const lineTemp = buildPinVarName('lineTemp');
        const trimmedLine = buildPinVarName('trimmedLine');
        const stack = buildPinVarName('stack');
        const iLineNumber = buildPinVarName('iLineNumber');
        const iMaxLayer = buildPinVarName('iMaxLayer');
        const iMaxLayerTemp = buildPinVarName('iMaxLayerTemp');
        const iBeginCount = buildPinVarName('iBeginCount');
        const iEndCount = buildPinVarName('iEndCount');
        const bStartCheck = buildPinVarName('bStartCheck');

        return `let lines = ${content}.split('\\n');
let ${stack} = [];
let ${iLineNumber} = 0;

let ${iMaxLayer} = 0;
let ${iMaxLayerTemp} = 0;

let ${iBeginCount} = 0;
let ${iEndCount} = 0;
let ${bStartCheck} = false;
for (const ${line} of ${lines}) {
    const ${lineTemp} = ${line}.split('--')[0];
    const ${trimmedLine} = ${lineTemp}.trim();
    if (${trimmedLine}.startsWith('for ') && ${trimmedLine}.includes(' do')) {
        ${iBeginCount}++;
        ${bStartCheck} = true
        ${stack}.push({ type: 'for', start: ${iLineNumber} });
        ${iMaxLayerTemp}++;
    } else if (${bStartCheck} && ${trimmedLine}.startsWith('function ')) {
        ${stack}.push({ type: 'function', start: ${iLineNumber} });
    } else if (${bStartCheck} && ${trimmedLine}.startsWith('if ')) {
        ${stack}.push({ type: 'if', start: ${iLineNumber} });
    } else if (${bStartCheck} && ${trimmedLine}.startsWith('while ')) {
        ${stack}.push({ type: 'while', start: ${iLineNumber} });
    } else if (${bStartCheck} && ${trimmedLine} === 'end') {
        let last = ${stack}.pop();
        if (last && last.type === 'for') {
            ${iEndCount}++;
            last.end = ${iLineNumber};
            ${iMaxLayer} = Math.max(${iMaxLayerTemp}, ${iMaxLayer});
            ${iMaxLayerTemp}--;
            if (${stack}.length <= 0) {
                if (${iMaxLayer} >= ${nestedNum} && ${iBeginCount} == ${iEndCount}) {
                    let ${rowNum} = last.start;
                    let ${rowEndNum} = last.end;
                    let ${colNum} = 0;
                    let ${colEndNum} = lines[last.end].length - 1;
                    ${matched}
                }
                ${iBeginCount} = 0;
                ${iEndCount} = 0;
                ${iMaxLayer} = 0;
                ${iMaxLayerTemp} = 0;
                ${bStartCheck} = false;
            }
        }
    }
    ${iLineNumber}++;
}`;
    },
};
