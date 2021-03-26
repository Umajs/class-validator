import { RulesMap, TipsMap } from './Rule';
import { checker, hasOwnProperty } from './utils';

export default class Model {
    constructor(isValid: boolean = true) {
        const rules = RulesMap.get(this.constructor) ?? {};

        for (const propertyKey in rules) {
            if (!hasOwnProperty(rules, propertyKey)) continue;

            let keyValue = this[propertyKey];

            Object.defineProperty(this, propertyKey, {
                enumerable: true,
                set(v) {
                    const result = checker(rules[propertyKey], v);

                    if (result.length > 0) {
                        const tips = TipsMap.get(this) || {};

                        tips[propertyKey] = result;
                        TipsMap.set(this, tips);

                        if (isValid) return;
                    }

                    keyValue = v;
                },
                get() {
                    return keyValue;
                },
            });
        }
    }
}
