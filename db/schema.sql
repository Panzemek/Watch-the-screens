DROP DATABASE IF EXISTS wts_game_db;
CREATE DATABASE wts_game_db;

CREATE TABLE game
(
    id int NOT NULL
    AUTO_INCREMENT,
    round_duration int NOT NULL DEFAULT 30,
    terror int NOT NULL DEFAULT 0,
    rioters int NOT NULL DEFAULT 0,
    current_round int NOT NULL DEFAULT 0,
    article_decay int NOT NULL DEFAULT 2,
    is_paused BOOLEAN NOT NULL DEFAULT false,
    time_remaining int,
    is_complete BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY
    (id)
);

    CREATE TABLE news
    (
        id int NOT NULL
        AUTO_INCREMENT,
    title varchar
        (255) NOT NULL,
    img_url varchar
        (255) NOT NULL,
    author varchar
        (255) NOT NULL,
    article_body text NOT NULL,
    round_created int NOT NULL,
    is_hidden boolean NOT NULL DEFAULT false,
    game_id int,
    network_id int,
    FOREIGN KEY
        (game_id) REFERENCES game
        (id),
    FOREIGN KEY
        (network_id) REFERENCES network
        (id),
    PRIMARY KEY
        (id)
);

        CREATE TABLE network
        (
            id int NOT NULL
            AUTO_INCREMENT, 
    network_image varchar
            (255) NOT NULL,
    network_full varchar
            (255) NOT NULL,
    network_short varchar
            (255) NOT NULL,
    PRIMARY KEY
            (id)
);

            CREATE TABLE global_effects
            (
                id int NOT NULL
                AUTO_INCREMENT,
    effect_text varchar
                (255) NOT NULL,
    round_created int NOT NULL,
    start_trigger_type varchar
                (255) NOT NULL,
    start_trigger_value varchar
                (255) NOT NULL,
    end_trigger_type varchar
                (255) NOT NULL,
    end_trigger_value varchar
                (255) NOT NULL,
    is_hidden boolean NOT NULL DEFAULT false,
    game_id int,
    FOREIGN KEY
                (game_id) REFERENCES game
                (id),
    PRIMARY KEY
                (id)
);