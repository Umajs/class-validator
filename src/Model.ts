import Rule from './Rule';
import { checker, hasOwnProperty, isEmpley, VALID_BLOCK, RULES, TIPS, symbol } from './utils';

export default class Model {
    constructor(validBlock: boolean = true) {
        const rulesObj: { [key: string]: Rule[] } = this.constructor[RULES];

        Object.defineProperties(this, {
            [TIPS]: {
                enumerable: false,
                writable: true,
                value: {},
            },
            [VALID_BLOCK]: {
                enumerable: false,
                writable: true,
                value: validBlock,
            },
        });

        for (const key in rulesObj) {
            if (!hasOwnProperty(rulesObj, key)) continue;

            const rules = rulesObj[key];

            Object.defineProperties(this, {
                [symbol.for(key)]: {
                    enumerable: false,
                    writable: true,
                    value: this[key],
                },
                [key]: {
                    enumerable: true,
                    set(val) {
                        const tips = checker(rules, key, val);
                        const tipsObj: { [key: string]: string[] } = this[TIPS];

                        if (tips.length > 0) {
                            tipsObj[key] = tips;

                            if (validBlock) return;
                        } else if (!isEmpley(tipsObj[key])) {
                            delete this[TIPS][key];
                        }

                        this[symbol.for(key)] = val;
                    },
                    get() {
                        return this[symbol.for(key)];
                    },
                },
            });
        }
    }
}
