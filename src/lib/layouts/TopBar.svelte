<button class="btn l" on:click={toggle}>🍔</button>
{#if visible == true}
<div>
  <button on:click={() => goto('canvas')} class="btn l">🎨 Canvas</button>
  <button on:click={() => goto('summary')} class="btn l">🚏 Simulation &nbsp;</button>
  <button on:click={() => goto('sumo')} class="btn l">🤼 SUMO</button>
</div>
{/if}

<div class="middle">
  🚘️ VanetLab v0.1 🚘️
</div>

<script>
  import { push } from 'svelte-spa-router'
  let visible = true;

  function goto(a) {
    if (a == 'summary') {
      push('/summary')
    } else if (a == 'canvas') {
      push('/canvas')
    } else if (a == 'sumo') {
      push('/sumo')
    }
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