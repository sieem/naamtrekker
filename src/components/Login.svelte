<script lang="ts">
import { writable } from "svelte/store";

import { getNames, login } from "../services/api.service";

const handeClick = () => {
  console.log(selectedName);
  login(selectedName);
}

let selectedName;

const names = writable([]);

const setNames = async () => names.set(await getNames());

setNames();
</script>

<div>
  <select bind:value={selectedName}>
  <option value>Kies een naam</option>
  {#each $names as { name }}
    <option value="{name}">{name}</option>
	{/each}
  </select>


  <button on:click="{handeClick}">Login</button>
</div>

<style>

</style>
