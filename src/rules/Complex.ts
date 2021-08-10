import { Model } from '..';
import Rule from '../Rule';

export function Complex(model: Model): PropertyDecorator {
    const rule = new Rule({
        ruleType: 'Complex',
        ruleParams: [model],
        validate: () => true,
    });

    return rule.add();
}
