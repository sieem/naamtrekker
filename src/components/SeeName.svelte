<script lang="ts">
import { seeName } from "../services/api.service";

let name;

const handeClick = async () => {
  const {chosenName} = await seeName();
  name = chosenName;
}
</script>

<div>
  <button on:click="{handeClick}">get name</button>
  {#if name}
    <div>{name}</div> 
  {/if}
</div>

<style>

</style>
