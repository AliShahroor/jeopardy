// Enrichment questions for the thinner genre categories (added on top of the
// base bank, merged & de-duped by questions.js). Keeps high tiers genuinely
// tough and adds variety so boards repeat less.
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
   }
  ]
};
