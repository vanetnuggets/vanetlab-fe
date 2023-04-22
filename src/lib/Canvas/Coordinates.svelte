<script>
    export let mouse_x;
    export let mouse_y;
</script>

<div class="coords">
    <div class="coords_inside">
        <p>x:</p>
        <p>{Math.round(mouse_x)}</p>
    </div>
    <div class="coords_inside">
        <p>y:</p>
        <p>{Math.round(mouse_y)}</p>
    </div>
</div>

<style scoped>
    .coords {
        margin-top:10px;
        background-color: rgba(52, 52, 52, 0.5);
        float: right;
        width: 80px;
        height: 50px;
        display: flex; flex-direction: column;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    
    .coords_inside {
        display: flex;
        flex-direction: row;
    }
    p {
        margin-left: 5px;
    }
</style>