<script>
  import { fade } from "svelte/transition";
  import { push } from "svelte-spa-router";
  import { current_node, scenarioName } from "../../store/store";
  import { reset_store } from "../../store/scenario";
  import { assembleConfig, saveLocal } from "../../services/LoadService";
  import { saveRemote as saveRemoteScenario, simulate } from "../api/scenarios";
  import { validate, getSummary } from "../api/scenarios";
  import { get } from "svelte/store";
  import createSock from "../../services/Ws";
  import { getNotificationsContext } from "svelte-notifications";
  import {
    isError,
    isValidated,
    errorData,
    isOk,
    loading,
    simData,
  } from "../../store/summary";
  const { addNotification } = getNotificationsContext();

  let visible = true;
  let force_visible = true;
  let currName;

  scenarioName.subscribe((val) => {
    currName = val;
  });

  async function runSimulation() {
    let notifText = "";
    let notifType = "";
    loading.update((val) => ({
      ...val,
      scenario: true,
    }));
    addNotification({
      text: "Simulation started",
      position: "bottom-center",
      type: "success",
      removeAfter: 1500,
    });
    simulate(currName)
      .then((resp) => {
        let data = resp.data.data;
        let name = get(scenarioName);
        notifType = "success";
        notifText = `Scenario '${name}' queued up for simulation.`;
      })
      .catch((err) => {
        let data = err.response.data.data;
        errorData.set(data);
        notifText = `Failed to run simulation.`;
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

    setTimeout(() => {
      let sock = createSock(currName);
    }, 100);
  }

  async function saveRemote() {
    let config = assembleConfig();
    let text = "";
    let type = "";
    saveRemoteScenario(currName, config)
      .then((resp) => {
        let name = resp.data.name;
        text = `Scenario '${name}' successfully saved remotely!`;
        type = "success";
      })
      .catch((err) => {
        let reason = err.response.data.message;
        text = `Failed to save scenario remotely. reason: ${reason}`;
        type = "error";
      })
      .finally(() => {
        addNotification({
          text: text,
          position: "bottom-center",
          type: type,
          removeAfter: 1500,
        });
      });
  }

  function validateSimulation() {
    loading.update((val) => ({
      ...val,
      scenario: true,
    }));
    let notifType = "";
    let notifText = "";

    addNotification({
      text: "Check started",
      position: "bottom-center",
      type: "success",
      removeAfter: 1500,
    });
    validate(currName)
      .then((resp) => {
        let name = get(scenarioName);
        isError.set(false);
        isOk.set(false);
        isValidated.set(true);
        notifText = `Scenario '${name}' validated!`;
        notifType = "success";
      })
      .catch((err) => {
        let data = err.response.data.data;
        errorData.set(data.split("\n"));
        isError.set(true);
        isOk.set(false);
        isValidated.set(false);
        notifText = `Errors while validating scenario. See details in 'Result' tab`;
        notifType = "error";
      })
      .finally(() => {
        loading.update((val) => ({
          ...val,
          scenario: false,
        }));
        addNotification({
          text: notifText,
          position: "bottom-center",
          type: notifType,
          removeAfter: 1500,
        });
      });
  }

  function gotoSummary() {
    getSummary(currName).then((resp) => {
      isOk.set(true);
      simData.set(resp.data.data);
    });
    push(`/app/summary`);
  }

  function goto(a) {
    push(`${a}`);
  }

  function goto_exit(a) {
    current_node.set(null);
    reset_store();
    goto(a);
  }

  function toggle() {
    force_visible = !force_visible;
  }

  function handle_hover_topbar_enter() {
    if (!visible) {
      visible = true;
    }
  }

  function handle_hover_topbar_leave() {
    if (!force_visible) visible = false;
  }
</script>

<div
  class="top"
  on:mouseenter={handle_hover_topbar_enter}
  on:mouseleave={handle_hover_topbar_leave}
>
  <button
    class="btn l"
    on:click={toggle}
    style="background-color: {!force_visible ? 'grey' : 'var(--dark-3)'};"
    >🍔</button
  >
  <button on:click={() => goto_exit("/")} class="btn r">🚪 Exit</button>
  {#if visible == true}
    <div transition:fade={{ duration: 50 }}>
      <button on:click={() => goto(`/app/${currName}/canvas`)} class="btn l"
        >🎨 Canvas</button
      >
      <button on:click={validateSimulation} class="btn l">⚗️ Check</button>
      <button on:click={runSimulation} class="btn l">☕️ Simulate</button>
      <button on:click={() => goto(`/app/${currName}/summary`)} class="btn l"
        >📈 Results</button
      >
      <button on:click={saveLocal} class="btn r">🗃️ Save local</button>
      <button on:click={saveRemote} class="btn r">☁️ Save remote</button>
    </div>
  {/if}
  <div class="middle">
    {currName}
  </div>
</div>

<style>
  .btn {
    background-color: var(--dark-3);
    color: var(--color-text-1);
    padding: 0px 4px 0px 4px;
    margin: 0px 5px;
    font-size: 15px;
    border-radius: 5px;
    border: 0px solid red;
  }

  .btn:hover {
    background-color: var(--dark-3);
    outline: 1px solid var(--color-text-1);
  }

  .middle {
    position: fixed;
    align-items: center;
    justify-content: center;
    display: flex;
    top: 4px;
    left: 0;
    right: 0;
    z-index: -1;
    height: 34px;
    top: 0;
    bottom: 0;
  }

  .l {
    float: left;
  }

  .r {
    float: right;
  }
</style>
