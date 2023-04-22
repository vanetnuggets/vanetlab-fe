import { writable } from 'svelte/store';
import Init from '../services/initService'

export const isError = writable(Init.ERR);
export const errorData = writable(Init.ERR_DATA);

export const isOk = writable(Init.OK);
export const isValidated = writable(Init.VALIDATED)

export const loading = writable(Init.LOADING)

export const simData = writable(Init.SIM_DATA);
export const currentStatus = writable(Init.BASE_STATUS);