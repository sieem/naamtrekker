<script lang="ts">
import SeeName from "./components/SeeName.svelte";
import { loggedIn } from "./services/auth.service";
import Login from "./components/Login.svelte";
</script>

<main>
	<h1>Naamtrekker</h1>
	{#if $loggedIn}
		<SeeName/>
	{:else}
		<Login/>
	{/if}
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