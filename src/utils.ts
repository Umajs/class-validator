import Rule from './Rule';
import { PlainObject, Types } from './typings';

export function symbol(desc: string | number) {
    if (Symbol) return Symbol(desc);

    return `__umajs__${desc}__`;
}

symbol.for = function symbolFor(key: string) {
    if (Symbol) return Symbol.for(key);

    return `__umajs__${key}__`;
};

export const TIPS = symbol('Tips');

export const VALID_BLOCK = symbol('validBlock');

export const RULES = '__umajs__Rules__';

export const undef = ((ud) => ud)();

const objProto = Object.prototype;

/**
 * 占位模版，例如
 * template('{0}, {1}', ['Hello', 'world']); ==> 'Hello, world';
 * @param tempStr 模版字符串
 * @param params 模版变量数组
 * @returns 内容
 */
export const template = (tempStr: string, params: any[]) => tempStr.replace(/\{(\d+)\}/g, (_, index) => params[index]);

export const toString = (obj: any): string => objProto.toString.call(obj);

export const type = (obj: any): Types => <Types>toString(obj).slice(8, -1).toLowerCase();

export const isEmpley = (obj: any): boolean => (obj === null || obj === undef);

export const hasOwnProperty = (target: PlainObject, key: string): boolean => objProto.hasOwnProperty.call(target, key);

/**
 * 按目标 key 进行浅拷贝
 * @param target 目标
 * @param source 传入对象
 * @returns 目标
 */
export function assign<T extends PlainObject>(target: T, source: PlainObject): void {
    if (type(target) !== 'object' || type(source) !== 'object') return;

    for (const key in target) {
        if (hasOwnProperty(source, key)) target[key] = source[key];
    }
}

/**
 * 获取校验后的结果
 * @param target 实例化对象
 * @param value 可选：给实例化对象传入的健值对
 * @returns [检验信息, 实例化对象]
 */
export function Validate<T extends Object, K = string>(target: T, value?: T): [{ [key: string]: K[] }, T] {
    if (value !== undefined) {
        assign(target, value);
    }

    const ruleInfo = target[TIPS];

    if (target[VALID_BLOCK]) target[TIPS] = {};

    return [Object.keys(ruleInfo).length === 0 ? null : ruleInfo, target];
}

/**
 * 校验
 * @param rules 校验规则数组
 * @param key 被检验的名称
 * @param value 被检验的值
 * @returns 校验信息
 */
export function checker<K = string>(rules: Rule[], key: string, value: any): K[] {
    const msgs = [];

    for (const rule of rules) {
        if (!rule.validate(value)) {
            const msg = template(rule.message, [key].concat(rule.ruleParams));

            if (type(rule.messageTransform) === 'function') {
                msgs.push(rule.messageTransform(key, msg, rule.ruleType, rule.ruleParams));
            } else {
                msgs.push(msg);
            }
        }
    }

    return msgs;
}
