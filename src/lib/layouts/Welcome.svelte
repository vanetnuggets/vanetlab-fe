<script>
  import NewSim from "./welcome/NewSim.svelte";
  import FromSumo from "./welcome/FromSumo.svelte";
  import LoadRemote from "./welcome/LoadRemote.svelte";
  import LoadLocal from "./welcome/LoadLocal.svelte";
  import Logo from "./Logo.svelte";

  import { listScenarios } from "../api/scenarios";
  import { scenarioList } from "../../store/welcome";
  import { validateApiKey } from "../api/scenarios";
  import { getNotificationsContext } from "svelte-notifications";
  import { push } from "svelte-spa-router";
  const { addNotification } = getNotificationsContext();

  let curr_option = null;
  let loadRemoteComponent;
  let apiSecret;

  function click_new_sim() {
    if (curr_option == "NEW") curr_option = null;
    else curr_option = "NEW";
  }

  function click_load_sumo() {
    if (curr_option == "SUMO") curr_option = null;
    else curr_option = "SUMO";
  }

  function click_load_local() {
    if (curr_option == "LOCAL") curr_option = null;
    else curr_option = "LOCAL";
  }

  async function click_load_remote() {
    if (curr_option == "REMOTE") curr_option = null;
    else {
      curr_option = "REMOTE";
      let result = await listScenarios();
      scenarioList.update((_) => result.data.data);
    }
  }

  async function setApiKey() {
    let notifText = "";
    let notifType = "";
    localStorage.setItem("apiKey", apiSecret);

    validateApiKey()
      .then((resp) => {
        notifType = "success";
        notifText = `Api key validated`;
        apiSecret = "";
      })
      .catch((err) => {
        notifText = `Validation failed`;
        notifType = "error";
      })
      .finally(() => {
        addNotification({
          text: notifText,
          position: "bottom-center",
          type: notifType,
          removeAfter: 1500,
        });
      });
  }
</script>

<div class="logo">
  <Logo/>
</div>

<div class="flex-container">
  <div class="flex-item">
    <div class="center-container">
      <div class="inside">
        <div class="row">
          <button on:click={click_new_sim} class="btn-basic w"
            >New simulation</button
          >
        </div>
        <div class="row">
          <button on:click={click_load_sumo} class="btn-basic w"
            >Load XML from SUMO</button
          >
        </div>
        <div class="row">
          <button on:click={click_load_local} class="btn-basic w"
            >Load local JSON</button
          >
        </div>
        <div class="row">
          <button on:click={click_load_remote} class="btn-basic w"
            >Load remote scenario</button
          >
        </div>
        <div class="row">
          <button on:click={() => {push('/about')}} class="btn-basic w"
            >About</button>
        </div>
        <div class="row bottom" style="padding-left: 10px;">
          <p style="padding-left: 10px; text-align: justify; width: 30%; font-size:14px">
            Api key:
          </p>
          <input
            id="api-key-input"
            placeholder="api key"
            bind:value={apiSecret}
            style="width: 100%;"
          />
          <button on:click={setApiKey} class="btn-basic">set</button>
        </div>
      </div>
    </div>
  </div>

  {#if curr_option != null}
    <div class="flex-item">
      <div class="center-container">
        <div class="inside">
          {#if curr_option == "NEW"}
            <NewSim />
          {/if}
          {#if curr_option == "SUMO"}
            <FromSumo />
          {/if}
          {#if curr_option == "LOCAL"}
            <div>
              <LoadLocal />
            </div>
          {/if}
          {#if curr_option == "REMOTE"}
            <div>
              <LoadRemote bind:this={loadRemoteComponent} />
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .inside {
    width: 400px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-items: stretch;
  }

  .w {
    width: 100%;
  }

  .center-container {
    height: 360px;
    display: flex;
    flex-direction: row;
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
    height: 80vh;
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
