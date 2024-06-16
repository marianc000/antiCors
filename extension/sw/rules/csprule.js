import { hasHeader } from './headers.js';
import { coupledId } from './ids.js';
import { corsRuleHostname } from './corsrule.js';

export function cspRule(id, hostname) {

    return {
        id,
        priority: 1,
        action: {
            type: "modifyHeaders",
            responseHeaders: [
                {
                    "header": "Content-Security-Policy",
                    "operation": "set",
                    "value": "connect-src * blob: mediastream: data:;"
                }
            ]
        },
        condition: {
            requestDomains: [hostname],
            resourceTypes: [
                "main_frame"
            ]
        }
    };
}

export function isCspRule(rule) {
    return hasHeader(rule, 'Content-Security-Policy');
}

export function cspRuleFromCorsRule(rule) {
    return cspRule(coupledId(rule), corsRuleHostname(rule));
}

