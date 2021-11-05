<script lang="ts">
import { logout } from "../services/api.service";
import { removeToken } from "../services/auth.service";

const handeClick = async () => {
  if (confirm('Zeker dat je wil uitloggen?')) {
    await logout();
    removeToken();
  }
}
</script>

<div>
  <button on:click="{handeClick}">Uitloggen</button>
</div>

<style>
div {
  margin: 20px 0;
}
</style>
