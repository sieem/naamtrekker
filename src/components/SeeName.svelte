<script lang="ts">
import { seeName } from "../services/api.service";
import { nameStore } from "../services/auth.service";

let name: string;
let revealName: boolean;

(async () => {
  const { chosenName } = await seeName();
  name = chosenName;
})();

const handeClick = () => {
  revealName = !revealName;
}

</script>

<div>
  <h2>Welkom {$nameStore}!</h2>
  <p>Geef mij een tikje:</p>
  <div class="card {revealName ? 'focus': ''} {revealName === false ? 'unfocus': ''}" on:click="{handeClick}">
    <div class="card-inner">
      <div class="card-front">
      </div>
      <div class="card-back">
        <div class="inner">
          <p>Jouw gekozen naam:</p>
          <h1>{name || '&nbsp;'}</h1>
        </div>
      </div>
    </div>
  </div>
  <p class="bonusHint {revealName ? 'reveal': ''}">Geef mij nog een tikje om mij te verbergen.</p>
</div>

<style>
.card {
  background-color: transparent;
  width: 288px;
  height: 404px;
  margin: 30px auto;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transform-style: preserve-3d;
  transition: transform 5s cubic-bezier(0.25, 1, 0.5, 1);
}

.card-inner h1 {
  font-family: 'Dancing Script', cursive;
}

.card.focus .card-inner {
  transform: rotateY(3420deg);
}

.card.unfocus .card-inner {
  transform: rotateY(3240deg);
}

.card.focus .card-back h1 {
  animation: reveal 5s cubic-bezier(0.25, 1, 0.5, 1) both;
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;

  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}

.card-front {
  background: url('../images/playing-card.png');
}

/* Style the back side */
.card-back {
  background-color: #F8F2F1;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateY(180deg);
}

.bonusHint {
  opacity: 0;
}

.bonusHint.reveal {
  animation: reveal 5s cubic-bezier(0.25, 1, 0.5, 1) both;
  animation-delay: 1s;
}

@keyframes reveal {
  0% { opacity: 0; }
  25% { opacity: 0; }
  100% { opacity: 1; }
}
</style>
