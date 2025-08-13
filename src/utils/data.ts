export function randomUsername(prefix = 'user'): string {
    return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

export function validAge(): number {
    return 1 + Math.floor(Math.random() * 100); // 1..100
}
