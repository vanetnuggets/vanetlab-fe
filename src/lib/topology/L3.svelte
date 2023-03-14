<script>
    import { slide } from "svelte/transition";
    import { nodes } from "../../store/scenario";

    export let node_id;

    const l3_types = {
        udpclient : {
            comm: null,
            port: 1,
            start: 0,
            stop: 0,
            max_packet: 0,
        },
        udpserver: {
            port: 1,
            start: 0,
            stop: 0,
        },
        tcpclient: {
            port: 1,
            start: 0,
            stop: 0,
        },
        tcpserver: {   
            port: 1,
            start: 0,
            stop: 0,
        }
    }

    let open_l3 = false;
    function toggle_l3() {
        open_l3 = !open_l3;
    }
  
    function reset_l3conf() {
        $nodes[node_id].l3conf = l3_types[$nodes[node_id].l3]
        $nodes = $nodes
    }

</script>

<div class="L3">
    <button on:click={toggle_l3} class="importrant-btn btn-trans">
        L3
    </button><br />
    {#if open_l3}
        <div transition:slide>
            <div class="row">
                <div class="col">
                    L3 type: <br />
                </div>
                <div class="col">
                    <select bind:value={$nodes[node_id].l3} on:change={reset_l3conf}>
                        {#each Object.keys(l3_types) as l3_typ}
                            <option value={l3_typ}>
                                {l3_typ}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
            {#if $nodes[node_id].l3 != null}
                <div transition:slide>
                    <div class="row">
                        <div class="col">
                            Port: <br />
                        </div>
                        <div class="col">
                            <input
                                class="my-input"
                                bind:value={$nodes[node_id].l3conf.port}
                                placeholder="Port from range 1-65535"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            Start: <br />
                        </div>
                        <div class="col">
                            <input
                            class="my-input"
                            bind:value={$nodes[node_id].l3conf.start}
                            placeholder="unsigned int"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            Stop: <br />
                        </div>
                        <div class="col">
                            <input
                            class="my-input"
                            bind:value={$nodes[node_id].l3conf.stop}
                            placeholder="unsigned int > start"
                            />
                        </div>
                    </div>
                    {#if $nodes[node_id].l3 == "udpclient"}
                        <div transition:slide>
                            <div class="row">
                                <div class="col">
                                    Max Packet: <br />
                                </div>
                                <div class="col">
                                    <input
                                        class="my-input"
                                        bind:value={$nodes[node_id].l3conf.max_packet}
                                        placeholder="max packet"
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    Communication: <br />
                                </div>
                                <div class="col">
                                    <select
                                        bind:value={$nodes[node_id].l3conf.comm}
                                    >
                                        {#each Object.keys($nodes) as node}
                                            <option value={node}>
                                                {node}
                                            </option>
                                        {/each}
                                    </select>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    {/if}
</div>
