import Map from '../map/map';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppProps } from '../../lib/types';
import { OfferType } from '../../lib/types';
import { CityType } from '../../lib/types';
import { CityList, CityInfo } from '../../const';
import { Cities } from '../cities/cities';
import PlaceCardList from '../place-card-list/place-card-list';

const MainScreen = ({ offersCount, offers }: AppProps): JSX.Element => {
  const [currentCity, setCurrentCity] = useState<CityType>(CityInfo[0]);
  const [currentOffer, setCurrentOffer] = useState<OfferType | null>(null);

  const handleCityClick = (cityName: string): void => {
    const selectedCity = CityInfo.find((city) => city.name === cityName);
    if (selectedCity) {
      setCurrentCity(selectedCity);
    }
  };

  const cityOffers = offers
    .filter((offer) => currentCity && offer.city.name === currentCity.name)
    .slice(0, offersCount);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="favorites"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <Cities
              cities={CityList}
              currentCity={currentCity}
              onCityClick={handleCityClick}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in Amsterdam
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <PlaceCardList
                offersCount={offersCount}
                offers={offers}
                onActiveOfferChange={setCurrentOffer}
              />
            </section>
            <div className="cities__right-section">
              <Map
                offers={cityOffers}
                city={currentCity}
                currentOffer={currentOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainScreen;
