'use strict';
// Kullanılacak elementler seçiliyor.
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

//Başlangıç durumu ayarlanıyor//
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Oyuncu değiştir.
const switchPlayer = function () {
  // Oyuncu değiştirirken bir önceki oyuncunun current score'u 0 yapar.
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // toggle fonksiyonu player0'nun class listesinde player--active var ise kaldırır yok ise ekler.Böylece aktif kullanıcının görüntü özellikleri değişir.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Zar atma eylemi ayarlanıyor.
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Rastgele bir zar değeri seçiliyor.
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.Seçilen değerde zar ekrana yansıtılıyor.
    diceEl.classList.remove('hidden');
    //diceEl.attributes[0].textContent = `dice-${dice}.png`; Benim çözüm 🤔
    diceEl.src = `dice-${dice}.png`;

    //3.Atılan zarın 1 olup olmamasına göre yapılacak işlemler ayarlanıyor.(if/else)
    if (dice !== 1) {
      // Zar değerini current score'a ekle.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = // current score değerlerini active playera aktariyor.
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
// hold butonu için
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
// new game için.
btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  activePlayer = 0;
  playing = true;
  scores[0] = 0;
  scores[1] = 0;
});
