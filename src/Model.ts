import Rule from './Rule';
import { checker, hasOwnProperty, RULES, TIPS } from './utils';

export default class Model {
    constructor(isValid: boolean = true) {
        const rulesObj: { [key: string]: Rule[] } = this.constructor[RULES];

        Object.defineProperty(this, TIPS, {
            enumerable: false,
            writable: true,
            value: {},
        });

        for (const key in rulesObj) {
            if (!hasOwnProperty(rulesObj, key)) continue;

            const rules = rulesObj[key];
            let keyValue = this[key];

            Object.defineProperty(this, key, {
                enumerable: true,
                set(val) {
                    const tips = checker(rules, key, val);
                    const tipsObj: { [key: string]: string[] } = this[TIPS];

                    if (tips.length > 0) {
                        tipsObj[key] = tips;

                        if (isValid) return;
                    }

                    keyValue = val;
                },
                get() {
                    return keyValue;
                },
            });
        }
    }

    static [RULES]: { [key: string]: Rule[] } = {};
}
