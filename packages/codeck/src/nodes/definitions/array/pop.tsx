import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_ARRAY_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = defaultNodeWidth;
const height = buildNodeHeight(1);

export const ArrayPopNodeDefinition: CodeckNodeDefinition = {
    name: 'arrayPop',
    label: 'Array.pop',
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
    ],
    outputs: [
        standard.execPinOutput(width),
        standard
            .pin({
                name: 'value',
                width,
                position: 1,
            })
            .port.output.base(),
    ],
    code: ({ getConnectionInput, buildPinVarName }) => {
        const array = getConnectionInput('array') ?? "[]";
        const value = buildPinVarName('value');
        return `let ${value} = ${array}.pop();\n`;
    },
};
