import Rule from '../Rule';
import { type } from '../utils';

export function Min(n: number, message: string = 'min..not lt {0}'): PropertyDecorator {
    const rule = new Rule({
        message,
        validate(value: any): boolean {
            if (type(value) !== 'number') return false;

            return +value > n;
        },
    });

    return rule.add();
}

export function Max(n: number, message: string = 'min..not gt {0}'): PropertyDecorator {
    const rule = new Rule({
        message,
        validate(value: number): boolean {
            if (type(value) !== 'number') return false;

            return +value < n;
        },
    });

    return rule.add();
}

export function Range(min: number, max: number, message: string = 'min..not gt {0}'): PropertyDecorator {
    const rule = new Rule({
        message,
        validate(value: number): boolean {
            if (type(value) !== 'number') return false;

            return value > min && value < max;
        },
    });

    return rule.add();
}
