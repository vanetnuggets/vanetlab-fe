<script>
    import { zoom, select, drag} from "d3";
    import { onMount } from "svelte";
    import {
        nextNodeId,
        current_node,
        current_time,
        adding_ovs_neighbors
    } from "../../store/store.js";
    import { nodes, networks, connections } from "../../store/scenario";
    import TimeManagment from "./TimeManagment.svelte";
    import OvsIcon from "../../assets/ovs.png";
    import BulldozerIcon from "../../assets/bulldozer.svg";

    let radius = 15;
    let svg;
    let circle;
    let mouse_x = 0;
    let mouse_y = 0;
    let first_p2p = null;
    let add_node_toggle = false;
    let add_sdn_toggle = false;
    let add_p2p_toggle = false;
    let bulldoze_toggle = false;

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
  
        
        let x = event.x;
        let y = event.y;
        
        if(x<8)
            x=8
        if(x>width-15)
            x=width-15
        if(y<8)
            y=8 
        if(y>height-24)
            y=height-24

        circle = select(this); // set circle to the element that has been dragged.
        circle.attr("cx", x).attr("cy", y); // move the x/y position
        let nodeId = circle.attr("data-id");
        
        
        
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
        let x = mouse_x;
        let y = mouse_y;
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
        if (bulldoze_toggle == true)
            remove_node(node)
        else if ($adding_ovs_neighbors)
            handle_sdn_neighbors(node.id)
        else if (add_p2p_toggle)
            handle_p2p_conn(node.id)
        else
            current_node.update((_) => node.id);
    }

    function add_nodes_canvas() {
        if (add_node_toggle)
            add_node()
        else if (add_sdn_toggle)
            add_node(true)
    }

    function handle_p2p_conn(node_id) {
        if (first_p2p == null)
            first_p2p = node_id
        else if (first_p2p == node_id)
            first_p2p = null
        else {
            add_p2p(first_p2p, node_id)
            first_p2p = null
        }
        $nodes=$nodes
    }

    function add_p2p(node_from, node_to){
        let already_exists = false
        if (node_from === -1 || node_to === -1)
            return
        
        // check if connection already exists
        $connections.forEach(e => {
            if ((e.node_from === node_from && e.node_to === node_to) || (e.node_from === node_to && e.node_to === node_from)) {
                already_exists = true
            }
        });

        // add only if doesn't exist
        if (!already_exists) {
            $connections.push({"node_from": node_from, "node_to": node_to});
            $connections = $connections
        }
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
        console.log($connections)
    }

    function remove_node(node){
        if ($current_node === node.id)
            current_node.update((_) => null)
        delete $nodes[node.id]
        $nodes = $nodes
        let index

        // removing p2p connections
        $connections.forEach(e => {
            if (e.node_from === node.id || e.node_to === node.id){
                index = $connections.indexOf(e)
                $connections.splice(index, 1)
                $connections = $connections
            }
        });

        // checking to delete sdn neighbor
        for (const [_, val] of Object.entries($nodes)) {
            if (val.type == "sdn") {
                if ($nodes[val.id].switch_nodes.includes(node.id)) 
                    remove_sdn_neighbor(val.id, node.id)
            }
        }
        
        // if its the switch itself
        if (node.type == "sdn")
            adding_ovs_neighbors.set(false)
        
    }

    function mouseHandler(e) {
        const rect = e.currentTarget.getBoundingClientRect()
        mouse_x = e.clientX - rect.x
        mouse_y = e.clientY - rect.y
        // console.log(`x: ${e.clientX - rect.x}, y: ${e.clientY - rect.y}`)
    }

    function bHandler(type) {
        let tmp;
        switch (type) {
            case 'add_node':
                tmp = add_node_toggle;
                clear_buttons();
                add_node_toggle = !tmp;
                break;
            case 'add_sdn':
                tmp = add_sdn_toggle;
                clear_buttons();
                add_sdn_toggle = !tmp;
                break;
            case 'add_p2p':
                tmp = add_p2p_toggle;
                clear_buttons();
                add_p2p_toggle = !tmp;
                break;
            case 'bulldoze':
                tmp = bulldoze_toggle;
                clear_buttons();
                bulldoze_toggle = !tmp;
                break;
            default:
                console.log('zly butoň');
        }
    }

    function clear_buttons() {
        add_node_toggle = false;
        add_sdn_toggle = false;
        add_p2p_toggle = false;
        bulldoze_toggle = false;
    }

    onMount(() => {
        svg = select(bind);
        dragHandler(svg.selectAll(".myPoint"));
    });
</script>

<div class="canvas">
    <div class="toolbar">
        <div class="action">
            <button on:click={() => bHandler("add_node")} class="btn s" style="background-color:{add_node_toggle ? 'red' : ''}">Add node</button>
            <button on:click={() => bHandler("add_sdn")} class="btn s" style="background-color:{add_sdn_toggle ? 'red' : ''}">Add OVSWITCH</button>
            <button on:click={() => bHandler("add_p2p")} class="btn s" style="background-color:{add_p2p_toggle ? 'red' : ''}">P2P connection</button>
            <button on:click={() => bHandler("bulldoze")} class="btn s" style="background-color:{bulldoze_toggle ? 'red' : ''}">
                <img src={BulldozerIcon}  height=18px alt="map_icon">
            </button>
            <button on:click={vypis} class="btn s" style="background-color: grey;">Vypis</button>
        </div>
    </div>
    <!-- height="97%" -->
    <svg on:mousemove={mouseHandler} bind:this={bind} height="100%" width="100%">
        <g bind:this={bindHandleZoom}>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <svg on:click={add_nodes_canvas} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
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
                <!-- p2p line -->
                {#if add_p2p_toggle && d.id == first_p2p}
                    <line x1={d.x} y1={d.y} x2={mouse_x} y2={mouse_y} stroke="black"/>
                {/if}
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
                    y={d.y + radius - 5}>{d.id}
                </text>
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
    <div class="bottom">
        <TimeManagment/>
    </div>
</div>

<style scoped>
    .canvas {
        height: calc(100vh - 39px);
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .no_tap {
        pointer-events:none; 
    }
    .id_text {
        cursor:auto;
        user-select: none;
    }
    .myPoint {
        cursor: pointer;
    }
    .toolbar {
        position: absolute;
        left: 0;
        right: 0;
        top: 5px;
        pointer-events: none;
    }
    .toolbar button {
        pointer-events: all;
    }
    .bottom {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 23px;
    }
</style>
