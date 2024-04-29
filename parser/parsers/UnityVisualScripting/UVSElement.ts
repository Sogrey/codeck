/**变量 */
export type CodeVariable = { name: string, type: string, value: any };

/**连接类型 */
export type ConnectionType = 'ControlConnection' | 'ValueConnection';

/**连接器 */
export type Connection = {
    sourceUnit: { $ref: string },
    sourceKey: string,
    destinationUnit: { $ref: string },
    destinationKey: string,
    guid: string,
    $type: string
}

/**节点数据 */
export type ElementData = {
    nodes: any[],
    connections: { [type in ConnectionType]: Connection[] }
};
