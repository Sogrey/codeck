import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_STRING_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = defaultNodeWidth;
const height = buildNodeHeight(4);

export const MathMaxNodeDefinition: CodeckNodeDefinition =
{
    name: 'mathMax',
    label: 'Math.max',
    type: 'call',
    component: BaseNode,
    width,
    height,
    category: DEFAULT_STRING_CATEGORY,
    inputs: [
        standard.execPinInput(width),
        standard
            .pin({
                name: 'a',
                width,
                position: 1,
            })
            .port.input.number(),
        standard
            .pin({
                name: 'b',
                width,
                position: 3,
            })
            .port.input.number(),
    ],
    outputs: [
        standard.execPinOutput(width),
        standard
            .pin({
                name: 'value',
                label: '',
                width,
                position: 2,
            })
            .port.output.base(),
    ],
    code: ({ node, getConnectionInput, buildPinVarName }) => {
        const a = getConnectionInput('a') ?? node.data?.a ?? 0;
        const b = getConnectionInput('b') ?? node.data?.b ?? 0;
        const value = buildPinVarName('value');
        return `let ${value} = Math.max(${a}, ${b});\n`;
    },
};
