import { ReviewType } from '../../lib/types';
import { PlaceRating } from '../place-rating/place-rating';

type ReviewItemProps = {
  review: ReviewType;
};

export const ReviewItem = (props: ReviewItemProps): JSX.Element => {
  const { review } = props;
  const date = new Date(review.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <PlaceRating place="reviews" rating={review.rating} />
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {date.toLocaleDateString()}
        </time>
      </div>
    </li>
  );
};
