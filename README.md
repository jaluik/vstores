# vstores

![GitHub CI](https://github.com/jaluik/vstores/actions/workflows/publish.yml/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/jaluik/vstores/badge.svg?branch=master)](https://coveralls.io/github/jaluik/vstores?branch=master) ![Minified Size](https://badgen.net/bundlephobia/minzip/vstores)

中文 | [English](README_EN.md)

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
/** 全局配置存值的过期时间*/
const store = vstores.create({
    //可以指定特定时间，如：2024-12-24 14:00过期
    expireAt: "2024-12-24 14:00",
    //可以从当前日期起设置过期天数秒数等，如 60秒后过期或者3天后过期
    expire: 60,  //or [3, "day"];
    //格式化key值，如原始key为 name, 实际存储值为before-name-after
    formatKey: (v)=> `before-${v}-after`,
    //对于key获取值为undefined时，返回对应的默认值
    // defaultValues: {
    //   [key]: value
    // }

})
//或者在设置单个key值设置值， 优先顺序为首先是：单个> 全局， 然后再是 expireAt > expire
store.set("test", 1, {
      //2024-12-24 14:00过期
    expireAt: "2024-12-24 14:00";
    //设置成功key后开始， 36000毫秒后过期 或者 3天后过期
    // expire: 36000 or ;
    //只能读取一次，读取一次后失效自动删除
    //once: true
})
store.get("test")
```

## API

### 创建实例

- 直接导出的 vsotes 是一个实例对象
- 也可以通过`vstores.create(config)`创建新的实例

### 实例上的方法

#### get(key: string): any

获取存储值

```typescript
const data = vstores.get('key');
```

#### set(key: string, value: any, config?: InstanceConfig): vstores

设置存储值及配置项目

```typescript
vstores.set('key', data);

// or

vstores.set('key', data, {
  expireAt: '2024-02-04 12:24',
  expirt: [2, 'day'] || 3600, //3600 单位是秒
  once: true,
});
```

#### del(key: string): void

删除 key 对应的存储值

```typescript
vstores.del('key');
```

#### clear(): void

删除所有存储值

```typescript
vstores.clear();
```

### 配置项

#### 全局配置

```typescript
import vstores from 'vstores'
/** 全局配置存值的过期时间*/
const store = vstores.create({
    //指定具体的过期时间
    expireAt: "2024-12-24 14:00";
    //指定过期时间距离现在还有多久
    expire: 60  //or [3, "day"];
    //格式化key值，如原始key为 name, 实际存储值为before-name-after
    formatKey: (v)=> `before-${v}-after`,
    //跨平台的存储器
    adapter: webAdapter,
    //异常处理器
    errorHandler: (err)=> console.log(err),
    //对于key获取值为undefined时，返回对应的默认值
    // defaultValues: {
    //   [key]: value
    // }
})

```

#### set 方法的配置

```typescript
vstores.set('key', data, {
  //指定具体的过期时间
  expireAt: '2024-02-04 12:24',
  //指定过期时间距离现在还有多久
  expirt: [2, 'day'] || 3600, //3600 单位是秒
  //读取一次后会删除这个存储
  once: true,
});
```

## 跨平台

支持 web 端、微信小程序、支付宝小程序，根据不同平台自动适配，无需额外配置

### 跨平台适配器

内置了 4 种适配器适用于不同平台，可以手动指定：

web 端：`webAdapter`（使用 localStorage）, `sessionAdapter`（使用 sessionStorage）

微信小程序：`wxAdapter`

支付宝小程序： `aliAdapter`

手动指定适配器方式：

```typescript
import vstores, { sessionAdapter } from 'vstores';
const store = vstores.create({
  adapter: sessionAdapter,
});
```

## 版权

MIT © [jaluik](https://github.com/jaluik)
