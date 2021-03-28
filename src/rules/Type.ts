import Rule from '../Rule';
import { type } from '../utils';
import { Types } from '../typings';
import { messages } from '../messages';

export const Type = (t: 'int8' | 'int32' | 'int64' | Types, message: string = messages.Type): PropertyDecorator => new Rule({
    ruleType: 'Type',
    ruleParams: [t],
    message,
    validate(value: any) {
        return type(value) === t;
    },
}).add();
