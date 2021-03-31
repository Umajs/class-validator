import Rule from '../Rule';
import { messages } from '../messages';
import { isEmpley } from '../utils';

export function Required(message: string = messages.Required): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'Required',
        message,
        validate(value: any): boolean {
            return !isEmpley(value);
        },
    });

    return rule.add();
}
