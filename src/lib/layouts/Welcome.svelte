<div class="flex-container">
  <div class="flex-item ">
    <div class="center-container">
      VanetLab
      <div class="inside">
        <div class="row">  
          <button on:click={click_new_sim} class="btn-basic">New simulation</button>
        </div>
        <div class="row">  
          <button on:click={click_load_sumo} class="btn-basic">Load from sumo</button>
        </div>
        <div class="row">  
          <button on:click={click_load_local} class="btn-basic">Load local</button>
        </div>
        <div class="row">  
          <button on:click={click_load_remote} class="btn-basic">Load remote</button>
        </div>
      </div>
    </div>
  </div>

  {#if curr_option!=null}
  <div class="flex-item">
    <div class="center-container">
      <div class="inside">
        {#if curr_option == 'NEW'}
          <NewSim></NewSim>
        {/if}
        {#if curr_option == 'SUMO'}
          <FromSumo></FromSumo>
        {/if}
        {#if curr_option == 'LOCAL'}
        <div>
          Drag config json
        </div>
        {/if}
        {#if curr_option == 'REMOTE'}
        <div>
          Get scenarios
        </div>
        {/if}
      </div>
    </div>
  </div>
  {/if}
</div>

<style scoped>
.center-container {
  display: flex;
  flex-direction: column;
  background-color: var(--dark-1);
  color: white;
  margin: auto;
  padding: 20px;
  min-width: 400px;
  min-height: 300px;
  align-items: center;
  text-align: center;
  transition: opacity 0.4s, transform 1s;
  transition: 0.3s;
}
.flex-container {
  background-color: var(--dark-2);
  display: flex;
  align-items: center;
  flex-direction: row;
  transition: opacity 0.4s, transform 1s;
  transition: 0.3s;
  justify-content: space-evenly;
  height: 100vh;
}
.flex-item {
  max-width: 500px;
  transition: opacity 0.4s, transform 1s;
  transition: 0.3s;
}
</style>

<script>
  import NewSim from "./welcome/NewSim.svelte";
  import FromSumo from "./welcome/FromSumo.svelte";

  let curr_option = null

  function click_new_sim() {
    if (curr_option == 'NEW')
      curr_option = null
    else curr_option = 'NEW' 
  }

  function click_load_sumo() {
    if (curr_option == 'SUMO')
      curr_option = null
    else curr_option = 'SUMO' 
  }

  function click_load_local() {
    if (curr_option == 'LOCAL')
      curr_option = null
    else curr_option = 'LOCAL' 
  }

  function click_load_remote() {
    if (curr_option == 'REMOTE')
      curr_option = null
    else curr_option = 'REMOTE' 
  }



  



  function load_local() {

  }

  function load_remote() {

  }

</script>