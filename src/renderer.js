//preload test
const p = document.getElementById('summoner');
window.league.summoner((value) => {
  p.innerText = value;
});