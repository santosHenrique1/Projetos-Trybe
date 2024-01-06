SELECT u.full_name "Pessoa usuária", COUNT(af.artist_id) "Artistas que segue" FROM users u 
INNER JOIN artists_followers af 
ON u.id = af.user_id
INNER JOIN artists a
ON af.artist_id = a.id 
GROUP BY u.full_name
ORDER BY u.full_name ASC;

