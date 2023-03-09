
<button class="btn l" on:click={toggle}>🍔</button>
<button on:click={() => goto('/')} class="btn r">🚪 Exit</button>
{#if visible == true}
  <div>
    <button on:click={() => goto('/app/canvas')} class="btn l">🎨 Canvas</button>
    <button on:click={() => goto('/app/summary')} class="btn l">🚏 Simulation &nbsp;</button>
    <button on:click={() => goto('/app/sumo')} class="btn l">🤼 SUMO</button>
    
    <button on:click={saveLocal} class="btn r">🗃️ Save local</button>
    <button on:click={saveRemote} class="btn r">☁️ Save remote</button>
</div>
{/if}
<div class="middle">
  {currName}
</div>

<script>
  import { push } from 'svelte-spa-router'
  import { scenarioName, config } from '../../store/store';
  import { saveRemote as saveRemoteScenario} from '../api/scenarios';
  
  let visible = true;

  let currName;
  let currScenario

  scenarioName.subscribe(val => {
    currName = val;
  })
  config.subscribe(val => {
    currScenario = val;
  })

  function saveLocal() {
    // TODO - zober config zo storu a uloz ho na disk
  }

  async function saveRemote() {
    await saveRemoteScenario(currName, currScenario);
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