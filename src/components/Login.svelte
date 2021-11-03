<script lang="ts">
import { writable } from "svelte/store";

import { getNames, login } from "../services/api.service";

let selectedName: string;
const names = writable([]);
const setNames = async () => names.set(await getNames());

const handeClick = () => {
  if (!selectedName) {
    return;
  }
  login(selectedName);
}


setNames();
</script>

<div>
  <h3>Wie ben je?</h3>
  <select bind:value={selectedName}>
  <option value>Kies een naam</option>
  {#each $names as { name }}
    <option value="{name}">{name}</option>
	{/each}
  </select>


  <button on:click="{handeClick}">
    Ik ben {selectedName || 'onbekend'}
  </button>
</div>

<style>

</style>
