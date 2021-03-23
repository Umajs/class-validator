import { messages } from '../messages';
import Rule from '../Rule';
import { type } from '../utils';

export function Required(message: string = messages.Required): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'Required',
        message,
        validate(value: any): boolean {
            return type(value) !== 'undefined';
        },
    });

    return rule.add();
}
