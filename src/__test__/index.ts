import { Validate, Type, Required, Min } from '../index';
import Model from '../Model';

class UserInfo extends Model {
    constructor({ id, name, age }: UserInfo, isValid: boolean = true) {
        super(isValid);
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

try {
    const [info1, user] = Validate(new UserInfo({ id: 123, age: 3 }));
    console.log('1>>', info1);  // >> { name: [ 'not null.' ] }

    // 1
    const [info2] = Validate(user, { 'id': 456 });
    console.log('2>>', info2);  // >> null

    // 2
    user.id = 456;
    user.name = undefined;
    user.age = -2;
    const [info3] = Validate(user);
    console.log('3>>', info3);  // >> { name: [ 'not null.' ], age: [ 'min..not lt {0}' ] }

    console.log(JSON.stringify(user), Object.assign({}, user));     // >> {"id":456,"age":3} { id: 456, name: undefined, age: 3 }
} catch (err) {
    console.log('>>>', err);
}
