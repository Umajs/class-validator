import { Validate, Type, Required, Model } from '../index';
import { Complex } from '../rules/Complex';

class UserExtraInfo extends Model {
    constructor({ addr }: UserExtraInfo, validBlock: boolean = true) {
        super(validBlock);
        this.addr = addr;
    }

    @Required()
    addr?: string;
}

class UserInfo extends Model {
    constructor({ id }: UserInfo, validBlock: boolean = true) {
        super(validBlock);
        this.id = id;
    }

    @Type('number')
    id: number = 123;

    @Complex(UserExtraInfo)
    extraInfo?: UserExtraInfo;
}

try {
    const user = new UserInfo({ id: 123 });

    // 2
    user.id = 456;
    // user.extraInfo = new UserExtraInfo({});
    user.extraInfo = {};
    const [info3] = Validate(user);
    console.log(info3);
    console.log(JSON.stringify(info3, null, 4));

    // console.log(JSON.stringify(user), Object.assign({}, user));     // >> {"id":456,"age":3} { id: 456, name: undefined, age: 3 }
} catch (err) {
    console.log('>>>', err);
}
