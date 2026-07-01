# Host-Only Answer Backend

GitHub Pages can only serve static files, so it cannot keep Family Feud answers secret by itself. To make answers host-only, run the game through the included Node backend:

```bash
npm start
```

Then open:

- Main game: `http://localhost:8787/`
- Host console: `http://localhost:8787/host-console.html`

The host console creates a room with a private host token in the URL. Public room endpoints return the prompt only; answer endpoints require the host token.

For a real game night deployment, host this server on a Node-capable platform such as Render, Railway, Fly.io, or a small VPS. `https://alishahroor.github.io/` can still link to the game, but GitHub Pages cannot run this backend.
