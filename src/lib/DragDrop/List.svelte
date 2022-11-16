<style>
	.remove { cursor: pointer; position: absolute; right: 5px; top: 3px; }
</style>


<script>
	// export let nodes;
	function id(){
		// const id ="_" + Math.random().toString(36).substr(2, 9);
		
		var values = Object.values(Object.values(nodes));
		console.log(values);
		const id ="1";
		if(!values.includes(id)) 
			return id;
		else
			
		 "2";
	}  
	let nodes = [
	];
	import Node from './Node.svelte';

	function add_node(){
		let newNode = {
			left:50,
			top:50,
			id: id()
  		};
		nodes.push(newNode);
		nodes=nodes
	}
	
	const remove = (node) => {
		nodes = nodes.filter((value) => value.id !== node.id);
	};
</script>


<button on:click={add_node}>Add node</button>
{
	#each nodes as node}
	<div class=node>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span on:pointerdown={e => e.stopPropagation()}
			on:click={() => remove(node)}
			class=remove
			style="color:red"
			>
			X
		  </span>
		<svelte:component this={Node} {...node} />
	</div>
{/each}