<script>
    import { zoom, select, drag } from "d3";
    import { onMount } from "svelte";

    let svg
    let circle
    let fakenodes = [
        {
            "id": 0,
            "x": 50,
            "y": 50,
            "net": 1
        },
        {
            "id": 1,
            "x": 120,
            "y": 50,
            "net": 1
        },
        {   
            "id": 2,
            "x": 140,
            "y": 50,
            "net": 2
        }
    ];
    let colors = ["blue", "pink", "brown"];
    
    function started(event) {
        circle = select(this); // set circle to the element that has been dragged.
        circle.attr("cx", event.x).attr("cy", event.y); // move the x/y position
        fakenodes[circle.attr("data-id")].x = event.x
        fakenodes[circle.attr("data-id")].y = event.y
        console.log("moving", fakenodes[circle.attr("data-id")]);
    }
    $: dragHandler = drag().on("drag", started); // setup a simple dragHandler
    onMount(() => {
        svg = select(bind);
        dragHandler(svg.selectAll(".myPoint")); //onMount, get all the circles we've rendered and call dragHandler on them
    });

    let bindHandleZoom, bind

    $: width = document.getElementById('bs').offsetWidth
    $: height = document.getElementById('bs').offsetHeight

    $: zoomX = zoom()
        .scaleExtent([1, 5])
        .translateExtent([
            [0, 0],
            [width, height],
        ])
        .on("zoom", handleZoom);

    function handleZoom(e) {
        console.log("ev", e.transform);
        select(bindHandleZoom).attr("transform", e.transform);
    }

    $: if (bind) {
        select(bind).call(zoomX);
    }

</script>

<svg bind:this={bind} height="97%" width="100%">
    <g bind:this={bindHandleZoom}>
        {#each fakenodes as d, i}
        <circle class="myPoint"
            data-id={d.id} cx={d.x} cy={d.y} r="15" fill={colors[d.net]}/>
        {/each}
    </g>
</svg>
