import { BaseConfigNode } from "../../../parsers/UnityVisualScripting/IUVSConfig";

export default class InvokeMemberNode extends BaseConfigNode {
    inputKey: string = "enter";
    outputKey: string = "exit";
    properties: { [key: string]: any }[] = [
        { "result": "{InvokeMemberResult}" }
    ];

    onCreate(): void {
        let resultCode: string = "";

        let member: any = this.nodeData.member;
        switch (member.name) {
            case "Split":
                resultCode = `{0}.split('{1}')`;
                // 被分割变量
                let splitTarget = this.getInputProperty("target");
                if (splitTarget) {
                    resultCode = resultCode.replace("{0}", splitTarget);
                }
                else {
                    resultCode = resultCode.replace("{0}", this.nodeData.defaultValues["target"].$content);
                }

                // 分割符
                resultCode = resultCode.replace("{1}", this.getInputProperty("%separator"));
                break;
            case "Trim":
                resultCode = `{0}.trim()`;
                // 字符串输入
                let trimTarget = this.getInputProperty("target");
                if (trimTarget) {
                    resultCode = resultCode.replace("{0}", trimTarget);
                }
                else {
                    resultCode = resultCode.replace("{0}", this.nodeData.defaultValues["target"].$content);
                }
                break;
            case "IndexOf":
                resultCode = `{0}.indexOf('{1}')`;
                // 字符串输入
                let indexofTarget = this.getInputProperty("target");
                if (indexofTarget) {
                    resultCode = resultCode.replace("{0}", indexofTarget);
                }
                else {
                    resultCode = resultCode.replace("{0}", this.nodeData.defaultValues["target"].$content);
                }

                // 目标字符串
                let indexofValue = this.getInputProperty("value");
                if (indexofValue) {
                    resultCode = resultCode.replace("{1}", indexofValue);
                }
                else {
                    resultCode = resultCode.replace("{1}", this.nodeData.defaultValues["%value"].$content);
                }
                break;
            case "StartsWith":
                resultCode = `{0}.startsWith('{1}')`;
                // 字符串输入
                let startsWithTarget = this.getInputProperty("target");
                if (startsWithTarget) {
                    resultCode = resultCode.replace("{0}", startsWithTarget);
                }
                else {
                    resultCode = resultCode.replace("{0}", this.nodeData.defaultValues["target"].$content);
                }

                // 查找的字符串
                let startsWithValue = this.getInputProperty("value");
                if (startsWithValue) {
                    resultCode = resultCode.replace("{1}", startsWithValue);
                }
                else {
                    resultCode = resultCode.replace("{1}", this.nodeData.defaultValues["%value"].$content);
                }
                break;
            default:
                resultCode = `/* Unknown member: ${member.name} */`;
                break;
        }
        this.setProperty("result", resultCode);
    }
}