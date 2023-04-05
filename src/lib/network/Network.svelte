<script>
    import { visibleNetwork } from '../../store/store.js';
    import ColorPicker from 'svelte-awesome-color-picker';
    import { networks, nodes } from '../../store/scenario.js';
    import Switch from './Switch.svelte';
    export let network

    let rgb
    let isShown = false
  
    function clickHandler() {
        isShown = !isShown
        if (isShown) 
        visibleNetwork.set(network.id)
    }
  
    function handleClosing() {
        isShown = false
        return false
    }

    let confirm = false

    function deleteContainer() {
        // cannot delete default network -> breaks everything
        if (network.id == -1) {
            return
        }
        if (confirm){
            $visibleNetwork = "";

            // move all nodes in the network to default network
            for (let key of Object.keys($nodes)) {
                if( $nodes[key].l2id == network.id){
                    $nodes[key].l2id = -1 
                    $nodes[key].l2 = null
                    $nodes[key].l2conf = {}
                }
            }
            $nodes=$nodes
            let tmp = $networks;
            delete tmp[network.id];
            networks.update(_ => tmp);
        } else {
            confirm = true;
        }
    }
    
    // MAGIC
    $: open = ($visibleNetwork == network.id) ? 
            (isShown) ? 
                true
            : false
        : handleClosing()
</script>

<style>
    .name {
        width: 330px;
    }
    .remover {
        width: 30px;
        padding: 2px 0;
    }
    .confirm {
        color: red;
    }
    .span {
        border-radius: 57px;
        padding: 1px;
        float: left;
        color: grey;
    }
  </style>
  
  
<div class="topology_container parent">
    <div class="child" style="display: flex;">
        <button on:click={clickHandler} class="btn-basic name">
        <div>
          <span class="span">{Array.from(network.type)[0]}</span>
          {network.ssid}
          <span style="color:{network.color}">⬤</span>
        </div>
        </button>
        <button on:click={deleteContainer} class="btn-basic remover {confirm ? 'confirm': ''}">X</button>
      </div>
    
    {#if open}
    <div>
        <div class="row">
            <div class="col">
                Network name:
            </div>
            <div class="col">
                <input class="my-input" bind:value={network.ssid} placeholder="example_name">
            </div>
        </div>
        <div class="row">
            <div class="col">
                Network address:
            </div>
            <div class="col">
                <input class="my-input" bind:value={network.addr} placeholder="example_address">
            </div>
        </div>
        <div class="row">
            <div class="col" style="padding-bottom: 10px;">
                <ColorPicker bind:rgb bind:hex={network.color}/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                Network type:
            </div>
            <div class="col" style="text-align: center;">
                {network.type}
            </div>
            </div>
        </div>
    {/if}
</div>

