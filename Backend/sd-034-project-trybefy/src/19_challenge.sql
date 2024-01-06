SELECT s.title "Título", s.duration_in_seconds "Duração", a.title "Álbum" FROM songs s
INNER JOIN albums a
ON s.album_id = a.id
WHERE s.duration_in_seconds BETWEEN 300 AND 480
ORDER BY s.duration_in_seconds ASC;