import { setStateFromUrl } from '../state/state.js';
import { valid } from '../net/url.js';

export async function setCorrectIconForTabId(tabId) {
    const { url } = await chrome.tabs.get(tabId);
 
    if (valid(url))
        setStateFromUrl(tabId, url);
};