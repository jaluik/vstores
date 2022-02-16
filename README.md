# vstore

[English](README_EN.md) | 中文

Ts 类型友好、支持过期时间的、功能强大的、跨平台存储器。

## 安装

首先确保本地安装了 node 和 npm 环境，在终端环境下执行

```sh
$ npm install vstores
```

or

```sh
$ yarn add vstores
```

## 使用

### 基础使用(在 js 或者 ts 中)

```typescript
import vstores from 'vstores';

type DataType = {
  test: number;
  bar: number;
};
const store = vstores.create<DataType>();
// key 只能是 "test" | “bar”, 有严格的类型提示
store.set('test', 1);

// 类型提示为 number
store.get('test');
```

### 设置过期时间

```typescript
import vstores from 'vstores'
/** 全局配置存值的过期时间，可以从当前日期起设置过期天数秒数等，或指定特定时间 */
const store = vstores.create({
    //2024-12-24 14:00过期
    expireAt: "2024-12-24 14:00";
    //设置成功key后开始， 36000毫秒后过期
    // expire: 36000;
})
store.set("test", 1, {
      //2024-12-24 14:00过期
    expireAt: "2024-12-24 14:00";
    //设置成功key后开始， 36000毫秒后过期 或者 3天后过期
    // expire: 36000 or [3, "day"];
    //只能读取一次，读取一次后失效自动删除
    //once: true
})
store.get("test")
```

## 版权

MIT © [jaluik](https://github.com/jaluik)
