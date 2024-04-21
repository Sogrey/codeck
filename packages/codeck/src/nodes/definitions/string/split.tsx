import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_STRING_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = 200;
const height = buildNodeHeight(4);

export const SplitNodeDefinition: CodeckNodeDefinition = {
    name: 'split',
    label: 'String.Split',
    type: 'function',
    component: BaseNode,
    width,
    height,
    category: DEFAULT_STRING_CATEGORY,
    inputs: [
        standard.execPinInput(width),
        standard
            .pin({
                name: 'string',
                width,
                position: 1,
            })
            .port.input.text(),
        standard
            .pin({
                name: 'separator',
                width,
                position: 3,
            })
            .port.input.text(),
    ],
    outputs: [
        standard.execPinOutput(width),
        standard
            .pin({
                name: 'array',
                width,
                position: 1,
            })
            .port.output.base(),
    ],
    code: ({ node, buildPinVarName, getConnectionInput }) => {
        const string = getConnectionInput('string') ?? node.data?.string ?? '""';
        const separator = getConnectionInput('separator') ?? node.data?.separator ?? '""';
        const splitArray = buildPinVarName('array');
        return `let ${splitArray} = ${string}.split(${separator});\n`;
    },
};
