import Rule from '../Rule';
import { messages } from '../messages';
import { isEmpley, type } from '../utils';

export function Required(message: string = messages.Required): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'Required',
        message,
        validate(value: any): boolean {
            return !isEmpley(value);
        },
    });

    if (type(Required.messageTransform) === 'function') rule.messageTransform = Required.messageTransform;

    return rule.add();
}

Required.messageTransform = null;
