# @umajs/model

这是一个基于 Model 的装饰器校验库，通过给 class 的属性加上装饰器给属性来加上属性校验。

### Installation
```shell
npm i -S @umajs/model
```

### Usage
新建 class extends Model 然后加上校验装饰器

> 【默认】继承 Model，在赋值的时候，值没通过校验的时候是不能给对应的属性赋值的，但是如果想要赋值成功，可以通过 ```super(false)``` 越过校验拦截（还是能正常拿到错误信息）

> eg1: class Info extends Model { constructor(params: Info, isValid: boolean) { super(isValid); } }

> eg2: class Info extends Model { constructor(params: Info) { super(false); } }

```js
import { Model, Validate, Type, Required, Min } from '@umajs/model';

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
参数中 message 是提示的错误信息，可以通过提供的 UpdateMessages 来更改默认信息

#### 修改提示信息 UpdateMessages
```js
export declare function UpdateMessages(params?: {
    [P in keyof RuleKeys]?: string;
}): void;
```

#### 必需 Required
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


#### 扩展提示信息

- 可以通过 messageTransform 扩展提示信息。
```js
export function Required(message: string = messages.Required): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'Required',
        message,
        validate(value: any): boolean {
            return !isEmpley(value);
        },
        messageTransform(key: string, message: string) {
            return { [key]: message };
        }
    });

    return rule.add();
}
```

- 通过装饰器函数的静态属性扩展已有的提示信息
```js
export { Required } from '@umajs/model';

Required.messageTransform = (key: string, message: string) => {
    return { [key]: message };
}
```
