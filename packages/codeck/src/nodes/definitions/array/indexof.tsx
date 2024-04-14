import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_ARRAY_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = defaultNodeWidth;
const height = buildNodeHeight(3);

export const IndexOfNodeDefinition: CodeckNodeDefinition = {
    name: 'indexOf',
    label: 'Array.IndexOf',
    type: 'function',
    component: BaseNode,
    width,
    height,
    category: DEFAULT_ARRAY_CATEGORY,
    inputs: [
        standard.execPinInput(width),
        standard
            .pin({
                name: 'array',
                width,
                position: 1,
            })
            .port.input.base(),
        standard
            .pin({
                name: 'value',
                width,
                position: 2,
            })
            .port.input.number(),
    ],
    outputs: [
        standard.execPinOutput(width),
        standard
            .pin({
                name: 'index',
                width,
                position: 1,
            })
            .port.output.base(),
    ],
    code: ({ node, buildPinVarName, getConnectionInput }) => {
        const array = getConnectionInput('array') ?? [];
        const value = getConnectionInput('value') ?? node.data?.value ?? 0;
        const index = buildPinVarName('index');
        return `let ${index} = ${array}.indexOf(${value});\n`;
    },
};
