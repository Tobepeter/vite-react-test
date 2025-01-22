# tsx

tsx 是一个命令行工具，它可以直接运行 TypeScript 和 ESM (ECMAScript Modules) 文件，而不需要先编译成 JavaScript。它的主要特点是：

1. 直接执行能力
   可以直接运行 .ts、.tsx、.mts、.cts 文件
   不需要单独的编译步骤
   支持 ESM 和 CommonJS 模块

2. 性能优势
   比 ts-node 快很多
   使用 esbuild 进行即时编译
   有内置的文件监听和自动重启功能

3. 开发体验
   支持 TypeScript 的类型检查
   支持 source maps
   热重载功能
