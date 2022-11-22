<script>
    import { slide } from 'svelte/transition'
    import Simulation from "./Simulation.svelte"
    import Topology from "./Topology.svelte"

    import { topology, containers, apps } from '../../store/store.js';

    let isTopologyVisible = false
    let TopologyBntText = "Show topology settings"
    let isSimulationVisible = false
    let SimulationBntText = "Show simulation settings"


    function handleTopology() {
        isTopologyVisible = !isTopologyVisible;
        TopologyBntText = isTopologyVisible ? "Hide topology settings" : "Show topology settings"
    }

    function handleSimulation() {
        isSimulationVisible = !isSimulationVisible;
        SimulationBntText = isSimulationVisible ? "Hide simulation settings" : "Show simulation settings"
    }

    function print(){
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
        console.log(JSON.stringify(data))
    }
</script>

<div>
    <div>
        <p>Scenario settings</p>
    </div>
    <div>
        <button on:click={handleTopology} class="somebs">{TopologyBntText}</button>
    </div>
    {#if isTopologyVisible}
    <div  transition:slide class="somebs">
        <Topology/>
    </div>
    {/if}
    <div>
        <button on:click={handleSimulation} class="somebs">{SimulationBntText}</button>
    </div>

    {#if isSimulationVisible}
    <div  transition:slide class="somebs">
        <Simulation/>
    </div>
    {/if}

    <div>
        <button on:click={print}>Print scenario</button>
    </div>
</div>

<style>
    .somebs {
        margin: 15px 0 15px 0;
    }


    button {
        width: 360px;
    }
</style>
