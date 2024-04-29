import { assert } from 'console';
import { Options, Node } from 'acorn';
import Sval, { SvalOptions } from 'sval'

export default class CodeInterpreter {
    /**代码解释器 */
    Interpreter: Sval = null;

    sandBox: boolean = true;
    ecmaVer: SvalOptions["ecmaVer"] = 'latest';
    sourceType: SvalOptions["sourceType"] = 'script';

    /**
     * 构造函数
     * @param sandBox 是否在隔离沙盒中运行代码
     * @param ecmaVer ECMAScript 版本
     * @param sourceType 代码源类型
     */
    constructor(sandBox: boolean = true, ecmaVer: SvalOptions["ecmaVer"] = 'latest', sourceType: SvalOptions["sourceType"] = 'script') {
        this.sandBox = sandBox;
        this.ecmaVer = ecmaVer;
        this.sourceType = sourceType;
        this.refresh();
    }

    refresh(): void {
        if (this.Interpreter !== null) {
            this.Interpreter = null;
        }
        const interpreter = new Sval({
            // ECMA Version of the code
            // 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
            // or 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024
            // or "latest"
            ecmaVer: this.ecmaVer,
            // Code source type
            // "script" or "module"
            sourceType: this.sourceType,
            // Whether the code runs in a sandbox
            sandBox: this.sandBox,
        })
        this.Interpreter = interpreter;
    }

    /**
     * 解析并运行代码
     * @param code 代码或AST节点
     * @returns 
     */
    run(code: string | Node): CodeInterpreter {
        assert(this.Interpreter !== null, "Interpreter is not initialized");
        if (typeof code === 'string') {
            // 删除多余空格和换行符
            code = code.replace(/\s+/g, ' ');
        }

        this.Interpreter.run(code);
        return this;
    }

    /**
     * 导入模块
     * @param nameOrModules 模块名或模块对象
     * @param mod 模块对象
     */
    import(nameOrModules: string | Record<string, any>, mod?: any): void {
        assert(this.Interpreter !== null, "Interpreter is not initialized");
        this.Interpreter.import(nameOrModules, mod);
    }

    /**
     * 用内部 Acorn 或自定义解析器解析代码，得到对应的 AST
     * @param code 要解析的代码
     * @param parser 自定义解析器
     * @returns 
     */
    parse(code: string, parser?: (code: string, options: SvalOptions) => Node): Node {
        assert(this.Interpreter !== null, "Interpreter is not initialized");
        return this.Interpreter.parse(code, parser);
    }
}