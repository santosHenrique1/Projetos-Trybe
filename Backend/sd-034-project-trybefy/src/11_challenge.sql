SELECT al.title "Album", al.release_year "Ano de lançamento", name "Artista" from albums al
INNER JOIN artists a  ON al.artist_id = a.id
WHERE al.title LIKE '%you%';