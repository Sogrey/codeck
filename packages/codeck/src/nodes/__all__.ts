import { AlertNodeDefinition } from './definitions/core/alert';
import { BeginNodeDefinition } from './definitions/core/begin';
import { FetchNodeDefinition } from './definitions/core/fetch';
import { ForEachNodeDefinition } from './definitions/core/foreach';
import { IfNodeDefinition } from './definitions/core/if';
import { IncludesNodeDefinition } from './definitions/core/includes';
import { JSONStringifyNodeDefinition } from './definitions/core/json-stringify';
import { LengthNodeDefinition } from './definitions/core/length';
import { LogNodeDefinition } from './definitions/core/log';
import { LogErrorNodeDefinition } from './definitions/core/log-error';
import { LoopNodeDefinition } from './definitions/core/loop';
import { RawJSNodeDefinition } from './definitions/core/raw-js';
import { SleepNodeDefinition } from './definitions/core/sleep';
import { TimerNodeDefinition } from './definitions/core/timer';
// import { LodashGetNodeDefinition } from './definitions/lodash/get';
import { AddNodeDefinition } from './definitions/logic/add';
import { AnlNodeDefinition } from './definitions/logic/anl';
import { DividedNodeDefinition } from './definitions/logic/divided';
import { EqualNodeDefinition } from './definitions/logic/equal';
import { GTNodeDefinition } from './definitions/logic/gt';
import { GTENodeDefinition } from './definitions/logic/gte';
import { LTNodeDefinition } from './definitions/logic/lt';
import { LTENodeDefinition } from './definitions/logic/lte';
import { ModNodeDefinition } from './definitions/logic/mod';
import { MultiplyNodeDefinition } from './definitions/logic/multiply';
import { NotNodeDefinition } from './definitions/logic/not';
import { OrlNodeDefinition } from './definitions/logic/orl';
import { SubtractNodeDefinition } from './definitions/logic/subtract';
import { VarGetNodeDefinition } from './definitions/varget';
import { VarSetNodeDefinition } from './definitions/varset';

// Math
import { MathMaxNodeDefinition } from './definitions/math/max';
import { MathMinNodeDefinition } from './definitions/math/min';

// String
import { ConstantNodeDefinition } from './definitions/string/constant';
import { TrimNodeDefinition } from './definitions/string/trim';
import { StartsWithNodeDefinition } from './definitions/string/starts-with';
import { SplitNodeDefinition } from './definitions/string/split';
import { StringEqualNodeDefinition } from './definitions/string/equal';

// Array
import { IndexOfNodeDefinition } from './definitions/array/indexof';
import { AtNodeDefinition } from './definitions/array/at';
import { ArrayPushNodeDefinition } from './definitions/array/push';
import { ArrayPopNodeDefinition } from './definitions/array/pop';

// Conan-CodeChecker
import { CodeCheckerInputNodeDefinition } from './definitions/conan/codeChecker/codeCheckerInput';
import { CodeCheckerAddWarningNodeDefinition } from './definitions/conan/codeChecker/codeCheckerAddWarning';

// definition
export const builtinNodeDefinition = {
  // Core
  BeginNodeDefinition,
  FetchNodeDefinition,
  ForEachNodeDefinition,
  IfNodeDefinition,
  IncludesNodeDefinition,
  LengthNodeDefinition,
  JSONStringifyNodeDefinition,
  LogErrorNodeDefinition,
  LogNodeDefinition,
  VarGetNodeDefinition,
  VarSetNodeDefinition,
  AlertNodeDefinition,
  LoopNodeDefinition,
  RawJSNodeDefinition,
  SleepNodeDefinition,
  TimerNodeDefinition,

  // Logic
  AddNodeDefinition,
  SubtractNodeDefinition,
  MultiplyNodeDefinition,
  DividedNodeDefinition,
  EqualNodeDefinition,
  GTNodeDefinition,
  GTENodeDefinition,
  LTNodeDefinition,
  LTENodeDefinition,
  ModNodeDefinition,
  AnlNodeDefinition,
  OrlNodeDefinition,
  NotNodeDefinition,

  // Math
  MathMaxNodeDefinition,
  MathMinNodeDefinition,

  // String
  ConstantNodeDefinition,
  TrimNodeDefinition,
  StartsWithNodeDefinition,
  SplitNodeDefinition,
  StringEqualNodeDefinition,

  // Array
  ArrayPushNodeDefinition,
  ArrayPopNodeDefinition,
  IndexOfNodeDefinition,
  AtNodeDefinition,

  // Conan-CodeChecker
  CodeCheckerInputNodeDefinition,
  CodeCheckerAddWarningNodeDefinition,

  // Lodash
  // LodashGetNodeDefinition,
};

// node
export { BaseNode } from './BaseNode';
export { BaseNodeWrapper } from './BaseNodeWrapper';
export { VariableNode } from './VariableNode';

// input
export { NodeInputBase } from './components/input/Base';
export { NodeInputBoolean } from './components/input/Boolean';
export { NodeInputNumber } from './components/input/Number';
export { NodeInputText } from './components/input/Text';
export { NodeInputSelect } from './components/input/Select';

// preset
export { BooleanInputPreset } from './components/preset/BooleanInputPreset';
export { NumberInputPreset } from './components/preset/NumberInputPreset';
export { TextInputPreset } from './components/preset/TextInputPreset';
export { SelectInputPreset } from './components/preset/SelectInputPreset';
