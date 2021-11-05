<script lang="ts">
import { writable } from "svelte/store";
import { getOwnName, login } from "../services/api.service";

const nameStore = writable<string>();
const setName = async () => {
  const params = new URLSearchParams(window.location.search);
  const guid = params.get("guid");

  if (!guid) {
    return;
  }

  const { name } = await getOwnName(guid);
  nameStore.set(name);
};
setName();

const handeClick = async () => {
  nameStore.subscribe((_name) => {
    if (!_name) {
      return;
    }

    login(_name);
  })();
}
</script>

<div>
  <h3>Log in:</h3>

  <button on:click="{handeClick}">
    {#if $nameStore}
      Aha! Ik ben <b>{$nameStore}</b>
    {:else}
      Ik ben nog niemand
    {/if}
  </button>
</div>

<style>

</style>
