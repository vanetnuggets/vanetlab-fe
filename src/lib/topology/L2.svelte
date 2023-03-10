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
                    <select bind:value={l2_type} on:change={set_l2}>
                        {#each Object.keys(l2_types) as l2_t}
                            <option value={l2_t}>
                                {l2_t}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
            {#if l2_type == l2_types[0]}
                <div transition:slide> 
                    <div class="row">
                        <div class="col">
                        {l2_types[0]} type: <br>
                        </div>
                        <div class="col">
                            <select bind:value={lte_type} on:change={set_l2conf}>
                                {#each lte_types as lte_t}
                                    <option value={lte_t}>
                                        {lte_t}
                                    </option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
            {/if}
            {#if l2_type == l2_types[1]}
                <div transition:slide> 
                    <div class="row">
                        <div class="col">
                        {l2_types[1]} type: <br>
                        </div>
                        <div class="col">
                            <select bind:value={wifi_type}>
                                {#each wifi_types as wifi_t}
                                    <option value={wifi_t}>
                                        {wifi_t}
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
                    "lte":["eu","enb"],
                    "wifi": ["sta","ap"]
                }
  let l2_type=null

  const lte_types= ["eu","enb"]
  let lte_type = null

  const wifi_types= ["sta","ap"]
  let wifi_type = null
  
  let open_l2 = false;
  function toggle_l2() {
    open_l2 = !open_l2;  
  }

  function set_l2(){
    $main_config.nodes.l2 = l2_type
    $main_config=$main_config
  }

  function set_l2conf(){
    // if{}
    // $main_config.nodes.l2conf = {}
    // $main_config=$main_config
  }
</script>