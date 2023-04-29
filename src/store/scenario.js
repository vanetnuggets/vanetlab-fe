import { writable } from 'svelte/store';

export const networks = writable({})
export const nodes = writable({})
export const max_at = writable(0)
export const connections = writable([])
export const labels = writable([])

export function reset_store() {
    networks.set({})
    nodes.set({})
    max_at.set(0)
    connections.set([])
    labels.set([])
}
