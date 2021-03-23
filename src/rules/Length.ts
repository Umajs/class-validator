import { messages } from '../messages';
import Rule from '../Rule';
import { type } from '../utils';

export function MinLength(n: number, message: string = messages.MinLength): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'MinLength',
        ruleParams: [n],
        message,
        validate(value: any): boolean {
            if (type(value) !== 'number') return false;

            return value.length > n;
        },
    });

    return rule.add();
}

export function MaxLength(n: number, message: string = messages.MaxLength): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'MaxLength',
        ruleParams: [n],
        message,
        validate(value: any): boolean {
            if (type(value) !== 'number') return false;

            return value.length < n;
        },
    });

    return rule.add();
}
