<svelte:head>
  <title>Example — Add/Remove</title>
  <meta name="description" content="Svelte-grid — Example — Add/Remove" />
  <meta name="keywords" content="draggable,resizable,grid,layout,responsive,breakpoints,Svelte,svelte,svelte.js,sveltejs,usage,example,examples,samples,add,remove,dynamic" />
  <meta name="author" content="Vahe Araqelyan" />
</svelte:head>

<style>
  .remove { cursor: pointer; position: absolute; right: 5px; top: 3px; }
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


<button on:click={add}>Add (random size)</button>
<button on:click={addAt}>Add random (x=0,y=0)</button>
<label>
  <input type="checkbox" bind:checked={adjustAfterRemove} />
  Adjust elements after removing an item
</label>

<div class=demo-container>
  <Grid bind:items={items} rowHeight={100} let:item let:dataItem {cols}>
    <div class=demo-widget>
      <span on:pointerdown={e => e.stopPropagation()}
        on:click={() => remove(dataItem)}
        class=remove
        >
        ✕
      </span>
      <p>{dataItem.id}</p>
    </div>
  </Grid>
</div>

<script>
import Grid from "svelte-grid";
import gridHelp from "svelte-grid/build/helper/index.mjs";
// import { openSource } from "./github.js";

const COLS = 6;

const id = () => "_" + Math.random().toString(36).substr(2, 9);

const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

let items = [
  {
    [COLS]: gridHelp.item({
      x: 0,
      y: 0,
      w: 2,
      h: 2,
    }),
    id: id(),
  },

  {
    [COLS]: gridHelp.item({
      x: 2,
      y: 0,
      w: 2,
      h: 2,
    }),
    id: id(),
  },
];

const cols = [[1100, 6]];

function add() {
  let newItem = {
    6: gridHelp.item({
      w: Math.round(randomNumberInRange(1, 4)),
      h: Math.round(randomNumberInRange(1, 4)),
      x: 0,
      y: 0,
    }),
    id: id(),
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

const addAt = () => {
  let newItem = {
    6: gridHelp.item({
      w: Math.round(randomNumberInRange(1, 4)),
      h: Math.round(randomNumberInRange(1, 4)),
      x: 0,
      y: 0,
    }),
    id: id(),
  };

  items = [...[newItem], ...items];

  items = gridHelp.adjust(items, COLS);
};

const remove = (item) => {
  items = items.filter((value) => value.id !== item.id);

  if (adjustAfterRemove) {
    items = gridHelp.adjust(items, COLS);
  }
};

let adjustAfterRemove = false;
</script>