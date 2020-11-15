//
// @project     web-desk
//
// @author      Sanjeev Premi
//
// @license     BSD-3-Clause
//

//
// All NodeJS APIs are available here.
// The process runs in the same sandbox as a Chrome Extension.
//

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  //
  // Fill version numbers in 'index.html'.
  //
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions]);
  }
});
