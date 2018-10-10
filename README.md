# 执行

请自觉安装mysql,在src/config.js下面配置好相关信息

- npm install

- 第一次先执行 npm run init_sql,创建相关表数据

- 执行 npm run start_server 开启服务

# 目录结构

```
├──src 后台目录
│  ├──app.js 主入口
│  ├──config.js 配置文件
│  ├──controllers 控制层
│  ├──libs 库封装目录
│  ├──middlewares 自定义中间件
│  ├──models 模型层
│  ├──routers 路由
│  ├──services 服务层
│  ├──utils 工具类
│  ├──views 模板代码
│  ├──vo viewObject
│  ├──do services和models之间交互的实体
│  ├──dto 用于内部数据流转的实体,数据尽量与数据表字段相同
```

# 接口流程：
- router->controllers->services->models->db

# 数据流程：
- 入参->dto(简单的可忽略)->db->do(数据库结果结构)->vo（从do挑拣修改封装用户所需数据）->出参

