<script>
    import { slide } from 'svelte/transition'

    let isClientVisible = false
    let ClientBntText = "Show client's apps settings"
    let isServerVisible = false
    let ServerBntText = "Show server's apps settings"


    function handleClient() {
        isClientVisible = !isClientVisible;
        ClientBntText = isClientVisible ? "Hide client's apps settings" : "Show client's apps settings"
    }

    function handleServer() {
        isServerVisible = !isServerVisible;
        ServerBntText = isServerVisible ? "Hide server's apps settings" : "Show server's apps settings"
    }
</script>

<div style="background:purple">
    <div>
        <button on:click={handleServer} class="somebs">{ServerBntText}</button>
    </div>
    {#if isServerVisible}
    <div transition:slide class="somebs">
        <p>nothing yet</p>
    </div>
    {/if}
    <div>
        <button on:click={handleClient} class="somebs">{ClientBntText}</button>
    </div>
    {#if isClientVisible}
    <div transition:slide class="somebs">
        <p>nothing yet</p>
    </div>
    {/if}
</div>


<style>
    button {
    width: 360px;
    }
    .somebs {
        margin: 15px 0 15px 0;
    }
</style>