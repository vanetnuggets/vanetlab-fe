import Api from '../../services/Api'

export function listScenarios() {
  return Api.get("list")
}

export function getRemote(name) {
  return Api.get(`scenario/${name}`)
}

export function saveRemote(name, scenario) {
  return Api.post(`scenario/${name}`, scenario);
}