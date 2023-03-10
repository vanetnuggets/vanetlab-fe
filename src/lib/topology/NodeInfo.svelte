<div class="info-wrapper">
  {#if node != null}
    <button on:click={toggle_info} class="importrant-btn btn-trans"> 
      Node #{node.general.id} information:
    </button>
    {#if open_info == true}
    <div transition:slide class="nodeinfo">
      <div class="general">
        X: {node.general.x}  
        Y: {node.general.y} 
      </div>
      <div class="networks">
        <button on:click={toggle_networks} class="importrant-btn btn-trans"> 
          Networks:
        </button><br>
        {#if open_networks}
          <div class="networks" transition:slide>
            {#each Object.keys(node.networks) as net}
            🌐 { net } <br>
            - address: { node.networks[net].network.network_address } <br>
            - mask: { node.networks[net].network.network_mask } <br>
            - type: { get_node_type(net, node.general.id) }
            {#if has_server(net)}
              <button on:click={() => toggle_server(get_sname(net, node))} class="importrant-btn btn-trans"> 
                Server: { get_sname(net, node) } 
              </button>
              {#if open_servers[get_sname(net, node)]}
                <div transition:slide class="server">
                  - Server type: TODO <br>
                  - Listening on port: { node.networks[net].server.port } <br> 
                </div>
              {/if}
            {/if}

            {#if has_client(net)}
              <button on:click={() => toggle_client(get_cname(net, node))} class="importrant-btn btn-trans"> 
                Client: { get_cname(net, node) } 
              </button>
              {#if open_clients[get_cname(net, node)]}
                <div transition:slide class="client">
                  - Client type: TODO <br>
                  - Communicating with: { node.networks[net].client.server } <br> 
                  - Packet size: { node.networks[net].client.packet_size } <br>
                  - Interval: { node.networks[net].client.interval.value }{ node.networks[net].client.interval.format } 
                </div>
                {/if}
              {/if}
            {/each}
          </div>
        {/if}
      </div>
      <KeyFrames/>
    </div>
    {/if}
  {/if}
</div>

<style scoped>
* {
  text-align: left;
  font-size: 13px;
}

.info-wrapper {
  padding: 5px;
  max-width: 220px;
  width: 220px;
}

.general {

  padding-left:10px;
}

/* .networks {

} */

.client {
  padding-left:10px;
}

.server {
  padding-left:10px;
}

.btn-trans {
  padding-left: 5px;
  margin-left: 0px;
  border-radius: 0px;
  border-left: 3px solid var(--dark-1);
  font-size: 16px;
}

</style>

<script>
  import { slide } from 'svelte/transition'
	import { node_info2, nodes } from '../../store/store.js';
  import Info from '../../services/NodeInfoService';
  import KeyFrames from './KeyFrames.svelte';

  

  let node = null;
  node_info2.subscribe(val => {
    node = val;

    if (node == null) {
      return null;
    }

    let info = Info.info_by_id(node.id);
    node = info;
  })

  let open_networks = true;
  function toggle_networks() {
    open_networks = !open_networks;
  }

  let open_info = true;
  function toggle_info() {
    open_info = !open_info;
  }

  let open_clients = {};
  function toggle_client(name) {
    if (open_clients[name] == undefined) {
      open_clients[name] = false
    }
    open_clients[name] = !open_clients[name]
  }
  
  let open_servers = {};
  function toggle_server(name) {
    if (open_servers[name] == undefined) {
      open_servers[name] = false
    }
    open_servers[name] = !open_servers[name]
  }

  function has_client(name) {
    if (node.networks[name].client != undefined) {
      return true;
    }
    return false;
  }

  function has_server(name) {
    if (node.networks[name].server != undefined) {
      return true;
    }
    return false;
  }

  function update() {
    $nodes.forEach(element => {
      if (element.id == node.id) {
        element = node
      }
    });
    // o áno, zas tento bullshit
    $nodes = $nodes
  }

  function get_sname(net, node) {
    return node.networks[net].server.name;
  }
  function get_cname(net, node) {
    return node.networks[net].client.name;
  }
  function get_net(net, what) {
    return node.networks[net].network[what]
  } 
  function get_node_type(b, c) {
    return Info.get_node_type(node, b, c);
  }
</script>