<script>
    import { slide } from "svelte/transition";
    import { nodes} from "../../store/scenario";

    export let node_id;
    const l2_types = {
        drop: "drop",
        learning: "learning"
    };

    let c_open = false;
    function toggle_cnt() {
        c_open = !c_open;
    };
</script>

<div class="Sdn">
    <button on:click={toggle_cnt} class="importrant-btn btn-trans full">
        | Controller
    </button>
    {#if c_open}
        <div transition:slide>
            <div class="row">
                <div class="col">
                    Controller: <br />
                </div>
                <div class="col">
                    <select
                        class="dropdown"
                        bind:value={$nodes[node_id].controller}
                    >
                        {#each Object.keys(l2_types) as l2_t}
                            <option value={l2_t}>
                                {l2_t}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    {/if}
</div>
