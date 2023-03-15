
<div class="container">
  {#if showError}
    <br>
    <h1>Scenario contains an error 🙀</h1>

    <div class="error-holder">
      {#each errData as line}
        { line } <br>
      {/each}
    </div>
  {/if}

</div>

<script>
import { isError, errorData } from "../../store/summary";

let showError = false;
let showResult = false;

let errData = [];

isError.subscribe(val => {
  showError = val;
})

errorData.subscribe(val => {
  errData = val;
})

</script>

<style>
.container {
  overflow-y: scroll;
  max-height: calc(100vh - 75px);
  background-color: var(--main-fg-color);
}

.error-holder {
  text-align: left;
  margin: 20px;
  padding: 5px;
  border-radius: 7px;
  border: 2px solid var(--dark-1)
}

</style>
