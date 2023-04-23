<script>
    import { zoom, select, drag} from "d3";
    import { onMount } from "svelte";
    import {
        nextNodeId,
        current_node,
        current_time,
        adding_ovs_neighbors,
        lte_exists,
        pgw_exists
    } from "../../store/store.js";
    import { nodes, networks, connections } from "../../store/scenario";
    import TimeManagment from "./TimeManagment.svelte";
    import OvsIcon from "../../assets/ovs.png";
    import ApIcon from "../../assets/ap.png";
    import BtsIcon from "../../assets/bts.png";
    import PgwIcon from "../../assets/pgw.svg";
    import Coordinates from "./Coordinates.svelte";
    import Iconn from "./Iconn.svelte";
    import CanvasBar from "./CanvasBar.svelte";
    import VisualConnections from "./VisualConnections.svelte";

    let radius = 15;
    let svg;
    let circle;
    let mouse_x = 0;
    let mouse_y = 0;
    let transform_x = 0;
    let transform_y = 0;
    let transform_k = 1
    let first_p2p = null;
    let add_node_toggle = false;
    let add_sdn_toggle = false;
    let add_p2p_toggle = false;
    let bulldoze_toggle = false;
    
    $: nodearr = Object.values($nodes);
    $: current_time_string = $current_time.toString() + '.0'

    current_time.subscribe(timeRaw => {
        let time = timeRaw.toString() + '.0'
        for (let key of Object.keys($nodes)) {
            let node = $nodes[key];
            
            if (node.mobility[time] !== undefined) {
                node.x = node.mobility[time].x
                node.y = node.mobility[time].y 
            } else {
                // vypocitaj;
                let closest_str = null
                if (Object.keys(node.mobility).length !== 0){ 
                    let closest = Object.keys(node.mobility).map(Number).reduce(function(prev, curr) {
                        return (curr > prev && curr <= timeRaw ? curr : prev);
                    });
                    closest_str = closest.toString() + '.0'
                }

                if (node.mobility[closest_str] !== undefined) {
                    node.x = node.mobility[closest_str].x
                    node.y = node.mobility[closest_str].y
                } else {
                    node.x = 20
                    node.y = 20
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

    $: width = Infinity
    $: height = Infinity
    
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
        transform_x = e.transform.x
        transform_y = e.transform.y
        transform_k = e.transform.k
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
        newNode.mobility['0.0'] = { x: x, y: y, z: 0 };
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
        console.log($networks)
    }

    function remove_node(node){
        if (node.l2conf.type == "pgw") {
            pgw_exists.set(false)
        }
        if (node != undefined && $current_node === node.id)
            current_node.update((_) => null)

        // removing p2p connections(cannot use for each, index is broken then!)
        let index = $connections.length - 1;
        while (index >= 0) {
            if ($connections[index].node_from === node.id || $connections[index].node_to === node.id) {
                $connections.splice(index, 1);
            }
            index -= 1;
        }
        
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
        
        delete $nodes[node.id]
        $nodes = $nodes

    }

    function mouseHandler(e) {
        const rect = e.currentTarget.getBoundingClientRect()
        mouse_x = ((e.clientX - rect.x) - transform_x) / transform_k
        mouse_y = ((e.clientY - rect.y) - transform_y) / transform_k
    }

    function check_lte() {
        pgw_exists.set(false)
        lte_exists.set(false)

        // checks if pgw node exists
        for (const [key, node] of Object.entries($nodes)) {
            if (node.type == "basic" && node.l2conf.type == "pgw") {
                pgw_exists.set(true)
            }
        }
        // checks if lte netowrk exists
        for (const [key, network] of Object.entries($networks)) {
            if (network.type == "LTE") {
                lte_exists.set(true)
            }
        }
    }

    onMount(() => {
        svg = select(bind);
        dragHandler(svg.selectAll(".myPoint"));
        check_lte()
    });
</script>

<div class="canvas">
    <div class="toolbar">
        <CanvasBar bind:add_node_toggle={add_node_toggle} bind:add_sdn_toggle={add_sdn_toggle} bind:add_p2p_toggle={add_p2p_toggle} bind:bulldoze_toggle={bulldoze_toggle} first_p2p={first_p2p} vypis={vypis}/>
        <Coordinates mouse_x={mouse_x} mouse_y={mouse_y}/>
    </div>
    <!-- height="97%" -->
    <svg on:mousemove={mouseHandler} bind:this={bind} height="100%" width="100%">
        <g bind:this={bindHandleZoom}>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <svg on:click={add_nodes_canvas} width="999999px" height="999999px" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern
                        id="smallGrid"
                        width="10"
                        height="10"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 10 0 L 0 0 0 10"
                            fill="none"
                            stroke="gray"
                            stroke-width="0.5"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
            <VisualConnections nodearr={nodearr} mouse_x={mouse_x} mouse_y={mouse_y} add_p2p_toggle={add_p2p_toggle} first_p2p={first_p2p}/>
            {#each nodearr as d}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <circle
                    on:click={() => selectNode(d)}
                    class="myPoint"
                    data-id={d.id}
                    cx={d.x}
                    cy={d.y}
                    r={radius}
                    fill={$networks[d.l2id].color} 
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
                    <Iconn icon={OvsIcon} d={d}/>
                {/if}
                {#if d.type == "basic" && d.l2 == "wifi" && d.l2conf["type"] == "ap" }
                    <Iconn icon={ApIcon} d={d}/>     
                {/if}
                {#if d.type == "basic" && d.l2 == "lte" && d.l2conf["type"] == "enb" }
                    <Iconn icon={BtsIcon} d={d}/> 
                {/if}
                {#if d.type == "basic" && d.l2 == "lte" && d.l2conf["type"] == "pgw" }
                    <Iconn icon={PgwIcon} d={d}/> 
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
    .bottom {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 23px;
        pointer-events: none;
    }
</style>
