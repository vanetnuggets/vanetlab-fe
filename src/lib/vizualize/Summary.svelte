
<div class="container">
  {#if scenarioLoading}
    <div class="loading-holder">
      <div class="tmp">
        <ProgressBar kind=indented size=sm id="#css-loading-bar"/>
      </div>
    </div>
  {:else}
    {#if showError}
      <br>
      <h1>Scenario contains an error 🙀</h1>

      <div class="error-holder">
        {#each errData as line}
          { line } <br>
        {/each}
      </div>
    {/if}
    {#if showResult}
    <br>
    <h1>🥂🎉🥳 zbehol ti scenar</h1>
    <div class="data-holder">

        TODO:
        
        simulate() api call by mal vratit sumar vygenerovanych veci, ktory sa ulozi do store-u <br>
        tu sa spravi nejaky krasny komponent, ktory pre kazdy vygenerovany <br>
        file bude ukazovat jeho velkost a nazov a ked na to kliknes tak ho to downloadne<br>

    </div>
    {/if}
  {/if}
</div>

<script>
import { isError, errorData, isOk, loading } from "../../store/summary";
import { ProgressBar } from "carbon-components-svelte";

let showError = false;
let showResult = false;

let errData = [];
let scenarioLoading = false;

loading.subscribe(val => {
  scenarioLoading = val.scenario;
})

isError.subscribe(val => {
  showError = val;
})

errorData.subscribe(val => {
  errData = val;
})

isOk.subscribe(val => {
  showResult = val;
})

</script>

<style>
.container {
  overflow-y: auto;
  max-height: calc(100vh - 75px);
  background-color: var(--main-fg-color);
  padding: 0px;
  margin: 0px;
}

.error-holder {
  text-align: left;
  margin: 20px;
  padding: 5px;
  border-radius: 7px;
  border: 2px solid var(--dark-1)
}

.data-holder {
  text-align: left;
  margin: 20px;
  padding: 5px;
  border-radius: 7px;
  border: 2px solid var(--dark-1)
}

.loading-holder {
  width: 100%;
}

#css-loading-bar {
  color: red;
}

</style>
