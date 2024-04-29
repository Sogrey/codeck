import React from 'react';
import { CodeckNodeDefinition } from '../../../../store/node';
import { BaseNode } from '../../../BaseNode';
import { CONAN_CODE_CATEGORY } from '../../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../../..';

const width = 350;
const height = buildNodeHeight(6);

export const CodeCheckerMatchInterfaceNodeDefinition: CodeckNodeDefinition = {
    name: 'codeCheckerMatchInterface',
    label: 'Conan.Checker.MatchInterface',
    type: 'return',
    component: BaseNode,
    width,
    height,
    category: CONAN_CODE_CATEGORY,
    inputs: [
        standard.execPinInput(width),
        standard
            .pin({
                name: 'filePath',
                width,
                position: 1,
            })
            .port.input.base(),
        standard
            .pin({
                name: 'content',
                label: 'Content',
                width,
                position: 2,
            })
            .port.input.base(),
        standard
            .pin({
                name: 'interfaces',
                label: 'Interface Array (;)',
                width,
                position: 3,
            })
            .port.input.base()
    ],
    outputs: [
        { ...standard.execPinOutput(width) },
        {
            ...standard
                .pin({
                    name: 'matched',
                    label: 'Matched',
                    width,
                    position: 1,
                })
                .exec.output()
        },
        {
            ...standard
                .pin({
                    name: 'rowNum',
                    label: 'Row',
                    width,
                    position: 2,
                })
                .port.output.base()
        },
        {
            ...standard
                .pin({
                    name: 'rowEndNum',
                    label: 'Row End',
                    width,
                    position: 3,
                })
                .port.output.base()
        },
        {
            ...standard
                .pin({
                    name: 'colNum',
                    label: 'Column',
                    width,
                    position: 4,
                })
                .port.output.base()
        },
        {
            ...standard
                .pin({
                    name: 'colEndNum',
                    label: 'Column End',
                    width,
                    position: 5,
                })
                .port.output.base()
        },
        {
            ...standard
                .pin({
                    name: 'index',
                    label: 'Index',
                    width,
                    position: 6,
                })
                .port.output.base()
        },
    ],
    code: ({ node, getConnectionInput, getConnectionExecOutput, buildPinVarName }) => {
        const content = getConnectionInput('content') ?? node.data?.content ?? '""';
        const filePath = getConnectionInput('filePath') ?? '""';
        const interfaces = getConnectionInput('interfaces') ?? [];

        const matched = formatFunctionIndent(getConnectionExecOutput('matched'), 16);
        const rowNum = buildPinVarName('rowNum');
        const rowEndNum = buildPinVarName('rowEndNum');
        const colNum = buildPinVarName('colNum');
        const colEndNum = buildPinVarName('colEndNum');

        const chunk = buildPinVarName('chunk');
        const wrapper = buildPinVarName('wrapper');
        const checkFunc = buildPinVarName('check');

        const index = buildPinVarName('index');

        return `let ${chunk} = FileCache.parse(${filePath});
let ${wrapper} = new ChunkWrapper(${chunk});

let ${checkFunc} = function (codes, loc) {
    let lineAdd = 0;
    for (let line of codes) {
        for (let ${index} in constKeys) {
            let constKey = ${interfaces}[${index}];
            if (line.includes(constKey)) {
                let ${rowNum} = loc.start.line + lineAdd;
                let ${rowEndNum} = loc.start.line + lineAdd;
                let ${colNum} = line.indexOf(constKey);
                let ${colEndNum} = line.indexOf(constKey) + constKey.length;
                ${matched}
            }
        }
        lineAdd++;
    }
};

let funcs = ${wrapper}.findAll(${chunk}, 'FunctionDeclaration');
for (let func of funcs) {
    let bodyStart = func.loc.start;
    let bodyEnd = func.loc.end;
    let bodyStartLine = bodyStart.line;
    let bodyEndLine = bodyEnd.line;
    let bodyContent = ${content}.split('\\n').slice(bodyStartLine, bodyEndLine - 1);
    ${checkFunc}(bodyContent, func.loc);
}`
    },
};
