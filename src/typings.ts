export type Types = 'undefined' | 'string' | 'null' | 'number' | 'number' | 'boolean'
    | 'date' | 'function' | 'object' | 'array' | 'map' | 'set' | 'symbol' | 'function'
    | 'promise' | 'weakset' | 'weakmap' | 'generatorfunction' | 'asyncfunction' | 'object' | 'regexp';

export type PlainObject = {
    [key: string]: any,
}

export type ValidateInfoList = {
    [key: string]: string[],
}
