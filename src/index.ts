import { RuleKeys, UpdateMessages } from './messages';
import { MessageTransform } from './Rule';

export { Validate } from './utils';

export { Required } from './rules/Required';
export { Type, Int } from './rules/Type';
export { Min, Max } from './rules/Number';
export { MinLength, MaxLength } from './rules/Length';

export { default as Rule } from './Rule';
export { default as Model } from './Model';

export {
    /** @deprecated, Use the Init() */
    UpdateMessages,
    /** @deprecated, Use the Init() */
    MessageTransform,
};

export function Init({
    updateMessages,
    messageTransform,
}: {
    updateMessages?: { [P in keyof RuleKeys]?: string },
    messageTransform?: (key: string, message: string, ruleType?: string, ruleParams?: any[]) => void
}) {
    if (updateMessages) UpdateMessages(updateMessages);

    if (messageTransform) MessageTransform(messageTransform);
}
