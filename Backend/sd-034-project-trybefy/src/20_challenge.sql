SELECT a.name "Artista", al.title "Álbum", s.title "Música"  FROM artists a
INNER JOIN albums al
ON a.id = al.artist_id
INNER JOIN songs s
ON al.id = s.album_id 
WHERE a.name <> "The Beatles"
ORDER BY a.name ASC, al.title ASC, s.title ASC;