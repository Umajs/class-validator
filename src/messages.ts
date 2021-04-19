import { assign } from './utils';

export const messages = {
    Min: 'min not lt {0}',
    Max: 'max not gt {0}',
    Range: 'range number between {0} and {1}',
    Type: 'type must be {0}',
    Int: 'type must be {0}',
    Required: 'not null',
    MinLength: 'min.length.not lt {0}',
    MaxLength: 'min.length.not gt {0}',
};

export type RuleKeys = typeof messages;

export function UpdateMessages(params: { [P in keyof RuleKeys]?: string } = {}) {
    assign(messages, params);

    Object.freeze(messages);
}
