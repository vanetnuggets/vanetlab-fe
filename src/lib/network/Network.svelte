<script>
    import { lte_exists, pgw_exists, visibleNetwork} from '../../store/store.js';
    import ColorPicker from 'svelte-awesome-color-picker';
    import { networks, nodes } from '../../store/scenario.js';
    import { onMount } from "svelte";
    
    import ValidateInputNetworks from '../validation/ValidateInputNetworks.svelte';
    import { networks_attributes } from "../../store/validation";
    
    export let network;

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
            if (tmp[network.id].type == "LTE") {
                lte_exists.set(false)
                pgw_exists.set(false)
            }
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

    onMount(() => {
    });

    let valid = false
    $: if ( network.ssid != undefined && network.ssid != null && network.address != null){
        valid = false
        let name_validation = $networks_attributes["name"].validation(network.ssid,$networks)
        let address_validation = $networks_attributes["address"].validation(network.address,$networks)
        if(name_validation.valid && address_validation.valid)
          valid = true

      } else 
        valid = false

    function networksNotMe() {
        let a = Object.values($networks).filter(x => {
            x.ssid != network.ssid
        });
        console.log('returning', a);
        return a;
    }

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
          <span class="span">{Array.from(network.type)[0]+Array.from(network.type)[Array.from(network.type).length-1]}</span>
          {network.ssid}
          <span style="color:{network.color}">⬤</span>
        </div>
        </button>
        <button on:click={deleteContainer} class="btn-basic remover {confirm ? 'confirm': ''}">X</button>
      </div>
    
    {#if open}
    <div>
        <ValidateInputNetworks bind:value={network.ssid} attribute={$networks_attributes["name"]} comparator={networksNotMe()} ></ValidateInputNetworks><br>
        <ValidateInputNetworks bind:value={network.addr} attribute={$networks_attributes["address"]} comparator={null} ></ValidateInputNetworks><br>
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

