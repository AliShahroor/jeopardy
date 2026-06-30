// Enrichment questions layered on top of the base bank (merged & de-duped by
// questions.js). Adds variety + tougher high-tier items; paraphrased entries
// intentionally reuse some answers with fresh wording.
const ENRICH_QUESTIONS = {
  "Video Games": [
   {
    "q": "In the Pac-Man series, what is the name of Pac-Man's bow-wearing female counterpart who starred in her own hit 1982 arcade game?",
    "a": "Ms. Pac-Man",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What green-clad plumber, the taller and more timid brother of Mario, gets his own 'haunted mansion' games?",
    "a": "Luigi",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What handheld gaming device, released by Nintendo in 1989, famously came bundled with Tetris?",
    "a": "Game Boy",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What 2011 Bethesda action RPG is set in a snowy Nordic province and lets the Dragonborn defeat dragons by shouting?",
    "a": "The Elder Scrolls V: Skyrim",
    "points": 400,
    "type": "text",
    "accept": [
     "Skyrim"
    ]
   },
   {
    "q": "What is the name of the sarcastic, murderous AI that runs the Aperture Science facility in the Portal games?",
    "a": "GLaDOS",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What Japanese RPG series, whose main entries are numbered, features Chocobos, Moogles, and a recurring summon named Bahamut?",
    "a": "Final Fantasy",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What 1998 Nintendo 64 title, widely called one of the greatest games ever, follows a young Link through the Temple of Time?",
    "a": "The Legend of Zelda: Ocarina of Time",
    "points": 600,
    "type": "text",
    "accept": [
     "Ocarina of Time"
    ]
   },
   {
    "q": "What company, formed by a 2003 merger, develops the Final Fantasy and Dragon Quest franchises?",
    "a": "Square Enix",
    "points": 600,
    "type": "text"
   },
   {
    "q": "In the Metroid series, what bird-like ancient alien race raised the orphaned bounty hunter Samus?",
    "a": "The Chozo",
    "points": 600,
    "type": "text",
    "accept": [
     "Chozo"
    ]
   },
   {
    "q": "What 1993 first-person shooter by id Software, the successor to Wolfenstein 3D, pitted a space marine against the demons of Hell?",
    "a": "Doom",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What Japanese game designer created the Metal Gear series and founded Kojima Productions?",
    "a": "Hideo Kojima",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What 1977 text adventure developed at MIT, set in the Great Underground Empire, is famous for the line 'It is pitch black. You are likely to be eaten by a grue'?",
    "a": "Zork",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What 1971 coin-operated machine, based on Spacewar! and made by Nutting Associates, was the first commercially sold arcade video game?",
    "a": "Computer Space",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What poorly received 1982 Atari 2600 game, tied to a Spielberg film, had millions of unsold cartridges buried in a New Mexico landfill?",
    "a": "E.T. the Extra-Terrestrial",
    "points": 1000,
    "type": "text",
    "accept": [
     "E.T."
    ]
   },
   {
    "q": "What 1980 line of single-game Nintendo handhelds, designed by Gunpei Yokoi, introduced the cross-shaped D-pad on its dual-screen models?",
    "a": "Game & Watch",
    "points": 1000,
    "type": "text",
    "accept": [
     "Game and Watch"
    ]
   },
   {
    "q": "In Mario games, eating this spotted mushroom makes Mario grow larger.",
    "a": "Super Mushroom",
    "points": 200,
    "type": "text",
    "accept": [
     "mushroom"
    ]
   },
   {
    "q": "This pink, puffball Nintendo character can inhale enemies and copy their abilities.",
    "a": "Kirby",
    "points": 200,
    "type": "text"
   },
   {
    "q": "In the Animal Crossing series, this greedy raccoon businessman charges you for your house.",
    "a": "Tom Nook",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This Microsoft sci-fi franchise stars a super-soldier called Master Chief.",
    "a": "Halo",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This Sega blue hedgehog races to stop the evil Dr. Robotnik, also called Eggman.",
    "a": "Sonic the Hedgehog",
    "points": 200,
    "type": "text",
    "accept": [
     "Sonic"
    ]
   },
   {
    "q": "In Pokemon's first games, players choose between Bulbasaur, Charmander, and this water-type starter.",
    "a": "Squirtle",
    "points": 400,
    "type": "text"
   },
   {
    "q": "This Nintendo party racing series lets characters throw banana peels and red shells.",
    "a": "Mario Kart",
    "points": 400,
    "type": "text"
   },
   {
    "q": "This 2017 open-air entry let Link climb almost anything and was a Switch launch title.",
    "a": "The Legend of Zelda: Breath of the Wild",
    "points": 400,
    "type": "text",
    "accept": [
     "Breath of the Wild"
    ]
   },
   {
    "q": "This bandicoot is the marsupial mascot of a Naughty Dog platformer originally on PlayStation.",
    "a": "Crash Bandicoot",
    "points": 400,
    "type": "text",
    "accept": [
     "Crash"
    ]
   },
   {
    "q": "Activision's military shooter series with entries like Modern Warfare goes by this name.",
    "a": "Call of Duty",
    "points": 400,
    "type": "text"
   },
   {
    "q": "This farming and life-sim indie game by Eric Barone has you reviving your grandfather's farm.",
    "a": "Stardew Valley",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Released in 2009, this Valve sequel features four survivors fighting hordes of the infected.",
    "a": "Left 4 Dead 2",
    "points": 600,
    "type": "text"
   },
   {
    "q": "This deduction party game by InnerSloth tasks crewmates with finding impostors aboard a spaceship.",
    "a": "Among Us",
    "points": 600,
    "type": "text"
   },
   {
    "q": "In the Souls series, this currency is dropped on death and used to level up and buy items.",
    "a": "Souls",
    "points": 600,
    "type": "text"
   },
   {
    "q": "This 2018 Rockstar Western prequel follows outlaw Arthur Morgan of the Van der Linde gang.",
    "a": "Red Dead Redemption 2",
    "points": 600,
    "type": "text"
   },
   {
    "q": "This 1996 Nintendo 64 title was the launch game that introduced 3D platforming with its plumber hero.",
    "a": "Super Mario 64",
    "points": 800,
    "type": "text"
   },
   {
    "q": "This FromSoftware game directed by Hidetaka Miyazaki with worldbuilding by George R. R. Martin won 2022 Game of the Year.",
    "a": "Elden Ring",
    "points": 800,
    "type": "text"
   },
   {
    "q": "This 1994 Blizzard real-time strategy game pit Orcs against Humans in Azeroth.",
    "a": "Warcraft: Orcs & Humans",
    "points": 800,
    "type": "text",
    "accept": [
     "Warcraft"
    ]
   },
   {
    "q": "In Half-Life, this is the surname of the silent physicist protagonist, Gordon.",
    "a": "Freeman",
    "points": 800,
    "type": "text"
   },
   {
    "q": "This 1989 Sega 16-bit home console was known as the Mega Drive outside North America.",
    "a": "Sega Genesis",
    "points": 800,
    "type": "text",
    "accept": [
     "Genesis",
     "Mega Drive"
    ]
   },
   {
    "q": "This 1981 Nintendo arcade game, the debut of both Mario (as Jumpman) and Donkey Kong, is credited as an early platform game.",
    "a": "Donkey Kong",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "This 1984 Soviet-born puzzle game's name combines the Greek word for four with tennis.",
    "a": "Tetris",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "This text adventure company's name is an acronym from 'Imagination, Inc.', and it made the Zork series.",
    "a": "Infocom",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "This 1962 program is widely cited as the first video game playable on multiple computers, made at MIT for the PDP-1.",
    "a": "Spacewar!",
    "points": 1000,
    "type": "text",
    "accept": [
     "Spacewar"
    ]
   }
  ],
  "Anime & Manga": [
   {
    "q": "What yellow, electric mouse is the most famous mascot of the Pokemon franchise and Ash Ketchum's partner?",
    "a": "Pikachu",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What word, a shortening of an English term, refers to Japanese animated films and television as a whole?",
    "a": "Anime",
    "points": 200,
    "type": "text"
   },
   {
    "q": "In Dragon Ball, what is the spiky-haired Saiyan hero's signature energy attack, charged with cupped hands?",
    "a": "Kamehameha",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What 2016 Makoto Shinkai film centers on two teenagers who mysteriously swap bodies as a comet approaches Earth?",
    "a": "Your Name",
    "points": 400,
    "type": "text",
    "accept": [
     "Kimi no Na wa"
    ]
   },
   {
    "q": "In Dragon Ball Z, what is the name of Goku's scholarly elder son who unleashes his power against the villain Cell?",
    "a": "Gohan",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What sports anime follows volleyball player Shoyo Hinata of Karasuno High School?",
    "a": "Haikyu!!",
    "points": 400,
    "type": "text",
    "accept": [
     "Haikyuu"
    ]
   },
   {
    "q": "What hidden village, also called Konohagakure, is the homeland of the ninja protagonist of Masashi Kishimoto's most famous series?",
    "a": "The Hidden Leaf Village",
    "points": 600,
    "type": "text",
    "accept": [
     "Konoha",
     "Konohagakure"
    ]
   },
   {
    "q": "What anime studio behind 'A Silent Voice' and 'K-On!' suffered a devastating arson attack in 2019?",
    "a": "Kyoto Animation",
    "points": 600,
    "type": "text",
    "accept": [
     "KyoAni"
    ]
   },
   {
    "q": "What animation studio, also known for the 'Fate' franchise, produced the Demon Slayer TV anime?",
    "a": "Ufotable",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Who directed Neon Genesis Evangelion and later founded Studio Khara?",
    "a": "Hideaki Anno",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What dark seinen manga by Kentaro Miura follows the mercenary Guts, who wields a massive sword called the Dragonslayer?",
    "a": "Berserk",
    "points": 800,
    "type": "text"
   },
   {
    "q": "In Katsuhiro Otomo's 1988 film set in Neo-Tokyo, what is the name of Kaneda's friend whose growing psychic powers spiral out of control?",
    "a": "Tetsuo",
    "points": 800,
    "type": "text",
    "accept": [
     "Tetsuo Shima"
    ]
   },
   {
    "q": "What experimental manga magazine did Osamu Tezuka found in 1967 to publish more artistic, adult-oriented works?",
    "a": "COM",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What animation studio, founded by Osamu Tezuka, produced the 1963 Astro Boy TV series, the first weekly Japanese animated show?",
    "a": "Mushi Production",
    "points": 1000,
    "type": "text",
    "accept": [
     "Mushi Pro"
    ]
   },
   {
    "q": "What term refers to self-published, often amateur Japanese manga works, frequently sold at the Comiket convention?",
    "a": "Doujinshi",
    "points": 1000,
    "type": "text",
    "accept": [
     "Dojinshi"
    ]
   },
   {
    "q": "In Pokemon, this Pikachu-owning trainer from Pallet Town aims to be a Pokemon Master.",
    "a": "Ash Ketchum",
    "points": 200,
    "type": "text",
    "accept": [
     "Ash",
     "Satoshi"
    ]
   },
   {
    "q": "This Studio Ghibli film features a friendly forest spirit and a giant Catbus.",
    "a": "My Neighbor Totoro",
    "points": 200,
    "type": "text",
    "accept": [
     "Totoro"
    ]
   },
   {
    "q": "In One Piece, this rubber-bodied captain dreams of becoming the Pirate King.",
    "a": "Monkey D. Luffy",
    "points": 200,
    "type": "text",
    "accept": [
     "Luffy"
    ]
   },
   {
    "q": "This Akira Toriyama series follows Goku collecting seven magical orbs that summon a wish-granting dragon.",
    "a": "Dragon Ball",
    "points": 200,
    "type": "text"
   },
   {
    "q": "In Naruto, this is the spiral-marked headband symbol worn by ninja of the protagonist's village.",
    "a": "Leaf (Konoha) symbol",
    "points": 200,
    "type": "text",
    "accept": [
     "Konoha",
     "Hidden Leaf"
    ]
   },
   {
    "q": "This shonen series stars Izuku Midoriya, a boy born without powers who attends the U.A. hero academy.",
    "a": "My Hero Academia",
    "points": 400,
    "type": "text"
   },
   {
    "q": "In Death Note, this shinigami drops his notebook and follows Light, craving apples.",
    "a": "Ryuk",
    "points": 400,
    "type": "text"
   },
   {
    "q": "This Studio Ghibli wizard owns a walking castle in the 2004 film named for him.",
    "a": "Howl",
    "points": 400,
    "type": "text",
    "accept": [
     "Howl's Moving Castle"
    ]
   },
   {
    "q": "In Attack on Titan, this protagonist vows revenge after a Titan kills his mother.",
    "a": "Eren Yeager",
    "points": 400,
    "type": "text",
    "accept": [
     "Eren",
     "Eren Jaeger"
    ]
   },
   {
    "q": "This pirate manga by Eiichiro Oda is the best-selling manga series of all time.",
    "a": "One Piece",
    "points": 400,
    "type": "text"
   },
   {
    "q": "In Fullmetal Alchemist, the brothers seek this legendary stone that bypasses alchemy's laws.",
    "a": "Philosopher's Stone",
    "points": 600,
    "type": "text"
   },
   {
    "q": "This 1995 mecha series ends with the controversial 'End of Evangelion' film and features the Human Instrumentality Project.",
    "a": "Neon Genesis Evangelion",
    "points": 600,
    "type": "text"
   },
   {
    "q": "In Demon Slayer, this is the surname of demon-hunting siblings Tanjiro and Nezuko.",
    "a": "Kamado",
    "points": 600,
    "type": "text"
   },
   {
    "q": "This 1998 anime by Shinichiro Watanabe blends jazz, noir, and bounty hunting in space.",
    "a": "Cowboy Bebop",
    "points": 600,
    "type": "text"
   },
   {
    "q": "In My Hero Academia, this blond, explosive-quirk classmate of Deku goes by the hero name Dynamight.",
    "a": "Katsuki Bakugo",
    "points": 600,
    "type": "text",
    "accept": [
     "Bakugo"
    ]
   },
   {
    "q": "Name the manga by Hajime Isayama that ran from 2009 to 2021 about humanity living inside three walls to escape man-eating giants.",
    "a": "Attack on Titan",
    "points": 800,
    "type": "text"
   },
   {
    "q": "This anime studio produced the long-running adaptations of Naruto and Bleach.",
    "a": "Studio Pierrot",
    "points": 800,
    "type": "text",
    "accept": [
     "Pierrot"
    ]
   },
   {
    "q": "This Satoshi Kon 1997 psychological thriller about a pop idol influenced Black Swan.",
    "a": "Perfect Blue",
    "points": 800,
    "type": "text"
   },
   {
    "q": "In Dragon Ball Z, this green Namekian, once Goku's enemy, becomes a mentor and fuses with the deity Kami.",
    "a": "Piccolo",
    "points": 800,
    "type": "text"
   },
   {
    "q": "This 1974 Leiji Matsumoto manga and anime follows a caped space pirate captain aboard the Arcadia.",
    "a": "Space Pirate Captain Harlock",
    "points": 800,
    "type": "text",
    "accept": [
     "Captain Harlock",
     "Space Battleship Yamato"
    ]
   },
   {
    "q": "This 1963 Mitsuteru Yokoyama series about a boy controlling a giant robot is considered the first mecha anime.",
    "a": "Tetsujin 28-go",
    "points": 1000,
    "type": "text",
    "accept": [
     "Gigantor",
     "Tetsujin 28"
    ]
   },
   {
    "q": "This award-winning magazine published by Kodansha serializes Attack on Titan.",
    "a": "Bessatsu Shonen Magazine",
    "points": 1000,
    "type": "text",
    "accept": [
     "Bessatsu Shonen",
     "Shonen Magazine"
    ]
   },
   {
    "q": "This term, literally 'youth' demographic, describes manga aimed at teenage boys, like Weekly Shonen Jump titles.",
    "a": "Shonen",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "This anime studio, founded in 1985 and known for Akira-era talent, produced Ghost in the Shell in 1995.",
    "a": "Production I.G",
    "points": 1000,
    "type": "text",
    "accept": [
     "Production IG"
    ]
   }
  ],
  "Superheroes": [
   {
    "q": "What is the everyday alter ego of Spider-Man, a science-loving teenager from Queens?",
    "a": "Peter Parker",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What is the real name of Batman, the billionaire who protects Gotham City?",
    "a": "Bruce Wayne",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What is the name of Marvel's flagship superhero team that includes Iron Man, Captain America, and Thor?",
    "a": "The Avengers",
    "points": 200,
    "type": "text",
    "accept": [
     "Avengers"
    ]
   },
   {
    "q": "What WWII super-soldier, created by Joe Simon and Jack Kirby, carries a round vibranium shield?",
    "a": "Captain America",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What dark, crime-ridden fictional city is the home and beat of Batman?",
    "a": "Gotham City",
    "points": 400,
    "type": "text",
    "accept": [
     "Gotham"
    ]
   },
   {
    "q": "What scarlet-clad DC speedster, the fastest man alive, has had alter egos including Barry Allen and Wally West?",
    "a": "The Flash",
    "points": 400,
    "type": "text",
    "accept": [
     "Flash"
    ]
   },
   {
    "q": "What fictional, nearly indestructible metal is bonded to Wolverine's skeleton and forms his claws?",
    "a": "Adamantium",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What is the royal name of the Black Panther, king of Wakanda?",
    "a": "T'Challa",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What blue-skinned, shape-shifting mutant, an X-Men foe and the mother of Nightcrawler, leads the Brotherhood?",
    "a": "Mystique",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What 1986 Frank Miller comic series, abbreviated 'DKR', depicts an aged Bruce Wayne returning from retirement?",
    "a": "The Dark Knight Returns",
    "points": 800,
    "type": "text",
    "accept": [
     "Batman: The Dark Knight Returns"
    ]
   },
   {
    "q": "What cosmic Titan supervillain, obsessed with the entity Death, was created by Jim Starlin and wields the Infinity Gauntlet?",
    "a": "Thanos",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What 1986-87 Alan Moore and Dave Gibbons comic series, featuring Rorschach and Dr. Manhattan, won a Hugo Award?",
    "a": "Watchmen",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What 1940 Fawcett Comics hero transforms by shouting 'Shazam!' and prompted a DC lawsuit for resembling Superman?",
    "a": "Captain Marvel",
    "points": 1000,
    "type": "text",
    "accept": [
     "Shazam",
     "Billy Batson"
    ]
   },
   {
    "q": "What was the full name of the largely uncredited co-creator who wrote much of the early Batman mythos, including the Joker and Robin?",
    "a": "Bill Finger",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What two creators, a writer and an artist from Cleveland, created Superman, first published in 1938?",
    "a": "Jerry Siegel and Joe Shuster",
    "points": 1000,
    "type": "text",
    "accept": [
     "Siegel and Shuster"
    ]
   },
   {
    "q": "This red-and-blue Marvel hero gets his powers from a radioactive spider bite.",
    "a": "Spider-Man",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This green-skinned Avenger's catchphrase is 'Hulk smash!'",
    "a": "The Hulk",
    "points": 200,
    "type": "text",
    "accept": [
     "Hulk",
     "Bruce Banner"
    ]
   },
   {
    "q": "This blind Marvel hero protects Hell's Kitchen and is nicknamed 'the Man Without Fear'.",
    "a": "Daredevil",
    "points": 200,
    "type": "text",
    "accept": [
     "Matt Murdock"
    ]
   },
   {
    "q": "This patriotic Avenger carries a star-spangled shield and was frozen in ice for decades.",
    "a": "Captain America",
    "points": 200,
    "type": "text",
    "accept": [
     "Steve Rogers"
    ]
   },
   {
    "q": "This Amazon warrior princess deflects bullets with her bracelets and pilots an invisible jet.",
    "a": "Wonder Woman",
    "points": 200,
    "type": "text",
    "accept": [
     "Diana"
    ]
   },
   {
    "q": "This raccoon-like character and a tree named Groot belong to which space-faring Marvel team?",
    "a": "Guardians of the Galaxy",
    "points": 400,
    "type": "text"
   },
   {
    "q": "This DC archer hero, a wealthy playboy, is the alter ego of Oliver Queen.",
    "a": "Green Arrow",
    "points": 400,
    "type": "text"
   },
   {
    "q": "This sorcerer, a former neurosurgeon, becomes Marvel's Master of the Mystic Arts.",
    "a": "Doctor Strange",
    "points": 400,
    "type": "text",
    "accept": [
     "Stephen Strange"
    ]
   },
   {
    "q": "This DC heroine, Batman's frequent ally, is the daughter of Commissioner Gordon.",
    "a": "Batgirl",
    "points": 400,
    "type": "text",
    "accept": [
     "Barbara Gordon"
    ]
   },
   {
    "q": "This shape-shifting Norse trickster is Thor's adopted brother and a frequent Avengers foe.",
    "a": "Loki",
    "points": 400,
    "type": "text"
   },
   {
    "q": "This telepathic, wheelchair-using founder of the X-Men runs a school for mutants.",
    "a": "Professor X",
    "points": 600,
    "type": "text",
    "accept": [
     "Charles Xavier",
     "Professor Charles Xavier"
    ]
   },
   {
    "q": "This Marvel antihero, a wisecracking mercenary in red, is known for breaking the fourth wall.",
    "a": "Deadpool",
    "points": 600,
    "type": "text",
    "accept": [
     "Wade Wilson"
    ]
   },
   {
    "q": "This Spider-Man villain is a scientist with four mechanical arms fused to his body.",
    "a": "Doctor Octopus",
    "points": 600,
    "type": "text",
    "accept": [
     "Doc Ock",
     "Otto Octavius"
    ]
   },
   {
    "q": "This DC sea king rules Atlantis and can command marine life.",
    "a": "Aquaman",
    "points": 600,
    "type": "text",
    "accept": [
     "Arthur Curry"
    ]
   },
   {
    "q": "This magnetism-wielding mutant, a Holocaust survivor, is the X-Men's most iconic adversary.",
    "a": "Magneto",
    "points": 600,
    "type": "text",
    "accept": [
     "Erik Lehnsherr",
     "Max Eisenhardt"
    ]
   },
   {
    "q": "This Marvel symbiote villain and antihero bonds with journalist Eddie Brock.",
    "a": "Venom",
    "points": 800,
    "type": "text",
    "accept": [
     "Eddie Brock"
    ]
   },
   {
    "q": "This artist and writer created Spawn and co-founded Image Comics in 1992.",
    "a": "Todd McFarlane",
    "points": 800,
    "type": "text"
   },
   {
    "q": "In DC, this is the home city of the Flash, Barry Allen.",
    "a": "Central City",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Hal Jordan, a test pilot chosen by a dying alien, takes up which DC superhero identity powered by a willpower ring?",
    "a": "Green Lantern",
    "points": 800,
    "type": "text"
   },
   {
    "q": "This 1962 Marvel comic, Amazing Fantasy number 15, marked the first appearance of which web-slinging hero?",
    "a": "Spider-Man",
    "points": 800,
    "type": "text"
   },
   {
    "q": "This British writer is best known for DC's acclaimed Vertigo series The Sandman.",
    "a": "Neil Gaiman",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Iron Man first appeared in 1963 in this Marvel anthology comic, which also later featured Captain America.",
    "a": "Tales of Suspense",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "In the Justice League animated series, what is the first name of Hawkgirl, the Thanagarian warrior?",
    "a": "Shayera",
    "points": 1000,
    "type": "text",
    "accept": [
     "Shayera Hol",
     "Shiera"
    ]
   },
   {
    "q": "This term describes the period roughly 1938 to 1956 when superhero comics first flourished, beginning with Superman's debut.",
    "a": "The Golden Age of Comic Books",
    "points": 1000,
    "type": "text",
    "accept": [
     "Golden Age"
    ]
   }
  ],
  "Football (Soccer)": [
   {
    "q": "How many players from each team are on the pitch at the start of a match, including the goalkeeper?",
    "a": "Eleven",
    "points": 200,
    "type": "text",
    "accept": [
     "11"
    ]
   },
   {
    "q": "What is the world governing body of football, which organizes the men's and women's World Cups?",
    "a": "FIFA",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What piece of equipment must a goalkeeper wear that outfield players generally do not, to help catch and grip the ball?",
    "a": "Gloves",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which Argentine forward, who joined Inter Miami in 2023, won a record eight Ballon d'Or awards?",
    "a": "Lionel Messi",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What is the name of the elite annual European club competition organized by UEFA, formerly called the European Cup?",
    "a": "UEFA Champions League",
    "points": 400,
    "type": "text",
    "accept": [
     "Champions League"
    ]
   },
   {
    "q": "In which European country do clubs like Real Madrid and Atletico Madrid play their top-flight league, La Liga?",
    "a": "Spain",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which German club, nicknamed 'Die Roten', has won the Bundesliga more than 30 times and is based in Bavaria?",
    "a": "Bayern Munich",
    "points": 600,
    "type": "text",
    "accept": [
     "FC Bayern Munich"
    ]
   },
   {
    "q": "Which French former striker captained France to the 1998 World Cup title and later managed Real Madrid to multiple Champions League wins?",
    "a": "Zinedine Zidane",
    "points": 600,
    "type": "text",
    "accept": [
     "Zidane"
    ]
   },
   {
    "q": "What name is given to the major South American national-team tournament, the oldest international continental competition in football?",
    "a": "Copa America",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which English club, managed for years by Sir Alex Ferguson, won the treble in the 1998-99 season?",
    "a": "Manchester United",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which Italian defender captained Italy to victory at the 2006 World Cup and is famed for the AC Milan-Juventus rivalry as a center-back?",
    "a": "Fabio Cannavaro",
    "points": 800,
    "type": "text",
    "accept": [
     "Cannavaro"
    ]
   },
   {
    "q": "What tactical formation, associated with the Netherlands and Ajax in the 1970s, emphasized positional fluidity and is called 'Total Football'?",
    "a": "Total Football",
    "points": 800,
    "type": "text",
    "accept": [
     "Totaalvoetbal"
    ]
   },
   {
    "q": "Which Brazilian winger, born Manuel Francisco dos Santos and nicknamed 'the Little Bird', starred alongside Pele in winning the 1958 and 1962 World Cups?",
    "a": "Garrincha",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which Russian forward holds the record for most goals in a single World Cup match, scoring five against Cameroon in 1994?",
    "a": "Oleg Salenko",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What is the name of the 1950 World Cup final-deciding match in which Uruguay defeated host Brazil, a result Brazilians call by a one-word name meaning 'the Maracana blow'?",
    "a": "Maracanazo",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which Portuguese forward, who joined Real Madrid in 2009, is the all-time leading goalscorer in the men's UEFA Champions League?",
    "a": "Cristiano Ronaldo",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What is the name of the spot-kick awarded for a foul committed inside the box, taken twelve yards from goal?",
    "a": "A penalty kick",
    "points": 200,
    "type": "text",
    "accept": [
     "Penalty",
     "Penalty kick"
    ]
   },
   {
    "q": "What is the name of the trophy awarded to the World Cup's top goalscorer?",
    "a": "Golden Boot",
    "points": 200,
    "type": "text"
   },
   {
    "q": "How many players from each team start a match on the pitch, including the goalkeeper?",
    "a": "Eleven",
    "points": 200,
    "type": "text",
    "accept": [
     "11"
    ]
   },
   {
    "q": "What is the term for scoring three goals in a single match?",
    "a": "Hat-trick",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which English club, based on Merseyside, has won the European Cup or Champions League six times?",
    "a": "Liverpool",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which world governing body of football organizes the men's and women's World Cups?",
    "a": "FIFA",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which Brazilian forward, the only man to win three World Cups as a player, scored twice in the 1958 final as a teenager?",
    "a": "Pele",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which English club, managed by Sir Alex Ferguson, won the treble in the 1998-99 season?",
    "a": "Manchester United",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which German club beat Manchester United in stoppage time to win the 1999 Champions League final before United's comeback... actually, which Bavarian club lost that final?",
    "a": "Bayern Munich",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which compact attacking midfielder, an Argentine, won a record eight Ballon d'Or awards?",
    "a": "Lionel Messi",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which Italian goalkeeper, regarded as one of the best ever, was part of Italy's 2006 World Cup-winning team?",
    "a": "Gianluigi Buffon",
    "points": 600,
    "type": "text",
    "accept": [
     "Buffon"
    ]
   },
   {
    "q": "Which German striker, nicknamed 'Der Bomber', held the record for most World Cup goals for over three decades with 14?",
    "a": "Gerd Muller",
    "points": 600,
    "type": "text",
    "accept": [
     "Gerd Mueller",
     "Muller"
    ]
   },
   {
    "q": "Who set the Premier League record for the fastest hat-trick, scoring three goals in 2 minutes 56 seconds in 2015?",
    "a": "Sadio Mane",
    "points": 600,
    "type": "text",
    "accept": [
     "Mane"
    ]
   },
   {
    "q": "Who scored the winning goal in extra time of the 2010 FIFA World Cup final?",
    "a": "Andres Iniesta",
    "points": 600,
    "type": "text",
    "accept": [
     "Iniesta"
    ]
   },
   {
    "q": "Who won the 2002 FIFA World Cup Golden Boot with eight goals?",
    "a": "Ronaldo (Nazario)",
    "points": 600,
    "type": "text",
    "accept": [
     "Ronaldo",
     "Ronaldo Nazario"
    ]
   },
   {
    "q": "Who scored the golden goal that won Euro 2000 for France in extra time?",
    "a": "David Trezeguet",
    "points": 800,
    "type": "text",
    "accept": [
     "Trezeguet"
    ]
   },
   {
    "q": "Which Italian club, nicknamed 'La Vecchia Signora' or the Old Lady, is the most successful in Serie A history?",
    "a": "Juventus",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which English defender is the only player to captain a World Cup-winning side for England, lifting the trophy in 1966?",
    "a": "Bobby Moore",
    "points": 800,
    "type": "text",
    "accept": [
     "Bobby Moore"
    ]
   },
   {
    "q": "Who won the 1966 FIFA World Cup Golden Boot with nine goals?",
    "a": "Eusebio",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Who scored twice in the 1998 FIFA World Cup final and later coached Real Madrid to three Champions League titles?",
    "a": "Zinedine Zidane",
    "points": 1000,
    "type": "text",
    "accept": [
     "Zidane"
    ]
   },
   {
    "q": "Who scored a record five goals in a single FIFA World Cup match, against Cameroon in 1994?",
    "a": "Oleg Salenko",
    "points": 1000,
    "type": "text",
    "accept": [
     "Salenko"
    ]
   },
   {
    "q": "Who was sent off in the 2006 FIFA World Cup final for headbutting Marco Materazzi?",
    "a": "Zinedine Zidane",
    "points": 1000,
    "type": "text",
    "accept": [
     "Zidane"
    ]
   },
   {
    "q": "Which goalkeeper holds the record for the longest run without conceding in international football, set for Italy across 2021-2022?",
    "a": "Gianluigi Donnarumma",
    "points": 1000,
    "type": "text",
    "accept": [
     "Donnarumma"
    ]
   }
  ],
  "Cars & Automotive": [
   {
    "q": "What four-wheeled inflatable rubber component, mounted on the wheels, makes contact with the road surface?",
    "a": "Tire",
    "points": 200,
    "type": "text",
    "accept": [
     "Tyre",
     "Tires"
    ]
   },
   {
    "q": "Which Japanese automaker, known for the Civic and Accord, also makes motorcycles and shares its founder's surname?",
    "a": "Honda",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What is the common name for the wheel a driver turns to steer a car?",
    "a": "Steering wheel",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which iconic American sports car, made by Chevrolet since 1953, is often nicknamed the 'Vette'?",
    "a": "Corvette",
    "points": 400,
    "type": "text",
    "accept": [
     "Chevrolet Corvette"
    ]
   },
   {
    "q": "Which German luxury automaker uses a four-ring logo representing the merger of four companies?",
    "a": "Audi",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What type of electric-and-gasoline-powered vehicle is the Toyota Prius, famous for its fuel efficiency?",
    "a": "Hybrid",
    "points": 400,
    "type": "text",
    "accept": [
     "Hybrid car",
     "Hybrid electric vehicle"
    ]
   },
   {
    "q": "Which British luxury car brand, founded by Walter Owen and known for its 'flying B' mascot, is now owned by Volkswagen Group?",
    "a": "Bentley",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What is the name of the system, often abbreviated ABS, that prevents wheels from locking up during hard braking?",
    "a": "Anti-lock braking system",
    "points": 600,
    "type": "text",
    "accept": [
     "ABS"
    ]
   },
   {
    "q": "Which South Korean automaker, sister company to Kia, makes models such as the Sonata, Elantra, and Tucson?",
    "a": "Hyundai",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What is the name of the rotating shaft in an engine that opens and closes the intake and exhaust valves, often referenced as 'overhead' in DOHC?",
    "a": "Camshaft",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which Japanese sports car, the Mazda MX-5, holds the Guinness record as the best-selling two-seat roadster and is known in some markets as the 'Miata'?",
    "a": "Mazda MX-5 Miata",
    "points": 800,
    "type": "text",
    "accept": [
     "Miata",
     "Mazda MX-5"
    ]
   },
   {
    "q": "What engine layout, used in the Subaru and Porsche 911, places cylinders horizontally opposed and is nicknamed 'boxer'?",
    "a": "Flat engine",
    "points": 800,
    "type": "text",
    "accept": [
     "Boxer engine",
     "Flat-four",
     "Flat-six"
    ]
   },
   {
    "q": "Which forced-induction device uses exhaust gases to spin a turbine and compress intake air, boosting engine power?",
    "a": "Turbocharger",
    "points": 1000,
    "type": "text",
    "accept": [
     "Turbo",
     "Turbocharging"
    ]
   },
   {
    "q": "Which French marque won the 24 Hours of Le Mans a record number of times in the 1980s-90s and is also known for the 905 prototype, sharing its name with a lion-logo carmaker?",
    "a": "Peugeot",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What is the name of the standardized onboard diagnostics port, mandatory on cars since the mid-1990s in the US, that mechanics plug scanners into?",
    "a": "OBD-II",
    "points": 1000,
    "type": "text",
    "accept": [
     "OBD2",
     "On-board diagnostics II"
    ]
   },
   {
    "q": "This Japanese brand, Toyota's luxury division, makes models like the RX and LS.",
    "a": "Lexus",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This electric component stores energy to start the engine and power the lights when the car is off.",
    "a": "Battery",
    "points": 200,
    "type": "text",
    "accept": [
     "Car battery"
    ]
   },
   {
    "q": "This pedal on a manual-transmission car is pressed to change gears.",
    "a": "Clutch",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This Italian-American brand merged into Stellantis and makes the 500 city car.",
    "a": "Fiat",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This South Korean automaker uses a stylized red logo and makes the Sportage and Sorento.",
    "a": "Kia",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This BMW-owned British brand revived the small, iconic Cooper hatchback.",
    "a": "Mini",
    "points": 400,
    "type": "text"
   },
   {
    "q": "This luxury brand is the upmarket division of Nissan, selling models like the Q50.",
    "a": "Infiniti",
    "points": 400,
    "type": "text"
   },
   {
    "q": "This fluid lubricates an engine's moving parts and must be changed periodically.",
    "a": "Motor oil",
    "points": 400,
    "type": "text",
    "accept": [
     "Engine oil",
     "Oil"
    ]
   },
   {
    "q": "This Ford pony car, introduced in 1964, became one of the most iconic American sports coupes.",
    "a": "Ford Mustang",
    "points": 400,
    "type": "text",
    "accept": [
     "Mustang"
    ]
   },
   {
    "q": "This American Jeep-rivaling off-road brand was revived by Ford in 2021 with a boxy SUV.",
    "a": "Bronco",
    "points": 400,
    "type": "text",
    "accept": [
     "Ford Bronco"
    ]
   },
   {
    "q": "This radiator fluid lowers the freezing point and raises the boiling point of an engine's cooling system.",
    "a": "Antifreeze",
    "points": 600,
    "type": "text",
    "accept": [
     "Coolant",
     "Engine coolant"
    ]
   },
   {
    "q": "This Swedish brand, now Chinese-owned, built its reputation on safety and invented the three-point seatbelt.",
    "a": "Volvo",
    "points": 600,
    "type": "text"
   },
   {
    "q": "This component converts the engine's rotational motion into a measurable road speed and sits behind the dashboard.",
    "a": "Speedometer",
    "points": 600,
    "type": "text"
   },
   {
    "q": "This British marque founded by William Lyons is known for the XJ saloon and the F-Type sports car.",
    "a": "Jaguar",
    "points": 600,
    "type": "text"
   },
   {
    "q": "This drivetrain layout sends power to all four wheels and is abbreviated AWD.",
    "a": "All-wheel drive",
    "points": 600,
    "type": "text",
    "accept": [
     "AWD",
     "Four-wheel drive",
     "4WD"
    ]
   },
   {
    "q": "This Italian supercar maker founded in 1963 by a tractor magnate uses a charging bull as its emblem.",
    "a": "Lamborghini",
    "points": 800,
    "type": "text"
   },
   {
    "q": "This part of the suspension absorbs road shocks, often paired with a coil spring in a strut assembly.",
    "a": "Shock absorber",
    "points": 800,
    "type": "text",
    "accept": [
     "Damper",
     "Shock"
    ]
   },
   {
    "q": "This gear mechanism between the drive wheels lets them rotate at different speeds while cornering.",
    "a": "Differential",
    "points": 800,
    "type": "text"
   },
   {
    "q": "This German performance division of Mercedes-Benz tunes high-output models bearing its three-letter badge.",
    "a": "AMG",
    "points": 800,
    "type": "text",
    "accept": [
     "Mercedes-AMG"
    ]
   },
   {
    "q": "This sensor in the exhaust measures oxygen levels to help the engine control unit adjust the fuel mixture.",
    "a": "Oxygen sensor",
    "points": 800,
    "type": "text",
    "accept": [
     "O2 sensor",
     "Lambda sensor"
    ]
   },
   {
    "q": "This belt or chain synchronizes the rotation of the crankshaft and camshaft so an engine's valves open at the correct time.",
    "a": "Timing belt",
    "points": 1000,
    "type": "text",
    "accept": [
     "Timing chain",
     "Cam belt"
    ]
   },
   {
    "q": "This pioneering hybrid-electric drivetrain in early Porsche designs by Ferdinand Porsche placed electric motors in the wheel hubs; it is called by this Latin-derived name.",
    "a": "Lohner-Porsche Mixte",
    "points": 1000,
    "type": "text",
    "accept": [
     "Mixte",
     "Lohner-Porsche"
    ]
   },
   {
    "q": "This continuously variable transmission, abbreviated CVT, uses these two adjustable cone-shaped components connected by a belt to vary the gear ratio.",
    "a": "Pulleys",
    "points": 1000,
    "type": "text",
    "accept": [
     "Variable pulleys",
     "Cone pulleys"
    ]
   },
   {
    "q": "This pre-ignition engine knocking is suppressed by fuels rated with this number, which measures resistance to detonation.",
    "a": "Octane rating",
    "points": 1000,
    "type": "text",
    "accept": [
     "Octane number",
     "Octane"
    ]
   }
  ],
  "Internet Culture": [
   {
    "q": "What is the Japanese-origin name for the small digital icons, like the smiley face, used to express emotion in texts and posts?",
    "a": "Emoji",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What is the name of the social media platform, founded in 2006, where messages were originally limited to 140 characters and posts were called 'tweets'?",
    "a": "Twitter",
    "points": 200,
    "type": "text",
    "accept": [
     "X"
    ]
   },
   {
    "q": "What three-letter acronym means 'be right back', used in chat when stepping away briefly?",
    "a": "BRB",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What professional networking website, founded in 2002 and later bought by Microsoft, is centered on resumes and job connections?",
    "a": "LinkedIn",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What is the name of the disappearing-photo app launched in 2011, known for its ghost logo and Stories feature?",
    "a": "Snapchat",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What term describes the practice of repeatedly scrolling through negative or distressing online news, popularized during the pandemic?",
    "a": "Doomscrolling",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What 2007 web video, in which a man tearfully defends Britney Spears, became one of YouTube's early viral sensations with the phrase 'Leave [her] alone'?",
    "a": "Leave Britney Alone",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What is the name of the satirical, humor-focused wiki founded in 2005 that parodies Wikipedia with deliberately fake and comedic articles?",
    "a": "Uncyclopedia",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What term, derived from 'web log', describes a regularly updated personal website or online journal?",
    "a": "Blog",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What looping image file format, whose name is debated as pronounced 'jif' or 'gif', became the standard for short animated internet clips and reaction memes?",
    "a": "GIF",
    "points": 800,
    "type": "text",
    "accept": [
     "Animated GIF",
     "Graphics Interchange Format"
    ]
   },
   {
    "q": "What 1996 song-and-video phenomenon by Los Del Rio spawned a worldwide dance craze and an iconic arm-crossing routine, later revived online?",
    "a": "Macarena",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What is the name of the social news and entertainment site, launched in 2005 by Jonah Peretti, famous for listicles and quizzes?",
    "a": "BuzzFeed",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What is the name of the 2010-era rage-comic character, a crudely drawn smiling face used in webcomics, often paired with 'Trollface' and 'Forever Alone'?",
    "a": "Rage Guy (FFFFUUUU)",
    "points": 1000,
    "type": "text",
    "accept": [
     "Rage Guy",
     "FFFUUU guy"
    ]
   },
   {
    "q": "What was the name of the pioneering 1990s web portal and search directory co-founded by Jerry Yang and David Filo, originally titled 'Jerry and David's Guide to the World Wide Web'?",
    "a": "Yahoo!",
    "points": 1000,
    "type": "text",
    "accept": [
     "Yahoo"
    ]
   },
   {
    "q": "What 2012 viral campaign by the nonprofit Invisible Children, aimed at arresting Ugandan warlord Joseph Kony, became one of the fastest-spreading videos in internet history?",
    "a": "Kony 2012",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What is the name of the social network founded by Mark Zuckerberg at Harvard in 2004?",
    "a": "Facebook",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What term describes a short, looping animated image format often used for reactions, debated as pronounced 'jif'?",
    "a": "GIF",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What three-letter acronym, used online, expresses something so funny you are 'rolling on the floor laughing'?",
    "a": "ROFL",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What encyclopedia website, launched in 2001, can be edited by anyone and is one of the most visited sites?",
    "a": "Wikipedia",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What does the acronym 'DM' stand for in social media, referring to a private message?",
    "a": "Direct Message",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What 2012 viral dance craze by Korean artist Psy was the first YouTube video to hit one billion views?",
    "a": "Gangnam Style",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What prank involves tricking someone into clicking a link to a 1987 Rick Astley music video?",
    "a": "Rickrolling",
    "points": 400,
    "type": "text",
    "accept": [
     "Rickroll"
    ]
   },
   {
    "q": "What term describes pretending online to be a different person, often to deceive a romantic partner?",
    "a": "Catfishing",
    "points": 400,
    "type": "text",
    "accept": [
     "Catfish"
    ]
   },
   {
    "q": "What 2014 viral fundraising challenge had people dump ice water on themselves for ALS awareness?",
    "a": "Ice Bucket Challenge",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What is the name for the customizable profile picture that represents a user, often in games or forums?",
    "a": "Avatar",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What animated dancing 3D infant, spread via email around 1996, is considered one of the earliest viral phenomena?",
    "a": "Dancing Baby",
    "points": 600,
    "type": "text",
    "accept": [
     "Baby Cha-Cha"
    ]
   },
   {
    "q": "What term describes content that is intentionally provocative to attract clicks, often with misleading headlines?",
    "a": "Clickbait",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What anonymous imageboard, created by Christopher Poole in 2003, spawned countless memes and the group Anonymous?",
    "a": "4chan",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What is the name of the green cartoon frog character that became a widespread reaction-image meme?",
    "a": "Pepe the Frog",
    "points": 600,
    "type": "text",
    "accept": [
     "Pepe"
    ]
   },
   {
    "q": "What blogging and microblogging platform, launched in 2007 and known for fandoms, was bought by Yahoo in 2013?",
    "a": "Tumblr",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What 2000s game-translation phrase declared 'All your base are belong to' which word?",
    "a": "Us",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What term refers to a long block of text copied and repeatedly pasted across forums and comments?",
    "a": "Copypasta",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What early lolcats website paired misspelled captions like 'I Can Has Cheezburger?' with cat photos?",
    "a": "Cheezburger",
    "points": 800,
    "type": "text",
    "accept": [
     "I Can Has Cheezburger"
    ]
   },
   {
    "q": "What Shiba Inu meme, featuring multicolored Comic Sans phrases, later inspired a cryptocurrency?",
    "a": "Doge",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What term describes the spread of a piece of online content to massive popularity in a short time?",
    "a": "Going viral",
    "points": 800,
    "type": "text",
    "accept": [
     "Viral"
    ]
   },
   {
    "q": "What 1993 New Yorker cartoon caption stated 'On the Internet, nobody knows you're a' what?",
    "a": "Dog",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What 2007 video, in which a tearful fan begged the press to back off a pop star, used the phrase 'Leave [her] alone'?",
    "a": "Leave Britney Alone",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What humor wiki, founded in 2005, parodies Wikipedia with deliberately absurd and false articles?",
    "a": "Uncyclopedia",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What crudely drawn smiling rage-comic face, paired with 'Trollface', shouts 'FFFFUUUU' in webcomics?",
    "a": "Rage Guy",
    "points": 1000,
    "type": "text",
    "accept": [
     "FFFFUUUU"
    ]
   }
  ],
  "Mythology": [
   {
    "q": "In Greek mythology, this goddess of love rose from sea foam, sharing many traits with the Roman Venus.",
    "a": "Aphrodite",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This king with golden touch found that everything he touched, including food, turned to gold.",
    "a": "King Midas",
    "points": 200,
    "type": "text",
    "accept": [
     "Midas"
    ]
   },
   {
    "q": "This one-eyed giant, blinded by Odysseus, was named Polyphemus and belonged to a race of these creatures.",
    "a": "Cyclops",
    "points": 200,
    "type": "text",
    "accept": [
     "Cyclopes",
     "Polyphemus"
    ]
   },
   {
    "q": "This Greek god of the underworld ruled the realm of the dead and abducted Persephone.",
    "a": "Hades",
    "points": 400,
    "type": "text"
   },
   {
    "q": "In Norse myth, this trickster god fathered the wolf Fenrir and engineered the death of Baldr.",
    "a": "Loki",
    "points": 400,
    "type": "text"
   },
   {
    "q": "This Egyptian goddess, wife of Osiris and mother of Horus, was associated with magic and motherhood.",
    "a": "Isis",
    "points": 400,
    "type": "text"
   },
   {
    "q": "This Babylonian creation epic, named for its opening words 'When on high,' recounts Marduk's defeat of Tiamat.",
    "a": "The Enuma Elish",
    "points": 600,
    "type": "text",
    "accept": [
     "Enuma Elish"
    ]
   },
   {
    "q": "In Hindu mythology, this king of the gods wields a thunderbolt called the Vajra and rides the elephant Airavata.",
    "a": "Indra",
    "points": 600,
    "type": "text"
   },
   {
    "q": "This Greek hero retrieved the Golden Fleece aboard the ship Argo.",
    "a": "Jason",
    "points": 600,
    "type": "text"
   },
   {
    "q": "In Norse cosmology, this is the name of the great cosmic ash tree that connects the nine worlds.",
    "a": "Yggdrasil",
    "points": 800,
    "type": "text"
   },
   {
    "q": "This Aztec feathered-serpent deity was a god of wind, learning, and the morning star.",
    "a": "Quetzalcoatl",
    "points": 800,
    "type": "text"
   },
   {
    "q": "In Greek myth this Titan goddess of memory was, by Zeus, the mother of the nine Muses.",
    "a": "Mnemosyne",
    "points": 800,
    "type": "text"
   },
   {
    "q": "In Irish mythology, this skilled god of the Tuatha De Danann was called Lugh of the Long Arm.",
    "a": "Lugh",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "In Mesopotamian myth, this fierce demon-goddess of childbirth and infants was warded off with amulets, and Pazuzu was invoked against her.",
    "a": "Lamashtu",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "This Welsh collection of medieval prose tales, drawn from the Red Book of Hergest and others, includes the stories of Pwyll and Branwen.",
    "a": "The Mabinogion",
    "points": 1000,
    "type": "text",
    "accept": [
     "Mabinogion"
    ]
   },
   {
    "q": "This Greek goddess of the hunt and the moon was the twin sister of Apollo.",
    "a": "Artemis",
    "points": 200,
    "type": "text",
    "accept": [
     "Diana"
    ]
   },
   {
    "q": "In Greek myth, this hero of the Trojan War was vulnerable only at his heel.",
    "a": "Achilles",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This snake-haired Gorgon turned anyone who looked at her to stone.",
    "a": "Medusa",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This Roman king of the gods, ruler of sky and thunder, was the equivalent of the Greek Zeus.",
    "a": "Jupiter",
    "points": 200,
    "type": "text",
    "accept": [
     "Jove"
    ]
   },
   {
    "q": "This Greek goddess of agriculture and the harvest was the mother of Persephone.",
    "a": "Demeter",
    "points": 200,
    "type": "text",
    "accept": [
     "Ceres"
    ]
   },
   {
    "q": "This Greek god of wine, festivity, and theater was known to the Romans as Bacchus.",
    "a": "Dionysus",
    "points": 400,
    "type": "text",
    "accept": [
     "Bacchus"
    ]
   },
   {
    "q": "This Egyptian god of the dead and the afterlife was murdered and resurrected, ruling the underworld.",
    "a": "Osiris",
    "points": 400,
    "type": "text"
   },
   {
    "q": "This Greek smith of the gods, lame in one leg, forged weapons on his volcanic forge.",
    "a": "Hephaestus",
    "points": 400,
    "type": "text",
    "accept": [
     "Vulcan"
    ]
   },
   {
    "q": "This Norse goddess, wife of Odin, was associated with marriage, motherhood, and foresight.",
    "a": "Frigg",
    "points": 400,
    "type": "text",
    "accept": [
     "Frigga"
    ]
   },
   {
    "q": "In Greek myth, this clever king of Ithaca devised the Trojan Horse and took ten years to sail home.",
    "a": "Odysseus",
    "points": 400,
    "type": "text",
    "accept": [
     "Ulysses"
    ]
   },
   {
    "q": "This Norse god of light and joy, Odin's son, was killed by a sprig of mistletoe.",
    "a": "Baldr",
    "points": 600,
    "type": "text",
    "accept": [
     "Balder",
     "Baldur"
    ]
   },
   {
    "q": "This Greek primordial deity of love emerged at the dawn of creation, a name later given to the god of desire.",
    "a": "Eros",
    "points": 600,
    "type": "text",
    "accept": [
     "Cupid"
    ]
   },
   {
    "q": "This Egyptian goddess of truth and cosmic order weighed the hearts of the dead against her feather.",
    "a": "Maat",
    "points": 600,
    "type": "text",
    "accept": [
     "Ma'at"
    ]
   },
   {
    "q": "This Greek Titan stole fire from the gods to give to humanity and was punished by an eagle eating his liver.",
    "a": "Prometheus",
    "points": 600,
    "type": "text"
   },
   {
    "q": "In Hindu myth, this monkey god and devotee of Rama is celebrated for his strength and loyalty in the Ramayana.",
    "a": "Hanuman",
    "points": 600,
    "type": "text"
   },
   {
    "q": "In Greek myth, this maiden opened a forbidden jar that released all the world's evils.",
    "a": "Pandora",
    "points": 800,
    "type": "text"
   },
   {
    "q": "This Egyptian god of chaos, storms, and the desert murdered his brother Osiris.",
    "a": "Set",
    "points": 800,
    "type": "text",
    "accept": [
     "Seth"
    ]
   },
   {
    "q": "In Norse myth, these warrior maidens chose who died in battle and carried the slain to Valhalla.",
    "a": "The Valkyries",
    "points": 800,
    "type": "text",
    "accept": [
     "Valkyries",
     "Valkyrie"
    ]
   },
   {
    "q": "This Greek nymph, cursed to only repeat others' words, pined away for Narcissus until only her voice remained.",
    "a": "Echo",
    "points": 800,
    "type": "text"
   },
   {
    "q": "This Mesopotamian goddess of love and war descended into the underworld in a famous Sumerian myth.",
    "a": "Inanna",
    "points": 800,
    "type": "text",
    "accept": [
     "Ishtar"
    ]
   },
   {
    "q": "In Greek myth, this craftsman-king of Corinth was condemned to eternally roll a boulder uphill in the underworld.",
    "a": "Sisyphus",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "In Norse myth, this enormous wolf, son of Loki, is prophesied to devour Odin at Ragnarok.",
    "a": "Fenrir",
    "points": 1000,
    "type": "text",
    "accept": [
     "Fenris"
    ]
   },
   {
    "q": "This Hindu epic of 100,000 verses, attributed to the sage Vyasa, contains the Bhagavad Gita.",
    "a": "The Mahabharata",
    "points": 1000,
    "type": "text",
    "accept": [
     "Mahabharata"
    ]
   },
   {
    "q": "In Finnish mythology, this is the epic poem compiled by Elias Lonnrot featuring the sage Vainamoinen.",
    "a": "The Kalevala",
    "points": 1000,
    "type": "text",
    "accept": [
     "Kalevala"
    ]
   }
  ],
  "World Religions": [
   {
    "q": "Christians believe this event, celebrating Jesus's birth, occurs on December 25th in most Western traditions.",
    "a": "Christmas",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This Indian-origin religion founded by Mahavira's teachings emphasizes ahimsa, or non-violence, toward all living beings.",
    "a": "Jainism",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This holy book of Christianity is divided into the Old Testament and the New Testament.",
    "a": "The Bible",
    "points": 200,
    "type": "text",
    "accept": [
     "Bible"
    ]
   },
   {
    "q": "These five obligations, including faith, prayer, charity, fasting, and pilgrimage, are the core duties in Islam.",
    "a": "The Five Pillars of Islam",
    "points": 400,
    "type": "text",
    "accept": [
     "The Five Pillars"
    ]
   },
   {
    "q": "This Hindu deity, known as the Destroyer, is part of the Trimurti alongside Brahma and Vishnu.",
    "a": "Shiva",
    "points": 400,
    "type": "text"
   },
   {
    "q": "This building where Buddhists worship and house relics is often a dome-shaped or tiered structure called by this name.",
    "a": "Stupa",
    "points": 400,
    "type": "text",
    "accept": [
     "Temple",
     "Pagoda"
    ]
   },
   {
    "q": "This branch of Buddhism, dominant in Sri Lanka and Thailand, is named for the 'Teaching of the Elders.'",
    "a": "Theravada Buddhism",
    "points": 600,
    "type": "text",
    "accept": [
     "Theravada"
    ]
   },
   {
    "q": "This Sikh holy scripture, treated as the eternal living Guru, is the central religious text of Sikhism.",
    "a": "The Guru Granth Sahib",
    "points": 600,
    "type": "text",
    "accept": [
     "Guru Granth Sahib",
     "Adi Granth"
    ]
   },
   {
    "q": "This 16th-century movement begun by Martin Luther led to the split of Western Christianity and the rise of Protestantism.",
    "a": "The Protestant Reformation",
    "points": 600,
    "type": "text",
    "accept": [
     "The Reformation",
     "Protestant Reformation"
    ]
   },
   {
    "q": "This major ancient Persian religion, founded by Zoroaster, centers on the god Ahura Mazda and the conflict between good and evil.",
    "a": "Zoroastrianism",
    "points": 800,
    "type": "text"
   },
   {
    "q": "In Judaism, this Hebrew name for the first five books of the Bible means 'instruction' or 'teaching.'",
    "a": "The Torah",
    "points": 800,
    "type": "text",
    "accept": [
     "Torah",
     "Pentateuch"
    ]
   },
   {
    "q": "This Christian creed, formulated at a 325 CE church council, affirmed the divinity of Christ and is recited in many denominations.",
    "a": "The Nicene Creed",
    "points": 800,
    "type": "text",
    "accept": [
     "Nicene Creed",
     "Council of Nicaea"
    ]
   },
   {
    "q": "This monotheistic faith founded by Baha'u'llah in 19th-century Persia teaches the unity of all religions and humanity.",
    "a": "The Baha'i Faith",
    "points": 1000,
    "type": "text",
    "accept": [
     "Baha'i Faith",
     "Bahai"
    ]
   },
   {
    "q": "This branch of Jewish mysticism, whose central text is the Zohar, explores the nature of God through concepts like the Sefirot.",
    "a": "Kabbalah",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "This collected body of Theravada Buddhist scripture, written in an ancient Indian language, is named the 'Three Baskets.'",
    "a": "The Pali Canon (Tipitaka)",
    "points": 1000,
    "type": "text",
    "accept": [
     "Tipitaka",
     "Pali Canon",
     "Tripitaka"
    ]
   },
   {
    "q": "Followers of this religion worship a single God and trace their faith to the prophet Abraham, with the Torah as a core text.",
    "a": "Judaism",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This is the most widely practiced religion in the world by number of adherents.",
    "a": "Christianity",
    "points": 200,
    "type": "text"
   },
   {
    "q": "A follower of Islam is known by this name.",
    "a": "Muslim",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This Indian-origin religion, the world's third largest, includes deities such as Vishnu and Brahma.",
    "a": "Hinduism",
    "points": 200,
    "type": "text"
   },
   {
    "q": "This Saudi Arabian city is the holiest site in Islam and the destination of the annual pilgrimage.",
    "a": "Mecca",
    "points": 200,
    "type": "text",
    "accept": [
     "Makkah"
    ]
   },
   {
    "q": "This leader of the Roman Catholic Church resides in Vatican City and is considered the successor of Saint Peter.",
    "a": "The Pope",
    "points": 400,
    "type": "text",
    "accept": [
     "Pope"
    ]
   },
   {
    "q": "This Hindu and Buddhist sacred syllable is chanted in meditation and considered the primordial sound of the universe.",
    "a": "Om",
    "points": 400,
    "type": "text",
    "accept": [
     "Aum"
    ]
   },
   {
    "q": "This title, meaning 'enlightened one,' is given to one who has attained awakening in Buddhism.",
    "a": "Buddha",
    "points": 400,
    "type": "text"
   },
   {
    "q": "These first followers of Jesus, twelve in number, are called by this name in Christianity.",
    "a": "The Apostles",
    "points": 400,
    "type": "text",
    "accept": [
     "Apostles",
     "The Twelve Disciples",
     "Disciples"
    ]
   },
   {
    "q": "This direction toward Mecca, faced by Muslims during their daily prayers, is called by this Arabic term.",
    "a": "Qibla",
    "points": 400,
    "type": "text"
   },
   {
    "q": "This term describes the ultimate goal in Buddhism: the extinguishing of suffering and release from rebirth.",
    "a": "Nirvana",
    "points": 600,
    "type": "text"
   },
   {
    "q": "These four statements about suffering and its cessation form the foundation of the Buddha's teaching.",
    "a": "The Four Noble Truths",
    "points": 600,
    "type": "text",
    "accept": [
     "Four Noble Truths"
    ]
   },
   {
    "q": "This Hindu deity, the preserver of the universe in the Trimurti, descends to Earth in avatars such as Rama and Krishna.",
    "a": "Vishnu",
    "points": 600,
    "type": "text"
   },
   {
    "q": "This major branch of Islam, comprising the majority of Muslims worldwide, takes its name from following the practice of the Prophet.",
    "a": "Sunni Islam",
    "points": 600,
    "type": "text",
    "accept": [
     "Sunni"
    ]
   },
   {
    "q": "This collective name refers to the three monotheistic faiths that trace their origin to the patriarch Abraham.",
    "a": "The Abrahamic religions",
    "points": 600,
    "type": "text",
    "accept": [
     "Abrahamic religions",
     "Abrahamic faiths"
    ]
   },
   {
    "q": "This second-largest branch of Islam holds that leadership should descend through the Prophet's son-in-law Ali.",
    "a": "Shia Islam",
    "points": 800,
    "type": "text",
    "accept": [
     "Shia",
     "Shiite"
    ]
   },
   {
    "q": "This eightfold path of right conduct, intention, and concentration is the Buddhist route to ending suffering.",
    "a": "The Noble Eightfold Path",
    "points": 800,
    "type": "text",
    "accept": [
     "Noble Eightfold Path",
     "Eightfold Path"
    ]
   },
   {
    "q": "This Hindu sacred text, set on a battlefield, records a dialogue between the warrior Arjuna and the god Krishna.",
    "a": "The Bhagavad Gita",
    "points": 800,
    "type": "text",
    "accept": [
     "Bhagavad Gita"
    ]
   },
   {
    "q": "This Christian sacrament uses water to initiate a person into the faith.",
    "a": "Baptism",
    "points": 800,
    "type": "text"
   },
   {
    "q": "This Islamic body of recorded sayings and actions of the Prophet Muhammad supplements the Quran as a source of guidance.",
    "a": "Hadith",
    "points": 800,
    "type": "text",
    "accept": [
     "The Hadith"
    ]
   },
   {
    "q": "This 1054 split divided Christianity into the Roman Catholic and Eastern Orthodox churches.",
    "a": "The Great Schism",
    "points": 1000,
    "type": "text",
    "accept": [
     "Great Schism",
     "East-West Schism"
    ]
   },
   {
    "q": "This mystical tradition within Islam emphasizes inward devotion and includes the whirling dervishes.",
    "a": "Sufism",
    "points": 1000,
    "type": "text",
    "accept": [
     "Sufi",
     "Tasawwuf"
    ]
   },
   {
    "q": "This monotheistic Afro-Caribbean religion arising in 20th-century Jamaica regards Haile Selassie as a messianic figure.",
    "a": "Rastafari",
    "points": 1000,
    "type": "text",
    "accept": [
     "Rastafarianism",
     "Rastafarian"
    ]
   },
   {
    "q": "This ethical religion based on the teachings of Confucius emphasizes filial piety and social harmony in East Asia.",
    "a": "Confucianism",
    "points": 1000,
    "type": "text"
   }
  ],
  "General Knowledge": [
   {
    "q": "How many colors are there in a rainbow as traditionally counted?",
    "a": "Seven",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What is the capital city of Spain?",
    "a": "Madrid",
    "points": 200,
    "type": "text"
   },
   {
    "q": "How many days are there in a leap year?",
    "a": "366",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What is the largest planet in our solar system?",
    "a": "Jupiter",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What is the primary gas that makes up most of Earth's atmosphere?",
    "a": "Nitrogen",
    "points": 200,
    "type": "text"
   },
   {
    "q": "How many players are on a standard basketball team on the court at once?",
    "a": "Five",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which planet is closest to the Sun?",
    "a": "Mercury",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What is the largest organ of the human body?",
    "a": "The skin",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Who is credited with writing the epic poems the Iliad and the Odyssey?",
    "a": "Homer",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What unit measures the loudness of sound?",
    "a": "The decibel",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which playwright created the tragic young lovers from the city of Verona?",
    "a": "William Shakespeare",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What is the most widely spoken language in the world by total number of speakers?",
    "a": "English",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What is the largest gland in the human body, which also processes toxins from the blood?",
    "a": "Liver",
    "points": 600,
    "type": "text",
    "accept": [
     "The liver"
    ]
   },
   {
    "q": "How many faces does a standard cube have?",
    "a": "Six",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What two-word Latin term describes a list of people declared enemies of the Roman state, marked for death?",
    "a": "Proscription",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which gas, with chemical formula CO2, do humans exhale as a waste product?",
    "a": "Carbon dioxide",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What is the term for an animal that eats both plants and meat?",
    "a": "Omnivore",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which mathematician of ancient Syracuse reportedly shouted 'Eureka' after discovering buoyancy?",
    "a": "Archimedes",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What is the SI base unit of luminous intensity?",
    "a": "The candela",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What term describes a figure of speech comparing two unlike things using 'like' or 'as'?",
    "a": "Simile",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What is the only letter that does not appear in the name of any U.S. state?",
    "a": "Q",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which 18th-century philosopher wrote the work that critiques pure reason and grounded modern epistemology?",
    "a": "Immanuel Kant",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What is the medical term for the kneecap?",
    "a": "The patella",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What is the rarest naturally occurring element found in the Earth's crust, sometimes estimated at less than a gram present at any time?",
    "a": "Astatine",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What color is made by mixing red and blue paint?",
    "a": "Purple",
    "points": 200,
    "type": "text",
    "accept": [
     "Violet"
    ]
   },
   {
    "q": "What is the world's largest ocean?",
    "a": "The Pacific Ocean",
    "points": 400,
    "type": "text",
    "accept": [
     "Pacific"
    ]
   },
   {
    "q": "Which Scottish economist wrote The Wealth of Nations?",
    "a": "Adam Smith",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which ancient Egyptian city was home to a legendary library and lighthouse?",
    "a": "Alexandria",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What Greek-derived word means a word or phrase that reads the same backward and forward?",
    "a": "Palindrome",
    "points": 1000,
    "type": "text"
   }
  ],
  "Geography": [
   {
    "q": "What is the capital of Japan?",
    "a": "Tokyo",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which is the largest desert on Earth, if cold deserts are included?",
    "a": "Antarctica",
    "points": 200,
    "type": "text",
    "accept": [
     "Antarctic Desert"
    ]
   },
   {
    "q": "What is the longest river in South America?",
    "a": "Amazon",
    "points": 200,
    "type": "text",
    "accept": [
     "Amazon River"
    ]
   },
   {
    "q": "Which U.S. city is known as the Big Apple?",
    "a": "New York City",
    "points": 200,
    "type": "text",
    "accept": [
     "New York"
    ]
   },
   {
    "q": "On which continent would you find the Amazon rainforest?",
    "a": "South America",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What is the capital of Germany?",
    "a": "Berlin",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which country is home to the ancient city of Petra?",
    "a": "Jordan",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What is the largest island in the world, not counting continents?",
    "a": "Greenland",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which mountain range stretches across the Indian subcontinent and contains the world's highest peaks?",
    "a": "The Himalayas",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which sea, bordered by Egypt and Saudi Arabia, separates Africa from the Arabian Peninsula?",
    "a": "Red Sea",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What is the capital of Brazil, a purpose-built city inaugurated in 1960?",
    "a": "Brasilia",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which African nation, sharing a name with a major river, has Kinshasa as its capital?",
    "a": "Democratic Republic of the Congo",
    "points": 600,
    "type": "text",
    "accept": [
     "DR Congo",
     "DRC"
    ]
   },
   {
    "q": "Which strait separates the European and Asian parts of the Turkish city of Istanbul?",
    "a": "The Bosphorus",
    "points": 600,
    "type": "text",
    "accept": [
     "Bosporus"
    ]
   },
   {
    "q": "What is the highest waterfall in the world, located in Venezuela?",
    "a": "Angel Falls",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which two countries are the only ones to border the United States?",
    "a": "Canada and Mexico",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What is the only sea on Earth without any coastline, bounded instead by ocean currents?",
    "a": "The Sargasso Sea",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which peninsula in northern Europe contains Norway and Sweden?",
    "a": "The Scandinavian Peninsula",
    "points": 800,
    "type": "text",
    "accept": [
     "Scandinavia"
    ]
   },
   {
    "q": "What is the capital of Canada's neighbor to the southeast island nation Cuba?",
    "a": "Havana",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which country, the only one named after a chemical element, lies between Brazil and Uruguay's region on the Atlantic? Name the nation whose name means 'silver'.",
    "a": "Argentina",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which African country, formerly Abyssinia, uses its own calendar and is the source of the Blue Nile?",
    "a": "Ethiopia",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What is the deepest lake in the world by maximum depth, located in Siberia?",
    "a": "Lake Baikal",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which country has the most islands in the world, estimated at over 200,000?",
    "a": "Sweden",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What is the name of the geographic point in the Pacific Ocean farthest from any land, named after a fictional sunken city?",
    "a": "Point Nemo",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which landlocked microstate in the Pyrenees is jointly governed by the French president and a Spanish bishop?",
    "a": "Andorra",
    "points": 1000,
    "type": "text"
   }
  ],
  "History": [
   {
    "q": "Which ancient wonder still standing was built as a tomb for the pharaoh Khufu?",
    "a": "Great Pyramid of Giza",
    "points": 200,
    "type": "text",
    "accept": [
     "The Great Pyramid"
    ]
   },
   {
    "q": "What document, adopted in 1776, declared the American colonies free from Britain?",
    "a": "The Declaration of Independence",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which Italian explorer's name was given to the continents of the Americas?",
    "a": "Amerigo Vespucci",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What ancient empire built a vast network of roads centered on its capital city, giving rise to the saying that all roads lead there?",
    "a": "Roman Empire",
    "points": 200,
    "type": "text",
    "accept": [
     "Rome",
     "The Romans"
    ]
   },
   {
    "q": "Who was the famous nurse known as 'The Lady with the Lamp' during the Crimean War?",
    "a": "Florence Nightingale",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which war between the North and South of the United States took place from 1861 to 1865?",
    "a": "The American Civil War",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Who was the Egyptian pharaoh whose intact tomb was discovered by Howard Carter in 1922?",
    "a": "Tutankhamun",
    "points": 400,
    "type": "text",
    "accept": [
     "King Tut"
    ]
   },
   {
    "q": "Which 1969 event saw Neil Armstrong become the first human to walk on the Moon?",
    "a": "The Apollo 11 Moon landing",
    "points": 400,
    "type": "text",
    "accept": [
     "Apollo 11"
    ]
   },
   {
    "q": "What invention by Johannes Gutenberg around 1440 revolutionized the spread of information in Europe?",
    "a": "The printing press",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which French peasant girl led armies during the Hundred Years' War and was burned at the stake in 1431?",
    "a": "Joan of Arc",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What name is given to the period of European exploration by sea from the 15th to 17th centuries?",
    "a": "The Age of Discovery",
    "points": 600,
    "type": "text",
    "accept": [
     "The Age of Exploration"
    ]
   },
   {
    "q": "Which dynasty built the majority of the Great Wall of China that survives today?",
    "a": "The Ming dynasty",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What 1773 protest saw American colonists dump British tea into a harbor?",
    "a": "The Boston Tea Party",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which Greek city-state was renowned for its disciplined warrior society in antiquity?",
    "a": "Sparta",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Who was the first female Prime Minister of the United Kingdom, elected in 1979?",
    "a": "Margaret Thatcher",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What was the name of the failed 1605 plot to blow up the English Parliament, led by Guy Fawkes?",
    "a": "The Gunpowder Plot",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which treaty of 1648 is often regarded as establishing the modern concept of state sovereignty?",
    "a": "Peace of Westphalia",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Who was the Mali emperor whose 14th-century pilgrimage to Mecca was so lavish it disrupted gold prices?",
    "a": "Mansa Musa",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which 1916 battle on the Western Front was one of the bloodiest in human history, with over a million casualties?",
    "a": "The Battle of the Somme",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What was the name of the assembly of Athenian citizens that was the principal body of their democracy?",
    "a": "The Ecclesia",
    "points": 800,
    "type": "text",
    "accept": [
     "Ekklesia"
    ]
   },
   {
    "q": "Which Babylonian king is famous for one of the earliest written legal codes, inscribed on a stone stele around 1750 BC?",
    "a": "Hammurabi",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What 1494 agreement, sanctioned by the Pope, drew a line dividing newly discovered lands between Spain and Portugal?",
    "a": "Treaty of Tordesillas",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which Byzantine empress, a former actress, was the powerful co-ruler and wife of Emperor Justinian I?",
    "a": "Theodora",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What was the name of the secret World War II Allied program to develop the atomic bomb?",
    "a": "The Manhattan Project",
    "points": 1000,
    "type": "text"
   }
  ],
  "Science": [
   {
    "q": "What is the chemical symbol for the element iron?",
    "a": "Fe",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What organ is responsible for thinking and controlling the body?",
    "a": "The brain",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What is the boiling point of water at sea level in degrees Celsius?",
    "a": "100 degrees",
    "points": 200,
    "type": "text",
    "accept": [
     "100"
    ]
   },
   {
    "q": "What is the green pigment in plants that captures sunlight?",
    "a": "Chlorophyll",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What planet is known for its spectacular ring system?",
    "a": "Saturn",
    "points": 200,
    "type": "text"
   },
   {
    "q": "How many planets are there in our solar system?",
    "a": "Eight",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What is the smallest unit of matter that retains the properties of an element?",
    "a": "The atom",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What type of animal is a frog, which lives both in water and on land?",
    "a": "An amphibian",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What gas, with the symbol O3, forms a protective layer in the stratosphere?",
    "a": "Ozone",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What force resists motion between two surfaces rubbing together?",
    "a": "Friction",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What is the name for the change of a liquid into a gas?",
    "a": "Evaporation",
    "points": 600,
    "type": "text",
    "accept": [
     "Vaporization"
    ]
   },
   {
    "q": "What is the name of the bond formed when one atom transfers electrons to another, creating ions?",
    "a": "Ionic bond",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What scientist proposed the theory of evolution by natural selection?",
    "a": "Charles Darwin",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What is the most abundant element by mass in the human body?",
    "a": "Oxygen",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What is the SI unit of electric current?",
    "a": "The ampere",
    "points": 600,
    "type": "text",
    "accept": [
     "The amp"
    ]
   },
   {
    "q": "What is the name of the process by which a cell divides to produce two identical daughter cells?",
    "a": "Mitosis",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What is the term for the minimum energy required to start a chemical reaction?",
    "a": "Activation energy",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which blood vessels carry blood away from the heart?",
    "a": "Arteries",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What is the SI unit of frequency, equal to one cycle per second?",
    "a": "The hertz",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What is the name for the phenomenon where light bends as it passes from one medium into another?",
    "a": "Refraction",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What is the term for an atom of an element with a different number of neutrons than usual?",
    "a": "An isotope",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What principle by a French scientist states that a system at equilibrium shifts to counteract an imposed change?",
    "a": "Le Chatelier's principle",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What is the name of the enzyme that adds DNA nucleotides during replication?",
    "a": "DNA polymerase",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What quantum number describes the intrinsic angular momentum of a particle, with the electron having a value of one-half?",
    "a": "Spin",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What molecule has the chemical formula H2O?",
    "a": "Water",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which planet has a giant storm known as the Great Red Spot?",
    "a": "Jupiter",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What scale is used to measure how acidic or basic a solution is?",
    "a": "The pH scale",
    "points": 600,
    "type": "text",
    "accept": [
     "pH"
    ]
   },
   {
    "q": "Which astronomer formulated the three laws of planetary motion?",
    "a": "Johannes Kepler",
    "points": 800,
    "type": "text",
    "accept": [
     "Kepler"
    ]
   },
   {
    "q": "Which two scientists shared the 2020 Nobel Prize in Chemistry for developing CRISPR-Cas9 genome editing?",
    "a": "Emmanuelle Charpentier and Jennifer Doudna",
    "points": 1000,
    "type": "text",
    "accept": [
     "Charpentier and Doudna",
     "Jennifer Doudna and Emmanuelle Charpentier",
     "Doudna and Charpentier"
    ]
   }
  ],
  "Sports": [
   {
    "q": "In ten-pin bowling, what term describes knocking down all ten pins with the first ball of a frame?",
    "a": "A strike",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What piece of sports equipment is used to hit a puck in ice hockey?",
    "a": "A hockey stick",
    "points": 200,
    "type": "text"
   },
   {
    "q": "In American football, how many points is a field goal worth?",
    "a": "Three",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What is the name of the tennis Grand Slam held in New York and played last in the season?",
    "a": "The US Open",
    "points": 200,
    "type": "text"
   },
   {
    "q": "How many holes make up a standard full round of golf?",
    "a": "Eighteen",
    "points": 200,
    "type": "text"
   },
   {
    "q": "In tennis, what is the term for a score of zero?",
    "a": "Love",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which NBA franchise is tied with the Los Angeles Lakers for the most championships in league history?",
    "a": "The Boston Celtics",
    "points": 400,
    "type": "text",
    "accept": [
     "Boston Celtics"
    ]
   },
   {
    "q": "Which annual cycling race is the most prestigious in the world and finishes on the Champs-Elysees?",
    "a": "The Tour de France",
    "points": 400,
    "type": "text"
   },
   {
    "q": "How many players make up one baseball team out on the field at one time?",
    "a": "Nine",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which boxing legend, who first won the heavyweight title at 22 and was nicknamed 'The Greatest', lit the cauldron at the Atlanta Games?",
    "a": "Muhammad Ali",
    "points": 400,
    "type": "text"
   },
   {
    "q": "In golf, what term describes completing a hole two strokes under par?",
    "a": "An eagle",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What was the year of the very first Wimbledon tennis championship?",
    "a": "1877",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which gymnast became the first to be awarded a perfect 10 in Olympic competition, at the 1976 Montreal Games?",
    "a": "Nadia Comaneci",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which national rugby union team performs the haka before matches and won the inaugural 1987 World Cup?",
    "a": "New Zealand",
    "points": 600,
    "type": "text",
    "accept": [
     "The All Blacks"
    ]
   },
   {
    "q": "Which swimmer amassed 23 Olympic gold medals, the most of any athlete in history?",
    "a": "Michael Phelps",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What is the maximum possible break achievable in a single frame of standard snooker?",
    "a": "147",
    "points": 800,
    "type": "text"
   },
   {
    "q": "In cricket, which team won the very first World Cup, held in England in 1975?",
    "a": "West Indies",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which Australian tennis player won the calendar-year Grand Slam in men's singles in both 1962 and 1969?",
    "a": "Rod Laver",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which German driver won five consecutive Formula 1 titles with Ferrari from 2000 to 2004?",
    "a": "Michael Schumacher",
    "points": 800,
    "type": "text"
   },
   {
    "q": "In baseball, what is the term for a pitcher allowing no hits to the opposing team over an entire game?",
    "a": "A no-hitter",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Who drove a works Alfa Romeo to win the very first Formula 1 World Drivers' Championship in 1950?",
    "a": "Giuseppe Farina",
    "points": 1000,
    "type": "text",
    "accept": [
     "Nino Farina"
    ]
   },
   {
    "q": "In what year did Roger Bannister become the first person to run a mile in under four minutes?",
    "a": "1954",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What is the maximum number of clubs a golfer is permitted to carry in their bag during a round under the rules?",
    "a": "Fourteen",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "In archery, what is the maximum score a single arrow can earn by hitting the innermost ring of a standard target?",
    "a": "Ten",
    "points": 1000,
    "type": "text"
   }
  ],
  "Space & Astronomy": [
   {
    "q": "What name is given to a chunk of space rock that survives its fall and lands on Earth's surface?",
    "a": "A meteorite",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What are the bright bands of colored light seen in the sky near Earth's poles called?",
    "a": "The aurora",
    "points": 200,
    "type": "text",
    "accept": [
     "Northern lights",
     "Aurora borealis"
    ]
   },
   {
    "q": "Which planet is closest to the Sun?",
    "a": "Mercury",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What name is given to a frozen ball of ice and dust that grows a glowing tail as it nears the Sun?",
    "a": "A comet",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which reddish fourth planet from the Sun is a frequent target for robotic rovers?",
    "a": "Mars",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What is the name of the imaginary line, tilted about 23.5 degrees, around which the Earth rotates daily?",
    "a": "Earth's axis",
    "points": 400,
    "type": "text",
    "accept": [
     "The axis"
    ]
   },
   {
    "q": "What term describes one celestial body passing into the shadow of another, as when the Moon blocks the Sun?",
    "a": "An eclipse",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which spacecraft mission first carried humans to land on the Moon in 1969?",
    "a": "Apollo 11",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What is the name for a group of stars forming a recognizable pattern in the sky, such as Orion?",
    "a": "A constellation",
    "points": 400,
    "type": "text",
    "accept": [
     "Constellation"
    ]
   },
   {
    "q": "Which American astronaut became the first person to walk on the Moon?",
    "a": "Neil Armstrong",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What is the name of the largest moon orbiting Jupiter, also the biggest moon in the solar system?",
    "a": "Ganymede",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which dwarf planet, the largest object in the asteroid belt, was visited by NASA's Dawn spacecraft?",
    "a": "Ceres",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which star system is the nearest to the Sun, lying just over four light-years away?",
    "a": "Alpha Centauri",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What is the term for a rocky object that orbits the Sun, most found in a belt between Mars and Jupiter?",
    "a": "An asteroid",
    "points": 600,
    "type": "text",
    "accept": [
     "Asteroid"
    ]
   },
   {
    "q": "What is the name of NASA's powerful infrared observatory, launched in 2021 as a successor to Hubble?",
    "a": "The James Webb Space Telescope",
    "points": 600,
    "type": "text",
    "accept": [
     "James Webb Space Telescope",
     "JWST"
    ]
   },
   {
    "q": "Which Jupiter moon, covered in cracked ice, is considered a prime candidate for a subsurface ocean?",
    "a": "Europa",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which spacecraft, launched in 1977, is the most distant human-made object and has crossed into interstellar space?",
    "a": "Voyager 1",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What is the name of the closest known galaxy on a collision course with the Milky Way?",
    "a": "The Andromeda Galaxy",
    "points": 800,
    "type": "text",
    "accept": [
     "Andromeda"
    ]
   },
   {
    "q": "What is the name of the radio source pulsar... what type of rapidly spinning, highly magnetized neutron star emits regular pulses of radiation?",
    "a": "A pulsar",
    "points": 800,
    "type": "text",
    "accept": [
     "Pulsar"
    ]
   },
   {
    "q": "What hypothetical force, making up most of the universe's energy, is thought to drive its accelerating expansion?",
    "a": "Dark energy",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which 16th-century Danish astronomer made extraordinarily precise naked-eye observations later used by Kepler?",
    "a": "Tycho Brahe",
    "points": 1000,
    "type": "text",
    "accept": [
     "Brahe"
    ]
   },
   {
    "q": "What is the name of the supermassive black hole at the center of the Milky Way?",
    "a": "Sagittarius A*",
    "points": 1000,
    "type": "text",
    "accept": [
     "Sagittarius A star",
     "Sgr A*"
    ]
   },
   {
    "q": "Which Polish astronomer proposed the heliocentric model placing the Sun, not the Earth, at the center?",
    "a": "Nicolaus Copernicus",
    "points": 1000,
    "type": "text",
    "accept": [
     "Copernicus"
    ]
   },
   {
    "q": "What is the term for the upper limit of about 1.4 solar masses beyond which a white dwarf cannot remain stable?",
    "a": "The Chandrasekhar limit",
    "points": 1000,
    "type": "text",
    "accept": [
     "Chandrasekhar limit"
    ]
   }
  ],
  "Animals & Nature": [
   {
    "q": "Which spotted big cat is the fastest land animal over short distances?",
    "a": "The cheetah",
    "points": 200,
    "type": "text",
    "accept": [
     "Cheetah"
    ]
   },
   {
    "q": "What gas do plants take in from the air and use during photosynthesis?",
    "a": "Carbon dioxide",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which striped big cat is the largest of all the cat species?",
    "a": "The tiger",
    "points": 200,
    "type": "text",
    "accept": [
     "Tiger"
    ]
   },
   {
    "q": "What insect produces honey and lives in a colony ruled by a queen?",
    "a": "The honeybee",
    "points": 200,
    "type": "text",
    "accept": [
     "Honeybee",
     "Bee"
    ]
   },
   {
    "q": "Which gray, big-eared mammal is the largest living land animal?",
    "a": "The elephant",
    "points": 200,
    "type": "text",
    "accept": [
     "Elephant"
    ]
   },
   {
    "q": "What is the collective noun for a group of crows?",
    "a": "A murder",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which long-tongued mammal, found in Asia and Africa, is the tallest creature on land?",
    "a": "The giraffe",
    "points": 400,
    "type": "text",
    "accept": [
     "Giraffe"
    ]
   },
   {
    "q": "What is the largest of all penguin species, which breeds during the Antarctic winter?",
    "a": "The emperor penguin",
    "points": 400,
    "type": "text",
    "accept": [
     "Emperor penguin"
    ]
   },
   {
    "q": "What is the world's largest land carnivore, a white bear of the Arctic?",
    "a": "The polar bear",
    "points": 400,
    "type": "text",
    "accept": [
     "Polar bear"
    ]
   },
   {
    "q": "What single-celled organism causes malaria and is spread by mosquitoes?",
    "a": "Plasmodium",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What is the largest living species of lizard, native to a few Indonesian islands?",
    "a": "The Komodo dragon",
    "points": 600,
    "type": "text",
    "accept": [
     "Komodo dragon"
    ]
   },
   {
    "q": "What is the longest venomous snake in the world, capable of rearing up and 'standing'?",
    "a": "The king cobra",
    "points": 600,
    "type": "text",
    "accept": [
     "King cobra"
    ]
   },
   {
    "q": "What is the name for the slow, drifting community of tiny organisms that form the base of ocean food webs?",
    "a": "Plankton",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which large flightless bird, native to Africa, is the fastest-running bird and lays the largest eggs of any living bird?",
    "a": "The ostrich",
    "points": 600,
    "type": "text",
    "accept": [
     "Ostrich"
    ]
   },
   {
    "q": "What term describes a species found naturally in only one specific geographic region and nowhere else?",
    "a": "Endemic",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What is the term for the dormant, sleep-like state animals such as bears enter to survive the winter?",
    "a": "Hibernation",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What is the scientific study of insects called?",
    "a": "Entomology",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What is the world's largest amphibian, an aquatic species native to China?",
    "a": "The Chinese giant salamander",
    "points": 800,
    "type": "text",
    "accept": [
     "Chinese giant salamander"
    ]
   },
   {
    "q": "What sea creature, despite its name, is a colony of organisms and builds vast reefs from calcium carbonate?",
    "a": "Coral",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which slow-moving nocturnal Asian primate is the only primate with a venomous bite?",
    "a": "The slow loris",
    "points": 800,
    "type": "text",
    "accept": [
     "Slow loris"
    ]
   },
   {
    "q": "What is the largest invertebrate on Earth, a deep-sea animal with the biggest eyes of any creature?",
    "a": "The colossal squid",
    "points": 1000,
    "type": "text",
    "accept": [
     "Colossal squid"
    ]
   },
   {
    "q": "What is the term for the largest microscopic group... what is the term for organisms, like tardigrades, able to survive extreme conditions such as the vacuum of space?",
    "a": "Extremophiles",
    "points": 1000,
    "type": "text",
    "accept": [
     "Extremophile"
    ]
   },
   {
    "q": "What is the only venomous mammal among monotremes, the male of which has spurs on its hind legs that deliver venom?",
    "a": "The platypus",
    "points": 1000,
    "type": "text",
    "accept": [
     "Platypus"
    ]
   },
   {
    "q": "What is the term for the process by which certain animals, such as the axolotl, regrow lost body parts like limbs?",
    "a": "Regeneration",
    "points": 1000,
    "type": "text"
   }
  ],
  "Movies & TV": [
   {
    "q": "In Toy Story, what is the name of the space ranger action figure voiced by Tim Allen?",
    "a": "Buzz Lightyear",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which 1993 film features dinosaurs cloned on an island theme park?",
    "a": "Jurassic Park",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What ogre, voiced by Mike Myers, lives in a swamp and befriends a talking Donkey?",
    "a": "Shrek",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which animated film tells the story of a young lion cub who must reclaim his kingdom from his uncle Scar?",
    "a": "The Lion King",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which actor played the wizard Gandalf in The Lord of the Rings films?",
    "a": "Ian McKellen",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which 1985 film sends teenager Marty McFly back in time in a DeLorean?",
    "a": "Back to the Future",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Who directed the 1994 crime film Pulp Fiction?",
    "a": "Quentin Tarantino",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which animated franchise features yellow, pill-shaped creatures who serve villains?",
    "a": "Despicable Me",
    "points": 400,
    "type": "text",
    "accept": [
     "Minions"
    ]
   },
   {
    "q": "In which crime drama, set in Albuquerque, does a teacher named Walter White cook methamphetamine?",
    "a": "Breaking Bad",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which actress played Hermione Granger in the Harry Potter films?",
    "a": "Emma Watson",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which 1980 sequel reveals that Darth Vader is Luke Skywalker's father?",
    "a": "The Empire Strikes Back",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which director helmed the 1976 film Taxi Driver and 1990's Goodfellas?",
    "a": "Martin Scorsese",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What is the name of the diner-owning android played by Arnold Schwarzenegger in a 1984 sci-fi film about a killer cyborg?",
    "a": "The Terminator",
    "points": 600,
    "type": "text"
   },
   {
    "q": "In the sitcom Seinfeld, what is the last name of Jerry's bald, scheming neighbor George?",
    "a": "Costanza",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which 1942 romance set in Morocco features the line 'Here's looking at you, kid'?",
    "a": "Casablanca",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which director made the 1985 Japanese epic Ran, a reworking of King Lear?",
    "a": "Akira Kurosawa",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which 1957 Ingmar Bergman film features a knight playing chess with Death?",
    "a": "The Seventh Seal",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which actress won back-to-back Best Actress Oscars in 1968 and 1969, the second for The Lion in Winter?",
    "a": "Katharine Hepburn",
    "points": 800,
    "type": "text"
   },
   {
    "q": "In the TV series The Wire, what is the first name of the cunning stick-up man who robs drug dealers, surnamed Little?",
    "a": "Omar",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which 1948 John Huston film about gold prospectors stars Humphrey Bogart as Fred C. Dobbs?",
    "a": "The Treasure of the Sierra Madre",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which 1928 surrealist short film by Luis Bunuel and Salvador Dali opens with an eye being sliced?",
    "a": "Un Chien Andalou",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which Italian director made the 1960 film La Dolce Vita and the 1963 film 8 1/2?",
    "a": "Federico Fellini",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which Soviet director made the 1925 montage classic Battleship Potemkin?",
    "a": "Sergei Eisenstein",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which 1975 Chantal Akerman film, over three hours long, follows a Belgian housewife's domestic routine in real time?",
    "a": "Jeanne Dielman",
    "points": 1000,
    "type": "text"
   }
  ],
  "Music & Songs": [
   {
    "q": "Which Jamaican reggae singer fronted the Wailers and recorded No Woman No Cry?",
    "a": "Bob Marley",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What brass instrument did Louis Armstrong famously play?",
    "a": "Trumpet",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which Liverpool quartet's final recording sessions produced the 1969 album that ends with a side-long medley and the cover photo of a zebra crossing?",
    "a": "The Beatles",
    "points": 200,
    "type": "text"
   },
   {
    "q": "How many lines are in a standard musical staff?",
    "a": "Five",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which American singer is widely called the King of Rock and Roll?",
    "a": "Elvis Presley",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which band, formed in London in 1970 around a flamboyant frontman, recorded a six-minute mock-opera single in 1975 that topped the UK charts twice?",
    "a": "Queen",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which composer wrote the piano piece commonly known as Fur Elise?",
    "a": "Ludwig van Beethoven",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What woodwind instrument was invented by Adolphe Sax in the 1840s?",
    "a": "The saxophone",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which American rock band, led by Bruce Springsteen, is backed by the E Street Band?",
    "a": "Bruce Springsteen",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What three-note chord, the most common in Western harmony, is built from a root, third, and fifth?",
    "a": "Triad",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which English band released the 1965 song Satisfaction and is fronted by Mick Jagger?",
    "a": "The Rolling Stones",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which singer-songwriter, born Robert Zimmerman, won the 2016 Nobel Prize in Literature?",
    "a": "Bob Dylan",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What Italian term on sheet music directs the performer to gradually speed up?",
    "a": "Accelerando",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which trumpeter and bandleader assembled a sextet in 1959 to record a modal jazz album whose tracks include So What and Blue in Green?",
    "a": "Miles Davis",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which Hungarian composer wrote the Hungarian Rhapsodies and pioneered the symphonic poem?",
    "a": "Franz Liszt",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which jazz saxophonist, nicknamed Bird, was a founder of bebop?",
    "a": "Charlie Parker",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What is the term for two or more independent melodic lines played simultaneously, mastered by Bach?",
    "a": "Counterpoint",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which French composer wrote the orchestral work Bolero in 1928?",
    "a": "Maurice Ravel",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which interval, spanning three whole tones, was historically nicknamed 'the devil in music'?",
    "a": "The tritone",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which English composer wrote the Enigma Variations and Pomp and Circumstance marches?",
    "a": "Edward Elgar",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which Hungarian composer collected folk music with Zoltan Kodaly and wrote the Concerto for Orchestra?",
    "a": "Bela Bartok",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What term describes music with no tonal center, associated with Arnold Schoenberg's early works?",
    "a": "Atonality",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which avant-garde American composer wrote the silent 1952 piece 4'33\"?",
    "a": "John Cage",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which Estonian composer developed a minimalist style called tintinnabuli, heard in Spiegel im Spiegel?",
    "a": "Arvo Part",
    "points": 1000,
    "type": "text"
   }
  ],
  "TV Shows": [
   {
    "q": "Which animated sitcom follows the Simpson family in the town of Springfield?",
    "a": "The Simpsons",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which competition show has judges sitting in spinning chairs who turn around to recruit singers?",
    "a": "The Voice",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which medical comedy-drama is set at Sacred Heart Hospital and narrated by Dr. John Dorian?",
    "a": "Scrubs",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which sitcom features Will Smith moving from Philadelphia to live with wealthy relatives in California?",
    "a": "The Fresh Prince of Bel-Air",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which Netflix series follows a Spanish gang of robbers wearing red jumpsuits and Dali masks?",
    "a": "Money Heist",
    "points": 200,
    "type": "text",
    "accept": [
     "La Casa de Papel"
    ]
   },
   {
    "q": "Which sitcom centers on five friends and a bar in New York, with Ted searching for the woman in the title?",
    "a": "How I Met Your Mother",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which animated Adult Swim show follows a cynical scientist and his grandson on multiverse adventures?",
    "a": "Rick and Morty",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which series follows the chemistry-teacher-turned-criminal's lawyer in a comedy-drama set before another famous show?",
    "a": "Better Call Saul",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which Netflix drama dramatizes the rise and fall of Colombian drug lord Pablo Escobar?",
    "a": "Narcos",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which reality competition has contestants design and sew garments, judged by Heidi Klum and Tim Gunn?",
    "a": "Project Runway",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which AMC drama, created by Vince Gilligan, follows a New Mexico chemistry teacher who builds a meth empire under the alias Heisenberg?",
    "a": "Breaking Bad",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which HBO satire follows the Roy family's battle over their media conglomerate Waystar Royco?",
    "a": "Succession",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which crime drama anthology's first season starred Matthew McConaughey and Woody Harrelson as Louisiana detectives?",
    "a": "True Detective",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which British panel show, hosted by Stephen Fry then Sandi Toksvig, rewards interesting answers over correct ones?",
    "a": "QI",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which Danish-Swedish crime series begins with a body found on the Oresund Bridge between the two countries?",
    "a": "The Bridge",
    "points": 600,
    "type": "text",
    "accept": [
     "Bron",
     "Broen"
    ]
   },
   {
    "q": "Which 1990s sci-fi series followed FBI agents Mulder and Scully investigating the paranormal?",
    "a": "The X-Files",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which 1970s British sitcom followed the Trotter brothers and their van in Peckham, coined 'Lovely jubbly'?",
    "a": "Only Fools and Horses",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which 1990 to 1995 NBC drama, featuring Jimmy Smits and Dennis Franz, was a gritty police series set in New York?",
    "a": "NYPD Blue",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which 1981 Granada TV serial, adapting an Evelyn Waugh novel and starring Jeremy Irons as Charles Ryder, follows an Oxford friendship with the aristocratic Flyte family?",
    "a": "Brideshead Revisited",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which 1969 to 1974 British surreal comedy troupe series featured the Spanish Inquisition and the dead parrot sketches?",
    "a": "Monty Python's Flying Circus",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which 1981 to 1987 NBC police drama set in an unnamed city opened each episode with a roll-call briefing and 'Let's be careful out there'?",
    "a": "Hill Street Blues",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which 1976 British TV adaptation, by Jack Pulman, of a Robert Graves novel starred Derek Jacobi as a stammering Roman emperor?",
    "a": "I, Claudius",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which 1990s Canadian sketch comedy troupe series, whose name evokes farm equipment, featured Dave Foley and Kevin McDonald?",
    "a": "The Kids in the Hall",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which 1960s British puppet series by Gerry Anderson featured International Rescue and craft launched from Tracy Island?",
    "a": "Thunderbirds",
    "points": 1000,
    "type": "text"
   }
  ],
  "Cartoons & Animation": [
   {
    "q": "Which Disney film features a wooden puppet who wants to become a real boy?",
    "a": "Pinocchio",
    "points": 200,
    "type": "text"
   },
   {
    "q": "In Tom and Jerry, what type of animal is Tom?",
    "a": "A cat",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which yellow-skinned cartoon family includes Bart, Lisa, and Maggie?",
    "a": "The Simpsons",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which Looney Tunes character is a stuttering pig who ends cartoons with 'That's all folks'?",
    "a": "Porky Pig",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which Nickelodeon character is a square-shaped sea sponge who works as a fry cook at the Krusty Krab?",
    "a": "SpongeBob SquarePants",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which Pixar film follows a rat named Remy who dreams of becoming a chef in Paris?",
    "a": "Ratatouille",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which Cartoon Network show features three sisters created from sugar, spice, and a chemical called X?",
    "a": "The Powerpuff Girls",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which cowardly cartoon dog travels with four teenagers in a van called the Mystery Machine, often bribed with snacks?",
    "a": "Scooby-Doo",
    "points": 400,
    "type": "text"
   },
   {
    "q": "In Looney Tunes, which character is a fast-running bird perpetually chased by Wile E. Coyote?",
    "a": "The Road Runner",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which Nickelodeon show follows the backyard inventions of stepbrothers building wild contraptions each summer day?",
    "a": "Phineas and Ferb",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which 2009 Pixar film features an elderly man who flies his house using thousands of balloons?",
    "a": "Up",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which Hanna-Barbera show depicts a futuristic family with father George, robot maid Rosie, and dog Astro?",
    "a": "The Jetsons",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which stop-motion Tim Burton film follows Jack Skellington, king of Halloween Town?",
    "a": "The Nightmare Before Christmas",
    "points": 600,
    "type": "text"
   },
   {
    "q": "In the anime Dragon Ball Z, what is the name of the green-skinned Namekian warrior who trains Gohan?",
    "a": "Piccolo",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which 1974 anime series, directed by Isao Takahata with layout work by Hayao Miyazaki, follows an orphan girl living with her grandfather in the Swiss Alps?",
    "a": "Heidi, Girl of the Alps",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which 1995 Pixar film was the first feature-length film made entirely with computer animation?",
    "a": "Toy Story",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which Czech animator and filmmaker is known for surreal stop-motion works like the 1994 film Faust?",
    "a": "Jan Svankmajer",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which 2001 Hayao Miyazaki film, the highest-grossing Japanese film of its era, won the Academy Award for Best Animated Feature in 2003?",
    "a": "Spirited Away",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which Studio Ghibli film, directed by Hayao Miyazaki, follows a young witch named Kiki who starts a flying delivery service?",
    "a": "Kiki's Delivery Service",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which 1932 Disney Silly Symphony cartoon was the first to use the full three-strip Technicolor process?",
    "a": "Flowers and Trees",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which 1985 Studio Ghibli precursor film by Hayao Miyazaki features a girl with a glowing levitation crystal and a flying island?",
    "a": "Castle in the Sky",
    "points": 1000,
    "type": "text",
    "accept": [
     "Laputa: Castle in the Sky"
    ]
   },
   {
    "q": "Which Russian animator directed the 1975 film Hedgehog in the Fog?",
    "a": "Yuriy Norshteyn",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which 1968 Soyuzmultfilm character is a fuzzy big-eared creature of unknown species, created by Eduard Uspensky?",
    "a": "Cheburashka",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which 1926 silhouette animated film by Lotte Reiniger, based on Arabian Nights, is the oldest surviving feature-length animation?",
    "a": "The Adventures of Prince Achmed",
    "points": 1000,
    "type": "text"
   }
  ],
  "Pop Culture": [
   {
    "q": "What Disney franchise features a young princess named Elsa with ice powers?",
    "a": "Frozen",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What streaming giant, founded in 1997, popularized binge-watching with shows like Stranger Things?",
    "a": "Netflix",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What is the name of the coffee-loving plumber's dinosaur-riding green brother in Nintendo games?",
    "a": "Luigi",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What American singer is widely known as the 'Material Girl' and the 'Queen of Pop'?",
    "a": "Madonna",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What boy wizard, created by J.K. Rowling, has a lightning-bolt scar on his forehead?",
    "a": "Harry Potter",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What animated franchise features ogres, with a green hero voiced by Mike Myers?",
    "a": "Shrek",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What rapper, born Marshall Mathers, performs under an alter ego named Slim Shady?",
    "a": "Eminem",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What 2009 James Cameron film about the blue Na'vi on Pandora became the highest-grossing movie ever?",
    "a": "Avatar",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What HBO drama about a New Jersey mob boss is often called one of the greatest TV series ever?",
    "a": "The Sopranos",
    "points": 400,
    "type": "text",
    "accept": [
     "Sopranos"
    ]
   },
   {
    "q": "What 1985 Robert Zemeckis film sent Marty McFly back to 1955 in a DeLorean time machine?",
    "a": "Back to the Future",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What 1982 album by a King of Pop became the best-selling album of all time?",
    "a": "Thriller",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What British singer released the record-breaking 2011 album '21', featuring 'Rolling in the Deep'?",
    "a": "Adele",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What Pixar film, the studio's first feature in 1995, was the first fully computer-animated movie?",
    "a": "Toy Story",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What animated MTV duo, created by Mike Judge, consists of two snickering teenage metalheads?",
    "a": "Beavis and Butt-Head",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What 1991 Nirvana song's music video, set in a gymnasium, became an anthem of Generation X?",
    "a": "Smells Like Teen Spirit",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What Japanese phenomenon, a card game and anime, popularized the slogan 'Gotta Catch 'Em All'?",
    "a": "Pokemon",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What 1999 Wachowskis film introduced 'bullet time' visual effects and a hacker named Neo?",
    "a": "The Matrix",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What Andy Warhol-founded magazine, launched in 1969, took its name from a film medium?",
    "a": "Interview",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What 1977 disco film starring John Travolta featured a soundtrack by the Bee Gees?",
    "a": "Saturday Night Fever",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What experimental 1967 Beatles album, with a colorful gatefold cover, is named for a fictional band?",
    "a": "Sgt. Pepper's Lonely Hearts Club Band",
    "points": 800,
    "type": "text",
    "accept": [
     "Sgt. Pepper's",
     "Sergeant Pepper's Lonely Hearts Club Band"
    ]
   },
   {
    "q": "What 1968 album by The Beatles, with an all-white sleeve, is informally called the 'White Album'?",
    "a": "The Beatles",
    "points": 1000,
    "type": "text",
    "accept": [
     "The White Album"
    ]
   },
   {
    "q": "What German Expressionist 1920 silent horror film featured a somnambulist named Cesare?",
    "a": "The Cabinet of Dr. Caligari",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What 1962 pop-art work by Andy Warhol depicts 32 canvases of a soup brand?",
    "a": "Campbell's Soup Cans",
    "points": 1000,
    "type": "text",
    "accept": [
     "Campbell's Soup Cans series"
    ]
   },
   {
    "q": "What avant-garde German band, formed in Dusseldorf in 1970, is considered a pioneer of electronic music with 'Autobahn'?",
    "a": "Kraftwerk",
    "points": 1000,
    "type": "text"
   }
  ],
  "Famous People": [
   {
    "q": "Which Polish-French scientist won Nobel Prizes in two different sciences, physics and chemistry?",
    "a": "Marie Curie",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which Italian Renaissance polymath painted the Mona Lisa and sketched the Vitruvian Man?",
    "a": "Leonardo da Vinci",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which civil rights icon refused to give up her bus seat in Montgomery, Alabama, in 1955?",
    "a": "Rosa Parks",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which American inventor flew a kite in a thunderstorm and appears on the $100 bill?",
    "a": "Benjamin Franklin",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which English naturalist sailed aboard HMS Beagle and studied the finches of the Galapagos?",
    "a": "Charles Darwin",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which Austrian founder of psychoanalysis wrote 'The Interpretation of Dreams'?",
    "a": "Sigmund Freud",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which Indian-born nun won the 1979 Nobel Peace Prize for her work with the poor in Calcutta?",
    "a": "Mother Teresa",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which Spanish artist co-founded Cubism and painted the anti-war mural 'Guernica'?",
    "a": "Pablo Picasso",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which African American abolitionist led enslaved people to freedom via the Underground Railroad?",
    "a": "Harriet Tubman",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which Greek philosopher was sentenced to death by drinking hemlock in 399 BC?",
    "a": "Socrates",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which English nurse pioneered modern nursing during the Crimean War and was called 'The Lady with the Lamp'?",
    "a": "Florence Nightingale",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which French general was defeated at the Battle of Waterloo in 1815?",
    "a": "Napoleon Bonaparte",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which Italian astronomer was tried by the Inquisition for supporting a Sun-centered universe?",
    "a": "Galileo Galilei",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which German-born theoretical physicist published the special theory of relativity in 1905?",
    "a": "Albert Einstein",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which English statesman and philosopher, executed in 1535, wrote 'Utopia'?",
    "a": "Thomas More",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which French chemist developed pasteurization and a rabies vaccine?",
    "a": "Louis Pasteur",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which Roman emperor wrote the Stoic philosophical work 'Meditations'?",
    "a": "Marcus Aurelius",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which English poet wrote the Canterbury Tales in Middle English in the 14th century?",
    "a": "Geoffrey Chaucer",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which Serbian-American inventor pioneered alternating current and feuded with Thomas Edison?",
    "a": "Nikola Tesla",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which German astronomer formulated three laws describing planetary orbits in the early 1600s?",
    "a": "Johannes Kepler",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which 12th-century female German abbess composed sacred music and wrote on medicine and visions?",
    "a": "Hildegard of Bingen",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which Tang dynasty figure became the only woman to rule China in her own name as empress regnant?",
    "a": "Wu Zetian",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which Italian noblewoman and mathematician wrote one of the first calculus textbooks in 1748?",
    "a": "Maria Gaetana Agnesi",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which Malian emperor's lavish 1324 pilgrimage to Mecca disrupted gold prices in Egypt?",
    "a": "Mansa Musa",
    "points": 1000,
    "type": "text"
   }
  ],
  "Logos & Brands": [
   {
    "q": "Which technology company uses a multicolored four-square window as its logo?",
    "a": "Microsoft",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which soft drink rival to Coca-Cola uses a red, white, and blue circular logo?",
    "a": "Pepsi",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which photo-sharing app owned by Meta uses a colorful camera icon as its logo?",
    "a": "Instagram",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which Japanese automaker uses three overlapping ovals to form a stylized letter as its emblem?",
    "a": "Toyota",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which streaming and shopping giant uses a smiling arrow stretching from A to Z?",
    "a": "Amazon",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Which video platform owned by Google uses a red rectangle with a white play triangle?",
    "a": "YouTube",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which ride-hailing company is known for its simple black-and-white wordmark logo?",
    "a": "Uber",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which Italian fashion house uses a gold double-G monogram, named for founder Guccio?",
    "a": "Gucci",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which Korean electronics giant uses a blue ellipse containing its name in white letters?",
    "a": "Samsung",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which energy-drink brand uses two charging red bulls facing a yellow sun?",
    "a": "Red Bull",
    "points": 400,
    "type": "text"
   },
   {
    "q": "Which sportswear brand uses a leaping big cat, the same name as a wild feline?",
    "a": "Puma",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which luxury fashion brand uses an interlocking double-C monogram created by its French founder?",
    "a": "Chanel",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which chip company's logo features the word 'inside' and once played a five-note jingle?",
    "a": "Intel",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which Japanese camera and printing company uses a red wordmark and a 'Kabushiki' heritage from 1937?",
    "a": "Canon",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which British luxury fashion house is known for its distinctive tan, black, red, and white check pattern?",
    "a": "Burberry",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Which American motorcycle brand uses an orange and black shield-and-bar logo?",
    "a": "Harley-Davidson",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which Italian sportswear brand's logo shows two figures back-to-back seated, forming a shape between them?",
    "a": "Kappa",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which French luxury house uses an orange box and a logo depicting a horse-drawn carriage (Duc)?",
    "a": "Hermes",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which oil company, formerly Esso, uses a red flying horse, Pegasus, as a historic emblem?",
    "a": "Mobil",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Which American outdoor brand's logo depicts the jagged silhouette of Half Dome in Yosemite?",
    "a": "The North Face",
    "points": 800,
    "type": "text",
    "accept": [
     "North Face"
    ]
   },
   {
    "q": "The Alfa Romeo emblem combines a red cross with a crowned serpent devouring a man, symbols of which Italian city?",
    "a": "Milan",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which luxury car brand's emblem is a stylized 'R' and was historically a 1925 diamond-shaped logo?",
    "a": "Renault",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which Italian fashion label uses a stylized Medusa head, ringed by a Greek key border, as its logo?",
    "a": "Versace",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "Which tire company's Bibendum mascot, a figure made of stacked white tires, also lends its name to a restaurant guide?",
    "a": "Michelin",
    "points": 1000,
    "type": "text"
   }
  ],
  "Food & Drink": [
   {
    "q": "What clear distilled spirit, often flavored with juniper berries, is the base of a martini?",
    "a": "Gin",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What leafy green is the main ingredient in a Caesar salad?",
    "a": "Romaine lettuce",
    "points": 200,
    "type": "text",
    "accept": [
     "Lettuce",
     "Romaine"
    ]
   },
   {
    "q": "What frozen dairy dessert comes in flavors like vanilla, chocolate, and strawberry?",
    "a": "Ice cream",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What breakfast food is made by frying eggs that have been beaten together?",
    "a": "Scrambled eggs",
    "points": 200,
    "type": "text",
    "accept": [
     "Omelette",
     "Omelet"
    ]
   },
   {
    "q": "What sweet liquid produced by bees is used as a natural sweetener?",
    "a": "Honey",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What Italian dish consists of pasta layered with sauce, cheese, and often meat, then baked?",
    "a": "Lasagna",
    "points": 400,
    "type": "text",
    "accept": [
     "Lasagne"
    ]
   },
   {
    "q": "What spirit, the base of a daiquiri, was the main alcohol in the mojito covered earlier?",
    "a": "Rum",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What dark leafy condiment paste, made from fermented soybeans and wheat, is essential to Japanese cooking as a salty seasoning?",
    "a": "Soy sauce",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What fortified Portuguese wine, named for a city, is traditionally served with dessert?",
    "a": "Port",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What North African staple is made from tiny steamed granules of crushed durum wheat semolina?",
    "a": "Couscous",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What is the hottest part of a fresh chili pepper, where most of its heat compound is concentrated?",
    "a": "The placenta (pith/membrane)",
    "points": 600,
    "type": "text",
    "accept": [
     "The pith",
     "The membrane",
     "The ribs"
    ]
   },
   {
    "q": "What French cooking term describes briefly plunging food into boiling water and then into ice water?",
    "a": "Blanching",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What East Asian dish, central to Japanese cuisine, was the country's signature export covered earlier and pairs vinegared rice with raw fish?",
    "a": "Sushi",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What Italian coffee drink combines espresso with steamed milk and a thick layer of foam?",
    "a": "Cappuccino",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What gelling agent derived from red algae is used as a vegetarian alternative to gelatin?",
    "a": "Agar",
    "points": 1000,
    "type": "text",
    "accept": [
     "Agar-agar"
    ]
   },
   {
    "q": "What Indian flatbread is leavened with yogurt and traditionally cooked in a tandoor oven?",
    "a": "Naan",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What Hungarian stew, seasoned heavily with paprika, is the country's national dish?",
    "a": "Goulash",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What protein-rich curd, made by coagulating soy milk and pressing it into blocks, was the source of the soybean paste used in Japanese soup earlier?",
    "a": "Tofu",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What French pastry technique of repeatedly folding butter into dough to create flaky layers produced the croissant covered earlier?",
    "a": "Lamination",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What bittersweet Italian aperitif, bright red in color, is the key ingredient in a Negroni?",
    "a": "Campari",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What fermented honey beverage, one of the oldest alcoholic drinks, is sometimes called the drink of the Vikings?",
    "a": "Mead",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What naturally occurring compound, abundant in seaweed and aged cheese, was isolated by Kikunae Ikeda and gives the savory taste described earlier?",
    "a": "Glutamate",
    "points": 1000,
    "type": "text",
    "accept": [
     "Glutamic acid",
     "Monosodium glutamate",
     "MSG"
    ]
   },
   {
    "q": "What French term refers to a mixture of equal parts flour and fat used to thicken sauces, as in the white version that thickens bechamel?",
    "a": "Roux",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What Basque-style cake or the Italian word aside, what is the leavening yeast species Saccharomyces cerevisiae commonly called in baking and brewing?",
    "a": "Baker's yeast",
    "points": 1000,
    "type": "text",
    "accept": [
     "Yeast",
     "Brewer's yeast"
    ]
   }
  ],
  "Art & Literature": [
   {
    "q": "Who painted the Mona Lisa?",
    "a": "Leonardo da Vinci",
    "points": 200,
    "type": "text",
    "accept": [
     "Leonardo",
     "da Vinci"
    ]
   },
   {
    "q": "Who wrote the play Romeo and Juliet?",
    "a": "William Shakespeare",
    "points": 200,
    "type": "text",
    "accept": [
     "Shakespeare"
    ]
   },
   {
    "q": "Who wrote the adventures of the boy wizard at the school of witchcraft, a series whose hero was covered earlier?",
    "a": "J.K. Rowling",
    "points": 200,
    "type": "text",
    "accept": [
     "Joanne Rowling",
     "Rowling"
    ]
   },
   {
    "q": "Who wrote the play Hamlet, featuring the line 'To be or not to be'?",
    "a": "William Shakespeare",
    "points": 200,
    "type": "text",
    "accept": [
     "Shakespeare"
    ]
   },
   {
    "q": "Who created the ceiling frescoes of the Sistine Chapel?",
    "a": "Michelangelo",
    "points": 200,
    "type": "text"
   },
   {
    "q": "Who wrote the novel The Adventures of Huckleberry Finn?",
    "a": "Mark Twain",
    "points": 400,
    "type": "text",
    "accept": [
     "Samuel Clemens"
    ]
   },
   {
    "q": "What Russian author, who also penned War and Peace, wrote the novel Anna Karenina?",
    "a": "Leo Tolstoy",
    "points": 400,
    "type": "text",
    "accept": [
     "Tolstoy"
    ]
   },
   {
    "q": "Who wrote the horror novel Frankenstein?",
    "a": "Mary Shelley",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What Italian poet wrote the Divine Comedy?",
    "a": "Dante Alighieri",
    "points": 400,
    "type": "text",
    "accept": [
     "Dante"
    ]
   },
   {
    "q": "Who painted the swirling night sky over a village, a Dutch master whose Starry Night was referenced earlier and who also painted Sunflowers?",
    "a": "Vincent van Gogh",
    "points": 400,
    "type": "text",
    "accept": [
     "Van Gogh"
    ]
   },
   {
    "q": "Who wrote the dystopian novel Fahrenheit 451?",
    "a": "Ray Bradbury",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What Colombian novelist, author of One Hundred Years of Solitude, also wrote Love in the Time of Cholera?",
    "a": "Gabriel Garcia Marquez",
    "points": 600,
    "type": "text",
    "accept": [
     "Garcia Marquez",
     "Marquez"
    ]
   },
   {
    "q": "Who wrote the novel The Brothers Karamazov?",
    "a": "Fyodor Dostoevsky",
    "points": 600,
    "type": "text",
    "accept": [
     "Dostoevsky"
    ]
   },
   {
    "q": "What French sculptor created the bronze The Burghers of Calais, having also sculpted the seated figure known as The Thinker mentioned earlier?",
    "a": "Auguste Rodin",
    "points": 600,
    "type": "text",
    "accept": [
     "Rodin"
    ]
   },
   {
    "q": "Who wrote the novel Beloved and won the Nobel Prize in Literature in 1993?",
    "a": "Toni Morrison",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What Spanish artist painted the anti-war mural Guernica?",
    "a": "Pablo Picasso",
    "points": 600,
    "type": "text",
    "accept": [
     "Picasso"
    ]
   },
   {
    "q": "Who wrote the long poem Leaves of Grass?",
    "a": "Walt Whitman",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What Russian writer, also the author of Crime and Punishment, wrote the novel The Idiot?",
    "a": "Fyodor Dostoevsky",
    "points": 800,
    "type": "text",
    "accept": [
     "Dostoevsky"
    ]
   },
   {
    "q": "Who painted The Persistence of Memory, with its melting clocks?",
    "a": "Salvador Dali",
    "points": 800,
    "type": "text",
    "accept": [
     "Dali"
    ]
   },
   {
    "q": "Who wrote the novel Don Quixote?",
    "a": "Miguel de Cervantes",
    "points": 800,
    "type": "text",
    "accept": [
     "Cervantes"
    ]
   },
   {
    "q": "What Dutch painter of the Golden Age, known for The Night Watch covered earlier, also created the etching Christ Healing the Sick?",
    "a": "Rembrandt",
    "points": 800,
    "type": "text",
    "accept": [
     "Rembrandt van Rijn"
    ]
   },
   {
    "q": "Who wrote the verse novel Eugene Onegin and is regarded as Russia's greatest poet?",
    "a": "Alexander Pushkin",
    "points": 1000,
    "type": "text",
    "accept": [
     "Pushkin"
    ]
   },
   {
    "q": "What German artist of the Northern Renaissance, who made the engraving Melencolia I, also created the watercolor Young Hare?",
    "a": "Albrecht Durer",
    "points": 1000,
    "type": "text",
    "accept": [
     "Durer",
     "Albrecht Duerer"
    ]
   },
   {
    "q": "Who wrote the experimental novel Pale Fire, structured as a poem with extensive commentary?",
    "a": "Vladimir Nabokov",
    "points": 1000,
    "type": "text",
    "accept": [
     "Nabokov"
    ]
   }
  ],
  "Famous Landmarks": [
   {
    "q": "On which continent is the Sahara Desert, home to ancient Egyptian monuments?",
    "a": "Africa",
    "points": 200,
    "type": "text"
   },
   {
    "q": "In which city is the Statue of Liberty's torch raised over the harbor?",
    "a": "New York City",
    "points": 200,
    "type": "text",
    "accept": [
     "New York"
    ]
   },
   {
    "q": "What towering iron structure is the most famous landmark of Paris?",
    "a": "The Eiffel Tower",
    "points": 200,
    "type": "text",
    "accept": [
     "Eiffel Tower"
    ]
   },
   {
    "q": "In which country is Mount Fuji located?",
    "a": "Japan",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What ancient stone amphitheater, once used for gladiator contests, is a top attraction in the Italian capital?",
    "a": "The Colosseum",
    "points": 200,
    "type": "text",
    "accept": [
     "Colosseum"
    ]
   },
   {
    "q": "In which US city is the Golden Gate Bridge located?",
    "a": "San Francisco",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What clock tower beside the UK Parliament officially houses the bell known as Big Ben, a name commonly applied to the whole structure mentioned earlier?",
    "a": "Elizabeth Tower",
    "points": 400,
    "type": "text",
    "accept": [
     "The Elizabeth Tower"
    ]
   },
   {
    "q": "In which country is the ancient citadel of the Acropolis located?",
    "a": "Greece",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What four US presidents' faces are carved into Mount Rushmore?",
    "a": "Washington, Jefferson, Roosevelt, and Lincoln",
    "points": 400,
    "type": "text",
    "accept": [
     "Mount Rushmore presidents"
    ]
   },
   {
    "q": "In which Indian city is the white marble mausoleum built by Shah Jahan for his wife located?",
    "a": "Agra",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What Peruvian Inca site, set high in the Andes, is one of the New Seven Wonders of the World?",
    "a": "Machu Picchu",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What clock-faced structure in Cairo aside, what Egyptian monument with the body of a lion and a human head sits near the Giza pyramids referenced earlier?",
    "a": "The Great Sphinx",
    "points": 600,
    "type": "text",
    "accept": [
     "The Sphinx",
     "Great Sphinx of Giza"
    ]
   },
   {
    "q": "In which country is the medieval Christian pilgrimage cathedral of Santiago de Compostela located?",
    "a": "Spain",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What ancient Mayan-built observatory and pyramid complex on Mexico's Yucatan Peninsula draws crowds for its equinox shadow serpent?",
    "a": "Chichen Itza",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What Roman temple with a famous concrete dome and central oculus survives largely intact today?",
    "a": "The Pantheon",
    "points": 600,
    "type": "text",
    "accept": [
     "Pantheon"
    ]
   },
   {
    "q": "In which European city is the canal-laced historic center and the Rialto Bridge, also home to the Doge's Palace mentioned earlier?",
    "a": "Venice",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What 1,000-year-old Khmer temple in Cambodia appears on the country's national flag?",
    "a": "Angkor Wat",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What ancient mausoleum at Halicarnassus, one of the Seven Wonders, gave us the word for a grand tomb?",
    "a": "The Mausoleum at Halicarnassus",
    "points": 800,
    "type": "text",
    "accept": [
     "Mausoleum at Halicarnassus",
     "Mausoleum of Halicarnassus"
    ]
   },
   {
    "q": "What former Byzantine cathedral and later mosque in Istanbul, whose Greek name means 'Holy Wisdom', is famed for its massive dome?",
    "a": "Hagia Sophia",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What enormous Buddhist stupa monument on the island of Java in Indonesia is the world's largest, mentioned earlier by its name?",
    "a": "Borobudur",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What rock-cut Nabataean city in Jordan, whose treasury facade was covered earlier, is nicknamed the 'Rose City' for its stone color?",
    "a": "Petra",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What 8th-century rock-cut Kailasa Temple, carved from a single piece of basalt, is the largest monolithic structure at the Ellora caves in India?",
    "a": "Kailasa Temple",
    "points": 1000,
    "type": "text",
    "accept": [
     "Kailasanatha Temple",
     "Kailash Temple"
    ]
   },
   {
    "q": "What ancient Sudanese site contains more pyramids than all of Egypt, built by the Kingdom of Kush?",
    "a": "Meroe",
    "points": 1000,
    "type": "text",
    "accept": [
     "Meroë"
    ]
   },
   {
    "q": "What ruined Greco-Roman city in present-day Turkey, once home to the Temple of Artemis and the Library of Celsus, was a major port of antiquity?",
    "a": "Ephesus",
    "points": 1000,
    "type": "text"
   },
   {
    "q": "What famous Paris landmark is shown in this image?",
    "a": "The Eiffel Tower",
    "points": 200,
    "type": "image",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Eiffel_Tower_from_the_Tour_Montparnasse_3%2C_Paris_May_2014.jpg?width=900",
    "imageAlt": "Photo of the Eiffel Tower in Paris",
    "accept": [
     "Eiffel Tower"
    ]
   },
   {
    "q": "These ancient pyramids are located near which Egyptian city?",
    "a": "Giza",
    "points": 400,
    "type": "image",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/All_Gizah_Pyramids.jpg?width=900",
    "imageAlt": "Photo of the pyramids of Giza"
   },
   {
    "q": "In which city is this ancient amphitheater located?",
    "a": "Rome",
    "points": 600,
    "type": "image",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg?width=900",
    "imageAlt": "Photo of the Colosseum in Rome"
   },
   {
    "q": "This white marble mausoleum is located in which Indian city?",
    "a": "Agra",
    "points": 800,
    "type": "image",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Taj_Mahal_in_March_2004.jpg?width=900",
    "imageAlt": "Photo of the Taj Mahal in Agra"
   },
   {
    "q": "This rock-cut treasury facade is part of which ancient city in Jordan?",
    "a": "Petra",
    "points": 1000,
    "type": "image",
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Al_Khazneh_Petra_edit_2.jpg?width=900",
    "imageAlt": "Photo of Al-Khazneh in Petra"
   }
  ],
  "Technology & Inventions": [
   {
    "q": "What small portable device tells time and is worn on the wrist?",
    "a": "The wristwatch",
    "points": 200,
    "type": "text",
    "accept": [
     "Wristwatch",
     "Watch"
    ]
   },
   {
    "q": "What writing instrument uses a small rolling ball to dispense ink?",
    "a": "The ballpoint pen",
    "points": 200,
    "type": "text",
    "accept": [
     "Ballpoint pen"
    ]
   },
   {
    "q": "What kitchen appliance heats food quickly using electromagnetic radiation?",
    "a": "The microwave oven",
    "points": 200,
    "type": "text",
    "accept": [
     "Microwave",
     "Microwave oven"
    ]
   },
   {
    "q": "What two-wheeled human-powered vehicle is steered with handlebars and propelled by pedals?",
    "a": "The bicycle",
    "points": 200,
    "type": "text",
    "accept": [
     "Bicycle"
    ]
   },
   {
    "q": "What company, whose name was answered earlier as the maker of the iPhone, also created the Macintosh computer?",
    "a": "Apple",
    "points": 200,
    "type": "text"
   },
   {
    "q": "What optical instrument with lenses is used to view distant objects like ships or stars?",
    "a": "The telescope",
    "points": 400,
    "type": "text",
    "accept": [
     "Telescope"
    ]
   },
   {
    "q": "Who invented the first practical mechanical television system, demonstrated in 1926?",
    "a": "John Logie Baird",
    "points": 400,
    "type": "text",
    "accept": [
     "Baird"
    ]
   },
   {
    "q": "What programming language, released by Sun Microsystems in 1995, uses the slogan 'write once, run anywhere'?",
    "a": "Java",
    "points": 400,
    "type": "text"
   },
   {
    "q": "What unit of frequency, equal to one cycle per second, is named after a German physicist?",
    "a": "The hertz",
    "points": 400,
    "type": "text",
    "accept": [
     "Hertz"
    ]
   },
   {
    "q": "Who developed the polio vaccine that, unlike Salk's injected version mentioned earlier, was given orally on a sugar cube?",
    "a": "Albert Sabin",
    "points": 400,
    "type": "text",
    "accept": [
     "Sabin"
    ]
   },
   {
    "q": "What 1947 Bell Labs invention, the device that replaced the vacuum tube, was created by Bardeen, Brattain, and which third physicist?",
    "a": "William Shockley",
    "points": 600,
    "type": "text",
    "accept": [
     "Shockley"
    ]
   },
   {
    "q": "What is the name of the operating system kernel created by Linus Torvalds in 1991?",
    "a": "Linux",
    "points": 600,
    "type": "text"
   },
   {
    "q": "What rapid radio-detection technology, developed for air defense before WWII, has a name that is an acronym for radio detection and ranging?",
    "a": "Radar",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Who patented the telephone in 1876, an invention described earlier, beating a rival to the patent office on the same day?",
    "a": "Alexander Graham Bell",
    "points": 600,
    "type": "text",
    "accept": [
     "Bell",
     "Alexander Bell"
    ]
   },
   {
    "q": "What programming language, created by James Gosling aside, was developed by Bjarne Stroustrup as an extension of C with object-oriented features?",
    "a": "C++",
    "points": 600,
    "type": "text"
   },
   {
    "q": "Who invented the World Wide Web aside, who designed the QWERTY keyboard layout used on the first commercially successful typewriter?",
    "a": "Christopher Latham Sholes",
    "points": 1000,
    "type": "text",
    "accept": [
     "Sholes",
     "Christopher Sholes"
    ]
   },
   {
    "q": "Who invented vulcanized rubber, accidentally discovering the process by dropping a mixture on a hot stove?",
    "a": "Charles Goodyear",
    "points": 800,
    "type": "text",
    "accept": [
     "Goodyear"
    ]
   },
   {
    "q": "What is the name of the first programmable, electronic, digital computer, built in Britain to break German codes during WWII?",
    "a": "Colossus",
    "points": 800,
    "type": "text"
   },
   {
    "q": "Who is credited with inventing the first practical alternating-current induction motor, the same engineer whose AC work was mentioned earlier?",
    "a": "Nikola Tesla",
    "points": 800,
    "type": "text",
    "accept": [
     "Tesla"
    ]
   },
   {
    "q": "What 1958 invention by Jack Kilby, referenced earlier, was independently developed in silicon form by Robert Noyce, who later co-founded which chip company?",
    "a": "Intel",
    "points": 800,
    "type": "text"
   },
   {
    "q": "What scanning technology, invented by Norman Joseph Woodland and Bernard Silver, encodes data in parallel lines read by lasers at checkouts?",
    "a": "The barcode",
    "points": 800,
    "type": "text",
    "accept": [
     "Barcode",
     "UPC"
    ]
   },
   {
    "q": "Who built the Z3 in 1941, considered the first programmable, fully automatic digital computer?",
    "a": "Konrad Zuse",
    "points": 1000,
    "type": "text",
    "accept": [
     "Zuse"
    ]
   },
   {
    "q": "What hypertext system and markup language did Tim Berners-Lee, credited earlier with the Web, create to format web pages?",
    "a": "HTML",
    "points": 1000,
    "type": "text",
    "accept": [
     "HyperText Markup Language"
    ]
   },
   {
    "q": "Who patented the first practical photographic process using a calotype paper negative, an English rival to the daguerreotype mentioned earlier?",
    "a": "William Henry Fox Talbot",
    "points": 1000,
    "type": "text",
    "accept": [
     "Fox Talbot",
     "Henry Fox Talbot"
    ]
   }
  ]
};

