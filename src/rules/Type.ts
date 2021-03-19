import Rule from '../Rule';
import { type } from '../utils';
import { Types } from '../typings';

export const Type = (t: Types, message: string = 'type...'): PropertyDecorator => {
    function validate(value: any): boolean {
        return type(value) === t;
    }

    return new Rule({ validate, message }).add();
};
