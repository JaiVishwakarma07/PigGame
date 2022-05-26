'use strict';
const p0 = document.querySelector('.player--0');
const p1 = document.querySelector('.player--1');//for changing color
const score0 = document.getElementById('score--0');//can be used for ids
const score1 = document.getElementById('score--1');
const curr0 = document.getElementById('current--0');
const curr1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');


let scores, currscore, activep, playing;
const init = function () {
    scores = [0, 0];
    currscore = 0;
    activep = 0;
    playing = true;
    score0.textContent = 0;
    score1.textContent = 0;
    curr0.textContent = 0;
    curr1.textContent = 0;
    dice.classList.add('hidden');
    p0.classList.remove('player--winner');
    p1.classList.remove('player--winner');
    p0.classList.add('player--active');
    p1.classList.remove('player--active');
};
init();
const switchp = function () {
    document.getElementById(`current--${activep}`).textContent = 0;
    activep = activep === 0 ? 1 : 0;
    currscore = 0;
    p0.classList.toggle('player--active');
    p1.classList.toggle('player--active');
}

btnroll.addEventListener('click', function () {
    if (playing) {
        //1 generating the random dice roll
        const d = Math.trunc(Math.random() * 6) + 1;
        //2 display dice
        dice.classList.remove('hidden');
        dice.src = `dice-${d}.png`

        //3 check for roll 1 if yess switch to next player
        if (d != 1) {
            // add dice to current score
            currscore += d;
            document.getElementById(`current--${activep}`).textContent = currscore;
        }
        else {
            switchp();
        }
    }
});

btnhold.addEventListener('click', function () {
    if (playing) {
        scores[activep] += currscore;
        //scores[1] = scores[1] + currscore;
        document.getElementById(`score--${activep}`).textContent
            = scores[activep];
        if (scores[activep] >= 20) {
            playing = false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${activep}`).classList.add('player--winner');
            document.querySelector(`.player--${activep}`).classList.remove('player--active');
        }
        else {
            switchp();
        }
    }
})

btnnew.addEventListener('click', init);