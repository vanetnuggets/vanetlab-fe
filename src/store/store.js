import { writable, readable } from 'svelte/store';

export const moving_type = writable("canvas")
export const show_rdrawer = writable("container_info");
export const node_info = writable(new Map())
export const node_info2 = writable(null) // opica 🐒
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
export const con_number = writable(0)
export const visibleContainer = writable("")

export const nodes = writable([])

export const summary = writable({})

export const apps = writable({
  "server": [],
  "client": []
})

export const units = readable({
  "rate": ["Kbps","Mbps","Gbps"],
  "delay": ["ns", "ms", "s"]
})

export const summary_list = writable([]);