<script>
	import Node from './Node.svelte';
	
	let nodes = [];

	function id(){
		let end = true;
		while(true){
			let id = "_" + Math.random().toString(36).substr(2, 9);
			nodes.forEach(e => {
				if(id == e.id){
					end = false;
				}
			});
			if(end){
				return id
			}
			end = true;
		}
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
	<Node bind:node={node} remove_from_list={remove}/>
{/each}