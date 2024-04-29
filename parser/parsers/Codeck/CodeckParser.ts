import * as fs from 'fs';
import { Singleton } from "../../../misc/Singleton";
import { CodeVariable } from "./CodeckElement";
import { BaseConfigNode as BaseFlowNode } from "./ICodeckConfig";
import CodeckParserUtil from "./CodeckParserUtil";
import { CodeckNodeMap } from './CodeckNodeMap';
import Global from '../../../global';

export default class CodeckParser {
    /**预加载配置 */
    public static loadConfigs(): any[] {
        let configs: any[] = [];
        let files = fs.readdirSync(Global.codableConfigPath);
        let configFiles = files.filter((file) => {
            return file.endsWith(".conan");
        });

        for (let file of configFiles) {
            let content: string = fs.readFileSync(Global.codableConfigPath + file, { encoding: 'utf-8' });
            let json = JSON.parse(content);
            configs.push(json);
        }
        return configs;
    }

    /**
     * 根据节点类型获取节点
     * @param nodeType 节点类型
     * @params params 参数
     * @returns 
     */
    public static getNodeByData(nodeData: any, params: any): BaseFlowNode | null {
        const nodeClass = CodeckNodeMap[nodeData.name];
        if (nodeClass) {
            let _class = new nodeClass(params.variables, params.flowData, nodeData, params.param);
            _class.onCreate();
            return _class;
        }
        return null;
    }

    /**
     * 解析完整配置转换为代码组
     * @param json 
     * @returns 
     */
    public static parseCodeConfig(json: any): string[] {
        let codes: string[] = [];

        let variables: CodeVariable[] = this.parseVariableConfig(json.modules.entry.variable);
        let logics: string[] = this.parseLogicConfig(variables, json);
        codes = codes.concat(logics);

        return codes;
    }

    /**
     * 解析变量配置
     * @param variableJson 
     * @returns 
     */
    static parseVariableConfig(variableJson: any): CodeVariable[] {
        let variables: { name: string, type: string, defaultValue: any }[] = [];

        for (let key in variableJson) {
            let content = variableJson[key];
            let name: string = content.name;
            let type: string = content.type;
            let defaultValue: any = content.defaultValue;
            variables.push({ name, type, defaultValue });
        }
        return variables;
    }

    /**
     * 解析逻辑配置
     * @param logicJson 
     * @returns 
     */
    static parseLogicConfig(variables: CodeVariable[], logicJson: any): string[] {
        let elementData = CodeckParserUtil.analyseElements(logicJson.modules.entry);
        let startNodes = CodeckParserUtil.filterNodeDataUnitsByType(elementData.nodes, "begin");
        let startNode = startNodes.length > 0 && startNodes[0] || null;
        if (!startNode) return [];
        startNode.variables = variables;
        startNode.flowData = elementData;
        startNode.nodeData = startNode;
        startNode.param = {};
        return this.parseNodeUnitConfig(startNode, { variables: variables, flowData: elementData, param: {} }, []);
    }

    /**
     * 以当前节点为根节点，逐个解析由ControlConnection连接节点
     * @param flowData 全局数据
     * @param curNode 当前节点数据
     * @param codes 代码缓存
     * @returns 
     */
    static parseNodeUnitConfig(curNode: any, params: any, codes: string[]): string[] {
        let _class = this.getNodeByData(curNode, { variables: params.variables, flowData: params.flowData, param: params.param });
        if (_class) {
            codes = codes.concat(_class.parseCode(_class.param));
            let nextTrunkConnection = CodeckParserUtil.getFirstConnectionDataBySourceUnitId(_class.flowData.connections['ControlConnection'], curNode.id, _class.outputKey);
            if (nextTrunkConnection) {
                let nextNode = CodeckParserUtil.getNodeDataByConnectionDestUnitId(_class.flowData.nodes, nextTrunkConnection);
                return this.parseNodeUnitConfig(nextNode, params, codes);
            }
        }
        return codes;
    }
}
