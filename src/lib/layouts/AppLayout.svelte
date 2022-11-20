<div class="myapp">
  <slot name="top">
  </slot>

  <div class="lol">
    
    <div class="myleft">
      <slot name="left">
      </slot>
    </div>
    <div class="mycontent">
      <slot name="content">
      </slot>
    </div>
    <div class="myright">
      <slot name="right">
      </slot>
    </div>
  </div>
</div>

<style>
.mytop {
  flex: 0 0 25px;
}

.lol {
  display: flex; 
  flex-direction: row;
  max-height: calc(100vh - 25px);
  max-width: 100%;
  height: 100vh;
  align-items: stretch;
}

.myright {
  overflow-y: scroll;
  background-color: blueviolet;
}

.myleft {
  overflow-y: scroll;
  background-color: brown;
}


.mycontent {
  position: relative;
  flex-grow: 4;
  align-items: stretch;
}

.myapp {
  display: flex; 
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
</style>