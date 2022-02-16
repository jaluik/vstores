# vstore

English | [中文](README.md)

Typescript friendly, Powerful, Expiration time supported, and multi-platform storage.

## 安装

First make sure that the node and npm environments are installed locally, and execute follow code in the terminal environment

```sh
$ npm install vstores
```

or

```sh
$ yarn add vstores
```

## Usage

### basic usage ( In js or Ts)

```typescript
import vstores from 'vstores';

type DataType = {
  test: number;
  bar: number;
};
const store = vstores.create<DataType>();
// key can only be set "test" or “bar”  based on key in DataType
store.set('test', 1);

// ts infer the result can be  number or undefined
store.get('test');
```

### Set expire time

```typescript
import vstores from 'vstores'
/** Globally configure the expiration time of the stored value, you can set the expiration days and seconds from the current date, or specify a specific time */
const store = vstores.create({
    //2024-12-24 14:00过期
    expireAt: "2024-12-24 14:00";
    //Start after setting the key successfully, expire after 36000 milliseconds
    // expire: 36000;
})
store.set("test", 1, {
      //2024-12-24 14:00过期
    expireAt: "2024-12-24 14:00";
    //Start after setting the key successfully, expire after 36000 milliseconds or 3 days
    // expire: 36000 or [3, "day"];
    //value will be automatically deleted after being read once
    //once: true
})
store.get("test")
```

## 版权

MIT © [jaluik](https://github.com/jaluik)
