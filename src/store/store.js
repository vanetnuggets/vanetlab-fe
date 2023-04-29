import { writable, readable } from 'svelte/store';


export const current_node = writable(null)
export const current_time = writable(0)

export const adding_ovs_neighbors = writable(false)
export const pgw_exists = writable(false)
export const lte_exists = writable(false)

export const visibleNetwork = writable("")
export const nextNetworkId = writable(0)
export const nodes = writable([])
export const nextNodeId = writable(0)
export const scenarioName = writable("");

export const containers = writable([])
export const summary = writable({})
export const apps = writable({
  "server": [],
  "client": []
})

export const labelId = writable(0);