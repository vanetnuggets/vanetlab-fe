<script>
    import BulldozerIcon from "../../assets/bulldozer.svg";
    import P2pIcon from "../../assets/p2p.svg";
    import NodeIcon from "../../assets/node.svg";
    import OvsNodeIcon from "../../assets/ovs_node.svg";
    import LabelIcon from "../../assets/label.svg";
    import { adding_ovs_neighbors } from "../../store/store";
    export let add_node_toggle;
    export let add_sdn_toggle;
    export let add_p2p_toggle;
    export let bulldoze_toggle;
    export let first_p2p;
    export let vypis;
    export let label_toggle;
    export let input_value;

    function clear_buttons() {
        adding_ovs_neighbors.set(false);
        add_node_toggle = false;
        add_sdn_toggle = false;
        add_p2p_toggle = false;
        bulldoze_toggle = false;
        label_toggle = false;
        input_value = ""
    }
    
    function bHandler(type) {
        let tmp;
        switch (type) {
            case "add_node":
                tmp = add_node_toggle;
                clear_buttons();
                add_node_toggle = !tmp;
                break;
            case "add_sdn":
                tmp = add_sdn_toggle;
                clear_buttons();
                add_sdn_toggle = !tmp;
                break;
            case "add_p2p":
                tmp = add_p2p_toggle;
                clear_buttons();
                add_p2p_toggle = !tmp;
                if (!add_p2p_toggle) first_p2p = null;
                break;
            case "bulldoze":
                tmp = bulldoze_toggle;
                clear_buttons();
                bulldoze_toggle = !tmp;
                break;
            case "label":
                tmp = label_toggle;
                clear_buttons();
                label_toggle = !tmp;
                break;
            default:
                console.log("zly butoň");
        }
    }
</script>

<div class="action">
    <button
        on:click={() => bHandler("add_node")}
        class="btn s"
        title="node"
        style="background-color:{add_node_toggle ? 'red' : ''}"
    >
        <img src={NodeIcon} height="18px" width="18px" alt="map_icon" />
    </button>
    <button
        on:click={() => bHandler("add_sdn")}
        class="btn s"
        title="ovs"
        style="background-color:{add_sdn_toggle ? 'red' : ''}"
    >
        <img src={OvsNodeIcon} height="18px" width="18px" alt="map_icon" />
    </button>
    <button
        on:click={() => bHandler("add_p2p")}
        class="btn s"
        title="p2p connection"
        style="background-color:{add_p2p_toggle ? 'red' : ''}"
    >
        <img src={P2pIcon} height="18px" width="18px" alt="map_icon" />
    </button>
    <button
        on:click={() => bHandler("label")}
        class="btn s"
        title="Label"
        style="background-color:{label_toggle ? 'red' : ''}"
    >
        <img src={LabelIcon} height="28px" alt="map_icon" />
    </button>
    <button
        on:click={() => bHandler("bulldoze")}
        class="btn s"
        title="delete"
        style="background-color:{bulldoze_toggle ? 'red' : ''}"
    >
        <img src={BulldozerIcon} height="28px" alt="map_icon" />
    </button>
    <button on:click={vypis} class="btn s" style="background-color: grey;"
        >Vypis</button
    >
</div>

<style scoped>
    .action {
        display: inline-flex;
        padding-left: 80px;
    }
    .action button {
        pointer-events: all;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
