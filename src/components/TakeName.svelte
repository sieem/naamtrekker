<script lang="ts">
import { takeName } from "../services/api.service";

const handeClick = () => {
  takeName('siem');
}
</script>

<div>
  <button on:click="{handeClick}">take name</button>
</div>

<style>

</style>
