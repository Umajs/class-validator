import { ValidateInfoList } from './typings';
import { checker } from './utils';

const RulesMap: Map<any, { [key: string]: Rule[] }> = new Map();

export const TipsMap: Map<any, ValidateInfoList> = new Map();

export default class Rule {
    constructor({
        ruleType,
        ruleParams = [],
        validate,
        message,
    }: {
        ruleType: string,
        ruleParams?: any[],
        validate: (value: any) => boolean,
        message: string,
    }) {
        this.ruleType = ruleType;
        this.ruleParams = ruleParams;
        this.validate = validate ?? (() => { throw new Error('Params validate call not be null.') });
        this.message = message ?? `${ ruleType } validate error.`;
    }

    ruleType: string;

    ruleParams: any[];

    /**
     * Result
     * true pass
     * false fail
     */
    validate: (value: any) => boolean;

    message: string;

    add(): PropertyDecorator {
        if (!(this instanceof Rule)) throw new Error('....');
        const self = this;

        return function validate(target: Object, propertyKey: string) {
            if (!RulesMap.has(target)) RulesMap.set(target, {});

            const rules = RulesMap.get(target)[propertyKey] ?? [];

            rules.push(self);

            RulesMap.get(target)[propertyKey] = rules;

            let keyValue = target[propertyKey];

            Reflect.defineProperty(target, propertyKey, {
                set(v) {
                    const result = checker(RulesMap.get(target)[propertyKey], v);

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
        };
    }
}
