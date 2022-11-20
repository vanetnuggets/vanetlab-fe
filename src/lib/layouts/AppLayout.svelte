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
    <slot class="myright" name="right">
    </slot>
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
  position: fixed;
  right: 0;
  flex: 0 0 auto;
  height: 100vh;
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