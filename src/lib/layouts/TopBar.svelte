<button class="btn l" on:click={toggle}>🍔</button>
{#if visible == true}
<div>
  <button on:click={() => goto('canvas')} class="btn l">🎨 Canvas</button>
  <button on:click={() => goto('summary')} class="btn l">🚏 Simulation</button>
</div>
{/if}

<div class="middle">
😎 VANETLAT FRONTEND 😎
</div>

<script>
  import { push } from 'svelte-spa-router'
  let visible = true;

  function goto(a) {
    if (a == 'summary') {
      push('/summary')
    } else if (a == 'canvas') {
      push('/canvas')
    }
  }

  function toggle() {
    visible = !visible;
  }

</script>

<style scoped>
.btn {
  background-color: white;
  color: black;
  padding: 0px 4px;
  margin: 0px 5px;
  font-size: 15px;
  border-radius: 0;
  border: 0px solid red;
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

</style>