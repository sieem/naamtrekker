<script lang="ts">
import { getName } from "../services/api.service";

const handeClick = () => {
  getName();
}
</script>

<div>
  <button on:click="{handeClick}">get name</button>
</div>

<style>

</style>
