import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_STRING_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = 200;
const height = buildNodeHeight(2);

export const ConstantNodeDefinition: CodeckNodeDefinition =
{
    name: 'stringConstant',
    label: 'String.Constant',
    type: 'call',
    component: BaseNode,
    width,
    height,
    category: DEFAULT_STRING_CATEGORY,
    inputs: [
        standard
            .pin({
                name: 'string',
                width,
                position: 1,
            })
            .port.input.text(),
    ],
    outputs: [{
        ...standard
            .pin({
                name: 'value',
                width,
                position: 1,
            })
            .port.output.base(),
        code: ({ node, getConnectionInput }) => {
            const value = getConnectionInput('string') ?? node.data?.string ?? '""';
            return `${value}`;
        },
    }
    ],
};
