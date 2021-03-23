import Rule from '../Rule';
import { type } from '../utils';
import { Types } from '../typings';
import { messages } from '../messages';

export const Type = (t: 'int8' | 'int32' | 'int64' | Types, message: string = messages.Type): PropertyDecorator => {
    function validate(value: any): boolean {
        return type(value) === t;
    }

    return new Rule({
        ruleType: 'Type',
        ruleParams: [t],
        message,
        validate,
    }).add();
};
