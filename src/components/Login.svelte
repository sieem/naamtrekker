<script lang="ts">
import { writable } from "svelte/store";
import { getOwnName, login } from "../services/api.service";

let showError = false;
const nameStore = writable<string>();
const setName = async () => {
  const params = new URLSearchParams(window.location.search);
  const guid = params.get('guid');

  if (!guid) {
    return;
  }

  const { name } = await getOwnName(guid);
  nameStore.set(name);
};
setName();

const handeClick = async () => {
  showError = false;

  nameStore.subscribe(async (_name) => {
    if (!_name) {
      return;
    }

    try {
      await login(_name);
    } catch ({error}) {
      if (error === 'Already logged in') {
        showError = true;
      }
    }
  })();
}
</script>

<div>
  <h3>Meld je aan:</h3>

  <button on:click="{handeClick}">
    {#if $nameStore}
      Aha! Ik heb je gevonden, je bent <b>{$nameStore}</b>
    {:else}
      Ik heb je niet gevonden, zeker dat je je persoonlijke url gebruikt?
    {/if}
  </button>
</div>
{#if showError}
  <div class="error">Ik kan je je niet aanmelden, want je bent al reeds aangemeld 😐</div>
{/if}
<style>
.error {
  background-color: #CCB69C;
  padding: 20px;
  margin: 20px; 
}
</style>
