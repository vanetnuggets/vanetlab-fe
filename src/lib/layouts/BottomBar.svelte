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
        let res = await api.post("simulate", generateScenario())
        console.log(res);

        $summary[res.data.scenario_code] = {
            logs: res.data.pcap_logs,
            console_output: res.data.output
        } 

        console.log($summary)
    }

</script>