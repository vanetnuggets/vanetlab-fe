<div class="L2">
    <button on:click={toggle_l2} class="importrant-btn btn-trans"> 
        L2
    </button><br>
    {#if open_l2}
        <div transition:slide> 
            <div class="row">
                <div class="col">
                L2 type: <br>
                </div>
                <div class="col">
                    <select bind:value={$main_config.nodes[node_id].l2} on:change={set_l2}>
                        {#each Object.keys(l2_types) as l2_t}
                            <option value={l2_t}>
                                {l2_t}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
            {#if $main_config.nodes[node_id].l2 != null}
                <div transition:slide> 
                    <div class="row">
                        <div class="col">
                        {$main_config.nodes[node_id].l2} type: <br>
                        </div>
                        <div class="col">
                            <select bind:value={$main_config.nodes[node_id].l2conf.type} on:change={set_l2conf}>
                                {#each l2_types[$main_config.nodes[node_id].l2] as l2_st}
                                    <option value={l2_st}>
                                        {l2_st}
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

<script>
  import { slide } from 'svelte/transition'
  import { main_config } from '../../store/store.js';
 
  export let node_id

 
  const l2_types={
                    'lte':['eu','enb'],
                    'wifi': ['sta','ap']
                }
  
//   let l2_type = null
//   main_config.subscribe(n => {
//     //console.log(node_id)
//     l2_type= n.nodes[node_id].l2;
//   }) 

  
//   let l2_subtype= null
//   main_config.subscribe(n => {
//     l2_subtype= n.nodes[node_id].l2conf;
//   })               
  
  let open_l2 = false;
  function toggle_l2() {
    console.log(node_id)
    console.log($main_config.nodes[node_id].l2)
    open_l2 = !open_l2;  
  }

  function set_l2(){
    //$main_config.nodes[node_id].l2 = $main_config.nodes[node_id].l2 
    $main_config.nodes[node_id].l2conf = {}
    $main_config=$main_config
  }

  function set_l2conf(){
    //$main_config.nodes[node_id].l2conf = $main_config.nodes[node_id].l2conf
    $main_config=$main_config
    //console.log($main_config)
  }
</script>