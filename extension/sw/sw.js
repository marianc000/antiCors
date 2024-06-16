import { setCorrectIconForTabId  } from './listeners/tabs.js';
import { optionsChanged } from './listeners/options.js';
import { onInstalled } from './listeners/installed.js';
import { onClicked } from './listeners/action.js';

chrome.runtime.onInstalled.addListener(onInstalled);

chrome.action.onClicked.addListener(onClicked);

chrome.storage.onChanged.addListener(optionsChanged);

chrome.tabs.onUpdated.addListener(setCorrectIconForTabId);
 
chrome.permissions.onRemoved.addListener(onInstalled);