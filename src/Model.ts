import Rule from './Rule';
import { checker, hasOwnProperty, isEmpley, IS_VALID, RULES, TIPS } from './utils';

export default class Model {
    constructor(isValid: boolean = true) {
        const rulesObj: { [key: string]: Rule[] } = this.constructor[RULES];

        Object.defineProperties(this, {
            [TIPS]: {
                enumerable: false,
                writable: true,
                value: {},
            },
            [IS_VALID]: {
                enumerable: false,
                writable: true,
                value: isValid,
            }
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
                    } else if (!isEmpley(tipsObj[key])) {
                        delete this[TIPS][key];
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
