import * as fs from 'fs';
import { Singleton } from "../../../misc/Singleton";
import { CodeVariable } from "./UVSElement";
import { BaseConfigNode as BaseFlowNode } from "./IUVSConfig";
import { UVSNodeMap } from "./UVSNodeMap";
import YamlUtil from "../../../utils/YamlUtil";
import UVSParserUtil from "./UVSParserUtil";

export default class UVSParser extends Singleton<UVSParser>() {
    /**预加载配置 */
    public loadConfigs(): any[] {
        let configs: any[] = [];
        let configPath = "config/";
        let files = fs.readdirSync(configPath);
        let yamlFiles = files.filter((file) => {
            return file.endsWith(".asset");
        });

        for (let file of yamlFiles) {
            let content: string = fs.readFileSync(configPath + file, { encoding: 'utf-8' });
            let yaml: any = YamlUtil.deserierlize(content);
            if (yaml && yaml.MonoBehaviour) {
                let jsonVal: any = yaml.MonoBehaviour._data._json;
                if (jsonVal) {
                    let json = JSON.parse(jsonVal);
                    configs.push(json);
                }
            }
        }
        return configs;
    }

    /**
     * 根据节点类型获取节点
     * @param nodeType 节点类型
     * @params params 参数
     * @returns 
     */
    public getNodeByData(nodeData: any, params: any): BaseFlowNode | null {
        const nodeClass = UVSNodeMap[nodeData.$type];
        if (nodeClass) {
            let _class = new nodeClass(params.variables, params.globalData, nodeData, params.param);
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
    public parseCodeConfig(json: any): string[] {
        let codes: string[] = [];

        let variables: CodeVariable[] = this.parseVariableConfig(json.graph.variables);
        let logics: string[] = this.parseLogicConfig(variables, json.graph);
        codes = codes.concat(logics);

        return codes;
    }

    /**
     * 解析变量配置
     * @param variableJson 
     * @returns 
     */
    parseVariableConfig(variableJson: any): { name: string, type: string, value: any }[] {
        let variables: { name: string, type: string, value: any }[] = [];

        let contents: any[] = variableJson.collection.$content;
        for (let content of contents) {
            let name: string = content.name;
            let type: string = content.value.$type;
            let value: any = content.value.$content;
            variables.push({ name, type, value });
        }
        return variables;
    }

    /**
     * 解析逻辑配置
     * @param logicJson 
     * @returns 
     */
    parseLogicConfig(variables: CodeVariable[], logicJson: any): string[] {
        let elementData = UVSParserUtil.analyseElements(logicJson.elements);
        let startNodes = UVSParserUtil.filterNodeDataUnitsByType(elementData.nodes, "Unity.VisualScripting.Start");
        let startNode = startNodes.length > 0 && startNodes[0] || null;
        if (!startNode) return [];
        startNode.variables = variables;
        startNode.globalData = elementData;
        startNode.nodeData = startNode;
        startNode.param = {};
        return this.parseNodeUnitConfig(startNode, { variables: variables, globalData: elementData, param: {} }, []);
    }

    /**
     * 以当前节点为根节点，逐个解析由ControlConnection连接节点
     * @param globalData 全局数据
     * @param curNode 当前节点数据
     * @param codes 代码缓存
     * @returns 
     */
    parseNodeUnitConfig(curNode: any, params: any, codes: string[]): string[] {
        let _class = this.getNodeByData(curNode, { variables: params.variables, globalData: params.globalData, param: params.param });
        if (_class) {
            codes = codes.concat(_class.parseCode(_class.param));
            let nextTrunkConnection = UVSParserUtil.getFirstConnectionDataBySourceUnitId(_class.globalData.connections['ControlConnection'], curNode.$id, _class.outputKey);
            if (nextTrunkConnection) {
                let nextNode = UVSParserUtil.getNodeDataByConnectionDestUnitId(_class.globalData.nodes, nextTrunkConnection);
                return this.parseNodeUnitConfig(nextNode, params, codes);
            }
        }
        return codes;
    }
}
