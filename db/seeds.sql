USE wts_game_db;

INSERT INTO games
    (game_description, is_paused, is_complete, createdAt, updatedAt)
VALUES
    ("Seattle WtS December 2019", false, false, now(), now());

INSERT INTO networks
    (network_full, network_short, createdAt, updatedAt)
VALUES
    ("Daily Earth News", "DEN", now(), now());

INSERT INTO networks
    (network_full, network_short, createdAt, updatedAt)
VALUES
    ("Global News Network", "GNN", now(), now());

INSERT INTO networks
    (network_full, network_short, createdAt, updatedAt)
VALUES
    ("Grassroots Regional Information Network", "GRIN", now(), now());

INSERT INTO global_effects
    (effect_text, round_created, start_trigger_type, start_trigger_value, end_trigger_type, end_trigger_value, is_hidden, createdAt, updatedAt, gameId)
VALUES
    ("+2 to MVP", 1, "round", "1", "round", "12", false, now(), now(), 1);

INSERT INTO articles
    (title, img_url, author, article_body, round_created, is_hidden, createdAt, updatedAt, gameId, networkId)
VALUES
    ("ZENOCORP <3 NEREUS", "http://lorempixel.com/400/300/", "Person McPersonface", 'MOSCOW - Senior Government officials have confirmed to this reporter that Zenocorp brokered a technology deal with House Nereus (the Other aliens). The CIO of Zenocorp indicated that he was "too busy with the stock market" to bother with this concerning news. German officials have indicated that "all science must be re-examined" in the face of this threat.', 1, false, now(), now(), 1, 1);

INSERT INTO articles
    (title, img_url, author, article_body, round_created, is_hidden, createdAt, updatedAt, gameId, networkId)
VALUES
    ("Volcya Cured My Chakra!", "http://lorempixel.com/400/300/", "Dude McDuderson", "Seattle - I've never felt so disconnected from the universe!.", 1, false, now(), now(), 1, 1);