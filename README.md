# @umajs/model

这是一个基于 Model 的装饰器校验库，通过 class 的属性装饰器给属性加上校验。

### Installation
```shell
npm i -S @umajs/model
```

### Usage
新建 class 然后加上校验装饰器
```js
import { Model, Validate, Type, Required, Min } from '@umajs/model';

class UserInfo extends Model {
    constructor({ id, name, age }: UserInfo) {
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
参数中 message 是提示的错误信息，可以通过提供的 UpdateMessages 来更改默认信息

#### 修改提示信息 UpdateMessages
```js
export declare function UpdateMessages(params?: {
    [P in keyof RuleKeys]?: string;
}): void;
```

#### 比选 Required
```js
declare function Required(message?: string): PropertyDecorator;
```

#### 类型 Type & Int
```js
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
        message: '必须为邮件格式，例如"xxx@xx.xx"',
        validate(value: any): boolean {
            if (isEmpley(value)) return true;

            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        },
    });

    return rule.add();
}
```
