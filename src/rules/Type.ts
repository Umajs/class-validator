import Rule from '../Rule';
import { type } from '../utils';
import { Types } from '../typings';
import { messages } from '../messages';

export const Type = (t: Types, message: string = messages.Type): PropertyDecorator => new Rule({
    ruleType: 'Type',
    ruleParams: [t],
    message,
    validate(value: any) {
        return type(value) === t;
    },
}).add();

export const Int = (t: 'int8' | 'int32' | 'int64', message: string = messages.Type): PropertyDecorator => new Rule({
    ruleType: 'Type',
    ruleParams: [t],
    message,
    validate(value: any) {
        if (['int8', 'int32'].indexOf(t) > -1 && type(value) === 'number') {
            if (t === 'int8') return /^\d{1,8}$/g.test(value);

            if (t === 'int32') return /^\d{1,32}$/g.test(value);
        }

        if (t === 'int64') return /^\d{1,64}$/g.test(value);

        return false;
    },
}).add();
