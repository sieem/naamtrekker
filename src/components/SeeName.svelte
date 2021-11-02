<script lang="ts">
import { seeName } from "../services/api.service";

const handeClick = () => {
  seeName();
}
</script>

<div>
  <button on:click="{handeClick}">get name</button>
</div>

<style>

</style>
