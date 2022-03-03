# vstores

[中文](README.md) | English

Typescript friendly, Powerful, Expiration time supported, and multi-platform storage.

## Install

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
/**  Global configuration for Expiration time*/
const store = vstores.create({
    //You can specify a specific expire time, such as: 2024-12-24 14:00.
    expireAt: "2024-12-24 14:00";
    //You can set the time to expire from the current date. eg expire after 60 seconds or 3 days
    expire: 60  //or [3, "day"];
    //format key, eg if key is name, the real saved key will be before-name-after
    formatKey: (v)=> `before-${v}-after`
})
//when config a single key value, the priority is: single > global, then expireAt > expire
store.set("test", 1, {
    //expire at 2024-12-24 14:00
    expireAt: "2024-12-24 14:00";
    // expire: 60  //or [3, "day"];
    //the value will  be delete after readed once.
    //once: true
})
store.get("test")
```

## API

### create instance

- default export is a vstores instance
- create vstores instance by `vstores.create(config)`

### instance method

#### get(key: string): any

get value by key

```typescript
const data = vstores.get('key');
```

#### set(key: string, value: any, config?: InstanceConfig): vstores

set value with key

```typescript
vstores.set('key', data);

// or

vstores.set('key', data, {
  expireAt: '2024-02-04 12:24',
  expirt: [2, 'day'] || 3600, //3600 seconds
  once: true,
});
```

#### del(key: string): void

```typescript
vstores.del('key');
```

#### clear(): void

clear all values

```typescript
vstores.clear();
```

### config

#### global config

```typescript
import vstores from 'vstores'
const store = vstores.create({
    //specified expire time
    expireAt: "2024-12-24 14:00";
    // expire time from now
    expire: 60  //or [3, "day"];
    //how to format key
    formatKey: (v)=> `before-${v}-after`,
    //cross-platform adapter
    adaper: webadpater,
    //error handler
    errorHandler: (err)=> console.log(err)
})

```

#### set method config

```typescript
vstores.set('key', data, {
  //specified expire time
  expireAt: '2024-02-04 12:24',
  //expire time from now
  expirt: [2, 'day'] || 3600, //3600 second
  //read once, and data will delete after read
  once: true,
});
```

## cross-platform

Support web, WeChat miniprogram, Alipay miniprogram, it will be automatic configed according to different platforms, no additional configuration required.

## Copyright

MIT © [jaluik](https://github.com/jaluik)
