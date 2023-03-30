<script>
    import "../../assets/nodeconf.css";
    import { slide } from "svelte/transition";
    import { nodes } from "../../store/scenario";

    export let node_id;

    const l3_types = {
        udpclient: {
            port: "1",
            start: "0",
            stop: "0",
            interval: "0",
            packet_size: "0",
            max_packets: "0",
            comm: null,
        },
        udpserver: {
            port: "1",
            start: "0",
            stop: "0",
        },
        tcpclient: {
            port: "1",
            start: "0",
            stop: "0",
            max_bytes: "0",
            comm: null,
        },
        tcpserver: {
            port: "1",
            start: "0",
            stop: "0",
        },
    };

    const validation_attributes = {
        port: {
            name: "Port",
            placeholder: "Port from range 1-65535",
            validation: 1,
        },
        start: { name: "Start", placeholder: "unsigned int", validation: 2 },
        stop: {
            name: "Stop",
            placeholder: "unsigned int > start",
            validation: 3,
        },
        comm: {
            name: "Communication",
            placeholder: "Pick nodes to communicate with",
            validation: 0,
        },
        interval: {
            name: "Interval",
            placeholder: "unsigned int",
            validation: 2,
        },
        packet_size: {
            name: "Packet size",
            placeholder: "unsigned int",
            validation: 2,
        },
        max_packets: {
            name: "Max packets",
            placeholder: "unsigned int",
            validation: 2,
        },
        max_bytes: {
            name: "Max bytes",
            placeholder: "unsigned int",
            validation: 2,
        },
    };

    let open_l3 = false;
    function toggle_l3() {
        open_l3 = !open_l3;
    }

    function reset_l3conf() {
        $nodes[node_id].l3conf = l3_types[$nodes[node_id].l3];

        $nodes = $nodes;
    }
</script>

<div class="L3">
    <button on:click={toggle_l3} class="importrant-btn btn-trans full">
        | Application config
    </button>
    {#if open_l3 && $nodes[node_id] !== undefined}
        <div transition:slide>
            <div class="row">
                <div class="col">
                    Application: <br />
                </div>
                <div class="col">
                    <select
                        class="dropdown"
                        bind:value={$nodes[node_id].l3}
                        on:change={reset_l3conf}
                    >
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
                    {#each Object.keys($nodes[node_id].l3conf) as key}
                        <div class="row">
                            <div class="col">
                                {validation_attributes[key].name}: <br />
                            </div>
                            <div class="col">
                                {#if validation_attributes[key].validation === 0}
                                    <select
                                        class="dropdown"
                                        bind:value={$nodes[node_id].l3conf[key]}
                                    >
                                        {#each Object.keys($nodes) as node}
                                            <option value={node}>
                                                {node}
                                            </option>
                                        {/each}
                                    </select>
                                {:else}
                                    <input
                                        class="my-input dropdown"
                                        bind:value={$nodes[node_id].l3conf[key]}
                                        placeholder={validation_attributes[key]
                                            .placeholder}
                                    />
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</div>
