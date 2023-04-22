import Api from '../../services/Api'
import { assembleConfig } from '../../services/LoadService';

export function listScenarios() {
  return Api.get("list");
}

export function getRemote(name) {
  return Api.get(`scenario/${name}`);
}

export function deleteRemote(name) {
  return Api.delete(`scenario/${name}`);
}

export function saveRemote(name, scenario) {
  return Api.post(`scenario/${name}`, scenario);
}

export async function simulate(name) {
  let config = assembleConfig();
  return Api.post(`simulate/${name}`, config);
}

export async function validate(name) {
  let config = assembleConfig();
  return Api.post(`validate/${name}`, config);
}

export async function getFile(name, file) {
  return Api.getBlob(`get/${name}/${file}`);
}

export function getSummary(name) {
  return Api.get(`summary/${name}`);
}