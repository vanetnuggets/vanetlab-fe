
<button class="btn l" on:click={toggle}>🍔</button>
<button on:click={() => goto('/')} class="btn r">🚪 Exit</button>
{#if visible == true}
  <div>
    <button on:click={() => goto('/app/canvas')} class="btn l">🎨 Canvas</button>
    <button on:click={runSimulation} class="btn l">☕️ Simulate</button>
    <button on:click={validateSimulation} class="btn l">⚗️ Check</button>
    <button on:click={() => goto('/app/summary')} class="btn l">📈 Results</button>
    <button on:click={saveLocal} class="btn r">🗃️ Save local</button>
    <button on:click={saveRemote} class="btn r">☁️ Save remote</button>
</div>
{/if}
<div class="middle">
  {currName}
</div>

<script>
  import { push } from 'svelte-spa-router'
  import { scenarioName } from '../../store/store';
  import { assembleConfig, saveLocal } from '../../services/LoadService';
  import { saveRemote as saveRemoteScenario, simulate} from '../api/scenarios';
  import { nodes, networks} from '../../store/scenario'
  import { validate } from '../api/scenarios';
  import { get } from 'svelte/store'

  import { getNotificationsContext } from 'svelte-notifications';
  import { isError, errorData, isOk } from '../../store/summary';
  const { addNotification } = getNotificationsContext();

  let visible = true;
  let currName;

  scenarioName.subscribe(val => {
    currName = val;
  })

  async function runSimulation() {
    simulate(currName).then((resp) => {
      let name = get(scenarioName);
      isError.update(_ => false);
      isOk.update(_ => true);

      addNotification({
        text: `Scenario '${name}' done! View the results in 'Results' tab.`,
        position: 'bottom-center',
        type: 'success'
      });
    }).catch((err) => {
      let data = err.response.data.data;
      errorData.update(_ => data.split('\n'))
      isError.update(_ => true);
      isOk.update(_ => false);

      addNotification({
        text: `Scenario simulation failed. See details in 'Result' tab`,
        position: 'bottom-center',
        type: 'error'
      });
    });
  }

  async function saveRemote() {
    let config = assembleConfig();
    let resp = await saveRemoteScenario(currName, config);

    let error = resp.data.error;
    let status = resp.data.name;

    if (error == false) {
      addNotification({
        text: `Scenario '${status}' successfully saved remotely!`,
        position: 'bottom-center',
        type: 'success'
      });
    } else {
      addNotification({
        text: `Failed to save scenario. reason: ${status}`,
        position: 'bottom-center',
        type: 'error'
      });
    }
  }

  function validateSimulation() {
    validate(currName).then((resp) => {
      let name = get(scenarioName);
      isError.update(_ => false);
      isOk.update(_ => true);

      addNotification({
        text: `Scenario '${name}' validated!`,
        position: 'bottom-center',
        type: 'success'
      });
    }).catch((err) => {
      let data = err.response.data.data;
      errorData.update(_ => data.split('\n'))
      isError.update(_ => true);
      isOk.update(_ => false);

      addNotification({
        text: `Errors while validating scenario. See details in 'Result' tab`,
        position: 'bottom-center',
        type: 'error'
      });
    });
  }

  function goto(a) {
    push(`${a}`)
  }

  function toggle() {
    visible = !visible;
  }

</script>

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
}

.l {
  float: left;
}

.r {
  float: right;
}

</style>