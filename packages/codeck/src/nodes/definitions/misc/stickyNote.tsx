import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_MISC_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = defaultNodeWidth * 2;
const height = buildNodeHeight(4);

export const StickyNoteNodeDefinition: CodeckNodeDefinition = {
    name: 'stickyNote',
    label: 'StickyNote',
    type: 'call',
    component: BaseNode,
    width,
    height,
    category: DEFAULT_MISC_CATEGORY,
    inputs: [
        standard
            .pin({
                name: 'note',
                label: '',
                width,
                position: 1,

            })
            .port.input.textarea({ row: 3, width: width - 40 }),
    ],
    outputs: [],
};
