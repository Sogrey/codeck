import CodeckParser from "./CodeckParser";
import CodeckParserUtil from "./CodeckParserUtil";
import { CodeVariable, Connection, ConnectionType } from "./CodeckElement";

interface IConfigNode {
    /**Name of logic input key, witch linked by controlConnection. */
    inputKey: string;

    /**Name of logic output key, witch linked by controlConnection. */
    outputKey: string;

    /**代码组 */
    codes: string[];

    /**向输出端开放的属性组 */
    properties: { [key: string]: any }[];

    /**解析节点输出的代码组 */
    parseCode(param?: any): string[];

    /**添加格式化代码 */
    addCode(code: string): void;

    /**获取节点属性 */
    getProperty(key: string): any;

    /**设置节点属性 */
    setProperty(key: string, value: any): void;

    /**
     * 获取输入属性
     * @param inputKey 连接输入的字段名
     */
    getInputProperty(inputKey: string): any;

    /**
     * 获取输出节点连接的代码组
     * @param outputKey 连接输出的字段名
     * @param param 参数
     */
    getOutputCodes(outputKey: string, param: any): string[];

    /**
     * 获取相连的输入节点数据
     * @param connectionType 连接类型
     * @param linkedKey 连接到自身的字段名
     */
    findInputNodeData(connectionType: ConnectionType, linkedKey: string): any;

    /**
     * 获取相连的输出节点数据
     * @param connectionType 连接类型
     * @param linkedKey 连接到自身的字段名
     */
    findOutputNodeData(connectionType: ConnectionType, linkedKey: string): any;

    /**
     * 获取相连的输入连接
     * @param connectionType 连接类型
     * @param linkedKey 连接到自身的字段名
     */
    findInputConnection(connectionType: ConnectionType, linkedKey: string): any;

    /**
     * 获取相连的输出连接
     * @param connectionType 连接类型
     * @param linkedKey 连接到自身的字段名
     */
    findOutputConnection(connectionType: ConnectionType, linkedKey: string): any;
}

/**流节点基类 */
export abstract class BaseConfigNode implements IConfigNode {
    inputKey: string = "$pin_exec_in";
    outputKey: string = "$pin_exec_out";
    properties: { [key: string]: any }[] = [];

    codes: string[] = [];

    /**全局变量 */
    variables: CodeVariable[];
    /**全局Flow数据 */
    flowData: any;
    /**流节点数据 */
    nodeData: any;
    /**参数 */
    param: any;

    constructor(variables: CodeVariable[], flowData: any, nodeData: any, param?: any) {
        this.variables = variables;
        this.flowData = flowData;
        this.nodeData = nodeData;
        this.param = param;
    }

    /**节点创建时初始化 */
    abstract onCreate(): void;

    parseCode(param?: any): string[] {
        return this.codes;
    }

    addCode(code: string): void {
        code = code.replace(/[\r\n\t]/g, '').replace(/\s+/g, ' ').trim();
        this.codes.push(code);
    }

    getProperty(key: string): any {
        return this.properties[key] || `_${this.nodeData.id}_${key}`;
    }

    setProperty(key: string, value: any): void {
        this.properties[key] = value;
    }

    getInputProperty(inputKey: string): any {
        let nodeData = this.findInputNodeData('ValueConnection', inputKey);
        if (nodeData) {
            let _class = CodeckParser.getNodeByData(nodeData, this);
            if (_class) {
                let connetion = this.findInputConnection('ValueConnection', inputKey);
                return _class.getProperty(connetion.fromNodePinName);
            }
        }
        return null;
    }

    getOutputCodes(outputKey: string, param: any): string[] {
        let outputNode = this.findOutputNodeData('ControlConnection', outputKey);
        if (outputNode) {
            let _class = CodeckParser.getNodeByData(outputNode, this);
            if (_class) {
                return CodeckParser.parseNodeUnitConfig(outputNode, { variables: _class.variables, flowData: _class.flowData, param: _class.param }, []);
            }
        }
        return []
    }

    findInputNodeData(connectionType: ConnectionType, linkedKey: string): any {
        let connection = this.findInputConnection(connectionType, linkedKey);
        if (!connection) {
            return null;
        }
        let srcNode = CodeckParserUtil.getNodeDataByConnectionSourceUnitId(this.flowData.nodes, connection);
        return srcNode;
    }

    findOutputNodeData(connectionType: ConnectionType, linkedKey: string): any {
        let connection = this.findOutputConnection(connectionType, linkedKey);
        if (!connection) {
            return null;
        }
        let distNode = CodeckParserUtil.getNodeDataByConnectionDestUnitId(this.flowData.nodes, connection);
        return distNode;
    }

    findInputConnection(connectionType: ConnectionType, linkedKey: string): Connection {
        let connection = CodeckParserUtil.getFirstConnectionDataByDistUnitId(this.flowData.connections[connectionType], this.nodeData.id, linkedKey);
        return connection;
    }

    findOutputConnection(connectionType: ConnectionType, linkedKey: string): Connection {
        let connection = CodeckParserUtil.getFirstConnectionDataBySourceUnitId(this.flowData.connections[connectionType], this.nodeData.id, linkedKey);
        return connection;
    }

    fixEscapedChars(value: string): string {
        const innerQuotesRegex = /(["'`])((?:(?!\1)[^\\]|(?:\\.))*)\1/g;
        return value.replace(innerQuotesRegex, (_match, quote, innerValue) => {
            // 去除内部的转义符
            innerValue = innerValue.replace(/\\\\/g, '\\').replace(/\\(.)/g, '$1');
            return innerValue;
        });
    }
}
