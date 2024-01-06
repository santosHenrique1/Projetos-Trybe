SELECT a.name "Artista", COUNT(hps.song_id) "Quantidade de músicas reproduzidas"FROM artists a 
INNER JOIN albums al 
ON a.id = al.artist_id
INNER JOIN songs s 
ON al.id = s.album_id
INNER JOIN history_play_songs hps
ON s.id = hps.song_id
GROUP BY a.name
HAVING COUNT (hps.song_id) > 10;