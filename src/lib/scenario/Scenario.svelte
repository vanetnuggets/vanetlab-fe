<script>
    import { slide } from 'svelte/transition'
    import sipky from '../sipky/sipky';
    import Simulation from "./Simulation.svelte"
    import Topology from "./Topology.svelte"
    import presets from "../../services/PresetService"
    import { node_id, containers, topology, apps, nodes } from '../../store/store.js';


    let isTopologyVisible = false
    let TopologyBntText = "Show topology settings"
    let isSimulationVisible = false
    let SimulationBntText = "Show simulation settings"

    let _node_id;
    node_id.subscribe(n => {
        _node_id = n;
    });


    function handleTopology() {
        isTopologyVisible = !isTopologyVisible;
        TopologyBntText = isTopologyVisible ? "Hide topology settings" : "Show topology settings"
    }

    function handleSimulation() {
        isSimulationVisible = !isSimulationVisible;
        SimulationBntText = isSimulationVisible ? "Hide simulation settings" : "Show simulation settings"
    }

    function reset_preset() {
        $containers = [];
        $topology = {
            "node_count": 0,
            "node_containers": [],
        }
        $apps = {
            "server": [],
            "client": []
        }
        $nodes = [];
    }

    function set_preset(preset_id) {

        // XXX TODO FIXME toto je uplne na kkt treba na to prijst jak to funguje a prepisat ale inak sa to dojebava taze unlucky.
        setTimeout(() => {
            reset_preset();
        }, 20)
        if ( Object.keys(presets).includes(preset_id) == false ) {
            return;
        }
        const preset = presets[preset_id];

        let tmp_topology = {
            node_count: preset.topology.node_count,
            node_containers: preset.topology.node_containers
        }

        let tmp_nodes = []       
        let tmp_containers = []
        for (let elem of Object.keys(preset.topology.container_settings)) {
            tmp_containers.push(
                preset.topology.container_settings[elem]
            )
            let nodes = preset.topology.container_settings[elem].nodes;
            for (let node of nodes) {
                let cont = false
                for (let n of tmp_nodes) {
                    if (n.id == node) {
                        cont = true
                        break;
                    }
                }
                if (cont == false) {
                    let type = 'foo';

                    // XXX TODO FIXME toto nejako izoluj, v buducnosti tych typov bude ovela viac asi
                    if (preset.topology.container_settings[elem].type == 'wifi') {
                        if (preset.topology.container_settings[elem].AP == node) {
                            type = 'ap'
                        }
                    }
                    let x = Math.floor(Math.random() * 500);
                    let y = Math.floor(Math.random() * 500);
                    tmp_nodes.push({
                        "left": x,
                        "top": y,
                        "x": x,
                        "y": y,
                        "id": node,
                        "element": null,
                        "containers": [],
                        "type": type
                    })
                    if (node > _node_id) {
                        node_id.update(_ => node + 1);
                    }
                }
            }
        }

        let tmp_server = []
        for ( let elem of Object.keys(preset.simulation.server)) {
            tmp_server.push(
                preset.simulation.server[elem]
            )
        }

        let tmp_client = []
        for ( let elem of Object.keys(preset.simulation.client)) {
            tmp_client.push(
                preset.simulation.client[elem]
            )
        }
        
        // XXX TODO FIXME toto je uplne na kkt treba na to prijst jak to funguje a prepisat ale inak sa to dojebava taze unlucky.
        setTimeout(() => {
            $topology = tmp_topology
            containers.update( _ => tmp_containers);
            nodes.update( _ => tmp_nodes);
            $apps = {
                "server": tmp_server,
                "client": tmp_client
            }

        }, 100);
        
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
    
    {#each Object.keys(presets) as key}
    <div>
        <button on:click={() => set_preset(key)}>preset: {key}</button>
    </div>
    {/each}
</div>

<style>
    .somebs {
        margin: 15px 0 15px 0;
    }


    button {
        width: 360px;
    }
</style>
