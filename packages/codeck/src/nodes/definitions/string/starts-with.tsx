import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_STRING_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = 200;
const height = buildNodeHeight(3);

export const StartsWithNodeDefinition: CodeckNodeDefinition =
{
    name: 'starts-with',
    label: 'String.StartsWith',
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
            .port.input.base(),
        standard
            .pin({
                name: 'target',
                width,
                position: 2,
            })
            .port.input.text(),
    ],
    outputs: [{
        ...standard
            .pin({
                name: 'match',
                width,
                position: 1,
            })
            .port.output.base(),
        code: ({ node, getConnectionInput }) => {
            const string = getConnectionInput('string') ?? '""';
            const target = getConnectionInput('target') ?? node.data?.target ?? '""';
            return `${string}.startsWith(${target})`;
        },
    }
    ],
};
