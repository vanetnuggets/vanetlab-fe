<script>
 
    import { nodes } from "../../store/scenario";
    export let switchValue
    export let networkId = 0


function resetNodes (){ 
    //console.log("cau")
    for (const key of Object.keys($nodes)) {
        //console.log($nodes[key].l2id , networkId)
        if( $nodes[key].l2id == networkId){
            //console.log("spm")
            $nodes[key].l2 = switchValue.toLowerCase()
            $nodes[key].l2conf = {}
        }
    }
    $nodes=$nodes
}

function handleClick(event){
        const target = event.target

        const state = target.getAttribute('aria-checked')

        checked = state === 'true' ? false : true

        switchValue = checked === true ? 'LTE' : 'WIFI'
        resetNodes()
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