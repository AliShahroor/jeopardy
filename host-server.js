const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const root = __dirname;
const port = Number(process.env.PORT || 8787);
const rooms = new Map();

function loadFamilyFeud() {
  const source = fs.readFileSync(path.join(root, 'jeopardy-extra.js'), 'utf8');
  const context = {};
  vm.createContext(context);
  vm.runInContext(`${source}\n;globalThis.__FAMILY_FEUD__ = FAMILY_FEUD;`, context);
  return context.__FAMILY_FEUD__ || [];
}

const familyFeud = loadFamilyFeud();

function id(size = 8) {
  return crypto.randomBytes(size).toString('hex');
}

function send(res, status, data, headers = {}) {
  const body = typeof data === 'string' ? data : JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': typeof data === 'string' ? 'text/plain; charset=utf-8' : 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers
  });
  res.end(body);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1_000_000) req.destroy();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

function roomPayload(room, includeAnswers) {
  const selected = familyFeud[room.feudIndex] || familyFeud[0];
  return {
    roomId: room.roomId,
    createdAt: room.createdAt,
    feudIndex: room.feudIndex,
    prompt: selected ? selected.prompt : '',
    answers: includeAnswers && selected ? selected.answers : undefined
  };
}

function serveStatic(req, res) {
  const requestPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  const filePath = path.normalize(path.join(root, requestPath === '/' ? 'index.html' : requestPath));
  if (!filePath.startsWith(root)) return send(res, 403, 'Forbidden');

  fs.readFile(filePath, (err, data) => {
    if (err) return send(res, 404, 'Not found');
    const ext = path.extname(filePath).toLowerCase();
    const type = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.md': 'text/markdown; charset=utf-8'
    }[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
}

async function handleApi(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/feud-prompts') {
    return send(res, 200, familyFeud.map((f, index) => ({ index, prompt: f.prompt })));
  }

  if (req.method === 'POST' && url.pathname === '/api/rooms') {
    const roomId = id(4);
    const hostToken = id(16);
    rooms.set(roomId, { roomId, hostToken, createdAt: new Date().toISOString(), feudIndex: 0 });
    return send(res, 201, {
      roomId,
      hostToken,
      hostUrl: `/host-console.html?room=${roomId}&token=${hostToken}`
    });
  }

  const match = url.pathname.match(/^\/api\/rooms\/([^/]+)(?:\/(host|public|feud))?$/);
  if (!match) return send(res, 404, { error: 'Unknown endpoint' });

  const room = rooms.get(match[1]);
  if (!room) return send(res, 404, { error: 'Room not found' });

  if (req.method === 'GET' && match[2] === 'public') {
    return send(res, 200, roomPayload(room, false));
  }

  if (req.method === 'GET' && match[2] === 'host') {
    if (url.searchParams.get('token') !== room.hostToken) return send(res, 403, { error: 'Host token required' });
    return send(res, 200, roomPayload(room, true));
  }

  if (req.method === 'POST' && match[2] === 'feud') {
    const body = await readJson(req);
    if (body.hostToken !== room.hostToken) return send(res, 403, { error: 'Host token required' });
    const next = Number(body.feudIndex);
    if (!Number.isInteger(next) || next < 0 || next >= familyFeud.length) {
      return send(res, 400, { error: 'Invalid Family Feud index' });
    }
    room.feudIndex = next;
    return send(res, 200, roomPayload(room, true));
  }

  return send(res, 404, { error: 'Unknown endpoint' });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (url.pathname.startsWith('/api/')) return await handleApi(req, res, url);
    return serveStatic(req, res);
  } catch (e) {
    return send(res, 500, { error: e.message || 'Server error' });
  }
});

server.listen(port, () => {
  console.log(`Jeopardy host server running at http://localhost:${port}`);
});
