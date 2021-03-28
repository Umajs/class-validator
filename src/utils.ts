import Rule from './Rule';
import { PlainObject, Types } from './typings';

export const TIPS = Symbol('Tips');

export const RULES = Symbol('Rules');

export const undef = ((ud) => ud)();

/**
 * 占位模版，例如
 * template('Hello, {0}', [world]); ==> 'Hello, world';
 * @param tempStr 模版字符串
 * @param params 模版变量数组
 * @returns 内容
 */
export const template = (tempStr: string, ...params: any[]) => tempStr.replace(/\{(\d+)\}/g, (_, index) => params[index]);

export const toString = (obj: any): string => Object.prototype.toString.call(obj);

export const type = (obj: any): Types => <Types>toString(obj).slice(8, -1).toLowerCase();

export const isEmpley = (obj: any): boolean => (obj === null || obj === undef);

export const hasOwnProperty = (target: PlainObject, key: string): boolean => ({}.hasOwnProperty.call(target, key));

/**
 * 按目标 key 进行浅拷贝
 * @param target 目标
 * @param source 传入对象
 * @returns 目标
 */
export const assign = (target: PlainObject, source: PlainObject): void => {
    if (type(target) !== 'object' || type(source) !== 'object') return;

    Object.keys(target).forEach((key) => {
        if (hasOwnProperty(source, key)) target[key] = source[key];
    });
};

/**
 * 获取校验后的结果
 * @param target 实例化对象
 * @param value 可选：给实例化对象传入的健值对
 * @returns [检验信息, 实例化对象]
 */
export function Validate<T extends Object>(target: T, value?: T): [{ [key: string]: string[] }, T] {
    if (value !== undefined) {
        assign(target, value);
    }

    const ruleInfo = target[TIPS];

    target[TIPS] = {};

    return [ruleInfo, target];
}

/**
 * 校验
 * @param rules 校验规则数组
 * @param value 被检验的值
 * @returns 校验信息
 */
export function checker(rules: Rule[], value: any): string[] {
    const msgs = [];

    for (const rule of rules) {
        if (!rule.validate(value)) {
            msgs.push(template(rule.message, rule.ruleParams));
        }
    }

    return msgs;
}
