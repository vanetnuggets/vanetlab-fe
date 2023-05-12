<script>
  // @ts-nocheck

  import { push } from "svelte-spa-router";
  import { getRemote, deleteRemote } from "../../api/scenarios";
  import { scenarioName, scenarioReadOnly } from "../../../store/store";
  import { scenarioList } from "../../../store/welcome";
  import { loadConfig } from "../../../services/LoadService";
  import { getNotificationsContext } from "svelte-notifications";
  const { addNotification } = getNotificationsContext();

  let loading = false;
  let scenarios = [];
  let scenario_toggle = true;

  scenarioList.subscribe((val) => {
    scenarios = val;
  });

  async function loadScenario(name, read_only) {
    scenarioReadOnly.set(read_only);
    let data = await getRemote(name);
    loadConfig(data.data.data); //datadatadata
    scenarioName.set(name);
    push(`/app/${name}/canvas`);
  }

  function removeScenario(name) {
    let notifText = "";
    let notifType = "";
    deleteRemote(name)
      .then((resp) => {
        // update local list
        scenarios = scenarios.filter((item) => item.name !== name);
        notifText = `scenario "${name}" successfully deleted`;
        notifType = "success";
      })
      .catch((err) => {
        notifText = err.response.data.message;
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

<div>
  Load remote scenario
  <div class="btns">
    <button
      class="btn-basic {scenario_toggle ? 'outline' : ''}"
      on:click={() => {
        scenario_toggle = true;
      }}>User</button
    >
    <button
      class="btn-basic {!scenario_toggle ? 'outline' : ''}"
      on:click={() => {
        scenario_toggle = false;
      }}>Default</button
    >
  </div>
  {#if loading == true}
    loading...
  {/if}
  <div class="list">
    <!-- User scenarions -->
    {#if scenario_toggle}
      {#each scenarios as s}
        <div class="fill">
          {#if s["read-only"] == false}
            <button class="f90 selec" on:click={loadScenario(s.name, false)}
              >{s.name}</button
            >
            <button class="f5 delet" on:click={removeScenario(s.name)}
              >🚜</button
            ><br />
          {/if}
        </div>
      {/each}
    {/if}
    <!-- Default scenarions -->
    {#if !scenario_toggle}
      {#each scenarios as s}
        <div class="fill">
          {#if s["read-only"] == true}
            <button class="f91 selec" on:click={loadScenario(s.name, true)}
              >{s.name}</button
            >
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style scoped>
  hr {
    margin-left: 10px;
    margin-right: 10px;
  }
  .fill {
    width: 100%;
    text-align: left;
  }

  .f90 {
    width: 84%;
  }

  .f91 {
    width: 98%;
  }

  .f5 {
    width: 10%;
  }

  .delet:hover {
    background-color: darkred;
    outline: 1px solid white;
  }

  .selec:hover {
    outline: 1px solid white;
  }

  .list {
    max-height: 500px;
    overflow-y: auto;
    border: 3px solid var(--dark-2);
    background-color: var(--light-2);
    border-radius: 5px;
    margin-top: 5px;
    height: 260px;
    width: 395px;
  }

  .btns {
    margin-top: 5px;
  }

  .outline {
    background-color: var(--dark-3);
    border: 0px solid white;
    outline: 1px solid white;
  }
</style>
