<script>

export let attribute
export let value
export let comparator

let valid  = false
let error_msg =  ""
let local_value = null

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

<div class="row">
  <div class="col">
    {attribute.name}:
  </div>
  <div class="col">
      <input
        class="my-input-l"
        bind:value={local_value}
        placeholder={attribute.placeholder}
        type= "text"
        class:field-danger={!valid}
        on:input={updateValue}
      />
  </div>
</div>
<div style="color: red;" hidden={valid}>
  {error_msg}
</div>