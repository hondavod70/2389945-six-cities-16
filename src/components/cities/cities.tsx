import { Link } from 'react-router-dom';
import { CityList } from '../../const';
import { CityType } from '../../lib/types';

type CitiesProps = {
  cities: typeof CityList;
  currentCity: CityType | null;
  onCityClick: (cityName: string) => void;
};

export const Cities = (props: CitiesProps): JSX.Element => {
  const { cities, currentCity, onCityClick } = props;
  const handleCityClick = (evt: React.MouseEvent<HTMLUListElement>) => {
    evt.preventDefault();
    const targetElement = evt.target as HTMLFormElement;
    if (targetElement.children.length === 0) {
      onCityClick(targetElement.innerText);
    }
  };

  return (
    <ul
      className="locations__list tabs__list"
      onClick={handleCityClick}
    >
      {Object.values(cities).map((city, index) => {
        const classes = [
          'locations__item-link',
          'tabs__item',
          city.toString() === currentCity?.name ? 'tabs__item--active' : '',
        ].join(' ');
        const keyValue = `${index}-${city}`;

        return (
          <li className="locations__item" key={keyValue}>
            <Link className={classes} to="#">
              <span>{city}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
