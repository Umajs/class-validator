# @umajs/class-validator

本项目已重命名为[@umajs/class-validator](https://www.npmjs.com/package/@umajs/class-validator)

这是一个基于装饰器的校验库，通过给 class 的属性加上装饰器给属性来加上属性校验。

### Installation
```shell
npm i -S @umajs/class-validator
```

### Usage
新建 class extends Model 然后加上校验装饰器

> 【默认】继承 Model，在赋值的时候，值没通过校验的时候是不能给对应的属性赋值的，但是如果想要赋值成功，可以通过 ```super(false)``` 越过校验拦截（还是能正常拿到错误信息）

> eg1: class Info extends Model { constructor(params: Info, validBlock: boolean) { super(validBlock); } }

> eg2: class Info extends Model { constructor(params: Info) { super(false); } }

```js
import { Model, Validate, Type, Required, Min } from '@umajs/class-validator';

class UserInfo extends Model {
    constructor({ id, name, age }: UserInfo) {
        super();
        this.id = id;
        this.name = name;
        this.age = age;
    }

    @Type('number')
    id: number = 123;

    @Required()
    name?: string;

    @Min(0)
    age?: number;
}
```

执行 ```Validate``` 获取获取信息
```js
declare function Validate<T extends Object>(target: T, value?: T): [{
    [key: string]: string[];
}, T];
```

如下：
```js
const [info1, user] = Validate(new UserInfo({ id: 123 }));
console.log('1>>', info1);  // >> { name: [ 'not null.' ] }

// 1
const [info2] = Validate(user, { 'id': 456, age: -1 });
console.log('2>>', info2);  // >> { age: [ 'min..not lt {0}' ] }

// 2
user.id = 456;
user.name = undefined;
user.age = -2;
const [info3] = Validate(user);
console.log('3>>', info3);  // >> { name: [ 'not null.' ], age: [ 'min..not lt {0}' ] }

console.log(JSON.stringify(user));
```

### 规则 Rules
参数中可选的 message 是验证不通过的提示信息，本库提供了一套默认的提示信息，可以通过提供的 Init 方法的 updateMessages 参数来更改默认的提示信息。

#### 必需 Required
```js
declare function Required(message?: string): PropertyDecorator;
```

#### 类型 Type & Int
```js
export type Types = 'undefined' | 'string' | 'null' | 'number' | 'number' | 'boolean'
    | 'date' | 'function' | 'object' | 'array' | 'map' | 'set' | 'symbol' | 'function'
    | 'promise' | 'weakset' | 'weakmap' | 'generatorfunction' | 'asyncfunction' | 'object' | 'regexp';

export declare const Type: (t: Types, message?: string) => PropertyDecorator;
export declare const Int: (t: 'int8' | 'int32' | 'int64', message?: string) => PropertyDecorator;
```

#### 大小 Mix & Max & Range
```js
export declare function Min(n: number, message?: string): PropertyDecorator;
export declare function Max(n: number, message?: string): PropertyDecorator;
export declare function Range(min: number, max: number, message?: string): PropertyDecorator;
```

#### 长度 MinLength & MaxLength
```js
export declare function MinLength(n: number, message?: string): PropertyDecorator;
export declare function MaxLength(n: number, message?: string): PropertyDecorator;
```

#### 扩展规则
假设需要扩展一个 Email 规则，示例如下：
```js
export function Email(message: string = messages.MaxLength): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'Email',
        ruleParams: [], // 供提示信息使用
        message: '必须为邮件格式，例如"xxx@xx.xx"',
        validate(value: any): boolean {
            if (isEmpley(value)) return true;

            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        },
    });

    return rule.add();
}
```

### Init (Optional 可选)
如果需要修改提示信息，或者转换提示信息的格式，请在使用前调用 Init 方法。
```js
export declare function Init({ updateMessages, messageTransform, }: {
    updateMessages?: { [P in keyof RuleKeys]?: string };
    messageTransform?: (key: string, message: string, ruleType?: string, ruleParams?: any[]) => void;
}): void;
```
- updateMessages 是更改提示信息的模版
- messageTransform 是修改提示信息的格式，此处的提示信息是从信息模版中拿到的信息

#### 修改提示信息模版 updateMessages
eg: 更改 Range 提示
```js
import { Init } from '@umajs/class-validator';

Init({
    updateMessages: {
        Range: '值必须介于 {0} 和 {1} 之间',    // {0}{1} 为占位符，会从 Rule 的参数 ruleParams 中取值
    },
});
```

#### 转换提示信息格式 messageTransform
可以通过 messageTransform 转换提示信息格式
```js
export { Init } from '@umajs/class-validator';

Init({
    messageTransform: (key: string, message: string, ruleType: string) => {
        return {
            [ruleType]: message,
        }
    },
});

class UserInfo extends Model {
    constructor({ name }: UserInfo) {
        super();
        this.name = name;
    }

    @Required()
    name?: string;

}

const [info1, user] = Validate(new UserInfo({}));
console.log('1>>', info1);  // >> { name: [ { Required: 'not null' } ] }
```
