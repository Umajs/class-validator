import Rule, { TipsMap } from './Rule';
import { Types, ValidateInfoList } from './typings';

export const template = (s: string, ...params: any[]) => s.replace(/\{(\d+)\}/g, (_, index) => params[index]);

export const toString = (obj: any): string => Object.prototype.toString.call(obj);

export const type = (obj: any): Types => <Types>toString(obj).slice(8, -1).toLowerCase();

export function Validate<T extends Object>(target: T, value?: T): [ValidateInfoList, T] {
    if (value !== undefined) {
        Object.keys(target).forEach((key) => {
            if (value.hasOwnProperty(key)) target[key] = value[key];
        });
    }

    const ruleInfo = TipsMap.get(target);

    TipsMap.set(target, null);

    return [ruleInfo, target];
}

export function checker(rules: Rule[], value: any): string[] {
    const msgs = [];

    for (const rule of rules) {
        if (!rule.validate(value)) {
            msgs.push(rule.message);
        }
    }

    return msgs;
}
