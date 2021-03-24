# PC-VUE 模板

![version](https://img.shields.io/github/package-json/v/hejingmiao/pc-jq-template.svg)
![commit](https://img.shields.io/github/last-commit/hejingmiao/pc-jq-template.svg)
![new feature](https://img.shields.io/badge/author-hejingmiao-orange)

<!-- ![code-size](https://img.shields.io/github/languages/code-size/hejingmiao/pc-jq-template.svg) -->
<!-- ![lang](https://img.shields.io/github/languages/top/hejingmiao/pc-jq-template.svg) -->

### 发布到cms需要
```html
<!-- 添加cms_id，「0001」频道ID依据创建项目时的频道名,「xxxx」为发布器对应频道新建专题名，需要发布到发布器的项目，该项必填 -->
<meta name="cms_id" content="0001xxxx" />
```
### 安装

```bash
$ npx ne-build pc-vue
# node版本大于5.2
# 参数可在命令行输入，也可以输入命令后按交互提示输入

# 参数⬇️
-n or --name
# 项目名称，必须
# 用于替换模板项目中package.json的{name}

-c or --channel
# 频道名称，必须
# 用于替换模板项目内上传路径中的频道路径

-t or --template
# 项目模版，必须

-d or --desc
# 项目描述，可选
# 用于替换模板项目中package.json的{description}
```

### 用户配置
```js
// gulpfile.js
const account = require('/Users/xxx/code/openID') // 配置openID路径
```

### 命令
```bash
# 安装依赖
$ npm i

# 开启本地服务
$ npm run serve

# 打包（上传前需先打包）
$ npm run build

# 上传静态资源
$ gulp upload

# 发布cms
$ gulp publish

# 清空本地缓存文件，使所有文件重新上传
# （默认每次上传只上传增量文件）
$ gulp clear

```

### 目录结构

```
pc_vue_template
 ├ config/                  # 勿动，项目打包发布需要
 ├ mock/                    
 │  ├ json/                 # mock数据json文件
 │  │  └ home.json          
 │  └ index.js              # 勿动，mock数据汇总
 ├ public/                    
 │  ├ resource/             # 静态资源文件夹，会直接上传至 
 │  ├ manifest.json        # 配置页面logo
 │  └ index.html            
 ├ src/
 │  ├ assets/               # 图片等资源文件夹
 │  ├ components/           # 组件文件夹
 │  ├ router/               # 路由配置
 │  ├ store/                # vuex配置
 │  ├ utils/
 │  │  ├ api.js             # 接口api汇总
 │  │  ├ helper.js          # 统计js
 │  │  ├ index.js           # 自定义通用方法
 │  │  ├ jsonp.js           # jsonp请求
 │  │  ├ request.js         # axios请求封装
 │  └  └ track.js           # 统计方法
 ├ views/                   # 路由主页面
 ├ .env                     # 全局变量配置文件
 ├ .eslintrc.js             # eslint配置文件
 ├ .gitignore
 ├ babel.config.js          # babel配置文件
 ├ gulpfile.js              # gulp配置文件
 ├ package.json
 ├ README.md
 └ vue.config.js            # vue配置文件
```

### 简介

* 基于vue3前端项目开发模板
* vue.config.js [配置参考](https://cli.vuejs.org/config/)
* css默认使用[less]
* 统计ID位于`.env`的`VUE_APP_PROJECT_ID=NTM-KFGT6I8U-47`
* 已添加`vuex`,`router`
* npm run serve开启本地服务后，可以使用localhost:8080或{ip}:8080或dev.f2e.163.com:8080（需配置hosts）调试
* 打包时静态资源默认添加hash，上传后进行缓存，无修改不再重复上传
