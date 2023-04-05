// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.addEventListener('DOMContentLoaded', () => {
        const replaceTest = (selector, text) => {
            const element = document.getElementById(selector)
            if (element) element.innerText = text;
        }

        for (const type of [node, chrome, electron]) {
            replaceTest (`${type}-version`, process.versions[type]);
        }
    }
)