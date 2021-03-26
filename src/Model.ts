import { Rule } from '.';
import { checker, hasOwnProperty } from './utils';

export const TIPS = Symbol('Tips');
export const RULES = Symbol('Rules');

export default class Model {
    constructor(isValid: boolean = true) {
        const rulesObj: { [key: string]: Rule[] } = this.constructor[RULES];

        for (const propertyKey in rulesObj) {
            if (!hasOwnProperty(rulesObj, propertyKey)) continue;

            const rules = rulesObj[propertyKey];
            let keyValue = this[propertyKey];

            Object.defineProperty(this, propertyKey, {
                enumerable: true,
                set(v) {
                    const tips = checker(rules, v);
                    const tipsObj: { [key: string]: string[] } = this[TIPS];

                    if (tips.length > 0) {
                        tipsObj[propertyKey] = tips;

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

    [TIPS]?: { [key: string]: string[] } = {};

    static [RULES]: { [key: string]: Rule[] } = {};
}
