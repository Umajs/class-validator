import Rule from '../Rule';
import { messages } from '../messages';
import { isEmpley, type } from '../utils';

export function Min(n: number, message: string = messages.Min): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'Min',
        ruleParams: [n],
        message,
        validate(value: any): boolean {
            if (isEmpley(value)) return true;

            if (type(value) !== 'number') return false;

            return value > n;
        },
    });

    if (type(Min.messageTransform) === 'function') rule.messageTransform = Min.messageTransform;

    return rule.add();
}

Min.messageTransform = null;

export function Max(n: number, message: string = messages.Max): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'Max',
        ruleParams: [n],
        message,
        validate(value: number): boolean {
            if (isEmpley(value)) return true;

            if (type(value) !== 'number') return false;

            return value < n;
        },
    });

    if (type(Max.messageTransform) === 'function') rule.messageTransform = Max.messageTransform;

    return rule.add();
}

Max.messageTransform = null;

export function Range(min: number, max: number, message: string = messages.Range): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'Min',
        ruleParams: [min, max],
        message,
        validate(value: number): boolean {
            if (isEmpley(value)) return true;

            if (type(value) !== 'number') return false;

            return value > min && value < max;
        },
    });

    if (type(Range.messageTransform) === 'function') rule.messageTransform = Range.messageTransform;

    return rule.add();
}

Range.messageTransform = null;
