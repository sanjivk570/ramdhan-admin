const fs = require('fs');

let text = fs.readFileSync('c:/wamp/www/ramdhan-admin/RamDhan.postman_collection.json', 'utf8');
if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
const c = JSON.parse(text);
const items = c.item || [];

function walk(a, prefix) {
    for (const it of a) {
        const req = it.request || {};
        const m = (req.method || '').toUpperCase();
        const raw = req.url && req.url.raw;
        let u = typeof raw === 'string' ? raw.replace(/{{[^}]+}}/g, '<x>') : '';
        const qIdx = u.indexOf('?');
        let query = qIdx >= 0 ? u.slice(qIdx + 1) : '';
        if (qIdx >= 0) u = u.slice(0, qIdx);
        u = u.replace(/^https?:\/\/[^/]+/, '');
        const p = prefix || '';
        if (/customer|supplier|address|shipping/i.test(p + ' ' + u)) {
            console.log('[' + p + '] ' + m.padEnd(6) + ' ' + u + (query ? ' ?' + query : ''));
            if (req.body && req.body.mode === 'raw' && req.body.raw) {
                console.log('    BODY: ' + req.body.raw.slice(0, 400).replace(/\r?\n\s*/g, ' '));
            }
        }
        if (it.item) walk(it.item, prefix ? prefix + '/' + it.name : it.name);
    }
}
walk(items, '');