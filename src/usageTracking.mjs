const PREFIX = "prompt-game:usage-pending:v1:";
// Start a new visit on the introduction release; earlier rows stay unmodified.
const VISIT = "prompt-game:visit:picnic-v1";
const randomId = () => Array.from(crypto.getRandomValues(new Uint8Array(32)), n => n.toString(16).padStart(2, "0")).join("");

// Independent of answer/assessment recovery: replaying these events never calls AI.
export function createUsageTracking({ token, send, storage = localStorage, tabStorage = sessionStorage, status = () => {} }) {
  let visitId;
  try { visitId = tabStorage.getItem(VISIT); } catch {}
  if (!/^[a-f0-9]{64}$/.test(visitId || "")) {
    visitId = randomId();
    try { tabStorage.setItem(VISIT, visitId); } catch {}
  }
  const pending = new Map();
  try {
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (!key?.startsWith(PREFIX)) continue;
      try {
        const event = JSON.parse(storage.getItem(key));
        if (event.token === token && /^[a-f0-9]{64}$/.test(event.visitId) && (!event.challengeId || ["beginner-01", "beginner-02"].includes(event.challengeId))) pending.set(key, event);
      } catch {}
    }
  } catch {}
  let running = null;
  async function flush() {
    if (running) return running;
    running = (async () => {
      try {
        while (pending.size) {
          const [key, event] = pending.entries().next().value;
          await send(event);
          pending.delete(key);
          try { storage.removeItem(key); } catch {}
        }
        status(false);
      } catch { status(true); }
    })();
    await running;
    running = null;
  }
  function queue(challengeId) {
    const key = `${PREFIX}${visitId}:${challengeId || "visit"}`;
    const event = { token, visitId, ...(challengeId ? { challengeId } : {}) };
    pending.set(key, event);
    try { storage.setItem(key, JSON.stringify(event)); } catch {}
    return flush();
  }
  return { visitId, visit: () => queue(), start: id => queue(id), retry: flush };
}
