export function hasHeader(rule,header) {
    return rule.action.responseHeaders.find(h => h.header === header);
}