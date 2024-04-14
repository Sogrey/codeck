## Conan Editor

基于 [codeck可视化蓝图编程引擎](https://github.com/moonrailgun/codeck) 开发

![](./website/docs/concept/img/connection.png)


`codeck` 是一款蓝图可视化编程系统，能够在网页中使用基于节点的界面创建任何编程语言能够编程出的脚本，

`conan editor` 基于此，实现针对业务的自定义节点扩展。

## 使用场景

与一般的编程语言不同的是，`codeck` 的设计方向在于一些需要快速实现的地方，对于一些简单的编程场景，单独开一个项目的成本会相对较高。而基于网页的 `codeck` 则实现了**随用随编程**的理念，将快速验证的成本降低到一个很低的地步。

使用 `codeck`, 你甚至不需要了解其背后的细节。我们会将很多内容封装成一个单独的节点，并通过一些 `端点(pin)` 将这些上下文暴露出来。

对此感兴趣了？点个Star，我会逐步带你领取可视化编程的魅力。

## 环境搭建

> 注意：项目需位于在NTFS文件系统的磁盘下，否则会出现未知错误

执行Nodejs命令行：

```bash
npm install -g pnpm
pnpm install
```