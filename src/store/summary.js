import { writable } from 'svelte/store';

export const isError = writable(false);
export const errorData = writable([]);

export const isOk = writable(false);

export const loading = writable({
  scenario: false,
  validation: false
})

export const simData = writable({});