<div class="logo">
  <Logo/>
</div>

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
          <div class="row bottom" style="padding-left: 10px;">
            <p style="padding-left: 10px; text-align: justify; width: 30%;">Api key:</p>
            <input id="api-key-input" placeholder="api key" bind:value={apiSecret} style="width: 100%;"/>
            <button on:click={setApiKey} class="">set</button>
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
            <LoadLocal></LoadLocal>
          </div>
          {/if}
          {#if curr_option == 'REMOTE'}
          <div>
            <LoadRemote bind:this={loadRemoteComponent}></LoadRemote>
          </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style scoped>

.float {
  position: absolute;
  font-size: 8px;
}

.inside {
  width: 400px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-items: stretch;
}

.btn-basic {
  width: 100%;
}

.center-container {
  display: flex;
  flex-direction: column;
  background-color: var(--dark-1);
  color: white;
  margin: auto;
  padding: 20px;
  align-items: center;
  text-align: center;
  transition: opacity 0.4s, transform 1s;
  transition: 0.3s;
  border: none;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
}
.flex-container {
  background-color: var(--dark-2);
  display: flex;
  align-items: center;
  flex-direction: row;
  transition: opacity 0.4s, transform 1s;
  transition: 0.3s;
  justify-content: space-evenly;
  height: 70vh;
}
.flex-item {
  margin-top: -30vh;
}

.logo {
  background-color: var(--dark-2);
  display: flex;
  align-items: center;
  flex-direction: row;
  transition: opacity 0.4s, transform 1s;
  transition: 0.3s;
  justify-content: space-evenly;
  height: 30vh;
}
</style>

<script>
  import NewSim from "./welcome/NewSim.svelte";
  import FromSumo from "./welcome/FromSumo.svelte";
  import LoadRemote from "./welcome/LoadRemote.svelte";
  import LoadLocal from "./welcome/LoadLocal.svelte";
  import Logo from "./Logo.svelte"

  import { listScenarios } from "../api/scenarios";
  import { scenarioList } from "../../store/welcome";



  let curr_option = null
  let loadRemoteComponent;
  let apiSecret;

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

  async function click_load_remote() {
    if (curr_option == 'REMOTE')
      curr_option = null;
    else {
      curr_option = 'REMOTE';
      let result = await listScenarios();
      scenarioList.update(_ => result.data.data);
    } 
  }

  function setApiKey() {
    localStorage.setItem("apiKey", apiSecret);
  }

</script>