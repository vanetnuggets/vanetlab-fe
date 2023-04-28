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

  <div class="mybottom">
    <slot name="bottom">
    </slot>
  </div>
</div>

<style>

.mytop {
  text-align: center;
  z-index: 2;
  height: 36px;
}

.mybottom {
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
}

.myright {
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 1;
  background-color: var(--dark-2);
  color: white;
  padding-bottom: 30px;
  resize:horizontal;
  direction: rtl;
  height: calc(100vh - 24px - 36px);
}

.myleft {
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 3;
  padding-bottom: 30px;
  resize:horizontal;
  height: calc(100vh - 24px - 36px);
}

.mycontent {
  position: relative;
  flex-grow: 4;
  align-items: stretch;
  height: calc(100vh - 24px - 36px);
  background-color: var(--main-fg-color);
}

.myapp {
  display: flex; 
  flex-direction: column;
}
</style>