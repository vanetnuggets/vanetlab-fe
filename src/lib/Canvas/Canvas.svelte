<script>
    import { zoom, select, drag } from "d3";
    import { onMount } from "svelte";
    import {
        nextNodeId,
        current_node,
        current_time,
        node_id,
        adding_ovs_neighbors
    } from "../../store/store.js";
    import { nodes, networks, connections } from "../../store/scenario";
    import TimeManagment from "./TimeManagment.svelte";
    import OvsIcon from "../../assets/ovs.png";
    import BulldozerIcon from "../../assets/bulldozer.svg";
    import SdnNeighbors from "../topology/SdnNeighbors.svelte";

    let radius = 15;
    let svg;
    let circle;
    let nodepos;
    let bulldoze = false;
    //let colors = ["blue", "pink", "brown", "yellow"];

    $: nodearr = Object.values($nodes);
    $: current_time_string = $current_time === 0 ? $current_time.toString() : $current_time.toString() + '.0'
    $: sietky = createPairs(nodearr);

    function createPairs(nodes){
        let arr = {}
        
        // zober nody podľa sieti
        nodes.forEach(element => {
            if (element.l2id in arr) {
                arr[element.l2id].nodes.push(element.id)
            } 
            else {
                arr[element.l2id] = {
                    id: element.l2id,
                    nodes: [
                        element.id
                    ]
                }
                    
            }

        });
        
        let connects = []
        // sprav páry jednotlivých nodov
        for (const index in arr) {
            if (index === "-1")
                continue;
            let second_layer = {
                id: parseInt(arr[index].id),
                nodes: []
            }
            for (var i = 0; i < arr[index].nodes.length - 1; i++) {
                for (var j = i; j < arr[index].nodes.length - 1; j++) {
                    second_layer.nodes.push([arr[index].nodes[i], arr[index].nodes[j+1]])
                }
            }
            connects.push(second_layer)
        }
        return Object.values(connects)
    }

    current_time.subscribe(timeRaw => {
        let time = timeRaw.toString() + '.0'
        for (let key of Object.keys($nodes)) {
            let node = $nodes[key];
            
            if (node.mobility[time] !== undefined) {
                node.x = node.mobility[time].x
                node.y = node.mobility[time].y 
            } else {
                // vypocitaj;
                let closest = null
                let closest_str = null
                if (Object.keys(node.mobility).length !== 0){ 
                    closest = Object.keys(node.mobility).map(Number).reduce(function(prev, curr) {
                        return (curr > prev && curr <= timeRaw ? curr : prev);
                    });
                    closest_str = closest === 0 ? closest.toString() : closest.toString() + '.0'
                }

                

                if (node.mobility[closest_str] !== undefined) {
                    node.x = node.mobility[closest_str].x
                    node.y = node.mobility[closest_str].y
                } else {
                    if (node.mobility[closest] !== undefined) {
                        node.x = node.mobility[closest].x
                        node.y = node.mobility[closest].y
                    } else {
                        node.x = 10
                        node.y = 10
                    }
                }
            }
        }
        $nodes = $nodes;
    })

    function started(event) {
        circle = select(this); // set circle to the element that has been dragged.
        circle.attr("cx", event.x).attr("cy", event.y); // move the x/y position

        let nodeId = circle.attr("data-id");
        let x = event.x;
        let y = event.y;

        let order = false
        if ($nodes[nodeId].mobility[current_time_string] === undefined) 
            order = true
        
        $nodes[nodeId].mobility[current_time_string] = {};

        $nodes[nodeId].mobility[current_time_string].x = x;
        $nodes[nodeId].mobility[current_time_string].y = y;
        $nodes[nodeId].mobility[current_time_string].z = 1;

        if(order){
            $nodes[nodeId].mobility = Object.keys($nodes[nodeId].mobility).sort(function(a, b){return +a-+b}).reduce(
                (obj, key) => { 
                    obj[key] = $nodes[nodeId].mobility[key]; 
                    return obj;
                }, {}
            );
        }


        $nodes[nodeId].x = x;
        $nodes[nodeId].y = y;
    }
    $: dragHandler = drag().on("drag", started); // setup a simple dragHandler

    let bindHandleZoom, bind;

    $: width = document.getElementById("bs").offsetWidth;
    $: height = document.getElementById("bs").offsetHeight;

    $: zoomX = zoom()
        .scaleExtent([1, 5])
        // @ts-ignore
        .translateExtent([
            [0, 0],
            [width, height],
        ])
        .on("zoom", handleZoom);

    function handleZoom(e) {
        select(bindHandleZoom).attr("transform", e.transform);
    }

    $: if (bind) {
        select(bind).call(zoomX);
    }

    function add_node(sdn = false) {
        let x = width / 2;
        let y = height / 2;
        let newNode = {
            id: $nextNodeId,
            type: "basic",
            mobility: {},
            l2id: -1,
            l2: null,
            l2conf: {},
            l3: null,
            l3conf: {},
            x:x,
            y:y
  
        };
        newNode.mobility['0'] = { x: x, y: y, z: 0 };
        if (sdn){
            newNode.type = "sdn";
            newNode["switch_nodes"] = [];
            newNode["controller"] = ""
        }
        $nodes[$nextNodeId] = newNode;
        $nextNodeId += 1;
        // wait until it is rendered and add draghandler
        delay(100).then(() => {
            svg = select(bind);
            dragHandler(svg.selectAll(".myPoint"));
        });
    }

    function delay(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    function selectNode(node) {
        if (bulldoze == true)
            remove_node(node)
        else if ($adding_ovs_neighbors)
            handle_sdn_neighbors(node.id)
        else
            current_node.update((_) => node.id);
    }

    function handle_sdn_neighbors(neighbor_id) {
        if (!Number.isInteger(neighbor_id))
        return;
        
        neighbor_id = parseInt(neighbor_id)
        
        // if user clicked on the switch node itself
        if ($current_node == neighbor_id) 
            return;

        // adding sdn neighbors
        if (!$nodes[$current_node].switch_nodes.includes(neighbor_id)) {
            $nodes[$current_node].switch_nodes.push(neighbor_id);
            $nodes[$current_node].switch_nodes.sort(function(a, b) {
                return a - b;
            });
            $nodes = $nodes;
        }
        //removing sdn neighbor if already exists
        else {
            remove_sdn_neighbor($current_node, neighbor_id)
        }
    };

    function remove_sdn_neighbor(current_id, neighbor_id) {
        $nodes[current_id].switch_nodes = $nodes[current_id].switch_nodes.filter(item => item !== neighbor_id);
        $nodes = $nodes;
    }

    function vypis() {
        console.log($nodes)
    }

    function remove_node(node){
        if ($current_node === node.id)
            current_node.update((_) => null)
        delete $nodes[node.id]
        $nodes = $nodes
        let index
        $connections.forEach(e => {
            if (e.node_from === node.id || e.node_to === node.id)
                index = $connections.indexOf(e)
                $connections.splice(index, 1)
                $connections = $connections
        });

        // checking to delete sdn neighbor
        for (const [_, val] of Object.entries($nodes)) {
            if (val.type == "sdn")
                if ($nodes[val.id].switch_nodes.includes(node.id)) 
                    remove_sdn_neighbor($current_node, node.id)
                    return
        }
    }

    function toggle_bulldoze() {
        if (bulldoze == true)
            bulldoze = false;
        else
            bulldoze = true;
    }

    onMount(() => {
        svg = select(bind);
        dragHandler(svg.selectAll(".myPoint"));
    });
</script>

<div class="toolbar">
    <div class="action">
        <button on:click={() => add_node()} class="btn s">Add node</button>
        <button on:click={() => add_node(true)} class="btn s">Add OVSWITCH</button>
        <button on:click={vypis} class="btn s">Vypis</button>
        <button on:click={toggle_bulldoze} class="btn s" style="background-color:{bulldoze ? 'red' : ''}">
            <img src={BulldozerIcon}  height=18px alt="map_icon">
        </button>
    </div>
    <TimeManagment/>
</div>
<!-- height="97%" -->
<svg bind:this={bind} height="91%" width="100%">
    <g bind:this={bindHandleZoom}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern
                    id="smallGrid"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 8 0 L 0 0 0 8"
                        fill="none"
                        stroke="gray"
                        stroke-width="0.5"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
        {#each $connections as c}
            <line x1={$nodes[c.node_from].x} y1={$nodes[c.node_from].y} x2={$nodes[c.node_to].x} y2={$nodes[c.node_to].y} stroke="black" />
        {/each}
        {#each sietky as siet}
            {#each siet.nodes as nody}
                <line x1={$nodes[nody[0]].x} y1={$nodes[nody[0]].y} x2={$nodes[nody[1]].x} y2={$nodes[nody[1]].y} stroke={$networks[siet.id].color} stroke-dasharray="4"/>
            {/each}
        {/each}
        {#each nodearr as d}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <circle
                on:click={() => selectNode(d)}
                class="myPoint"
                data-id={d.id}
                cx={d.x}
                cy={d.y}
                r={radius}
                fill={$adding_ovs_neighbors && $nodes[$current_node].switch_nodes.includes(d.id) ? "red" : $networks[d.l2id].color}
            />
            <circle
                class="no_tap"
                cx={d.x + radius - 5}
                cy={d.y + radius - 7}
                r={8}
                fill="white"
            />
            <text
                alignment-baseline="middle"
                text-anchor="middle"
                class="id_text no_tap"
                x={d.x + radius - 5}
                y={d.y + radius - 5}>{d.id}</text
            >
            {#if d.type == "sdn"}
                <image class="no_tap"
                    href={OvsIcon}
                    x={d.x - 20}
                    y={d.y - 20}
                    width={20}
                    height={20}
                />   
            {/if}
        {/each}
    </g>
</svg>

<style scoped>
    .no_tap {
        pointer-events:none; 
    }
    .remove_node { 
        cursor: pointer; 
        user-select: none;
		font-weight: bold;      
    }
    .id_text {
        cursor:auto;
        user-select: none;
    }
    .myPoint {
        cursor: pointer;
    }
</style>
