import { RulesMap, TipsMap } from './Rule';
import { checker } from './utils';

export default class Model {
    constructor() {
        const rules = RulesMap.get(this.constructor);

        for (const propertyKey in rules) {
            if ({}.hasOwnProperty.call(rules, propertyKey)) {
                let keyValue = this[propertyKey];

                Reflect.defineProperty(this, propertyKey, {
                    enumerable: true,
                    set(v) {
                        const result = checker(rules[propertyKey], v);

                        if (result.length > 0) {
                            const tips = TipsMap.get(this) || {};

                            tips[propertyKey] = result;
                            TipsMap.set(this, tips);

                            return;
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
}
