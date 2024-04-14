import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_ARRAY_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = defaultNodeWidth;
const height = buildNodeHeight(3);

export const ArrayPushNodeDefinition: CodeckNodeDefinition = {
    name: 'arrayPush',
    label: 'Array.push',
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
            .port.input.base(),
    ],
    outputs: [
        standard.execPinOutput(width),
    ],
    code: ({ node, getConnectionInput }) => {
        const array = getConnectionInput('array') ?? "[]";
        const value = getConnectionInput('value') ?? node.data?.value ?? 0;
        return `${array}.push(${value});\n`;
    },
};
