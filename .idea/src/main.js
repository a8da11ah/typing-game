const words ="The quick brown fox jumps over the lazy dog while the sun shines brightly in the clear blue sky. Programming is an essential skill in today's world, and JavaScript is one of the most popular languages. Developers use it to build websites, apps, and games that run smoothly on any device. Typing games help improve speed and accuracy, making them a great way to practice coding. As you type, focus on precision and avoid mistakes to achieve a high score. The more you play, the better you'll get at typing complex sentences and code snippets. Challenge yourself with different levels of difficulty and compete with friends to see who can type the fastest. Remember to take breaks and stretch your hands to avoid strain. Consistency is key to mastering any skill, so keep practicing every day. With dedication and effort, you'll soon notice significant improvements in your typing speed and coding abilities. Stay motivated and enjoy the process of learning something new. Good luck, and have fun playing the game!".split(' ');


function addClass(el,cName){
    el.className +=" "+cName;
}
function removeClass(el,cName) {
    el.className = el.className.replace(cName,'');
}



function randomWord() {
    const randonIndex = Math.ceil(Math.random()*words.length-1);
    return words[randonIndex ];
}

function formatWord(word) {
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}


function newGame() {
    document.getElementById('words').innerHTML = '';
    for (let i = 0; i <50; i++) {
        document.getElementById('words').innerHTML += formatWord(randomWord());
    }
    addClass(document.querySelector('.word'),'current')
    addClass(document.querySelector('.letter'),'current')
}


function extraLetters() {
    const incorrectLetter = document.createElement("span");
    incorrectLetter.innerHTML = key;
    incorrectLetter.className = 'letter incorrect extra';
    currentWord.appendChild(incorrectLetter);
}
document.getElementById('game').addEventListener("keydown", ev => {
    const key = ev.key;
    const currentWord = document.querySelector('.word.current')
    let currentLetter = document.querySelector('.letter.current');
    const expected = currentLetter?.innerHTML ||' ';
    const isLetter = key.length ===1 && key !==' ';
    const isSpace = key === " ";

    console.log({key,expected})


    if (isLetter) {
        if (currentLetter) {
            addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
            removeClass(currentLetter, 'current');

            if (currentLetter.nextSibling && currentLetter.nextSibling.classList.contains('letter')) {
                addClass(currentLetter.nextSibling, 'current');
            } else {
                // If no more letters exist, append incorrect letter to the end of the word
                if (key !== expected) {
                    const incorrectLetter = document.createElement("span");
                    incorrectLetter.innerHTML = key;
                    incorrectLetter.className = 'letter incorrect extra';
                    currentWord.appendChild(incorrectLetter);
                }
            }
        } else {
            // If currentLetter is null, it means we've already reached the end of the word
            // Append incorrect letters at the end of the word
            const incorrectLetter = document.createElement("span");
            incorrectLetter.innerHTML = key;
            incorrectLetter.className = 'letter incorrect extra';
            currentWord.appendChild(incorrectLetter);
        }
    }


    if (isSpace){
        if (expected !==' '){
            const letterToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
            letterToInvalidate.forEach(letter =>{
                addClass(letter,'incorrect');
            });

        }
        removeClass(currentWord,'current');
        addClass(currentWord.nextSibling,'current');

        if (currentLetter){
            removeClass(currentLetter,'current');
        }
        addClass(currentWord.nextSibling.firstChild,'current');
    }


    // Update cursor position properly
    const nextLetter = document.querySelector('.letter.current');
    const nextWord = document.querySelector('.word.current');
    const cursor = document.getElementById('cursor');

    if (nextLetter || nextWord) {
        cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + (nextLetter ? -2 : 2) + 'px';
        cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';
    }



})





newGame();
