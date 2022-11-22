<script>
    export let app

    let format = [
        "ms", "s", "min"
    ]
</script>

<div style="background:green">
    <div style="display:ruby">
        <p>Start: </p>
        <input type=number bind:value={app.start.value} min=1 max=1024>
        <select bind:value={app.start.format}>
            {#each format as unit}
                <option value={unit}>
                    {unit}
                </option>
            {/each}
        </select>
    </div>
</div>