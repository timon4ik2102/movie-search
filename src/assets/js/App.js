import { searchBtn, spinner, errorInformation, clearBtn } from './Constants';
import { mySwiper } from './Slider';
import createFilmsCard from './CreatingCards';

// eslint-disable-next-line import/prefer-default-export
export const input = document.querySelector('.search-input');

// const apiKey = 'c03ece4';
const apiKey = '1b6880db';
const translateApiKey = 'trnsl.1.1.20200504T181033Z.9c7a64b1827c9c26.317b1a99e6745276606d457480904d21eea633f3';
const numOne = 1;

let page = 1;
let searchTerm = '';
let translatedWords = '';

const spinnerVision = () => {
    spinner.classList.toggle('non-visible');
};

async function showResults(results) {
    if (!results) return;
    if (page === numOne) mySwiper.removeAllSlides();
    await results.forEach((movie) => {
        createFilmsCard(movie.Title, movie.imdbID, movie.Poster, movie.Year, movie.imdbRating);
    });
    if (!spinner.classList.contains('non-visible')) {
        spinnerVision();
    }
    page += numOne;
}

async function getRating(property) {
    const { imdbID } = property;
    const urlRating = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
    const res = await fetch(urlRating);
    const data = await res.json();
    Object.assign(property, data);
    return property;
}

async function getResults(searchText, numPage) {
    try {
        spinnerVision();
        const url = `https://www.omdbapi.com/?type=movie&page=${numPage}&apikey=${apiKey}&s=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === 'True') {
            const promises = data.Search.map(getRating);
            await Promise.all(promises);
        } else {
            if (page > 1) errorInformation.innerText = `OOPS!!! No more results for ${searchText}!`;
            else if (data.Error === 'Movie not found!') errorInformation.innerText = `No results for ${searchText}!`;
            else errorInformation.innerText = data.Error;
            spinnerVision();
            if (mySwiper.slides.length < numOne && page === numOne) mySwiper.removeAllSlides();
        }

        showResults(data.Search);
    } catch (err) {
        errorInformation.innerText = err;
    }
}

async function translateToEng(word) {
    const urlTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateApiKey}&text=${word}&lang=ru-en`;
    const res = await fetch(urlTranslate);
    const data = await res.json();
    translatedWords = data.text.join();
    errorInformation.innerText = `Showing results for ${translatedWords}`;
    getResults(translatedWords, page);
}

const formSubmitted = (event) => {
    event.preventDefault();
    errorInformation.innerText = '';
    page = numOne;
    searchTerm = input.value;
    mySwiper.removeAllSlides();

    if (/[а-яё]/i.test(searchTerm)) {
        translateToEng(searchTerm, page);
    } else {
        getResults(searchTerm, page);
    }
};

searchBtn.addEventListener('click', (event) => {
    formSubmitted(event);
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        formSubmitted(event);
    }
});

mySwiper.on('slideChange', () => {
    const swiperLength = mySwiper.slides.length;
    let word;
    if (/[а-яё]/i.test(searchTerm)) word = translatedWords;
    else word = searchTerm;

    if (word === '') {
        return false;
    }
    if (window.innerWidth <= 750 && mySwiper.activeIndex === swiperLength - numOne) {
        getResults(word, page);
    }
    if (window.innerWidth > 750 && window.innerWidth <= 1000 && mySwiper.activeIndex === swiperLength - 2) {
        getResults(word, page);
    }
    if (window.innerWidth > 1000 && window.innerWidth <= 1430 && mySwiper.activeIndex === swiperLength - 3) {
        getResults(word, page);
    }
    if (window.innerWidth > 1430 && mySwiper.activeIndex === swiperLength - 4) {
        getResults(word, page);
    }
    return false;
});

clearBtn.addEventListener('click', () => {
    input.value = '';
});

function init() {
    searchTerm = 'Love';
    getResults('Love', numOne);
}

init();
