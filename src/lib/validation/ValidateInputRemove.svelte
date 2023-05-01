<script>

export let attribute
export let value
export let editable
export let remove_l_attributes
export let remove

let valid  = false
let error_msg =  ""
let local_value = null
let comparator =null

$:if(value != null || value == null){
  local_value = value
  validate()
}

$: if(comparator != null){
  validate()
}

function updateValue(){
  try {
    value = local_value.toString()
  }
  catch(err) {
    value = local_value
  }
}

function validate() {
  let validation = attribute.validation(value,comparator)
  valid = validation.valid;
  error_msg = validation.message;
}
</script>

  <span>{attribute.name}: </span><br/>

  <input
    class="my-input"
    bind:value={local_value}
    placeholder={attribute.placeholder}
    disabled={!editable}
    type= "number"
    class:field-danger={!valid}
    size="5"
    on:input={updateValue}
  />
  {attribute.end}
  <button class="btn-basic" on:click={() => remove_l_attributes(remove)} disabled={!editable}>&times;</button>

  <div style="color: red;" hidden={valid}>
    {error_msg}
  </div>
  <br/>