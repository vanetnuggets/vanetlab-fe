import { writable } from 'svelte/store';

export const networks = writable({})
export const nodes = writable({})
export const max_at = writable(0)
export const connections = writable([])
export const labels = writable([{"text": "sdfsdf", "x": 100, "y": 100}])

export function reset_store() {
    networks.set({})
    nodes.set({})
    max_at.set(0)
    connections.set([])
    // labels.set([])
}
