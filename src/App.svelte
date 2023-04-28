<Notifications>
  <div class="bg">
    <Router routes={{
      '/': Welcome,
      '/about': About,
      '/app': MainApp,
      '/app/*': MainApp,
      '/*': NotFound
    }} />  
  </div>
</Notifications>

<script>
import "carbon-components-svelte/css/white.css";

import Router from 'svelte-spa-router'
import MainApp from "./lib/layouts/MainApp.svelte";
import Welcome from './lib/layouts/Welcome.svelte';
import Notifications from 'svelte-notifications';
import About from "./lib/Pages/About.svelte";
import NotFound from "./lib/Canvas/NotFound.svelte";
</script>