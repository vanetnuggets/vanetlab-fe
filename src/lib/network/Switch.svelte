<script>

    export let switchValue

function handleClick(event){
        const target = event.target

        const state = target.getAttribute('aria-checked')

        checked = state === 'true' ? false : true

        switchValue = checked === true ? 'LTE' : 'WIFI'
    }

    let checked = (switchValue=="LTE" ? true : false)

</script>


<div class="s s--inner">
    <button
        role="switch"
        aria-checked={checked}
        on:click={handleClick}>
            <span>LTE</span>
            <span>WIFI</span>
    </button>
</div>