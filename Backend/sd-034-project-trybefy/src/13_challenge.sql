SELECT a.name "Artista" FROM artists a
JOIN albums al 
ON a.id = al.artist_id
GROUP BY a.id, a.name
HAVING COUNT(al.id) >= 3
ORDER BY a.name ASC;
