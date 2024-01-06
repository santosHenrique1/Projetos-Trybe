import { ObjectType } from '../types';

export function CommentsLoaded({ email, text, rating }: ObjectType) {
  return (
    <>
      <p data-testid="review-card-email">{email}</p>
      <p data-testid="review-card-rating">{text}</p>
      <div data-testid="review-card-evaluation">
        { Array
          .from({ length: Number(rating) }, (_, index) => index + 1)
          .map((i) => (
            <p
              key={ i }
            >
              &#9733;
            </p>
          )) }
      </div>

    </>
  );
}
