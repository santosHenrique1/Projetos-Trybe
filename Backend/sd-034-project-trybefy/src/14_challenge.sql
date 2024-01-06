SELECT a.name "Artista", GROUP_CONCAT(al.title) "Álbuns"
from artists a 
INNER JOIN albums al
on a.id = al.artist_id
GROUP BY a.id, a.name
ORDER BY a.name ASC; 