export function permissions() {
   return {
      permissions: ['declarativeNetRequest'],
      origins: ['<all_urls>']// cannot know to what url requests will be made
   };
}

export function printPermissions() {
   return chrome.permissions.getAll().then(ar => console.log('>permissions: ', ar));
}