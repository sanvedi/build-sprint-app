import { isPractice } from "../shared/pathMissions.mjs";
const PREFIX = "prompt-game:usage-pending:v1:";
// Start a new visit on the introduction release; earlier rows stay unmodified.
const VISIT = "prompt-game:visit:missions-v1";
const VISIT_PATH = `${VISIT}:path`;
const randomId = () => Array.from(crypto.getRandomValues(new Uint8Array(32)), n => n.toString(16).padStart(2, "0")).join("");

// Independent of answer/assessment recovery: replaying these events never calls AI.
export function createUsageTracking({ token, send, initialPath = null, storage = localStorage, tabStorage = sessionStorage, status = () => {} }) {
  let pathId = ["A", "B", "C"].includes(initialPath) ? initialPath : null;
  let visitId;
  try { visitId = tabStorage.getItem(VISIT); } catch {}
  // A different tab may have changed the shared path since this visit began.
  try { if ((tabStorage.getItem(VISIT_PATH) || "") !== (pathId || "")) visitId = null; } catch {}
  if (!/^[a-f0-9]{64}$/.test(visitId || "")) {
    visitId = randomId();
    try { tabStorage.setItem(VISIT, visitId); tabStorage.setItem(VISIT_PATH, pathId || ""); } catch {}
  }
  const pending = new Map();
  try {
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (!key?.startsWith(PREFIX)) continue;
      try {
        const event = JSON.parse(storage.getItem(key));
        if (event.token === token && /^[a-f0-9]{64}$/.test(event.visitId) && (!event.challengeId || isPractice(event.challengeId))) pending.set(key, event);
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
    const key = `${PREFIX}${visitId}:${challengeId || `visit${pathId ? `:${pathId}` : ""}`}`;
    const event = { token, visitId, ...(challengeId ? { challengeId } : { pathVersion: "stories-v1", ...(pathId ? { pathId } : {}) }) };
    pending.set(key, event);
    try { storage.setItem(key, JSON.stringify(event)); } catch {}
    return flush();
  }
  return { get visitId() { return visitId; }, visit: () => queue(), start: id => queue(id), retry: flush,
    choosePath(id) {
      if (!["A", "B", "C"].includes(id)) throw new Error("Unknown path");
      // Each change starts a new visit; old visit choices and practice progress stay intact.
      if (pathId !== null && pathId !== id) {
        visitId = randomId();
        try { tabStorage.setItem(VISIT, visitId); } catch {}
      }
      pathId = id;
      try { tabStorage.setItem(VISIT_PATH, id); } catch {}
      return queue();
    },
  };
}
