export async function showAllRules() {
    const oldRules2 = await chrome.declarativeNetRequest.getSessionRules();
    console.log('>getSessionRules', oldRules2);
}