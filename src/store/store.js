import { writable } from 'svelte/store';

export const show_rdrawer = writable("container_info");
export const node_info = writable({})
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
});

export const apps = writable({
  "server": [],
  "client": []
})