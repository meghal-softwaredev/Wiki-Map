INSERT INTO users (name, email, password) 
VALUES ('Angelica Anderson', 'angelica@gmail.com', 'password'), ('Billy Bob', 'billy@gmail.com', 'password'), ('Cathy Cat', 'cathy@gmail.com', '123');

INSERT INTO maps (owner_id, title, description) 
VALUES (1, 'parks', 'green places'), (2, 'restaurants', 'best lunch spots'), (2, 'thrifting', 'I only spent 99 cents!');

INSERT INTO contributors (user_id, map_id)
VALUES (1, 2);

INSERT INTO favourites (user_id, map_id)
VALUES (1, 2), (1, 1), (2, 2), (2, 1);

INSERT INTO points (user_id, map_id, title, description, img_url)
VALUES (1, 2, 'tim hortons', 'coffee and timbits', 'https://imgur.com/gallery/rcxKimS'), (1, 1, 'McDo', 'chicken nug', 'img2'), (1, 1, 'stir fry', 'extra saucy', 'img3')

