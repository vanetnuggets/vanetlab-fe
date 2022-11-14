<script>
    import Container from "./Container.svelte";
    
    let containers = []
    let data_c = []
    let name

    let data = {
        "node_count": 0,
        "node_containers": containers,
        "container_settings": {},
    }

    function addContainer(){
        containers.push({id: containers.length, name: name})
        containers = containers;
        name = ""
    }
    function showAll() {
        console.log(data)
        containers.forEach(e => {
            console.log(e.name, data_c[e.id])
        });
    }
</script>
<button on:click={showAll}>
    show
</button>

<input bind:value={name} placeholder="Type container's name">
<button on:click={addContainer}>
    Add container
</button>

{#each containers as c (c.id) }
    <Container name={c.name} bind:container={data_c[c.id]}/>
{/each}

