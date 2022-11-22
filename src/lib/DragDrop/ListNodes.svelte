<script>
	import Node from './Node.svelte';
	import { nodes } from '../../store/store.js';
	let last_id = 0

	function id(){
		return last_id++;
	}  

	function add_node(){
		let newNode = {
			left:50,
			top:50,
			id: id(),
			containers:[]
  		};
		$nodes = [...$nodes, newNode]
	}
	
	function remove(node_id) {
		$nodes = $nodes.filter((value) => value.id !== node_id);
	};
</script>


<button on:click={add_node}>Add node</button>
{#each $nodes as node}
	<Node on:click={e=>{console.log('test')}} bind:node={node} remove_from_list={remove}/>
{/each}