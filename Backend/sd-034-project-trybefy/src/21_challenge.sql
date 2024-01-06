SELECT al.title "Álbum", SUM(s.duration_in_seconds) "Duração" FROM albums al
INNER JOIN songs s
ON al.id = s.album_id
GROUP BY al.title
ORDER BY  SUM(s.duration_in_seconds) DESC;