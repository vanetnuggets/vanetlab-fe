<script>
    import { zoom, select, drag } from "d3";
    import { onMount } from "svelte";
    let bindSvgHere;
    let svg;
    let circle;
    let fakenodes = [
        {
        "x": 50,
        "y": 50,
        "net": 1
        },
        {
        "x": 120,
        "y": 50,
        "net": 1
        },
        {
        "x": 140,
        "y": 50,
        "net": 2
        }
    ];
    let colors = ["blue", "pink", "brown"];
    
    function started(event) {
      circle = select(this); // set circle to the element that has been dragged.
      circle.attr("cx", event.x).attr("cy", event.y); // move the x/y position
    }
    $: dragHandler = drag().on("drag", started); // setup a simple dragHandler
    onMount(() => {
        svg = select(bind);
        dragHandler(svg.selectAll(".myPoint")); //onMount, get all the circles we've rendered and call dragHandler on them
    }
    )


    let width = 1000
    let height = 1000
    let bindHandleZoom, bind;

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

<svg bind:this={bind} {width} {height}>
    <g bind:this={bindHandleZoom}>
        {#each fakenodes as d, i}
        <circle class="myPoint"
            cx={d.x} cy={d.y} r="4" fill={colors[d.net]}/>
        {/each}
    </g>
</svg>


<!--
<svg bind:this={bindSvgHere} height="97%" width="100%">
    {#each fakenodes as point, i}
        <circle
            class="myPoint"
            cx={point.x}
            cy={point.y}
            r="15"
            fill={colors[point.net]}
        />
    {/each}
</svg>
-->