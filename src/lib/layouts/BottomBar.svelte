😎 VANETLAB BOTTOM BAR 😎
<button on:click={sendToBe}>Send scenario</button>

<script>
    import api from '../../services/Api.js'
    import { topology, containers, apps } from '../../store/store.js'

    function generateScenario(){
        let top = $topology
        let cons = $containers
        let simu = $apps
        top["container_setings"] = {}
        cons.forEach(element => {
            top["container_setings"][element.name] = element
        })
        let sim = {
            "server": {},
            "client": {}
        }
        simu.server.forEach(e => {
           sim.server[e.name] = e
        })
        simu.client.forEach(e => {
           sim.client[e.name] = e
        })
        let data = {
            "topology": top,
            "simulation": sim
        }
        return JSON.stringify(data)
    }

    function sendToBe(){
        api.post("tracjson", generateScenario())
    }

</script>