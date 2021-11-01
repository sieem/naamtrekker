<script lang="ts">
import GetName from "./components/GetName.svelte";
import TakeName from "./components/TakeName.svelte";
</script>

<main>
	<h1>Naamtrekker</h1>
	<GetName/>
	<TakeName/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>