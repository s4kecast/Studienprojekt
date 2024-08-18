const texts = document.querySelector('.texts');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;          // Zwischenergebnisse anzeigen in Realtime
recognition.lang = 'de-DE'; // Sprache auf Deutsch setzen

let p = document.createElement('p');

recognition.addEventListener('result', (e)=> {
    const text = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    p.innerText = text;
    texts.appendChild(p);

    if (e.results[0].isFinal) {
        if (text.includes('Unfall')) {
            p = document.createElement('p');
            p.classList.add('details');
            p.innerText = 'Bitte füllen Sie folgendes Formular aus:';
            texts.appendChild(p);
        }
        p = document.createElement('p');
    }
    console.log(text);
})

recognition.addEventListener('end', () => {
    recognition.start();
})

recognition.start();

