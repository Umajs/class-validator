import Rule from '../Rule';
import { messages } from '../messages';
import { isEmpley, type } from '../utils';

export function MinLength(n: number, message: string = messages.MinLength): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'MinLength',
        ruleParams: [n],
        message,
        validate(value: any): boolean {
            if (isEmpley(value)) return true;

            return value.length > n;
        },
    });

    if (type(MinLength.messageTransform) === 'function') rule.messageTransform = MinLength.messageTransform;

    return rule.add();
}

MinLength.messageTransform = null;

export function MaxLength(n: number, message: string = messages.MaxLength): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'MaxLength',
        ruleParams: [n],
        message,
        validate(value: any): boolean {
            if (isEmpley(value)) return true;

            if (type(MaxLength.messageTransform) === 'function') rule.messageTransform = MaxLength.messageTransform;

            return value.length < n;
        },
    });

    return rule.add();
}

MaxLength.messageTransform = null;
