<script>
	import Node from './Node.svelte';
	export let container_size;
	let nodes = [];
	let last_id = 0

	function id(){
		return last_id++;
	}  

	function add_node(){
		let newNode = {
			left:50,
			top:50,
			id: id()
  	};
		nodes.push(newNode);
		nodes=nodes
	}
	
	function remove(node_id) {
		nodes = nodes.filter((value) => value.id !== node_id);
	};
</script>


<button on:click={add_node}>Add node</button>
{#each nodes as node}
	<Node bind:node={node} container_size={container_size} remove_from_list={remove}/>
{/each}