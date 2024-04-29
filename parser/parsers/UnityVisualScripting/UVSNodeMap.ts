import { CodeVariable } from "./UVSElement";
import { BaseConfigNode } from "./IUVSConfig";
import StartNode from "../../nodes/UVS/event/Start";
import GetVariableNode from "../../nodes/UVS/variable/GetVariable";
import SetVariable from "../../nodes/UVS/variable/SetVariable";
import InvokeMemberNode from "../../nodes/UVS/system/InvokeMember";
import LogNode from "../../nodes/UVS/logic/Log";
import ForEachLoopNode from "../../nodes/UVS/control/ForEachLoop";
import BetterIfNode from "../../nodes/UVS/logic/BetterIf";
import AndNode from "../../nodes/UVS/logic/And";
import GreaterNode from "../../nodes/UVS/logic/Greater";

/**
 * 节点类接口
 */
export interface INodeClass {
    new(variables?: CodeVariable[], globalData?: any, nodeData?: any, param?: any): BaseConfigNode;
}

export const UVSNodeMap: { [key: string]: INodeClass } = {
    //event
    "Unity.VisualScripting.Start": StartNode,

    // system
    "Unity.VisualScripting.InvokeMember": InvokeMemberNode,

    // variable
    "Unity.VisualScripting.GetVariable": GetVariableNode,
    "Unity.VisualScripting.SetVariable": SetVariable,

    // logic
    "Unity.VisualScripting.Community.LogNode": LogNode,
    "Unity.VisualScripting.Community.BetterIf": BetterIfNode,
    "Unity.VisualScripting.And": AndNode,
    "Unity.VisualScripting.Greater": GreaterNode,

    // control
    "Unity.VisualScripting.ForEach": ForEachLoopNode,

};