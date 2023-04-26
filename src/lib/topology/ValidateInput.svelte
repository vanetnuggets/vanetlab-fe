<script>
import mobility_attributes from "./mobilityAttributes.js"

export let attribute;

function validate(value, attr) {
  let result = $mobility_attributes[attr].validation(value)
  $mobility_attributes[attr].valid = result.valid;
  $mobility_attributes[attr].error_msg = result.message;
}

console.log(attribute, $mobility_attributes);
</script>


<div class="col">
  <input
    class="my-input"
    bind:value={$mobility_attributes[attribute].value}
    placeholder="ahoj"
    on:input={() => validate($mobility_attributes[attribute].value, attribute)}
  />
  <div style="color: red;" hidden={$mobility_attributes[attribute].valid}>
    {$mobility_attributes[attribute].error_msg}
  </div>
</div>
