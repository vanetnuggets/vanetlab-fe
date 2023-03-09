import Api from '../../services/Api'

export function listScenarios() {
  return Api.get("list")
}

export function getRemote(name) {
  return Api.get(`scenario/${name}`)
}