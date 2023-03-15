import { writable } from 'svelte/store';

export const isError = writable(false);
export const errorData = writable([]);