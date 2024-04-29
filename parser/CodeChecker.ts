import CheckResult from "../checkers/CheckResult";
import CodeInterpreter from "./CodeInterpreter";

export default class CodeChecker {
    public interpreter: CodeInterpreter;
    public config = {};
    constructor(config: any, interpreter: CodeInterpreter = new CodeInterpreter()) {
        this.config = config;
        this.interpreter = interpreter;
    }

    public check(file: string): CheckResult {
        throw new Error("Method not implemented.");
    }

    public checkContent(codes?: string[]): void {
        if (!codes) return;
        for (let code of codes) {
            this.interpreter.run(code);
        }
    }
}