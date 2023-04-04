<script>
 	import { current_time, node } from "../../store/store.js";
	import { max_at ,nodes} from "../../store/scenario.js";

	const max = "(max :"
	const end = ")"

	$: if ($current_time > $max_at) {
		$current_time = $max_at
	}

	function setMaxAt(){
		$max_at = 0
		Object.values($nodes).forEach(node => {
			let node_max=parseInt(Object.keys(node.mobility).reduce(function(a, b){ return node.mobility[a] > node.mobility[b] ? a : b }))
			if (node_max> $max_at)
				$max_at=node_max
			console.log(node_max)
		});
	}

</script>

<div class="slidecontainer">
	<input type="range" min="0" max={$max_at} bind:value={$current_time} style="padding: 0; width: 80%; margin-bottom: 0">
	<p>Current time: {$current_time}
		{max}
		<input type=number bind:value={$max_at} min=0 style="padding: 0; width: 50px" >
		{end}
	</p>
</div>

<style>
	.slidecontainer {
	width: 100%;
	}
</style>



	