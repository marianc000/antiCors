import { isCspRule, cspRuleFromCorsRule } from '../rules/csprule.js';
import { isCorsRule } from '../rules/corsrule.js';
import { getAllRules, updateRules } from '../rules/rules.js';
import { loadOptions } from '../../shared/options.js';

export async function optionsChanged() {

    const rules = await getAllRules();
    const { setConnectSrc } = await loadOptions()||{};

    const corsRules = rules.filter(isCorsRule);
    const cspRules = rules.filter(isCspRule);
    let newCspRules = [];

    if (setConnectSrc) {
        newCspRules = corsRules.map(rule => cspRuleFromCorsRule(rule));
    }

    return updateRules(newCspRules, cspRules);
};


