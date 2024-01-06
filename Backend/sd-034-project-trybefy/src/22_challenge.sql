SELECT a.name "Artista", COUNT(s.id) "Quantidade de músicas" FROM artists a
INNER JOIN albums al
ON a.id = al.artist_id
INNER JOIN songs s 
ON al.id = s.album_id
GROUP BY a.name
ORDER BY COUNT(s.id) DESC, a.name ASC
LIMIT 3;
