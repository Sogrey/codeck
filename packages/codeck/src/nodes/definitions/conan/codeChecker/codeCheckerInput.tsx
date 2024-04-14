import React from 'react';
import { CodeckNodeDefinition } from '../../../../store/node';
import { BaseNode } from '../../../BaseNode';
import { CONAN_CODE_CATEGORY } from '../../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../../utils/size-helper';
import { standard } from '../../../..';

const width = 270;
const height = buildNodeHeight(2);

export const CodeCheckerInputNodeDefinition: CodeckNodeDefinition = {
  name: 'codeCheckerInput',
  label: 'Conan.CodeChecker.Input',
  type: 'call',
  component: BaseNode,
  width,
  height,
  category: CONAN_CODE_CATEGORY,
  inputs: [],
  outputs: [{
    ...standard
      .pin({
        name: 'filePath',
        width,
        position: 1,
      })
      .port.output.base(),
    code: ({ node, getConnectionInput }) => {
      return "tmpPath";
    },
  },
  {
    ...standard
      .pin({
        name: 'codeContent',
        width,
        position: 2,
      })
      .port.output.base(),
    code: () => {
      return "content";
    },
  }
  ]
};
