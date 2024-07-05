import { rulesExistForUrl, clearRulesForUrl, addRuleToTab } from '../rules/rules.js';
import { hostname, origin } from '../net/url.js';

export const ON = 'on', OFF = 'off';

const states = {
    [ON]: {
        title: 'Stop enabling cross-origin requests from ',
        imagePath: '/images/on.png',
    },
    [OFF]: {
        title: 'Enable cross-origin requests from ',
        imagePath: '/images/off.png',
    }
};

function stateObj(state, url) {
    const obj = structuredClone(states[state]);
    if (url)
        obj.title += hostname(url);
    return obj;
}

function boolToKey(isOn) {
    return isOn ? ON : OFF;
}

export function setOff() {
    return setState(OFF);
}

export async function setStateFromUrl(tabId, url) {
    return rulesExistForUrl(url)
        .then(isOn => setStateFromBool(tabId, isOn, url));
};

export async function setStateForUrl(url, nextState) {
    const tabs = await chrome.tabs.query({ url: [origin(url) + '/*'] });

    for (let i = 0; i < tabs.length; i++) {
        const { id: tabId, url } = tabs[i];
        await setStateFromBool(tabId, nextState, url);
    }
};

function setStateFromBool(tabId, isOn, url) {
    const state = boolToKey(isOn);
    return setState(state, tabId, url);
}

function setState(state, tabId, url) {
    return setStateFromObject(stateObj(state, url), tabId);
}

async function setStateFromObject({ title, imagePath }, tabId) {
    if (tabId) {
        await chrome.action.setTitle({ tabId, title });
        await chrome.action.setIcon({ tabId, path: imagePath });
    } else {
        await chrome.action.setTitle({ title });
        await chrome.action.setIcon({ path: imagePath });
    }
}

export async function setNextState(url) {
    const nextState = !await rulesExistForUrl(url);
 
    await setStateForUrl(url, nextState);
    
    if (nextState)
        await addRuleToTab(url);
    else
        await clearRulesForUrl(url);
}
