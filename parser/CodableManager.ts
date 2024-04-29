import { Singleton } from "../misc/Singleton";
import CodeckParser from "./parsers/Codeck/CodeckParser";

import CodeChecker from "./CodeChecker";

import { FakeDoc } from "../entry";
import CheckResult from "../checkers/CheckResult";

import Global from "../global";
import GlobalVarUtil from "../utils/GlobalVarUtil";
import FileCache from "../utils/FileCache";
import ChunkWrapper from "../utils/ChunkWrapper";

import * as fs from 'fs';

export default class CodableManager extends Singleton<CodableManager>() {
    private checkers: CodeChecker[] = [];
    private configs: any = {
        CODECK: [],
        UVS: [],
    };

    constructor() {
        super();
        this.configs.CODECK = this.configs.CODECK.concat(CodeckParser.loadConfigs());
    }

    /**
     * 初始化所有的配置, 确保数据的预加载, 否则会导致解析结果无法被插件获取
     */
    public init(): void {
        for (let config of this.configs.CODECK) {
            let checker = new CodeChecker(config);
            this.checkers.push(checker);
        }
    }

    public run(doc: FakeDoc, tmpPath: string): CheckResult {
        let result: CheckResult = new CheckResult();
        this.runCodeckCheckers(doc, tmpPath, result);
        return result;
    }

    private runCodeckCheckers(doc: FakeDoc, tmpPath: string, result: CheckResult): void {
        for (let checker of this.checkers) {
            try {
                checker.interpreter.refresh();
                checker.interpreter.import({ Global, GlobalVarUtil, FileCache, ChunkWrapper });
                checker.interpreter.import({ doc, result });
                checker.interpreter.import({
                    tmpPath: tmpPath,
                    content: fs.readFileSync(tmpPath, { encoding: 'utf-8' })
                });
                let codes = CodeckParser.parseCodeConfig(checker.config);
                checker.checkContent(codes);
            } catch (e: any) {
                let regx = /\[(\d+):(\d+)\]/;
                if (regx.test(e.message)) {
                    let rets = regx.exec(e.message);
                    if (rets.length > 2) {
                        let row = parseInt(rets[1]);
                        let col = parseInt(rets[2]);
                        result.addError({
                            row: row - 1,
                            col: col,
                            str: e.message,
                            type: "exception",
                        });
                    }
                }
            }
        }
    }
}