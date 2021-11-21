<script lang="ts">
import SeeName from "./components/SeeName.svelte";
import { nameStore, removeToken, setName } from "./services/auth.service";

setName();
removeToken();
</script>

<main>
	<h1>Secret Lasseel</h1>
	{#if $nameStore}
		<SeeName/>
	{:else}
		<p>Geen naam gevonden, misschien zit je niet op je persoonlijke url?</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		font-family: 'Dancing Script', cursive;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>