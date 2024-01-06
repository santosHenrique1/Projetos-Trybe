CREATE TABLE history_play_songs (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    song_id INT NOT NULL,
    played_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (song_id) REFERENCES songs(id)
);
INSERT INTO history_play_songs (user_id, song_id, played_at)
VALUES
    (1, 5, '2023-10-17 09:30:00'),
    (2, 10, '2023-10-17 10:15:00'),
    (3, 14, '2023-10-17 11:45:00'),
    (4, 19, '2023-10-17 12:30:00'),
    (5, 8, '2023-10-17 13:20:00'),
    (6, 22, '2023-10-17 14:10:00'),
    (7, 3, '2023-10-17 15:00:00'),
    (8, 16, '2023-10-17 16:15:00'),
    (9, 11, '2023-10-17 17:45:00'),
    (10, 24, '2023-10-17 18:30:00'),
    (1, 12, '2023-10-17 19:00:00'),
    (2, 20, '2023-10-17 20:30:00'),
    (3, 1, '2023-10-17 21:15:00'),
    (4, 18, '2023-10-17 22:00:00'),
    (5, 4, '2023-10-17 23:30:00'),
    (6, 25, '2023-10-17 00:45:00'),
    (7, 2, '2023-10-17 01:20:00'),
    (8, 13, '2023-10-17 02:10:00'),
    (9, 21, '2023-10-17 03:45:00'),
    (10, 7, '2023-10-17 04:30:00'),
    (1, 9, '2023-10-17 05:15:00'),
    (2, 17, '2023-10-17 06:20:00'),
    (3, 15, '2023-10-17 07:30:00'),
    (4, 6, '2023-10-17 08:15:00');
