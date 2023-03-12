<script>
    import { zoom, select, drag, randomInt } from "d3";
    import { onMount } from "svelte";
    import { nextNodeId, node_info2 } from '../../store/store.js';
    import { nodes, networks} from '../../store/scenario'

    let radius=15;
    let svg
    let circle
    let colors = ["blue", "pink", "brown", "yellow"];

    $: nodearr = Object.values($nodes);
    
    function started(event) {
        circle = select(this); // set circle to the element that has been dragged.
        circle.attr("cx", event.x).attr("cy", event.y); // move the x/y position
        $nodes[circle.attr("data-id")].x = event.x
        $nodes[circle.attr("data-id")].y = event.y
        // console.log("moving", $nodes[circle.attr("data-id")]);
    }
    $: dragHandler = drag().on("drag", started); // setup a simple dragHandler

    

    let bindHandleZoom, bind

    $: width = document.getElementById('bs').offsetWidth
    $: height = document.getElementById('bs').offsetHeight

    $: zoomX = zoom()
        .scaleExtent([1, 5])
        // @ts-ignore
        .translateExtent([
            [0, 0],
            [width, height],
        ])
        .on("zoom", handleZoom);

    function handleZoom(e) {
        // console.log("ev", e.transform);
        select(bindHandleZoom).attr("transform", e.transform);
    }

    $: if (bind) {
        select(bind).call(zoomX);
    }

    function add_node(){
		let newNode = {
            "id": $nextNodeId,
			"x": width/2,
			"y": 50,
            "mobility": {},
            "l2id": null,
            "l2": null,
            "l2conf": null,
            "l3": null,
            "l3conf": null,
            "net": Math.floor(Math.random() * colors.length)
        };
		$nodes[$nextNodeId] = newNode;
        $nextNodeId+=1
        // wait until it is rendered and add draghandler
        delay(100).then(() => {
            svg = select(bind)
            dragHandler(svg.selectAll(".myPoint"))
        });
	}

    function get_color(l2id) {
        let net = $networks[l2id];
        // zla siet zla farba sme rasisti
        if (net == undefined) {
            return "#000000";
        }
        return $networks[l2id].color;
    }

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time))
    }

    function selectNode(node) {
        node_info2.update(_ => node);
    }

    onMount(() => {
        svg = select(bind)
        dragHandler(svg.selectAll(".myPoint"))
    })

</script>

<div class="toolbar">
	<div class="action">
		<button on:click={add_node} class="btn s">Add node</button>
    </div>
</div>

<svg bind:this={bind} height="97%" width="100%">
    
    <g bind:this={bindHandleZoom}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
        {#each nodearr as d, i}
        <circle on:click={() => selectNode(d)} class="myPoint"
            data-id={d.id} cx={d.x} cy={d.y} r={radius} fill={$networks[d.l2id].color}/>
        <circle cx={d.x+radius-5} cy={d.y+radius-7} r={8} fill="white"/>
        <text alignment-baseline="middle" text-anchor="middle" x={d.x+radius-5} y={d.y+radius-5}>{d.id}</text>
        {/each}
    </g>
</svg>

<style scoped>

</style>

