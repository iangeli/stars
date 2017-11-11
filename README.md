# gitstars

> 每个程序员都该拥有的 Github Stars Repositories Manager (仓库管理器)

## 诞生记 💥

Github 作为开发者的第一社交平台，拥有数不胜数的优秀开源项目，给工作和学习带来巨大方便，遇到自己需要或是喜爱的项目只需轻轻点击 Star 便可收入囊中。

Star is easy，可随着 Stars Repositories 增长和时间流逝，在需要使用到某个项目时难免记不清叫什么，而 Github 又只提供简单的搜索，找到目标 Star Repositorie 竟也成了件小小的麻烦事。

所以拥有自己的 Github Stars Repositories Manager 也算是开发者的必备需求。

之前有使用过市面上的一些 Github Stars Repositories Manager，比如 [Astral](https://app.astralapp.com)，虽说能用，但总觉得不顺手、不好用。

gitstars 由此诞生 🍏

欢迎进入 [https://monine.github.io/gitstars/](https://monine.github.io/gitstars/) 体验畅玩，更欢迎体验之后在 [Issues](https://github.com/Monine/gitstars/issues) 提供建议。

## 如何使用

1. Fork 此项目并 clone 到本地运行 `npm install` 安装依赖

2. 在 [Personal access tokens](https://github.com/settings/tokens) 创建一个拥有 Gist 访问权限的 access token

3. 把刚刚创建的 access token 一分为二写入 `static/config.json` 文件内（比如 123456 拆分为 123 和 456 分别写入 access 和 token 字段）**非常重要！**

5. 运行 `npm run build` 打包

5. 提交你所有的修改（包括上一步打包后的文件）到远程仓库

6. 打开 `[yourname].github.io/gitstars` 管理你的 Stars Repositories

## 开发思路

gitstars 使用 Vue v2.5.2 开发，因为简单，所以也就没有 vue-router 和 vuex 的立足之地，UI 层按需使用 Element-UI v2.0.1，HTTP 使用 axios v0.17.0，所有数据通过 Github API v3 获取，界面风格模仿 [Astral](https://app.astralapp.com)。

你可能会好奇，管理数据保存在哪？请看下图：

![](https://thumbnail10.baidupcs.com/thumbnail/6c1e499f92e24b0db35fe6eea8f327bd?fid=3679391295-250528-1111312898115102&time=1510408800&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-%2fMaEWSFompGF6%2bimGxD5Ju2aCjg%3d&expires=8h&chkbd=0&chkv=0&dp-logid=7303824190125178461&dp-callid=0&size=c1440_u900&quality=90&vuk=3679391295&ft=image)

管理数据就是一份 JSON 文件，增删改查都是对这份 JSON 文件的操作，除此之外，没有任何其它需要关心的。

但是，每次使用从 Github API 获取管理数据相对较慢，而且从 Github API 获取的数据都会有 60 秒的缓存（可查看 Response Header Cache-Control 字段），也就是说你修改了管理数据后刷新页面会发现依然是修改之前的数据，为此我有邮件询问 Github 如何取消缓存，回复是无法取消...

![](https://thumbnail10.baidupcs.com/thumbnail/66ab52db39901376a7cd4d1dbef03a3a?fid=3679391295-250528-690087334563810&time=1510405200&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-nKkyFxWAHB7Q%2bsO7AQJek%2f3y5pE%3d&expires=8h&chkbd=0&chkv=0&dp-logid=7303779352572127561&dp-callid=0&size=c1440_u900&quality=90&vuk=3679391295&ft=image)

因此为了解决此处体验问题，使我想到一个就算没有上述问题也应该做的一项优化：**把管理数据同步保存在 localStorage 内**

这很有必要，gitstars 做到了，不仅是你的管理数据，其它的一些不变的数据也同样会保存在 localStorage 内，避免每次打开使用都从 Github API 获取这些内容，这也提升了页面内容的加载速度。
