import { writable } from 'svelte/store';

export const show_rdrawer = writable(null);
export const node_info = writable({})
export const store_container_size = writable({
  width: 50,
  height: 50
})