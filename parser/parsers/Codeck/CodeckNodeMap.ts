import { BaseConfigNode } from "./ICodeckConfig";
import { CodeVariable } from "./CodeckElement";

import BeginNode from "../../nodes/Codeck/event/Begin";
import ForEachLoopNode from "../../nodes/Codeck/control/ForEachLoop";
import GetVariableNode from "../../nodes/Codeck/variable/GetVariable";
import SetVariableNode from "../../nodes/Codeck/variable/SetVariable";
import LogicAndNode from "../../nodes/Codeck/logic/LogicAnd";
import IfNode from "../../nodes/Codeck/logic/If";
import LengthNode from "../../nodes/Codeck/control/Length";
import IncludesNode from "../../nodes/Codeck/control/Includes";
import PushNode from "../../nodes/Codeck/array/Push";
import PopNode from "../../nodes/Codeck/array/Pop";
import AtNode from "../../nodes/Codeck/array/At";
import StartsWithNode from "../../nodes/Codeck/string/StartsWith";
import StringConstanthNode from "../../nodes/Codeck/string/Constant";
import StringEqualNode from "../../nodes/Codeck/string/StringEqual";
import SplitNode from "../../nodes/Codeck/string/Split";
import TrimNode from "../../nodes/Codeck/string/Trim";
import MathMaxhNode from "../../nodes/Codeck/math/MathMax";
import MathMinhNode from "../../nodes/Codeck/math/MathMin";
import AddNode from "../../nodes/Codeck/logic/Add";
import SubtractNode from "../../nodes/Codeck/logic/Subtract";
import EqualNode from "../../nodes/Codeck/logic/Equal";
import GreaterOrEqualNode from "../../nodes/Codeck/logic/GreaterOrEqual";
import LessOrEqualNode from "../../nodes/Codeck/logic/LessOrEqual";
import CodeCheckerInputNode from "../../nodes/Codeck/conan/CodeCheckerInput";
import CodeCheckerAddErrorNode from "../../nodes/Codeck/conan/CodeCheckerAddError";
import CodeCheckerAddWarningNode from "../../nodes/Codeck/conan/CodeCheckerAddWarning";
import CodeCheckerForLoopNestedNode from "../../nodes/Codeck/conan/CodeCheckerForLoopNested";
import CodeCheckerMatchInterfaceNode from "../../nodes/Codeck/conan/CodeCheckerMatchInterface";

/**
 * 节点类接口
 */
export interface INodeClass {
    new(variables?: CodeVariable[], globalData?: any, nodeData?: any, param?: any): BaseConfigNode;
}

export const CodeckNodeMap: { [key: string]: INodeClass } = {
    // event
    "begin": BeginNode,

    // variable
    "varget": GetVariableNode,
    "varset": SetVariableNode,

    // control
    "foreach": ForEachLoopNode,
    "length": LengthNode,
    "includes": IncludesNode,

    // array
    "arrayPush": PushNode,
    "arrayPop": PopNode,
    "at": AtNode,

    // string
    "starts-with": StartsWithNode,
    "stringConstant": StringConstanthNode,
    "stringEqual": StringEqualNode,
    "split": SplitNode,
    "trim": TrimNode,

    // math
    "math_max": MathMaxhNode,
    "math_min": MathMinhNode,

    // logic
    "add": AddNode,
    "subtract": SubtractNode,
    "equal": EqualNode,
    "gte": GreaterOrEqualNode,
    "lte": LessOrEqualNode,
    "logic-and": LogicAndNode,
    "if": IfNode,

    // conan
    "codeCheckerInput": CodeCheckerInputNode,
    "codeCheckerAddError": CodeCheckerAddErrorNode,
    "codeCheckerAddWarning": CodeCheckerAddWarningNode,
    'codeCheckerLoop': CodeCheckerForLoopNestedNode,
    'codeCheckerMatchInterface': CodeCheckerMatchInterfaceNode
};