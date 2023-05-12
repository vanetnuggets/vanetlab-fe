<script>
  import {
    isError,
    errorData,
    isOk,
    loading,
    simData,
    isValidated
  } from "../../store/summary";
  import { ProgressBar } from "carbon-components-svelte";
  import { downloadFile } from "../../services/LoadService";
  import { getFile, getSummary } from "../api/scenarios";
  import { scenarioName } from "../../store/store";
  import { currentStatus } from "../../store/summary";
  import { onMount } from "svelte"
  import { checkAndLoad } from "../../services/LoadService";

  // assets
  import mapIcon from '../../assets/map.svg';
  import networkIcon from '../../assets/network.svg';
  import terminalIcon from '../../assets/terminal.svg';
  import pcapIcon from '../../assets/wiresharkico.svg';
  import asciiIcon from '../../assets/logico.svg';

  import { getNotificationsContext } from "svelte-notifications";
  const { addNotification } = getNotificationsContext();

  
  export let params;

  let showError = false;
  let showResult = false;
  let name = ""
  let validated = false;

  let errData = [];
  let simulation = {};
  let scenarioLoading = false;
  let status = {};

  currentStatus.subscribe(val =>{
    status = val;
  })

  isValidated.subscribe(val => {
    validated = val;
  })

  scenarioName.subscribe(val => {
    name = val;
  })

  loading.subscribe((val) => {
    scenarioLoading = val.scenario;
  });

  isError.subscribe((val) => {
    showError = val;
  });

  errorData.subscribe((val) => {
    errData = val;
  });

  isOk.subscribe((val) => {
    showResult = val;
  });

  simData.subscribe((val) => {
    simulation = val;
  });

  async function download(name, file, downloadName) {
    const resp = await getFile(name, file);
    const blob = resp.data;
    downloadFile(blob, `${name}_${downloadName}`);
  }

  onMount(() => {
    // if scenario name is undefined, load remote config.
    // otherwise just chill
    checkAndLoad(params.scenario);
  });

  function fetchPrev() {
    getSummary(name).then((resp) => {
      if (resp.data) {
        simData.set(resp.data.data);
        isOk.set(true);
      }
    }).catch(err => {
      // mam pici asi nwm
      addNotification({
        text: `No previous simulation results saved for ${params.scenario}`,
        position: "bottom-center",
        type: "error",
        removeAfter: 10000,
      });
    })
  }
    

</script>

<div class="container">
  {#if scenarioLoading}
    <div class="loading-holder">
      <div class="tmp">
        <ProgressBar kind="indented" size="sm"/>
      </div>

      Activity status: {status.status} <br>
      <br>
      Position in queue: {status.position}<br>
      Scenarios in queue: {status.total_length}<br>
      Currently being simulated: {status.current}<br>
    </div>
  {/if}
  {#if showError}
    <br />
    <h1>Scenario contains an error 🙀</h1>

    <div class="error-holder">
      {#each errData as line}
        {line} <br />
      {/each}
    </div>
  {/if}
  {#if showResult}
    <br />
    <h1> Scenario simulation results 🧐 </h1>

    <div class="data-holder">
      You can download the simulation results here:
    
      <button
        on:click={() => download(name, 'mobility', 'mobility.tcl')}
        class="download-item"
      >
        <div class="data-icon">
          <img src={mapIcon}  height=64px width=64px alt="map_icon">
        </div>
        <div class="data-text">
          Mobility TCL <br />
          Name: {simulation.mobility.name} <br />
          Name: {simulation.mobility.size}B <br />
        </div>
      </button>
      <button
        on:click={() => download(name, 'output', 'output.txt')}
        class="download-item"
      >
        <div class="data-icon">
          <img src={terminalIcon}  height=64px width=64px alt="terminal_icon">
        </div>
        <div class="data-text">
          Terminal output <br />
          Name: {simulation.output.name} <br />
          Name: {simulation.output.size}B <br />
        </div>
      </button>
      <button
        on:click={() => download(name, 'trace', 'trace.xml')}
        class="download-item"
      >
        <div class="data-icon">
          <img src={networkIcon} height=64px width=64px alt="network_icon">
        </div>
        <div class="data-text">
          Trace file <br />
          Name: {simulation.trace.name} <br />
          Name: {simulation.trace.size}B <br />
        </div>
      </button>
      <button
        on:click={() => download(name, `pcap`, 'pcap.zip')}
        class="download-item"
      >
        <div class="data-icon">
          <img src={pcapIcon} height=64px width=64px alt="network_icon">
        </div>
        <div class="data-text">
          Packet captures <br />
          Name: {simulation.pcap.name} <br />
          Name: {simulation.pcap.size}B <br />
        </div>
      </button>
      <button
        on:click={() => download(name, `ascii`, 'ascii.zip')}
        class="download-item"
      >
        <div class="data-icon">
          <img src={asciiIcon} height=64px width=64px alt="network_icon">
        </div>
        <div class="data-text">
          Ascii trace logs <br />
          Name: {simulation.ascii.name} <br />
          Name: {simulation.ascii.size}B <br />
        </div>
      </button>
    </div>
  {:else}
  <br>
  <button on:click={fetchPrev}> Try to fetch results from last simulation.</button>
  {/if}
  <br>
  {#if validated}
  Simulation validated but has not been ran yet. <br>
  Simulate the scenario to see output.! <br>
  {/if}
</div>

<style>
  .container {
    overflow-y: auto;
    max-height: calc(100vh - 75px);
    background-color: var(--main-fg-color);
    padding: 0px;
    margin: 0px;
  }

  .error-holder {
    text-align: left;
    margin: 20px;
    padding: 5px;
    border-radius: 7px;
    border: 2px solid var(--dark-1);
  }

  .data-holder {
    text-align: left;
    margin: 20px;
    padding: 5px;
  }

  .loading-holder {
    margin-top: -10px;
    width: 100%;
  }

  .download-item {
    display: flex;
    text-align: left;
    margin: 0px;
    margin-top: 15px;
    padding-left: 5px;
    padding-top: 4px;
    padding-bottom: 4px;;
    border-radius: 7px;
    border: 2px solid var(--dark-1);
    width: calc(100% - 0px);
  }

  .download-item:hover {
    outline: 2px solid var(--light-1);
    background-color: var(--dark-2);
    transition: 300ms;
  }

  .data-icon {
    text-align: left;
    padding-right: 20px;
    color: white;
    margin: 0px 20px 0px 0px;
    padding: 10px 10px 0px 10px;
    border-radius: 7px;
    background-color: var(--main-fg-color);
  }

  .data-text {
    text-align: left;
  }
</style>
