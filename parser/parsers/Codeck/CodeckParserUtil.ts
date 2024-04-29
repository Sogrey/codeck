import { Connection, ElementData as ElementData } from "./CodeckElement";

export default class CodeckParserUtil {
    /**
     * 筛选元素，分离节点和连接器，连接器分为主干和分支
     * @param elements 
     * @returns 
     */
    public static analyseElements(elements: any): any {
        let elementData: ElementData = {
            nodes: [],
            connections: {
                'ControlConnection': [],
                'ValueConnection': []
            }
        };
        for (let element of elements.connections) {
            if (element.toNodePinName == "$pin_exec_in") {
                elementData.connections['ControlConnection'].push(element);
            }
            else {
                elementData.connections['ValueConnection'].push(element);
            }
        }

        for (let key in elements.nodeMap) {
            let node = elements.nodeMap[key];
            elementData.nodes.push(node);
        }
        return elementData;
    }

    /**
     * 查找指定ID的节点
     * @param nodes 节点集合
     * @param id 源节点id
     */
    public static findNodeDataByUnitID(nodes: any[], id: string): any {
        for (let node of nodes) {
            if (node.id == id) {
                return node;
            }
        }
        return null;
    }

    /**
    * 筛选出指定类型的节点
    * @param nodes 节点集合
    * @param type 类型
    * @param id 节点ID
    * @returns 
    */
    public static filterNodeDataUnitsByType(nodes: any[], type: string, id?: number): any[] {
        let result: any[] = [];
        for (let node of nodes) {
            if (node.name == type) {
                if (id) {
                    if (node.id == id) {
                        result.push(node);
                    }
                } else {
                    result.push(node);
                }
            }
        }
        return result;
    }

    /**
     * 筛选出源节点为指定ID的连接
     * @param connections 连接集合
     * @param sourceId 源节点ID
     * @param sourceKey 源节点key
     * @returns 
     */
    public static getFirstConnectionDataBySourceUnitId(connections: Connection[], sourceId: string, sourceKey?: string): Connection {
        for (let connection of connections) {
            if (connection.fromNodeId == sourceId) {
                let bMatch = true;
                if (sourceKey) bMatch = connection.fromNodePinName == sourceKey;
                if (bMatch) return connection;
            }
        }
        return null;
    }

    /**
    * 筛选出源节点为指定ID的连接
    * @param connections 连接集合
    * @param sourceId 源节点ID
    * @param sourceKey 源节点key
    * @returns 
    */
    public static filterConnectionDatasBySourceUnitId(connections: Connection[], sourceId: string, sourceKey?: string): Connection[] {
        let result: any[] = [];
        for (let connection of connections) {
            if (connection.fromNodeId == sourceId) {
                let bMatch = true;
                if (sourceKey) bMatch = connection.fromNodePinName == sourceKey;
                if (bMatch) result.push(connection);
            }
        }
        return result;
    }

    /**
     * 获取第一个目标节点为指定ID的连接
     * @param connections 连接集合
     * @param distId 目标节点ID
     * @param destinationKey 目标节点key
     * @returns 
     */
    public static getFirstConnectionDataByDistUnitId(connections: Connection[], distId: string, destinationKey?: string): Connection {
        for (let connection of connections) {
            if (connection.toNodeId == distId) {
                let bMatch = true;
                if (destinationKey) bMatch = connection.toNodePinName == destinationKey;
                if (bMatch) return connection;
            }
        }
        return null;
    }

    /**
     * 筛选出目标节点为指定ID的连接
     * @param connections 连接集合
     * @param distId 目标节点ID
     * @param destinationKey 目标节点key
     * @returns 
     */
    public static filterConnectionDatasByDistUnitId(connections: Connection[], distId: string, destinationKey?: string): Connection[] {
        let result: any[] = [];
        for (let connection of connections) {
            if (connection.toNodeId == distId) {
                let bMatch = true;
                if (destinationKey) bMatch = connection.toNodePinName == destinationKey;
                if (bMatch) result.push(connection);
            }
        }
        return result;
    }

    /**
     * 获取连接的源节点数据
     * @param nodes 节点集合
     * @param connection 连接数据
     * @returns 
     */
    public static getNodeDataByConnectionSourceUnitId(nodes: any[], connection: Connection): any {
        let sourceUnitId = connection.fromNodeId;
        return this.findNodeDataByUnitID(nodes, sourceUnitId);
    }

    /**
     * 获取连接的目标节点数据
     * @param nodes 节点集合
     * @param connection 连接数据
     * @returns 
     */
    public static getNodeDataByConnectionDestUnitId(nodes: any[], connection: Connection): any {
        let destinationUnitId = connection.toNodeId;
        return this.findNodeDataByUnitID(nodes, destinationUnitId);
    }
}