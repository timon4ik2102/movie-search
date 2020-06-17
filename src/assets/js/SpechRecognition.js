import { input } from './App';
import { searchBtn, microphoneBtn } from './Constants';

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = false;

recognition.onresult = (event) => {
    for (let i = event.resultIndex, len = event.results.length; i < len; i += 1) {
        const { transcript } = event.results[i][0];
        if (event.results[i].isFinal) {
            input.value = transcript;
        } else {
            input.value = transcript;
        }
    }
    searchBtn.click();
};

recognition.onaudioend = () => {
    microphoneBtn.classList.remove('microphone-active');
};

const microphoneactivated = () => {
    microphoneBtn.addEventListener('click', () => {
        if (!microphoneBtn.classList.contains('microphone-active')) {
            microphoneBtn.classList.add('microphone-active');
            recognition.start();
        } else {
            microphoneBtn.classList.remove('microphone-active');
            recognition.stop();
        }
    });
};

microphoneactivated();
