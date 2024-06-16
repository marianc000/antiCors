import { setOff } from '../state/state.js';
import { initOptions } from '../../shared/options.js';
import { printPermissions } from '../permissions/permissions.js';

export async function onInstalled() {
    await initOptions();
    await setOff();
};