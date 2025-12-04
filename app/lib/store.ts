// Global in-memory store to persist data across hot reloads in development
declare global {
    var rooms: Record<string, any> | undefined;
}

export const rooms = globalThis.rooms || {};

if (process.env.NODE_ENV !== 'production') {
    globalThis.rooms = rooms;
}
