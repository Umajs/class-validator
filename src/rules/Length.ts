import Rule from '../Rule';
import { type } from '../utils';

export function MinLength(n: number, message: string = 'min..not lt {0}'): PropertyDecorator {
    const rule = new Rule({
        message,
        validate(value: any): boolean {
            if (type(value) !== 'number') return false;

            return value.length > n;
        },
    });

    return rule.add();
}

export function MaxLength(n: number, message: string = 'min..not gt {0}'): PropertyDecorator {
    const rule = new Rule({
        message,
        validate(value: any): boolean {
            if (type(value) !== 'number') return false;

            return value.length < n;
        },
    });

    return rule.add();
}
