😎 VANETLAB BOTTOM BAR 😎
<button class="btn-light" on:click={sendToBe}>Send scenario</button>

<script>
    import api from '../../services/Api.js'
    import { topology, containers, apps, summary } from '../../store/store.js'

    function generateScenario(){
        let top = $topology
        let cons = $containers
        let simu = $apps
        top["container_settings"] = {}
        cons.forEach(element => {
            top["container_settings"][element.name] = element
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

    async function sendToBe(){
        let res = await api.post("tracejson", generateScenario())
        console.log(res);

        summary.update(_ => {
            return {
                logs: res.data.logs,
                output: res.data.output
            }
        });
    }

</script>