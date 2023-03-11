<script>
    import { zoom, select, drag, randomInt } from "d3";
    import { onMount } from "svelte";
    import { nextNodeId, nodes } from '../../store/store.js';

    let svg
    let circle
    let colors = ["blue", "pink", "brown", "yellow"];
    
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
            "net": Math.floor(Math.random() * colors.length)
        };
		$nodes = [...$nodes, newNode]
        $nextNodeId+=1
        // wait until it is rendered and add draghandler
        delay(100).then(() => {
            svg = select(bind)
            dragHandler(svg.selectAll(".myPoint"))
        });
	}

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time))
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
        {#each $nodes as d, i}
        <circle class="myPoint"
            data-id={d.id} cx={d.x} cy={d.y} r="15" fill={colors[d.net]}/>
        {/each} 
    </g>
</svg>
