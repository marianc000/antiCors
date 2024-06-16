import { hostname, origin } from '../net/url.js';
import { uniqueId  } from './ids.js';
import { corsRule } from './corsrule.js';
import { cspRuleFromCorsRule } from './csprule.js';

export function newRules(url, setConnectSrc) {
  const rules = [corsRule(uniqueId(), hostname(url), origin(url))];

  if (setConnectSrc)
    rules.push(cspRuleFromCorsRule(rules[0]));

  return rules;
}
