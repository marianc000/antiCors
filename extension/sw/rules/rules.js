import { newRules } from "./template.js";
import { loadOptions } from '../../shared/options.js';
import { hostname } from '../net/url.js';
import { showAllRules } from './debug.js';


function updateRulesRemoveIds(addRules, removeRuleIds) {
    return chrome.declarativeNetRequest
        .updateSessionRules({ addRules, removeRuleIds })
        .then(showAllRules);
}

export function updateRules(addRules, removeRules) {
    return updateRulesRemoveIds(addRules, removeRules.map(rule => rule.id));
}

function clearRules(rules) {
    return updateRules([], rules);
}

export function clearRulesForUrl(url) {
    return rulesForUrl(url).then(clearRules);
}

export function getAllRules() {
    return chrome.declarativeNetRequest.getSessionRules();
}

export async function addRuleToTab(url) {
    const { setConnectSrc } = await loadOptions();
    const existingRules = await rulesForUrl(url);

    const rules = newRules(url, setConnectSrc);

    return updateRules(rules, existingRules);
};

export function rulesExistForUrl(url) {
    return rulesForUrl(url).then(rules => rules.length);
}

function rulesForUrl(url) {
    const domain = hostname(url);

    return getAllRules()
        .then(rules => rules.filter(o => [o.condition.initiatorDomains, o.condition.requestDomains].filter(o => o).flat().includes(domain)));
}
