import type { FullConfig } from '@playwright/test';
import { spawn } from 'child_process';
import waitOn from 'wait-on';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

export default async function globalSetup(_config: FullConfig) {
    // Run local API (npm run api)
    const child = spawn('npm', ['run', 'api'], {
        stdio: 'inherit',
        shell: true
    });

    // Save PID в .playwright/server.pid
    const pidFile = join(process.cwd(), '.playwright', 'server.pid');
    mkdirSync(dirname(pidFile), { recursive: true });
    writeFileSync(pidFile, String(child.pid ?? ''), 'utf-8');

    // Wait for stat server to be ready
    await waitOn({
        resources: ['http://localhost:3000/health'],
        validateStatus: (s) => s >= 200 && s < 500,
        timeout: 15_000,
        interval: 200,
        window: 1000,
        log: false
    });
}
