const OPTIONS_KEY = 'options';

export function loadOptions() {
    return chrome.storage.local.get(OPTIONS_KEY).then(o => o[OPTIONS_KEY]);
}

const defaults = { "setConnectSrc": true };

export async function initOptions() {
   //await chrome.storage.local.clear();
    return loadOptions().then(o => {
        if (!o)
            return saveOptions(defaults);
        else
            console.log('>reusing the options');
    });
}

export function saveOptions(options) {
    return chrome.storage.local.set({ [OPTIONS_KEY]: options });
};