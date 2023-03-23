<script>
    import { zoom, select, drag, randomInt, timeDay } from "d3";
    import { onMount } from "svelte";
    import {
        nextNodeId,
        current_node,
        current_time,
    } from "../../store/store.js";
    import { nodes, networks } from "../../store/scenario";
    import TimeManagment from "./TimeManagment.svelte";

    let radius = 15;
    let svg;
    let circle;
    //let colors = ["blue", "pink", "brown", "yellow"];

    $: nodearr = Object.values($nodes);
    $: nodepos = {0:{x:5,y:5}}

    current_time.subscribe(timeRaw => {
        let time = timeRaw.toString() + '.0'
        for (let key of Object.keys($nodes)) {
            let node = $nodes[key];
            
            if (node.mobility[time] !== undefined) {
                node.x = node.mobility[time].x
                node.y = node.mobility[time].y 
            } else {
                // vypocitaj;
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

        $nodes[nodeId].mobility[$current_time] = {};

        $nodes[nodeId].mobility[$current_time].x = x;
        $nodes[nodeId].mobility[$current_time].y = y;
        $nodes[nodeId].mobility[$current_time].z = 1;

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
        newNode.mobility[$current_time] = { x: x, y: y, z: 0 };

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

<svg bind:this={bind} height="97%" width="100%">
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
