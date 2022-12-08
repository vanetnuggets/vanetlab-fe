<div class="myapp">
  <div class="mytop">
  <slot name="top">
  </slot>
  </div>

  

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
  <div class="mybottom">
    <slot name="bottom">
    </slot>
  </div>
</div>

<style>

.mytop {
  text-align: center;
  z-index: 1;
}

.mybottom {
  flex: 0 0 40px;
  z-index: 100;
  text-align: center;
  z-index: 1;
}

.lol {
  display: flex; 
  flex-direction: row;
  max-height: calc(100vh - 75px);
  max-width: 100%;
  height: 100vh;
  align-items: stretch;
}

.myright {
  overflow-y: scroll;
  z-index: 1;
}

.myleft {
  overflow-y: scroll;
  z-index: 1;
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