import moviesClient from './moviesConfig';

const filmsNowShowing = n => moviesClient.get('filmsNowShowing/?n=' + n ?? 40);
const filmsComingSoon = n => moviesClient.get('filmsComingSoon/?n=' + n ?? 40);
const filmDetails = id => moviesClient.get('filmDetails/?film_id=' + id);
const cinemaDetails = id => moviesClient.get('cinemaDetails/?cinema_id=' + id);

// date format eg . 2022-02-21
const cinemaShowTimes = (id, date) =>
  moviesClient.get(`cinemaShowTimes/?cinema_id=${id}&date=${date}`);

const filmShowTimes = (id, date) =>
  moviesClient.get(`filmShowTimes/?film_id=${id}&date=${date}`);

export default {
  filmsNowShowing,
  filmsComingSoon,
  filmDetails,
  cinemaDetails,
  cinemaShowTimes,
  filmShowTimes,
};
