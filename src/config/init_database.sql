CREATE TABLE IF NOT EXISTS oblasti (
    id SERIAL UNIQUE,
    oblast character varying NOT NULL UNIQUE,
    ekatte character varying NOT NULL,
    document character varying NOT NULL,
    name character varying NOT NULL UNIQUE,
    abc int NOT NULL UNIQUE,
    region character varying NOT NULL
);

CREATE TABLE IF NOT EXISTS obstini (
    id SERIAL UNIQUE,
    obstina character varying NOT NULL UNIQUE,
    ekatte character varying NOT NULL,
    document character varying NOT NULL,
    name character varying NOT NULL,
    category int NOT NULL,
    abc int NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS selista (
    ekatte character varying NOT NULL UNIQUE PRIMARY KEY,
    t_v_m character varying NOT NULL,
    obstina_id int NOT NULL,
    oblast_id int NOT NULL,
    name character varying NOT NULL,
    FOREIGN KEY (obstina_id) REFERENCES obstini(id),
    FOREIGN KEY (oblast_id) REFERENCES oblasti(id)
);