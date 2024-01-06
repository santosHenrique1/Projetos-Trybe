import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';

function Search() {
  const [load, setLoad] = useState(false);
  const [artist, setArtist] = useState('');
  const [button, setButton] = useState(true);
  const [searchAlbum, setSearchAlbum] = useState<AlbumType[]>([]);
  const [clearInput, setClearInput] = useState('');
  async function handleInput() {
    setLoad(true);
    setSearchAlbum(await searchAlbumsAPI(artist));
    setLoad(false);
    setArtist('');
  }
  function handleButton(event: any) {
    setArtist(event.target.value);
    setClearInput(event.target.value);
    if (artist.length >= 1) {
      setButton(false);
    } else {
      setButton(true);
    }
  }
  return (
    <div>
      {load ? <Loading /> : (

        <form>
          <input
            value={ artist }
            type="text"
            placeholder="Artista"
            data-testid="search-artist-input"
            onChange={ (event) => handleButton(event) }
          />
          <button
            disabled={ button }
            data-testid="search-artist-button"
            onClick={ handleInput }
          >
            {' '}
            Pesquisar
            {' '}

          </button>
        </form>

      )}
      {clearInput && (
        <div>
          <p>
            Resultado de álbuns de:
            {' '}
            {clearInput}

          </p>

        </div>
      )}
      {searchAlbum.length > 0 && (
        <ul>
          {searchAlbum.map((album, index) => (
            <div key={ index }>
              <li>
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  {album.artistName}

                </Link>
                {' '}
              </li>
              <li>
                {album.collectionName}
              </li>
              <li>
                <img src={ album.artworkUrl100 } alt="albuns de artista" />
              </li>
            </div>
          ))}
        </ul>
      )}
      { searchAlbum.length === 0 && (
        <p> Nenhum álbum foi encontrado é exibida</p>
      )}
    </div>
  );
}
export default Search;
