#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS item_types;
DROP TABLE IF EXISTS slots;
DROP TYPE IF EXISTS item_level;

CREATE TABLE IF NOT EXISTS item_types(
  item_type_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  type_name VARCHAR (50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS slots(
  slot_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  slot_name VARCHAR (50) UNIQUE NOT NULL,
  slot_price INT NOT NULL
);

CREATE TYPE item_level AS ENUM ('251', '264');

CREATE TABLE IF NOT EXISTS items(
  item_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255) UNIQUE NOT NULL,
  item_type_id INT,
  slot_id INT,
  quality VARCHAR (50) NOT NULL DEFAULT 'Epic',
  check (quality = 'Epic'),
  ilvl item_level,
  description TEXT,
  image_url VARCHAR (255) DEFAULT '#',
  FOREIGN KEY (item_type_id) REFERENCES item_types(item_type_id),
  FOREIGN KEY (slot_id) REFERENCES slots(slot_id)
);

INSERT INTO item_types(type_name)
VALUES
('Cloth armor'),
('Mail armor'),
('Cloaks'),
('Leather armor'),
('Plate armor'),
('Weapons'),
('Relics, Trinkets and Misc');

INSERT INTO slots(slot_name, slot_price)
VALUES
('Head', 95),
('Shoulder', 60),
('Chest', 95),
('Waist', 60),
('Legs', 95),
('Hands', 60),
('Back', 50),
('Trinket', 60),
('Idol', 30),
('Libram', 30),
('Sigil', 30),
('Totem', 30),
('Misc', 23),
('Thrown', 30);

INSERT INTO items(name, item_type_id, slot_id, ilvl, image_url)
VALUES
('Belt of Omission', 1, 4, '264', 'https://static.wikia.nocookie.net/wowwiki/images/6/6d/Inv_belt_66.png'),
('Circle of Ossus', 1, 4, '264', 'https://static.wikia.nocookie.net/wowwiki/images/6/63/Inv_belt_68.png'),
('Cat Burglar''s Grips', 4, 6, '264', 'https://static.wikia.nocookie.net/wowwiki/images/6/6c/Inv_gauntlets_79.png');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      "postgresql://sdas:jalpaiguri@localhost:5432/eof_inventory",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
