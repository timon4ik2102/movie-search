import { mySwiper } from './Slider';

const createFilmsCard = (movieName, movieLink, movieImg, movieYear, movieRating) => {
    const cardEl = document.createElement('div');
    const cardHeader = document.createElement('a');
    const cardBody = document.createElement('div');
    const cardFooter = document.createElement('div');
    const cardYear = document.createElement('span');
    const cardRating = document.createElement('span');
    cardEl.classList = 'card swiper-slide';
    cardHeader.classList = 'card-header';
    cardEl.append(cardHeader);
    cardHeader.innerText = movieName;
    cardHeader.href = `https://www.imdb.com/title/${movieLink}`;
    cardHeader.target = '_blank';
    cardBody.classList = 'card-body';
    cardEl.append(cardBody);
    // eslint-disable-next-line no-unused-expressions
    movieImg === 'N/A' ? (cardBody.style = "background-image : url( './assets/images/img/no-picture.jpg' )") : (cardBody.style = `background-image : url( ${movieImg}  )`);
    cardFooter.classList = 'card-footer';
    cardEl.append(cardFooter);
    cardYear.classList = 'card-year';
    cardFooter.append(cardYear);
    cardYear.innerText = movieYear;
    cardRating.classList = 'card-imbd';
    cardFooter.append(cardRating);
    cardRating.innerText = movieRating;
    mySwiper.appendSlide(cardEl);
    mySwiper.update();
};

export default createFilmsCard;
