import { initDb } from "@db/index.js";

initDb();

// Optional: wait briefly to let logs flush (Winston sometimes needs this in fast scripts)
setTimeout(() => process.exit(0), 100);
