const http = require('http');
const { exec } = require('child_process');

// Launch chrome with debugging port and temp user data dir
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\LWS\\AppData\\Local\\Temp\\chrome-debug-' + Date.now();
const chromeProcess = exec(`"${chromePath}" --headless=new --remote-debugging-port=9222 --user-data-dir="${userDataDir}" --window-size=390,844 http://localhost:5174/`);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('5174')) || tabs[0];
    if (!tab) {
      console.log('No tab found');
      process.exit(1);
    }

    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    ws.addEventListener('open', () => {
      let id = 1;
      const send = (method, params = {}) => {
        return new Promise((resolve) => {
          const msgId = id++;
          const handler = (event) => {
            const parsed = JSON.parse(event.data);
            if (parsed.id === msgId) {
              ws.removeEventListener('message', handler);
              resolve(parsed.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id: msgId, method, params }));
        });
      };

      (async () => {
        await send('Page.enable');
        await send('DOM.enable');
        await send('Runtime.enable');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true
        });

        await send('Page.navigate', { url: 'http://localhost:5174/' });
        await new Promise(r => setTimeout(r, 2500));

        const offsetsRes = await send('Runtime.evaluate', {
          expression: `
            (() => {
              const getTop = (sel) => {
                const el = document.querySelector(sel);
                return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null;
              };
              return JSON.stringify({
                hero: getTop('.hero'),
                dark: getTop('.dark'),
                sec4: getTop('#section-4'),
                sec5: getTop('#section-5'),
                sec6: getTop('#section-6'),
                sec7: getTop('#section-7'),
                sec8: getTop('#pricing'),
                footer: getTop('#footer')
              });
            })()
          `,
          returnByValue: true
        });
        const offsets = JSON.parse(offsetsRes.result.value);
        console.log('Section offsets:', offsets);

        const fs = require('fs');

        // Capture Section 7
        if (offsets.sec7) {
          await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${offsets.sec7 - 60})` });
          await new Promise(r => setTimeout(r, 600));
          const s7 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('C:\\Carlo\\eveia-landing\\shot_sec7.png', Buffer.from(s7.data, 'base64'));
        }

        // Capture Section 8
        if (offsets.sec8) {
          await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${offsets.sec8 - 60})` });
          await new Promise(r => setTimeout(r, 600));
          const s8 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('C:\\Carlo\\eveia-landing\\shot_sec8.png', Buffer.from(s8.data, 'base64'));
        }

        // Test mobile menu open!
        await send('Runtime.evaluate', {
          expression: `
            (() => {
              const toggle = document.querySelector('.nav-mobile-toggle');
              if (toggle) toggle.click();
            })()
          `
        });
        await new Promise(r => setTimeout(r, 600));
        const drawerShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('C:\\Carlo\\eveia-landing\\shot_drawer.png', Buffer.from(drawerShot.data, 'base64'));

        console.log('Section 7, Section 8, and Drawer screenshots captured!');

        ws.close();
        try { process.kill(chromeProcess.pid); } catch(e) {}
        process.exit(0);
      })();
    });
  } catch (err) {
    console.error('Error:', err);
    try { process.kill(chromeProcess.pid); } catch(e) {}
    process.exit(1);
  }
}, 1500);
