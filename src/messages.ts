import { assign } from './utils';

export const messages = {
    Min: '{0} must be greater than {1}.',
    Max: '{0} must be less than {1}.',
    Range: '{0} must have a length between {1} and {2}.',
    Type: '{0} must be of type {1}.',
    Int: '{0} must be of type {1}.',
    Required: '{0} is required.',
    MinLength: '{0} must have a minimum length of {1}.',
    MaxLength: '{0} must have a maximum length of {1}.',
};

export type RuleKeys = typeof messages;

export function UpdateMessages(params: { [P in keyof RuleKeys]?: string } = {}) {
    assign(messages, params);
}
