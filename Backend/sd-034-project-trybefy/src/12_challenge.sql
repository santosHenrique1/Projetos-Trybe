SELECT a.name "Artista", COUNT(al.id) "Quantidade de álbuns" FROM artists a 
INNER JOIN albums al 
ON a.id = al.artist_id
GROUP BY a.id, a.name 
ORDER BY COUNT(al.id) DESC, a.name ASC;
