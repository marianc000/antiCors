import { hasHeader } from './headers.js';

export function corsRule(id, hostname, origin) {

    return {
        id,
        priority: 1,
        action: {
            type: "modifyHeaders",
            responseHeaders: [
                {
                    header: "Access-Control-Allow-Origin",
                    operation: "set",
                    value: origin
                },
                {
                    header: "Access-Control-Allow-Methods",
                    operation: "set",
                    value: "GET,POST,PUT,DELETE,PATCH,HEAD"
                },
                {
                    header: "Access-Control-Allow-Headers",
                    operation: "append",
                    value: "content-type,authorization,*"
                },
                {
                    header: "Access-Control-Allow-Credentials",
                    operation: "set",
                    value: "true"
                }
            ]
        },
        condition: {
            initiatorDomains: [hostname],
            domainType: "thirdParty",
            resourceTypes: ["xmlhttprequest"]
        }
    };
}

export function isCorsRule(rule) {
    return hasHeader(rule,'Access-Control-Allow-Origin');
}

export function corsRuleHostname(rule) {
    return rule.condition.initiatorDomains[0];
}