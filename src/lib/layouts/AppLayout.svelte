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
    <div class="mycontent" id="bs">
      <slot name="content">
      </slot>
    </div>
    <div class="myright">
      <slot name="right">
      </slot>
    </div>
  </div>

  
</div>
<div class="mybottom">
  <slot name="bottom">
  </slot>
</div>
<style>

.mytop {
  text-align: center;
  z-index: 1;
}

.mybottom {
  position: fixed;
  text-align: center;
  z-index: 2;
  height: 24px;
  width: 100%;
  bottom: 0px;
}

.lol {
  display: flex; 
  flex-direction: row;
  max-width: 100%;
  height: calc(100vh - 40px);
  align-items: stretch;
}

.myright {
  overflow-y: scroll;
  z-index: 1;
  background-color: var(--dark-2);
  color: white;
  padding-bottom: 30px;
}

.myleft {
  overflow-y: scroll;
  z-index: 1;
  padding-bottom: 30px;
}


.mycontent {
  position: relative;
  flex-grow: 4;
  align-items: stretch;
  background-color: var(--main-fg-color);
}

.myapp {
  display: flex; 
  flex-direction: column;
}
</style>