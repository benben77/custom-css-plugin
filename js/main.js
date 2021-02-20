let data;

function getData() {
  if (!data) {
    data = {
      hostname: '',
      style: '.application-main { background: gray; }', // github
      async init() {
        const hostname = await getCurrentDomain();
        this.hostname = hostname;
      },
    };
  }
  return data;
};

function saveStyle() {

}

function doApplyStyle(str) {
  const id = '#__custom_style__';
  let style = document.querySelector(id);
  if (style) style.remove();
  style = document.createElement('style');
  style.textContent = str;
  document.head.appendChild(style);
}

function applyStyle() {
  const code = `${doApplyStyle.toString()};doApplyStyle("${getData().style}")`;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code }
    );
  });
}

function getCurrentDomain() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = new URL(tabs[0].url);
      resolve(url.hostname);
    });
  });
}

//   chrome.tabs.executeScript(
//       tabs[0].id,
//       {code: 'document.body.style.backgroundColor = "' + color + '";'});

// chrome.storage.sync.set({color: item}, function() {
//   console.log('color is ' + item);
// });
