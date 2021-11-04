<script lang="ts">
import SeeName from "./components/SeeName.svelte";
import { loggedIn, setLoginState } from "./services/auth.service";
import Login from "./components/Login.svelte";
import Logout from "./components/Logout.svelte";

setLoginState();
</script>

<main>
	<h1>Secret Lasseel</h1>
	{#if $loggedIn}
		<SeeName/>
		<!-- <Logout/> -->
	{:else}
		<Login/>
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