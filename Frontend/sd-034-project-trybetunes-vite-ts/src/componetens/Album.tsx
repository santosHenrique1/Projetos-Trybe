import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { SongType } from '../types';

type TypeMusic = {
  artist: string;
  collection: string;
  songs: SongType[];
};
function Album() {
  const [musics, setMusics] = useState<TypeMusic>();
  const { id } = useParams();
  useEffect(() => {
    async function renderMusic() {
      const result = await getMusics(`${id}`);
      console.log(result);
      const [album, ...tracks] = result;
      console.log(tracks);
      setMusics({
        artist: album.artistName,
        collection: album.collectionName,
        songs: tracks,
      });
    }
    renderMusic();
  }, [id]);

  if (!musics) {
    return <Loading />;
  }
  return (
    <div>
      <h2 data-testid="artist-name">
        Nome do artista/banda:
        {musics.artist}
      </h2>
      <p data-testid="album-name">
        {' '}
        Nome do album:
        {musics.collection}
      </p>
      <div>

        {musics.songs.map((track) => (<MusicCard
          key={ track.trackId }
          nameMusic={ track.trackName }
          url={ track.previewUrl }
          trackId={ track.trackId }
        />))}

      </div>
    </div>
  );
}
export default Album;
