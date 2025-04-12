# Mermaid 图表示例

## 流程图 (Flowchart)

```mermaid
flowchart TD
    A[开始] --> B{判断}
    B -->|是| C[处理1]
    B -->|否| D[处理2]
    C --> E[结束]
    D --> E
```

## 序列图 (Sequence Diagram)

```mermaid
sequenceDiagram
    participant 用户
    participant 系统
    participant 数据库

    用户->>系统: 发送请求
    系统->>数据库: 查询数据
    数据库-->>系统: 返回结果
    系统-->>用户: 显示结果
```

## 类图 (Class Diagram)

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +fetch()
    }
    class Cat {
        +climb()
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

## 状态图 (State Diagram)

```mermaid
stateDiagram-v2
    [*] --> 待机
    待机 --> 运行: 启动
    运行 --> 待机: 停止
    运行 --> 错误: 发生故障
    错误 --> 待机: 重置
```

## 甘特图 (Gantt Chart)

```mermaid
gantt
    title 项目计划
    dateFormat  YYYY-MM-DD
    section 设计
    需求分析    :a1, 2024-01-01, 7d
    系统设计    :a2, after a1, 5d
    section 开发
    编码        :a3, after a2, 10d
    测试        :a4, after a3, 5d
```

## 饼图 (Pie Chart)

```mermaid
pie
    title 市场份额
    "苹果" : 45
    "三星" : 30
    "华为" : 15
    "其他" : 10
```

## 实体关系图 (Entity Relationship Diagram)

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER {
        string name
        string email
    }
    ORDER {
        int orderNumber
        date orderDate
    }
    LINE-ITEM {
        int quantity
        float price
    }
```

## 用户旅程图 (User Journey)

```mermaid
journey
    title 用户购物流程
    section 浏览商品
      查看商品列表: 5: 用户
      选择商品: 3: 用户
    section 下单
      添加到购物车: 4: 用户
      确认订单: 3: 用户
    section 支付
      选择支付方式: 2: 用户
      完成支付: 3: 用户
```

## 思维导图 (Mindmap)

```mermaid
mindmap
  root((编程学习))
    基础概念
      数据类型
      控制结构
      函数
    前端开发
      HTML
      CSS
      JavaScript
      React
    后端开发
      Node.js
      Python
      Java
    数据库
      SQL
      MongoDB
      Redis
    工具
      Git
      Docker
      VS Code
```

## Git 图 (Git Graph)

```mermaid
gitGraph
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    branch feature
    checkout feature
    commit
    commit
    checkout main
    merge feature
    commit
```

## 时间线图 (Timeline)

```mermaid
timeline
    title 科技发展史
    section 20世纪
        1950 : 第一台电子计算机
        1969 : 互联网诞生
        1981 : 个人电脑普及
    section 21世纪
        2007 : 智能手机革命
        2010 : 云计算兴起
        2020 : AI 大爆发
```

## 象限图 (Quadrant Chart)

```mermaid
quadrantChart
    title 技术评估
    x-axis 低 --> 高
    y-axis 低 --> 高
    quadrant-1 高价值
    quadrant-2 高成本
    quadrant-3 低价值
    quadrant-4 低成本
    React: [0.75, 0.80]
    Vue: [0.65, 0.70]
    Angular: [0.50, 0.60]
    jQuery: [0.30, 0.40]
```

## C4 上下文图 (C4 Context Diagram)

```mermaid
C4Context
    title 系统上下文图
    Person(customer, "客户", "使用系统进行购物的用户")
    System(system, "电商系统", "允许用户浏览和购买商品的系统")
    System_Ext(payment, "支付系统", "处理支付的外部系统")
    System_Ext(email, "邮件系统", "发送订单确认邮件的外部系统")
    Rel(customer, system, "使用")
    Rel(system, payment, "发送支付请求")
    Rel(system, email, "发送邮件")
```

```mermaid
gantt
    title 软件开发项目
    dateFormat  YYYY-MM-DD
    section 需求阶段
    需求收集    :a1, 2024-01-01, 10d
    需求分析    :a2, after a1, 5d
    需求评审    :a3, after a2, 3d
    section 设计阶段
    系统设计    :b1, after a3, 7d
    数据库设计  :b2, after b1, 5d
    接口设计    :b3, after b2, 4d
    section 开发阶段
    前端开发    :c1, after b3, 15d
    后端开发    :c2, after b3, 20d
    section 测试阶段
    单元测试    :d1, after c1, 5d
    集成测试    :d2, after d1, 7d
    系统测试    :d3, after d2, 5d
```

## 思维导图进阶版 (Advanced Mindmap)

```mermaid
mindmap
  root((项目管理))
    项目规划
      需求分析
        用户需求
        系统需求
        业务需求
      资源规划
        人力资源
        技术资源
        时间资源
    项目执行
      开发
        前端开发
        后端开发
        数据库开发
      测试
        单元测试
        集成测试
        系统测试
    项目监控
      进度监控
      质量监控
      风险监控
    项目收尾
      验收
      文档
      总结
```
