import { writable, readable } from 'svelte/store';

export const show_rdrawer = writable("container_info");
export const node_info = writable({})
export const moving = writable(false)
export const node_id = writable(0)
export const store_container_size = writable({
  width: 50,
  height: 50
})

export const topology = writable({
  "node_count": 0,
  "node_containers": [],
})
export const containers = writable([])
export const visibleContainer = writable("")

export const nodes = writable([])

export const summary = writable({
  logs: [],
  output: []
})

export const apps = writable({
  "server": [],
  "client": []
})

export const units = readable({
  "rate": ["Kbps","Mbps","Gbps"],
  "delay": ["ns", "ms", "s"]
}
  
)