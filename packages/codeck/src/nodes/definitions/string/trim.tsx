import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_STRING_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = defaultNodeWidth;
const height = buildNodeHeight(2);

export const TrimNodeDefinition: CodeckNodeDefinition = {
    name: 'trim',
    label: 'String.Trim',
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
    ],
    outputs: [
        standard.execPinOutput(width),
        standard
            .pin({
                name: 'trimed',
                width,
                position: 1,
            })
            .port.output.base(),
    ],
    code: ({ buildPinVarName, getConnectionInput, getConnectionExecOutput }) => {
        const string = getConnectionInput('string') ?? '""';
        const trimed = buildPinVarName('trimed');
        return `let ${trimed} = ${string}.trim();\n`;
    },
};
