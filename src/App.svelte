<Notifications>
  <div class="bg">
    <Router routes={{
      '/': Welcome,
      '/app': MainApp,
      '/app/*': MainApp
    }} />  
  </div>
</Notifications>

<script>
import Router from 'svelte-spa-router'
import MainApp from "./lib/layouts/MainApp.svelte";
import Welcome from './lib/layouts/Welcome.svelte';
import Notifications from 'svelte-notifications';
</script>