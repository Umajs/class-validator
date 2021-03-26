import { TIPS } from './Model';
import Rule from './Rule';
import { PlainObject, Types } from './typings';

export const template = (s: string, ...params: any[]) => s.replace(/\{(\d+)\}/g, (_, index) => params[index]);

export const toString = (obj: any): string => Object.prototype.toString.call(obj);

export const type = (obj: any): Types => <Types>toString(obj).slice(8, -1).toLowerCase();

export const hasOwnProperty = (target: PlainObject, key: string): boolean => ({}.hasOwnProperty.call(target, key));

export const assign = (target: PlainObject, source: PlainObject): void => {
    if (type(target) !== 'object' || type(source) !== 'object') return;

    Object.keys(target).forEach((key) => {
        if (hasOwnProperty(source, key)) target[key] = source[key];
    });
};

export function Validate<T extends Object>(target: T, value?: T): [{ [key: string]: string[] }, T] {
    if (value !== undefined) {
        assign(target, value);
    }

    const ruleInfo = target[TIPS];

    target[TIPS] = {};

    return [ruleInfo, target];
}

export function checker(rules: Rule[], value: any): string[] {
    const msgs = [];

    for (const rule of rules) {
        if (!rule.validate(value)) {
            msgs.push(template(rule.message, rule.ruleParams));
        }
    }

    return msgs;
}
