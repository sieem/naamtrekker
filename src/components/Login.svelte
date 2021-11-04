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
    {#if selectedName}
      Aha! Ik ben <b>{selectedName}</b>
    {:else}
      Ik ben nog niemand
    {/if}
  </button>
</div>

<style>

</style>
