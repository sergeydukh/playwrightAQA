export function randomUsername(prefix: string = 'user'): string {
    const timestamp: number = Date.now();
    const rand: number = Math.floor(Math.random() * 1000);
    return `${prefix}_${timestamp}_${rand}`;
}

export function validAge(): number {
    // 1..100
    return 1 + Math.floor(Math.random() * 100);
}
