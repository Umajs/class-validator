import { messages } from '../messages';
import Rule from '../Rule';
import { type } from '../utils';

export function Min(n: number, message: string = 'min..not lt {0}'): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'Min',
        ruleParams: [n],
        message,
        validate(value: any): boolean {
            if (type(value) !== 'number') return false;

            return +value > n;
        },
    });

    return rule.add();
}

export function Max(n: number, message: string = messages.Max): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'Max',
        ruleParams: [n],
        message,
        validate(value: number): boolean {
            if (type(value) !== 'number') return false;

            return +value < n;
        },
    });

    return rule.add();
}

export function Range(min: number, max: number, message: string = messages.Range): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'Min',
        ruleParams: [min, max],
        message,
        validate(value: number): boolean {
            if (type(value) !== 'number') return false;

            return value > min && value < max;
        },
    });

    return rule.add();
}
