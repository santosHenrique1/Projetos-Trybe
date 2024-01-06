SELECT full_name "Nome", COUNT(hps.song_id) "Quantidade de músicas reproduzidas" FROM users u
INNER JOIN history_play_songs hps
ON u.id = hps.user_id
GROUP BY u.id, u.full_name
ORDER BY COUNT(hps.song_id) DESC, u.full_name ASC;

