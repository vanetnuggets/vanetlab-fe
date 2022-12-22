
<button class="btn r" on:click={sendToBe}>Send scenario</button>
<div class="middle">
    TP@fiit.stu
</div>

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

<style scoped>
    .btn {
      background-color: var(--dark-3);
      color: var(--color-text-1);
      font-size: 15px;
      border-radius: 5px;
      margin-right: 10px;
      height: 25px;
    }
    
    .btn:hover {
      background-color: var(--dark-3);
      outline: 1px solid var(--color-text-1);
    }
    
    .middle {
      position: fixed;
      align-items: center;
      justify-content: center;
      display: flex;
      bottom: 4px;
      left: 0;
      right: 0;
      z-index: -1;
    }
    
    .r {
        position: fixed;
        right: 0px;
        bottom: 0px;
    }
    
    </style>