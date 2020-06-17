import { keysArray } from './KeysData';
import { input } from './App';
import { searchBtn, keyboardWrapper, keyboardBtn, swiperWrapper } from './Constants';

const keyboard = document.createElement('div');
let lang = 'EN';
keyboard.classList = 'keyboard';
keyboardWrapper.append(keyboard);

keyboardBtn.addEventListener('click', () => {
    keyboardWrapper.classList.toggle('none');
    swiperWrapper.classList.toggle('opacity');
});

if (!localStorage.language) localStorage.language = lang;

const createKeyboard = () => {
    localStorage.getItem('language');

    keysArray.forEach((rowEl, item) => {
        const row = document.createElement('div');
        keyboard.append(row);
        row.className = `row row${item}`;

        rowEl.forEach((keyEl) => {
            const key = document.createElement('span');
            row.append(key);
            key.className = `key key${keyEl.style}`;

            if (keyEl.en || keyEl.ru) {
                if (localStorage.getItem('language') === 'RU') {
                    key.innerHTML = keyEl.ru;
                } else {
                    key.innerHTML = keyEl.en;
                }
            } else {
                key.innerHTML = keyEl.title;
            }
            key.id = keyEl.keyCode;
        });
    });
};
createKeyboard();

const elements = document.querySelectorAll('.key');
const capsLockBtn = document.getElementById('CapsLock');
const backSpaceBtn = document.getElementById('Backspace');
const enterBtn = document.getElementById('Enter');
const deleteBtn = document.getElementById('Delete');
const tabBtn = document.getElementById('Tab');
const leftArrowBtn = document.getElementById('ArrowLeft');
const rightArrowBtn = document.getElementById('ArrowRight');
const shiftBtn = document.getElementById('ShiftLeft');
const languageBtn = document.getElementById('MetaLeft');
const closedBtn = document.getElementById('ControlRight');

const inputTextByClicks = () => {
    keyboard.addEventListener('mousedown', (event) => {
        input.focus();
        if (event.target.tagName !== 'SPAN') return;
        const { target } = event;
        if (target !== capsLockBtn) {
            target.classList.add('active');
        }
        if (target.classList.contains('dark') && target.id !== 'Space') {
            if (target === capsLockBtn) {
                capsLockBtn.classList.toggle('active');
                capsLockButtonPressed();
            } else if (target === backSpaceBtn) {
                input.value = pressedBackspaceButton(input.value, input.selectionStart, input.selectionEnd);
            } else if (target === deleteBtn) {
                input.value = pressedDeleteButton(input.value, input.selectionStart, input.selectionEnd);
            } else if (target === enterBtn) {
                searchBtn.click();
                keyboardBtn.click();
            } else if (target === tabBtn) {
                tabButtonPressed();
            } else if (target === shiftBtn) {
                capsLockButtonPressed();
            } else if (target === leftArrowBtn) {
                input.selectionEnd -= 1;
            } else if (target === rightArrowBtn) {
                input.selectionStart += 1;
            } else if (target === languageBtn) {
                ChangeLang();
            } else if (target === closedBtn) {
                keyboardBtn.click();
            }
        } else {
            const char = target.textContent;
            input.value += char[0];
        }
    });
    keyboard.addEventListener('mouseup', (event) => {
        if (event.target.tagName !== 'SPAN') return;
        const { target } = event;
        if (target !== capsLockBtn && target !== shiftBtn) {
            target.classList.remove('active');
        }
        if (target === shiftBtn) {
            target.classList.remove('active');
            capsLockButtonPressed();
        }
        input.focus();
    });

    keyboard.addEventListener('mouseout', (event) => {
        if (event.target.tagName !== 'SPAN') return;
        const { target } = event;
        if (target !== capsLockBtn && target !== shiftBtn) {
            target.classList.remove('active');
        }
        input.focus();
    });
};

inputTextByClicks();

const pressedBackspaceButton = (str, startIndex, endIndex) => {
    let result = '';
    if (startIndex === endIndex) {
        result = str.replace(str.substr(startIndex - 1, 1), '');
    } else {
        result = str.replace(str.slice(startIndex, endIndex), '');
    }
    return result;
};

const pressedDeleteButton = (str, startIndex, endIndex) => {
    let result = '';
    if (startIndex === endIndex) {
        result = str.replace(str.substr(startIndex, 1), '');
    } else {
        result = str.replace(str.slice(startIndex, endIndex), '');
    }
    return result;
};

const tabButtonPressed = (event) => {
    event.preventDefault();
    input.value += '\t';
};

function capsLockButtonPressed() {
    keysArray.forEach((rowEl) => {
        rowEl.forEach((keyEl) => {
            elements.forEach((elem) => {
                if (elem.id === keyEl.keyCode) {
                    console.log(elem.innerHTML);
                    switch (elem.innerHTML) {
                        case keyEl.shiftEn:
                            elem.innerHTML = keyEl.en;
                            break;
                        case keyEl.en:
                            elem.innerHTML = keyEl.shiftEn;
                            break;
                        case keyEl.shiftRu:
                            elem.innerHTML = keyEl.ru;
                            break;
                        case keyEl.ru:
                            elem.innerHTML = keyEl.shiftRu;
                            break;
                    }
                }
            });
        });
    });
}

function ChangeLang() {
    keysArray.forEach((rowEl) => {
        rowEl.forEach((keyEl) => {
            elements.forEach((elem) => {
                if (elem.id === keyEl.keyCode) {
                    switch (elem.innerHTML) {
                        case keyEl.en:
                            elem.innerHTML = keyEl.ru;
                            lang = 'RU';
                            break;
                        case keyEl.shiftEn:
                            elem.innerHTML = keyEl.shiftRu;
                            lang = 'RU';
                            break;
                        case keyEl.shiftRu:
                            elem.innerHTML = keyEl.shiftEn;
                            lang = 'EN';
                            break;
                        case keyEl.ru:
                            elem.innerHTML = keyEl.en;
                            lang = 'EN';
                            break;
                    }
                }
            });
        });
    });
    localStorage.setItem('language', lang);
}
