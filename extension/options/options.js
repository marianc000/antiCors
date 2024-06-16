import { loadOptions, saveOptions } from '../shared/options.js';

function displayOptions(options) {
    setConnectSrcChbx.checked = options.setConnectSrc;
}

async function loadAndDisplayOptions() {
    return loadOptions().then(displayOptions);
}

function collectOptions(){
    return {setConnectSrc:setConnectSrcChbx.checked};
}

function onSave() {
    saveOptions(collectOptions()).then(loadAndDisplayOptions);
};

loadAndDisplayOptions();

setConnectSrcChbx.addEventListener('change', onSave);
