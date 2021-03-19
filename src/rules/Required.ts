import Rule from '../Rule';
import { type } from '../utils';

export function Required(message: string = 'not null.'): PropertyDecorator {
    const rule = new Rule({
        message,
        validate(value: any): boolean {
            return type(value) !== 'undefined';
        },
    });

    return rule.add();
}
