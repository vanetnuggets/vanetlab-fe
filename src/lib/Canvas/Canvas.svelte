<script>
    import { zoom, select, drag } from "d3";
    import { onMount } from "svelte";
    import {
        nextNodeId,
        current_node,
        current_time,
    } from "../../store/store.js";
    import { nodes, networks, connections } from "../../store/scenario";
    import TimeManagment from "./TimeManagment.svelte";
    import { areaAnchor } from "leader-line-new";
    import { element } from "svelte/internal";

    let radius = 15;
    let svg;
    let circle;
    let nodepos;
    //let colors = ["blue", "pink", "brown", "yellow"];

    $: nodearr = Object.values($nodes);
    $: current_time_string = $current_time === 0 ? $current_time.toString() : $current_time.toString() + '.0'
    $: sietky = araaaaa(nodearr);

    function araaaaa(nodes){
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
        console.log(arr)
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
        console.log(connects)
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
                let closest = Object.keys(node.mobility).map(Number).reduce(function(prev, curr) {
                    return (curr > prev && curr <= timeRaw ? curr : prev);
                });

                let closest_str = closest === 0 ? closest.toString() : closest.toString() + '.0'

                if (node.mobility[closest_str] !== undefined) {
                    node.x = node.mobility[closest_str].x
                    node.y = node.mobility[closest_str].y
                } else {
                    if (node.mobility[closest] !== undefined) {
                        node.x = node.mobility[closest].x
                        node.y = node.mobility[closest].y
                    } else {
                        node.x = 0
                        node.y = 0
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

    function add_node() {
        let x = width / 2;
        let y = height / 2;
        let newNode = {
            id: $nextNodeId,
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
        current_node.update((_) => node.id);
        //console.log(node)
    }

    function vypis() {
        console.log($nodes)
    }

    onMount(() => {
        svg = select(bind);
        dragHandler(svg.selectAll(".myPoint"));
    });
</script>

<div class="toolbar">
    <div class="action">
        <button on:click={add_node} class="btn s">Add node</button>
        <button on:click={vypis} class="btn s">Vypis</button>
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
            <line x1={nodearr[c.node_from].x} y1={nodearr[c.node_from].y} x2={nodearr[c.node_to].x} y2={nodearr[c.node_to].y} stroke="black" />
        {/each}
        {#each sietky as siet}
            {#each siet.nodes as nody}
                <line x1={nodearr[nody[0]].x} y1={nodearr[nody[0]].y} x2={nodearr[nody[1]].x} y2={nodearr[nody[1]].y} stroke={$networks[siet.id].color} stroke-dasharray="4"/>
            {/each}
        {/each}
        {#each nodearr as d, i}
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
                cx={d.x + radius - 5}
                cy={d.y + radius - 7}
                r={8}
                fill="white"
            />
            <text
                alignment-baseline="middle"
                text-anchor="middle"
                x={d.x + radius - 5}
                y={d.y + radius - 5}>{d.id}</text
            >
        {/each}
    </g>
</svg>

<style scoped>
</style>
