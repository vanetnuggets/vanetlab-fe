<script>
    import { nodes } from "../../store/scenario";
    import { lte_exists } from "../../store/store";
    export let switchValue;
    export let networkId = 0;

function resetNodes (){ 
    for (const key of Object.keys($nodes)) {
        if( $nodes[key].l2id == networkId){
            $nodes[key].l2 = switchValue.toLowerCase()
            $nodes[key].l2conf = {}
        }
    }
    $nodes=$nodes
}

function handleClick(name){
    switchValue=name;
    resetNodes();
}
</script>


<div class="s s--inner">
    <button on:click={() => handleClick("ETH")} class="{switchValue == 'ETH' ? 'clicked' : ''}">ETH</button>
    <button on:click={() => handleClick("LTE")} class="{switchValue == 'LTE' ? 'clicked' : ''}" disabled={$lte_exists}>LTE</button>
    <button on:click={() => handleClick("WIFI")} class="{switchValue == 'WIFI' ? 'clicked' : ''}">WIFI</button>
</div>

<style>
    .clicked {
        background-color: var(--accent-color);
    }

    button:hover {
        outline: var(--accent-color) solid 1px;
    }
</style>