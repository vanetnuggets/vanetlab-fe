<script>

    export let attribute
    export let value
    export let editable
    export let on_change
    export let objects
    
    let valid  = false
    let error_msg =  ""
    let local_value = null
    
    $:if(value != null || value == null){
        local_value = value
        validate()
    }

    const comparator = null
    
    function validate() {
      let result = attribute.validation(value,comparator)
      valid = result.valid;
      error_msg = result.message;
    }

    function updateValue(){
      value = local_value.toString()
    }
    </script>
    
    <div class="row">
      <div class="col">
        {attribute.name}:
      </div>
      <div class="col">
        <select
            class="dropdown"
            bind:value={local_value}
            placeholder={attribute.placeholder}
            disabled={!editable}
            class:field-danger={!valid} 
            on:change={updateValue}
            on:change={on_change}
           
        >
            {#each objects as object}
                <option value={object}>
                    {object}
                </option>
            {/each}
        </select>
      </div>
    </div>
    <div style="color: red;" hidden={valid}>
      {error_msg}
    </div>