import { setNextState } from '../state/state.js';
import { permissions, printPermissions } from '../permissions/permissions.js';
import { valid } from '../net/url.js';

export async function onClicked({ url }) {

    if (!valid(url)) return;//browser system pages chrome://

    const granted = await chrome.permissions.request(permissions());

    if (granted) {
        setNextState(url);
    }
};