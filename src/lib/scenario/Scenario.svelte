<script>
    import { slide } from 'svelte/transition'
    import Simulation from "./Simulation.svelte"
    import Topology from "./Topology.svelte"

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
        <button>Preset1</button>
    </div>
    <div>
        <button>Preset1</button>
    </div><div>
        <button>Preset1</button>
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
