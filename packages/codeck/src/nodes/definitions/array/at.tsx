import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_ARRAY_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = defaultNodeWidth;
const height = buildNodeHeight(3);

export const AtNodeDefinition: CodeckNodeDefinition = {
    name: 'at',
    label: 'Array.At',
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
                name: 'index',
                width,
                position: 2,
            })
            .port.input.number(),
    ],
    outputs: [
        standard.execPinOutput(width),
        standard
            .pin({
                name: 'value',
                width,
                position: 1,
            })
            .port.output.base()
    ],
    code: ({ node, getConnectionInput, buildPinVarName }) => {
        const array = getConnectionInput('array') ?? node.data?.array ?? [];
        const index = getConnectionInput('index') ?? node.data?.index ?? 0;
        const value = buildPinVarName('value');
        return `let ${value} = ${array}[${index}];\n`;
    }
};
