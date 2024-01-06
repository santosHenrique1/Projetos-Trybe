import { useState } from 'react';

type TypeCard = {
  nameMusic: string,
  url: string,
  trackId: number,
};

function MusicCard({ nameMusic, url, trackId }: TypeCard) {
  const [fav, setFav] = useState(false);
  return (
    <div>

      <p>{nameMusic}</p>
      <audio data-testid="audio-component" src={ url } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
      </audio>
      <label data-testid={ `checkbox-music-${trackId}` }>
        <input
          type="checkbox"
          onChange={ () => setFav(!fav) }
        />
        { fav === true ? (<img src="/src/images/checked_heart.png" alt="favorite" />

        ) : (<img src="/src/images/empty_heart.png" alt="favorite" />

        ) }

      </label>

    </div>
  );
}
export default MusicCard;
