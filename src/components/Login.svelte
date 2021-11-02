<script lang="ts">
import { writable } from "svelte/store";

import { getNames } from "../services/api.service";

const handeClick = () => {
  // chooseName();
}

const names = writable([]);

const setNames = async () => names.set(await getNames());

setNames();
</script>

<div>
  <select>
  {#each $names as { name }}
    <option value="name">{name}</option>
	{/each}
  </select>
  <button on:click="{handeClick}">Login</button>
</div>

<style>

</style>
