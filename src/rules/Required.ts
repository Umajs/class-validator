import Rule from '../Rule';
import { messages } from '../messages';
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
