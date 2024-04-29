/**变量 */
export type CodeVariable = { name: string, type: string, defaultValue: any };

/**连接类型 */
export type ConnectionType = 'ControlConnection' | 'ValueConnection';

/**连接器 */
export type Connection = {
    id: string
    fromNodePinName: string,
    fromNodeId: string,
    toNodePinName: string,
    toNodeId: string,
}

/**节点数据 */
export type ElementData = {
    nodes: any[],
    connections: { [type in ConnectionType]: Connection[] }
};
