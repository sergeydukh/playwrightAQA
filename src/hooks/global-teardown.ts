import { readFileSync, rmSync } from 'fs';
import { join } from 'path';
import treeKill from 'tree-kill';

export default async function globalTeardown() {
  const pidFile = join(process.cwd(), '.playwright', 'server.pid');

  try {
    const pidTxt = readFileSync(pidFile, 'utf-8').trim();
    if (pidTxt) {
      const pid = Number(pidTxt);
      await new Promise<void>((resolve) => {
        treeKill(pid, 'SIGTERM', () => resolve());
      });
    }
  } catch {
  } finally {
    try { rmSync(pidFile, { force: true }); } catch {}
  }
}
