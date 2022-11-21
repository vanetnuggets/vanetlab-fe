<script>
    import Container from "./Container.svelte";
    
    let containers = []
    let data_c = []
    let name = ""

    let data = {
        "node_count": 0,
        "node_containers": [],
        "container_settings": {},
    }

    function addContainer(){
        if (name.trim() != '') {
            console.log(name)
            containers.push({id: containers.length, name: name})
            containers = containers;
            name = ""
        } else {
            alert("Názov kontajnera nesmie byť prázdny")
        }
    }
    function showAll() {
        containers.forEach(e => {
            data.node_containers.push(e.name)
            data.container_settings[e.name] = data_c[e.id]
        });
        console.log(JSON.stringify(data))
    }
</script>


<button on:click={showAll}>
    show
</button>
<div>
    <input bind:value={name} placeholder="Type container's name">
    <button on:click={addContainer}>
        Add container
    </button>
</div>


{#each containers as c (c.id) }
    <Container name={c.name} bind:container={data_c[c.id]}/>
{/each}

