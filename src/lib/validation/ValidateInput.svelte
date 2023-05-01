<script>
import {validator} from "../../store/validation.js"

export let attribute
export let value
export let editable

let valid  = false
let error_msg =  ""

validator.subscribe((n) => {
  if(attribute != undefined)
    validate()
  });

function validate() {
  let result = attribute.validation(value)
  valid = result.valid;
  error_msg = result.message;
}
</script>

<div class="row">
  <div class="col">
    <p>{attribute.name}: </p>
  </div>
  <div class="col">
    {#if attribute.type === 'number'}
      <input
        class="my-input"
        bind:value={value}
        placeholder={attribute.placeholder}
        disabled={!editable}
        type= "number"
        class:field-danger={!valid}
        on:input={() => validate()}
      />
    {:else if attribute.type === 'text'}
      <input
        class="my-input"
        bind:value={value}
        placeholder={attribute.placeholder}
        disabled={!editable}
        type= "text"
        class:field-danger={!valid}
        on:input={() => validate()}
      />
    {/if}
  </div>
  {attribute.end}
</div>
<div style="color: red;" hidden={valid}>
  {error_msg}
</div>