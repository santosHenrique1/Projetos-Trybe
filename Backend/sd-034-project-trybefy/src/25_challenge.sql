SELECT al.title "Álbum", COUNT(hps.song_id) "Quantidade de músicas reproduzidas" FROM albums al 
INNER JOIN songs s 
ON s.album_id = al.id 
INNER JOIN history_play_songs hps
on  hps.song_id = s.id 
GROUP BY al.id, al.title
ORDER BY COUNT(hps.song_id) DESC, al.title ASC
LIMIT 5;
