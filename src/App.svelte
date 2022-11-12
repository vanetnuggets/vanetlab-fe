<svelte:head>
  <title>Example — Add/Remove</title>
  <meta name="description" content="Svelte-grid — Example — Add/Remove" />
  <meta name="keywords" content="draggable,resizable,grid,layout,responsive,breakpoints,Svelte,svelte,svelte.js,sveltejs,usage,example,examples,samples,add,remove,dynamic" />
  <meta name="author" content="Vahe Araqelyan" />
</svelte:head>

<style>
  img {
    max-width: 100%;
    max-height: 100%; 
    object-fit: contain;
  } 
  .remove { cursor: pointer; position: absolute; right: 5px; top: 3px; }
  .demo-container{
    width: 1000px;
  }
  :global(.svlt-grid-shadow) {
    /* Back shadow */
    background: pink;
  }
  :global(.svlt-grid-item) {
    /* Back shadow */
    background: rgb(206, 13, 45);
  }
  :global(.svlt-grid-container) {
    /* Container color */
    background: #eee;
  }
  :global(.svlt-grid-resizer::after) {
    /* Resizer color */
    border-color: white !important;
  }
</style>


<button on:click={add_horizontal}>Horizontal road</button>
<button on:click={add_vertical}>Vertical road</button>
<button on:click={add_cross}>Cross road</button>
<div class=demo-container>
  <Grid bind:items={items}  gap={[0,0]} rowHeight={100} let:item let:dataItem {cols}>
    <div class=demo-widget>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span on:pointerdown={e => e.stopPropagation()}
        on:click={() => remove(dataItem)}
        class=remove
        style="color:red"
        >
        X
      </span>
     <img src= {dataItem.src} alt="" />
     <p style="color:red">{dataItem[10].x}</p>
     <p style="color:red">{dataItem[10].y}</p>
    </div>
  </Grid>
</div>

<script>
import Grid from "svelte-grid";
import gridHelp from "svelte-grid/build/helper/index.mjs";
// import { openSource } from "./github.js";

const COLS = 10;

const id = () => "_" + Math.random().toString(36).substr(2, 9);

let items = [];

const cols = [[1100, COLS]];

function add(picture){
  let newItem = {
    [COLS]: gridHelp.item({
      w: 1,
      h: 1,
      x: 0,
      y: 0,
      resizable: false,
    }),
    id: id(),
    src:picture,
  };
  let findOutPosition = gridHelp.findSpace(newItem, items, COLS);

  newItem = {
    ...newItem,
    [COLS]: {
      ...newItem[COLS],
      ...findOutPosition,
    },
};

items = [...items, ...[newItem]];
}

function add_horizontal() {
  const picture="roads/horizontal_road.png"
  add(picture)
}
function add_vertical() {
  const picture="roads/vertical_road.png"
  add(picture)
}

function add_cross() {
  const picture="roads/cross_road.png"
  add(picture)
}

const remove = (item) => {
  items = items.filter((value) => value.id !== item.id);
};

</script>