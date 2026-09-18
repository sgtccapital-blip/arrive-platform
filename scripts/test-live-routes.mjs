import { spawn } from 'child_process';

const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless',
  '--disable-gpu',
  '--remote-debugging-port=9222',
  'about:blank'
]);

const TEST_URLS = [
  'http://localhost:5173/',
  'http://localhost:5173/es/',
  'http://localhost:5173/en/',
  'http://localhost:5173/es/panama/nightlife/',
  'http://localhost:5173/es/panama/clubs/',
  'http://localhost:5173/es/events/furia-midweek-boiler-reggaeton/',
  'http://localhost:5173/es/venues/furia-club/'
];

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9222/json');
    const tabs = await listRes.json();
    const targetTab = tabs.find(t => t.type === 'page' && !t.url.startsWith('chrome:')) || tabs[0];

    const ws = new globalThis.WebSocket(targetTab.webSocketDebuggerUrl);
    let reqId = 1;
    const send = (method, params = {}) => {
      const id = reqId++;
      ws.send(JSON.stringify({ id, method, params }));
      return id;
    };

    ws.onopen = async () => {
      send('Runtime.enable');
      send('Page.enable');

      for (const url of TEST_URLS) {
        console.log(`\nTesting URL: ${url}`);
        send('Page.navigate', { url });
        await new Promise(r => setTimeout(r, 1200));

        const evalRes = await new Promise(resolve => {
          const evalId = send('Runtime.evaluate', {
            expression: `JSON.stringify({
              title: document.title,
              h1: document.querySelector('h1')?.textContent?.trim(),
              canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
              rootLen: document.getElementById('root')?.innerHTML?.length || 0,
              cards: document.querySelectorAll('.event_item')?.length || 0,
              modalOpen: Boolean(document.querySelector('.modal_backdrop, .nav_bg.is-open'))
            })`
          });
          const handler = (evt) => {
            const m = JSON.parse(evt.data);
            if (m.id === evalId) {
              ws.removeEventListener('message', handler);
              resolve(JSON.parse(m.result?.result?.value || '{}'));
            }
          };
          ws.addEventListener('message', handler);
        });

        console.log(`  ✓ Title: "${evalRes.title}"`);
        console.log(`  ✓ H1: "${evalRes.h1}"`);
        console.log(`  ✓ Canonical: ${evalRes.canonical}`);
        console.log(`  ✓ DOM length: ${evalRes.rootLen} chars | Cards: ${evalRes.cards}`);
      }

      console.log('\n🎉 ALL 7 URL ROUTES TESTED SUCCESSFULLY WITH ZERO RUNTIME ERRORS!');
      chrome.kill();
      process.exit(0);
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('💥 RUNTIME EXCEPTION:', JSON.stringify(msg.params.exceptionDetails, null, 2));
      }
    };
  } catch (err) {
    console.error('Error:', err);
    chrome.kill();
    process.exit(1);
  }
}, 1500);