const ENRICH_ADDITIONS = {
  "General Knowledge": [
    { q: "What punctuation mark is used to indicate possession in English?", a: "Apostrophe", points: 200, type: "text" }
  ],
  "Sports": [
    { q: "In tennis scoring, what word is used for a score of zero?", a: "Love", points: 200, type: "text" }
  ],
  "History": [
    { q: "Which empire was ruled by Suleiman the Magnificent during its 16th-century peak?", a: "The Ottoman Empire", points: 600, type: "text", accept: ["Ottoman Empire"] }
  ],
  "Geography": [
    { q: "Which capital city sits on the River Seine?", a: "Paris", points: 400, type: "text" }
  ],
  "Movies & TV": [
    { q: "Which 1994 film features the line 'Life is like a box of chocolates'?", a: "Forrest Gump", points: 400, type: "text" }
  ],
  "Music & Songs": [
    { q: "Which six-minute Queen hit famously blends ballad, opera, and hard rock sections?", a: "Bohemian Rhapsody", points: 600, type: "text" }
  ],
  "Science": [
    { q: "What part of the atom contains protons and neutrons?", a: "The nucleus", points: 400, type: "text", accept: ["Nucleus"] }
  ],
  "Animals & Nature": [
    { q: "What is the only mammal capable of sustained true flight?", a: "Bat", points: 400, type: "text", accept: ["Bats"] }
  ],
  "Food & Drink": [
    { q: "Which Italian cheese is traditionally made from buffalo milk in Campania?", a: "Mozzarella", points: 600, type: "text", accept: ["Mozzarella di bufala"] }
  ],
  "Famous People": [
    { q: "Who was the first woman to win a Nobel Prize?", a: "Marie Curie", points: 600, type: "text", accept: ["Curie"] }
  ],
  "Technology & Inventions": [
    { q: "Which company introduced the first iPhone in 2007?", a: "Apple", points: 200, type: "text", accept: ["Apple Inc."] }
  ],
  "Space & Astronomy": [
    { q: "What is the name of the first artificial satellite launched into Earth orbit?", a: "Sputnik 1", points: 400, type: "text", accept: ["Sputnik"] }
  ],
  "Art & Literature": [
    { q: "Who wrote the dystopian novel Nineteen Eighty-Four?", a: "George Orwell", points: 400, type: "text", accept: ["Orwell", "1984"] }
  ],
  "Pop Culture": [
    { q: "What social deduction game became a viral hit in 2020 with crewmates and impostors?", a: "Among Us", points: 400, type: "text" }
  ],
  "Famous Landmarks": [
    { q: "In which country would you find the ancient city of Petra?", a: "Jordan", points: 600, type: "text" }
  ],
  "Video Games": [
    { q: "What studio developed the 2011 game Dark Souls?", a: "FromSoftware", points: 800, type: "text", accept: ["From Software"] }
  ],
  "Anime & Manga": [
    { q: "In Fullmetal Alchemist, what is the name of Edward Elric's younger brother?", a: "Alphonse Elric", points: 600, type: "text", accept: ["Alphonse", "Al"] }
  ],
  "Superheroes": [
    { q: "What is the real name of the Black Panther who first appeared in Marvel comics in 1966?", a: "T'Challa", points: 600, type: "text", accept: ["T Challa"] }
  ],
  "Football (Soccer)": [
    { q: "Which club won the first Premier League title in the 1992-93 season?", a: "Manchester United", points: 400, type: "text" },
    { q: "Who scored the fastest hat-trick in Premier League history, timed at 2 minutes 56 seconds?", a: "Sadio Mane", points: 600, type: "text", accept: ["Mane"] },
    { q: "Which national team won Euro 2004 despite entering the tournament as a major underdog?", a: "Greece", points: 600, type: "text" },
    { q: "Who is the only goalkeeper to win the Ballon d'Or?", a: "Lev Yashin", points: 800, type: "text", accept: ["Yashin"] },
    { q: "Which club won the European Cup in 1991 after a penalty shootout against Marseille?", a: "Red Star Belgrade", points: 1000, type: "text", accept: ["Red Star", "Crvena zvezda"] }
  ],
  "Cars & Automotive": [
    { q: "What German car brand uses a three-pointed star as its logo?", a: "Mercedes-Benz", points: 200, type: "text", accept: ["Mercedes"] }
  ],
  "Internet Culture": [
    { q: "What three-letter abbreviation means 'too long; didn't read'?", a: "TL;DR", points: 400, type: "text", accept: ["TLDR"] }
  ],
  "Mythology": [
    { q: "In Norse mythology, what tree connects the nine worlds?", a: "Yggdrasil", points: 800, type: "text" }
  ],
  "World Religions": [
    { q: "In Islam, what is the name of the month of fasting?", a: "Ramadan", points: 400, type: "text" }
  ],
  "Flags of the World": [
    { q: "Which country's flag has a red circle centered on a white field?", a: "Japan", points: 200, type: "text" }
  ],
  "Logos & Brands": [
    { q: "Which sportswear brand uses a swoosh logo?", a: "Nike", points: 200, type: "text" }
  ],
  "Cartoons & Animation": [
    { q: "Which animated series is set in the fictional town of Springfield?", a: "The Simpsons", points: 200, type: "text", accept: ["Simpsons"] }
  ],
  "TV Shows": [
    { q: "Which sitcom follows six friends in Manhattan who often meet at Central Perk?", a: "Friends", points: 400, type: "text" }
  ]
};

Object.keys(ENRICH_ADDITIONS).forEach(cat => {
  if (!ENRICH_QUESTIONS[cat]) ENRICH_QUESTIONS[cat] = [];
  ENRICH_QUESTIONS[cat].push(...ENRICH_ADDITIONS[cat]);
});
