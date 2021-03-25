import { ValidateInfoList } from './typings';

export const RulesMap: Map<any, { [key: string]: Rule[] }> = new Map();

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

        return function validate({ constructor }: Object, propertyKey: string) {
            if (!RulesMap.has(constructor)) RulesMap.set(constructor, {});

            const rules = RulesMap.get(constructor)[propertyKey] ?? [];

            rules.push(self);

            RulesMap.get(constructor)[propertyKey] = rules;
        };
    }
}
