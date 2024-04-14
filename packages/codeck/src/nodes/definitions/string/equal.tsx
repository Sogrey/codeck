import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_STRING_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = 200;
const height = buildNodeHeight(4);

export const StringEqualNodeDefinition: CodeckNodeDefinition =
{
    name: 'stringEqual',
    label: 'String.Equal',
    type: 'call',
    component: BaseNode,
    width,
    height,
    category: DEFAULT_STRING_CATEGORY,
    inputs: [
        standard
            .pin({
                name: 'input1',
                width,
                position: 1,
            })
            .port.input.text(),
        standard
            .pin({
                name: 'input2',
                width,
                position: 3,
            })
            .port.input.text(),
    ],
    outputs: [{
        ...standard
            .pin({
                name: 'value',
                label: '',
                width,
                position: 2,
            })
            .port.output.base(),
        code: ({ node, getConnectionInput }) => {
            const input1 = getConnectionInput('input1') ?? node.data?.input1 ?? '""';
            const input2 = getConnectionInput('input2') ?? node.data?.input2 ?? '""';
            return `${input1} === ${input2}`;
        },
    }
    ],
};
