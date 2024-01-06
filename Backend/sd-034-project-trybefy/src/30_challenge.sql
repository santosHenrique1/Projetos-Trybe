SELECT a.name "Artista", COUNT(af.artist_id) "Total de seguidores" FROM artists a 
INNER JOIN artists_followers af
on a.id = af.artist_id
GROUP BY a.name
HAVING COUNT(af.artist_id) < 5;