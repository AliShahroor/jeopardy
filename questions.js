// questions.js - Complete Jeopardy Question Bank
// 15 categories with 25+ questions each, organized by difficulty tiers

const QUESTION_BANK = {

  "Geography": [
    { q: "This river, the longest in Africa, flows northward through eleven countries before reaching the Mediterranean Sea.", a: "The Nile", points: 200, type: "text" },
    { q: "This European microstate is completely surrounded by Italy and sits atop Mount Titano.", a: "San Marino", points: 200, type: "text" },
    { q: "This is the only continent that lies in all four hemispheres.", a: "Africa", points: 200, type: "text" },
    { q: "The Gobi Desert spans across Mongolia and this country.", a: "China", points: 200, type: "text" },
    { q: "This South American capital city sits at over 11,000 feet above sea level.", a: "La Paz (Bolivia) or Quito (Ecuador)", points: 200, type: "text" },
    { q: "This strait separates Europe from Africa at its narrowest point of just 8.7 miles.", a: "Strait of Gibraltar", points: 400, type: "text" },
    { q: "This country has the most time zones of any nation, spanning 11 in total.", a: "Russia", points: 400, type: "text" },
    { q: "Lake Titicaca, the highest navigable lake in the world, borders Peru and this country.", a: "Bolivia", points: 400, type: "text" },
    { q: "This is the smallest country in mainland Africa by area.", a: "The Gambia", points: 400, type: "text" },
    { q: "The Danube River flows through more capital cities than any other river. Name any two.", a: "Vienna, Bratislava, Budapest, Belgrade", points: 400, type: "text" },
    { q: "This island nation in the Indian Ocean is the fourth largest island in the world.", a: "Madagascar", points: 600, type: "text" },
    { q: "Mount Elbrus, the highest peak in Europe, is located in this country.", a: "Russia", points: 600, type: "text" },
    { q: "This Asian country is made up of over 17,000 islands, making it the world's largest archipelago.", a: "Indonesia", points: 600, type: "text" },
    { q: "The Caspian Sea borders five countries. Name any three.", a: "Russia, Iran, Kazakhstan, Turkmenistan, Azerbaijan", points: 600, type: "text" },
    { q: "This Central American country is the only one without a Pacific coastline.", a: "Belize", points: 600, type: "text" },
    { q: "This country's flag is the only national flag that is not rectangular.", a: "Nepal", points: 800, type: "text" },
    { q: "Lesotho is one of three countries completely surrounded by another country. Name one of the other two.", a: "Vatican City or San Marino", points: 800, type: "text" },
    { q: "This is the driest inhabited continent on Earth.", a: "Australia", points: 800, type: "text" },
    { q: "The Mariana Trench, the deepest point in Earth's oceans, is located in this ocean.", a: "Pacific Ocean", points: 800, type: "text" },
    { q: "This European capital was built on 14 islands connected by 57 bridges.", a: "Stockholm", points: 800, type: "text" },
    { q: "This landlocked country in Central Asia has the world's largest proven oil reserves among landlocked nations.", a: "Kazakhstan", points: 1000, type: "text" },
    { q: "Chimborazo in Ecuador is the farthest point from Earth's center, making it technically taller than this famous peak.", a: "Mount Everest", points: 1000, type: "text" },
    { q: "This African country has the most UNESCO World Heritage Sites on the continent.", a: "Ethiopia", points: 1000, type: "text" },
    { q: "The Kerguelen Islands, sometimes called the 'Desolation Islands,' belong to this country.", a: "France", points: 1000, type: "text" },
    { q: "This is the only country whose name in English ends with the letter 'H'.", a: "Bangladesh", points: 1000, type: "text" },
    { q: "Name 30 European countries in 60 seconds!", a: null, points: 1000, type: "interactive", challenge: "european_countries", timeLimit: 60, target: 30 },
    { q: "Which continent does this emoji map represent? [See the landmass shape below]", a: "South America", points: 400, type: "image", imageType: "emoji_map", imageData: "south_america" }
  ],

  "History": [
    { q: "This ancient wonder of the world was located in the city of Babylon in present-day Iraq.", a: "The Hanging Gardens of Babylon", points: 200, type: "text" },
    { q: "This 1215 document limited the power of the English monarch and is considered a cornerstone of democracy.", a: "Magna Carta", points: 200, type: "text" },
    { q: "The French Revolution began in this year with the storming of the Bastille.", a: "1789", points: 200, type: "text" },
    { q: "This explorer is credited with being the first European to reach India by sea in 1498.", a: "Vasco da Gama", points: 200, type: "text" },
    { q: "The Roman Empire was divided into Eastern and Western halves by this emperor in 285 AD.", a: "Diocletian", points: 200, type: "text" },
    { q: "This 1773 protest against British taxation involved dumping tea into Boston Harbor.", a: "The Boston Tea Party", points: 400, type: "text" },
    { q: "The Treaty of Versailles in 1919 officially ended this war.", a: "World War I", points: 400, type: "text" },
    { q: "This ancient civilization built Machu Picchu high in the Andes Mountains.", a: "The Inca Empire", points: 400, type: "text" },
    { q: "Cleopatra VII was the last active ruler of this ancient kingdom before it became a Roman province.", a: "Egypt (Ptolemaic Kingdom)", points: 400, type: "text" },
    { q: "This wall, built starting in 122 AD, marked the northern boundary of Roman Britain.", a: "Hadrian's Wall", points: 400, type: "text" },
    { q: "The Ottoman Empire fell after this global conflict, leading to the creation of modern Turkey.", a: "World War I", points: 600, type: "text" },
    { q: "This 1804 legal code reformed French law and influenced legal systems worldwide.", a: "The Napoleonic Code (Code Napoleon)", points: 600, type: "text" },
    { q: "The Rosetta Stone was discovered in 1799 during this military leader's campaign in Egypt.", a: "Napoleon Bonaparte", points: 600, type: "text" },
    { q: "This ancient trade network connected China to the Mediterranean and facilitated the exchange of silk, spices, and ideas.", a: "The Silk Road", points: 600, type: "text" },
    { q: "The Hundred Years' War was fought primarily between England and this country.", a: "France", points: 600, type: "text" },
    { q: "This 1648 treaty ended the Thirty Years' War and established the concept of state sovereignty.", a: "Treaty (Peace) of Westphalia", points: 800, type: "text" },
    { q: "This Mongol leader created the largest contiguous land empire in history.", a: "Genghis Khan", points: 800, type: "text" },
    { q: "The Meiji Restoration of 1868 transformed this country from a feudal society into a modern industrial state.", a: "Japan", points: 800, type: "text" },
    { q: "This African empire, centered in present-day Mali, was one of the richest in history under Mansa Musa.", a: "The Mali Empire", points: 800, type: "text" },
    { q: "The Congress of Vienna in 1815 was convened to redraw the map of Europe after the defeat of this leader.", a: "Napoleon Bonaparte", points: 800, type: "text" },
    { q: "This ancient Greek battle in 480 BC saw 300 Spartans make a legendary last stand against the Persian army.", a: "Battle of Thermopylae", points: 1000, type: "text" },
    { q: "The Defenestration of Prague in 1618 triggered this devastating European conflict.", a: "The Thirty Years' War", points: 1000, type: "text" },
    { q: "This Byzantine emperor commissioned the Hagia Sophia and codified Roman law.", a: "Justinian I", points: 1000, type: "text" },
    { q: "The Taiping Rebellion, one of the deadliest conflicts in history, occurred in this country during the 1850s-1860s.", a: "China", points: 1000, type: "text" },
    { q: "This 1494 treaty divided the newly discovered lands outside Europe between Spain and Portugal.", a: "Treaty of Tordesillas", points: 1000, type: "text" }
  ],

  "Science": [
    { q: "This element, with atomic number 79, has the chemical symbol Au.", a: "Gold", points: 200, type: "text" },
    { q: "This force keeps planets in orbit around the Sun.", a: "Gravity", points: 200, type: "text" },
    { q: "Water is made up of hydrogen and this other element.", a: "Oxygen", points: 200, type: "text" },
    { q: "This is the largest organ of the human body.", a: "Skin", points: 200, type: "text" },
    { q: "DNA stands for this.", a: "Deoxyribonucleic Acid", points: 200, type: "text" },
    { q: "This scientist developed the theory of general relativity.", a: "Albert Einstein", points: 400, type: "text" },
    { q: "This subatomic particle has a positive charge.", a: "Proton", points: 400, type: "text" },
    { q: "The process by which plants convert sunlight into energy is called this.", a: "Photosynthesis", points: 400, type: "text" },
    { q: "This gas makes up approximately 78% of Earth's atmosphere.", a: "Nitrogen", points: 400, type: "text" },
    { q: "This scientist is known for his laws of motion and universal gravitation.", a: "Isaac Newton", points: 400, type: "text" },
    { q: "This is the hardest naturally occurring substance on Earth.", a: "Diamond", points: 600, type: "text" },
    { q: "Mitochondria are often called the 'powerhouse' of this.", a: "The Cell", points: 600, type: "text" },
    { q: "This phenomenon occurs when light bends as it passes from one medium to another.", a: "Refraction", points: 600, type: "text" },
    { q: "CRISPR-Cas9 is a revolutionary tool used for editing this.", a: "DNA (Genes)", points: 600, type: "text" },
    { q: "This is the speed of light in a vacuum, in meters per second (approximately).", a: "300,000,000 m/s (3 x 10^8)", points: 600, type: "text" },
    { q: "This principle states that you cannot simultaneously know both the exact position and momentum of a particle.", a: "Heisenberg's Uncertainty Principle", points: 800, type: "text" },
    { q: "These are the four fundamental forces of nature: gravity, electromagnetism, and these two nuclear forces.", a: "Strong nuclear force and weak nuclear force", points: 800, type: "text" },
    { q: "This organelle, found in plant cells but not animal cells, is responsible for photosynthesis.", a: "Chloroplast", points: 800, type: "text" },
    { q: "This element is the most abundant in the universe.", a: "Hydrogen", points: 800, type: "text" },
    { q: "This type of bond involves the sharing of electron pairs between atoms.", a: "Covalent Bond", points: 800, type: "text" },
    { q: "This paradox involves a cat that is simultaneously alive and dead until observed.", a: "Schrodinger's Cat", points: 1000, type: "text" },
    { q: "This is the term for the minimum amount of energy needed to start a chemical reaction.", a: "Activation Energy", points: 1000, type: "text" },
    { q: "This scientist discovered penicillin in 1928, revolutionizing medicine.", a: "Alexander Fleming", points: 1000, type: "text" },
    { q: "The Drake Equation estimates the number of these in our galaxy.", a: "Active, communicative extraterrestrial civilizations", points: 1000, type: "text" },
    { q: "This is the name for the theoretical boundary around a black hole beyond which nothing can escape.", a: "Event Horizon", points: 1000, type: "text" }
  ],

  "Literature": [
    { q: "This author wrote 'Pride and Prejudice' and 'Sense and Sensibility'.", a: "Jane Austen", points: 200, type: "text" },
    { q: "'To be, or not to be' is the opening of a famous soliloquy from this Shakespeare play.", a: "Hamlet", points: 200, type: "text" },
    { q: "This novel by Harper Lee features the lawyer Atticus Finch.", a: "To Kill a Mockingbird", points: 200, type: "text" },
    { q: "This author created the detective Sherlock Holmes.", a: "Arthur Conan Doyle", points: 200, type: "text" },
    { q: "George Orwell wrote this dystopian novel set in a totalitarian future.", a: "1984", points: 200, type: "text" },
    { q: "This Russian novelist wrote 'War and Peace' and 'Anna Karenina'.", a: "Leo Tolstoy", points: 400, type: "text" },
    { q: "This is the first book of J.R.R. Tolkien's 'Lord of the Rings' trilogy.", a: "The Fellowship of the Ring", points: 400, type: "text" },
    { q: "Gabriel Garcia Marquez wrote this landmark novel of magical realism about the Buendia family.", a: "One Hundred Years of Solitude", points: 400, type: "text" },
    { q: "This American author wrote 'The Great Gatsby'.", a: "F. Scott Fitzgerald", points: 400, type: "text" },
    { q: "Homer's 'The Odyssey' follows this hero on his journey home from the Trojan War.", a: "Odysseus (Ulysses)", points: 400, type: "text" },
    { q: "This Bronte sister wrote 'Wuthering Heights'.", a: "Emily Bronte", points: 600, type: "text" },
    { q: "This novel by Herman Melville begins with the line 'Call me Ishmael.'", a: "Moby-Dick", points: 600, type: "text" },
    { q: "This Colombian author won the Nobel Prize in Literature in 1982.", a: "Gabriel Garcia Marquez", points: 600, type: "text" },
    { q: "Fyodor Dostoevsky explored guilt and morality in this novel about a student who commits murder.", a: "Crime and Punishment", points: 600, type: "text" },
    { q: "This is the pen name of Samuel Clemens, author of 'Adventures of Huckleberry Finn'.", a: "Mark Twain", points: 600, type: "text" },
    { q: "This epic poem by Dante Alighieri describes a journey through Hell, Purgatory, and Paradise.", a: "The Divine Comedy", points: 800, type: "text" },
    { q: "This Czech author wrote 'The Trial' and 'The Metamorphosis'.", a: "Franz Kafka", points: 800, type: "text" },
    { q: "This Japanese author wrote 'Norwegian Wood' and 'Kafka on the Shore'.", a: "Haruki Murakami", points: 800, type: "text" },
    { q: "This 1818 novel by Mary Shelley is considered the first science fiction novel.", a: "Frankenstein", points: 800, type: "text" },
    { q: "This ancient Mesopotamian poem is considered one of the earliest works of literature.", a: "The Epic of Gilgamesh", points: 800, type: "text" },
    { q: "This Irish author wrote 'Ulysses', considered one of the most important novels of the 20th century.", a: "James Joyce", points: 1000, type: "text" },
    { q: "This author wrote 'Beloved' and won the Nobel Prize in Literature in 1993.", a: "Toni Morrison", points: 1000, type: "text" },
    { q: "This Argentine writer is famous for his short stories exploring labyrinths, mirrors, and infinity.", a: "Jorge Luis Borges", points: 1000, type: "text" },
    { q: "This Indian-British author wrote 'Midnight's Children' and 'The Satanic Verses'.", a: "Salman Rushdie", points: 1000, type: "text" },
    { q: "This Russian poet, author of 'Eugene Onegin', is considered the founder of modern Russian literature.", a: "Alexander Pushkin", points: 1000, type: "text" }
  ],

  "Movies": [
    { q: "This 1994 film stars Tim Robbins as a man wrongfully imprisoned at Shawshank State Penitentiary.", a: "The Shawshank Redemption", points: 200, type: "text" },
    { q: "This film franchise features a character named Luke Skywalker.", a: "Star Wars", points: 200, type: "text" },
    { q: "Leonardo DiCaprio finally won his first Oscar for Best Actor for this 2015 film.", a: "The Revenant", points: 200, type: "text" },
    { q: "This animated film features a clownfish named Marlin searching for his son.", a: "Finding Nemo", points: 200, type: "text" },
    { q: "This 1972 film, directed by Francis Ford Coppola, follows the Corleone crime family.", a: "The Godfather", points: 200, type: "text" },
    { q: "This director is known for films like 'Inception', 'The Dark Knight', and 'Interstellar'.", a: "Christopher Nolan", points: 400, type: "text" },
    { q: "This 1999 film stars Keanu Reeves as a hacker who discovers reality is a simulation.", a: "The Matrix", points: 400, type: "text" },
    { q: "Quentin Tarantino directed this 1994 film featuring interweaving crime stories in Los Angeles.", a: "Pulp Fiction", points: 400, type: "text" },
    { q: "This Pixar film takes place inside the mind of a girl named Riley.", a: "Inside Out", points: 400, type: "text" },
    { q: "This 1975 Steven Spielberg film about a great white shark terrorizing a beach town became the first summer blockbuster.", a: "Jaws", points: 400, type: "text" },
    { q: "This 2019 South Korean film became the first non-English language film to win Best Picture at the Oscars.", a: "Parasite", points: 600, type: "text" },
    { q: "This actor played Jack Sparrow in the 'Pirates of the Caribbean' franchise.", a: "Johnny Depp", points: 600, type: "text" },
    { q: "Stanley Kubrick directed this 1968 science fiction masterpiece set in space.", a: "2001: A Space Odyssey", points: 600, type: "text" },
    { q: "This Japanese animation studio created 'Spirited Away' and 'My Neighbor Totoro'.", a: "Studio Ghibli", points: 600, type: "text" },
    { q: "This 1994 film features the quote 'Life is like a box of chocolates.'", a: "Forrest Gump", points: 600, type: "text" },
    { q: "This Swedish director is known for 'The Seventh Seal' and 'Persona'.", a: "Ingmar Bergman", points: 800, type: "text" },
    { q: "This actor holds the record for most Academy Award nominations for Best Actor.", a: "Jack Nicholson (tied with other records)", points: 800, type: "text" },
    { q: "Alfred Hitchcock directed this 1960 horror film famous for its shower scene.", a: "Psycho", points: 800, type: "text" },
    { q: "This 2010 Christopher Nolan film involves planting ideas in dreams within dreams.", a: "Inception", points: 800, type: "text" },
    { q: "This Mexican director created 'Pan's Labyrinth' and 'The Shape of Water'.", a: "Guillermo del Toro", points: 800, type: "text" },
    { q: "This 1941 film by Orson Welles is frequently cited as the greatest film ever made.", a: "Citizen Kane", points: 1000, type: "text" },
    { q: "This Iranian film won the Academy Award for Best Foreign Language Film in 2012.", a: "A Separation", points: 1000, type: "text" },
    { q: "This filmmaker directed 'Rashomon', 'Seven Samurai', and 'Ikiru'.", a: "Akira Kurosawa", points: 1000, type: "text" },
    { q: "This actor has appeared in the most MCU (Marvel Cinematic Universe) films as of 2024.", a: "Robert Downey Jr. (as Tony Stark/Iron Man)", points: 1000, type: "text" },
    { q: "This 1927 German expressionist film by Fritz Lang depicted a dystopian future city.", a: "Metropolis", points: 1000, type: "text" }
  ],

  "Music": [
    { q: "This band, featuring Freddie Mercury, performed the iconic song 'Bohemian Rhapsody'.", a: "Queen", points: 200, type: "text" },
    { q: "This pop star is known as the 'King of Pop'.", a: "Michael Jackson", points: 200, type: "text" },
    { q: "This Beatles album features the famous 'Abbey Road' crosswalk cover.", a: "Abbey Road", points: 200, type: "text" },
    { q: "This instrument has 88 keys.", a: "Piano", points: 200, type: "text" },
    { q: "This Beethoven symphony is commonly known as the 'Fate' symphony due to its famous four-note opening.", a: "Symphony No. 5", points: 200, type: "text" },
    { q: "This American singer-songwriter wrote 'Blowin' in the Wind' and won the Nobel Prize in Literature.", a: "Bob Dylan", points: 400, type: "text" },
    { q: "This is the best-selling album of all time.", a: "Thriller by Michael Jackson", points: 400, type: "text" },
    { q: "This classical composer went deaf later in life but continued composing masterpieces.", a: "Ludwig van Beethoven", points: 400, type: "text" },
    { q: "This genre of music originated in New Orleans in the early 20th century.", a: "Jazz", points: 400, type: "text" },
    { q: "This British rock band's albums include 'The Dark Side of the Moon' and 'The Wall'.", a: "Pink Floyd", points: 400, type: "text" },
    { q: "This musical term describes the speed or pace of a piece of music.", a: "Tempo", points: 600, type: "text" },
    { q: "This rapper and producer from Compton released the critically acclaimed album 'To Pimp a Butterfly'.", a: "Kendrick Lamar", points: 600, type: "text" },
    { q: "This Austrian composer was a child prodigy who wrote over 600 works before dying at age 35.", a: "Wolfgang Amadeus Mozart", points: 600, type: "text" },
    { q: "This instrument is the largest in a standard orchestra.", a: "Double Bass (or Contrabass)", points: 600, type: "text" },
    { q: "This Nigerian musician pioneered Afrobeat by fusing jazz, funk, and traditional Yoruba music.", a: "Fela Kuti", points: 600, type: "text" },
    { q: "This musical scale consists of five notes per octave.", a: "Pentatonic Scale", points: 800, type: "text" },
    { q: "This composer wrote 'The Four Seasons', a set of four violin concertos.", a: "Antonio Vivaldi", points: 800, type: "text" },
    { q: "This electronic music duo from France created 'Random Access Memories' and 'Discovery'.", a: "Daft Punk", points: 800, type: "text" },
    { q: "This term describes a group of singers performing without instrumental accompaniment.", a: "A cappella", points: 800, type: "text" },
    { q: "This Brazilian music genre blends samba rhythms with jazz harmonies.", a: "Bossa Nova", points: 800, type: "text" },
    { q: "This Russian composer wrote 'The Rite of Spring', which caused a riot at its 1913 premiere.", a: "Igor Stravinsky", points: 1000, type: "text" },
    { q: "This musical interval between two notes is called a 'tritone' and was historically called 'diabolus in musica'.", a: "Augmented fourth / diminished fifth", points: 1000, type: "text" },
    { q: "This Icelandic singer and musician released the experimental albums 'Homogenic' and 'Vespertine'.", a: "Bjork", points: 1000, type: "text" },
    { q: "This German composer's 'Ring Cycle' is a set of four operas spanning about 15 hours.", a: "Richard Wagner", points: 1000, type: "text" },
    { q: "This Indian instrument, played by Ravi Shankar, has movable frets and sympathetic strings.", a: "Sitar", points: 1000, type: "text" }
  ],

  "Sports": [
    { q: "This sport is played at Wimbledon.", a: "Tennis", points: 200, type: "text" },
    { q: "This country has won the most FIFA World Cup titles.", a: "Brazil (5 titles)", points: 200, type: "text" },
    { q: "This basketball player is often considered the greatest of all time, with 6 NBA championships.", a: "Michael Jordan", points: 200, type: "text" },
    { q: "The Summer Olympics are held every how many years?", a: "Four years", points: 200, type: "text" },
    { q: "This is the most watched sporting event in the world.", a: "FIFA World Cup Final", points: 200, type: "text" },
    { q: "This Jamaican sprinter holds the world record in the 100m and 200m dash.", a: "Usain Bolt", points: 400, type: "text" },
    { q: "This tennis player has won the most Grand Slam singles titles in men's tennis.", a: "Novak Djokovic", points: 400, type: "text" },
    { q: "This sport uses a shuttlecock.", a: "Badminton", points: 400, type: "text" },
    { q: "This Argentine footballer is widely considered one of the greatest of all time and won the 2022 World Cup.", a: "Lionel Messi", points: 400, type: "text" },
    { q: "The Super Bowl is the championship game of this American sports league.", a: "NFL (National Football League)", points: 400, type: "text" },
    { q: "This country invented the sport of cricket.", a: "England", points: 600, type: "text" },
    { q: "This boxer was known as 'The Greatest' and famously said 'Float like a butterfly, sting like a bee'.", a: "Muhammad Ali", points: 600, type: "text" },
    { q: "This swimmer has won the most Olympic gold medals in history with 23 golds.", a: "Michael Phelps", points: 600, type: "text" },
    { q: "This Japanese martial art translates to 'the gentle way'.", a: "Judo", points: 600, type: "text" },
    { q: "The Tour de France is a prestigious race in this sport.", a: "Cycling", points: 600, type: "text" },
    { q: "This country has won the most Olympic gold medals in ice hockey.", a: "Canada", points: 800, type: "text" },
    { q: "This is the only sport to have been played on the moon.", a: "Golf", points: 800, type: "text" },
    { q: "This Norwegian chess player became the youngest World Chess Champion in 2013.", a: "Magnus Carlsen", points: 800, type: "text" },
    { q: "This ancient Greek sporting event included running, wrestling, and chariot racing.", a: "The Olympic Games (Ancient Olympics)", points: 800, type: "text" },
    { q: "This F1 driver holds the record for most World Championship titles with 7.", a: "Michael Schumacher (tied with Lewis Hamilton)", points: 800, type: "text" },
    { q: "This traditional Basque sport involves throwing heavy stones and is one of the oldest recorded sports.", a: "Stone lifting (Harri-jasotze)", points: 1000, type: "text" },
    { q: "This cricket shot, played behind the batsman's legs, is named after an Indian prince.", a: "The Ranjitsinhji (Ranji) / Leg glance", points: 1000, type: "text" },
    { q: "This city hosted the first modern Olympic Games in 1896.", a: "Athens, Greece", points: 1000, type: "text" },
    { q: "This Ethiopian runner won the Olympic marathon barefoot in 1960.", a: "Abebe Bikila", points: 1000, type: "text" },
    { q: "This combat sport from Thailand is known as 'The Art of Eight Limbs'.", a: "Muay Thai", points: 1000, type: "text" }
  ],

  "Technology": [
    { q: "This company created the iPhone.", a: "Apple", points: 200, type: "text" },
    { q: "HTML stands for this.", a: "HyperText Markup Language", points: 200, type: "text" },
    { q: "This person co-founded Microsoft with Paul Allen.", a: "Bill Gates", points: 200, type: "text" },
    { q: "This social media platform was originally called 'TheFacebook'.", a: "Facebook (now Meta)", points: 200, type: "text" },
    { q: "RAM stands for this.", a: "Random Access Memory", points: 200, type: "text" },
    { q: "This programming language, created by Brendan Eich in 1995, is the language of the web.", a: "JavaScript", points: 400, type: "text" },
    { q: "This protocol, created by Tim Berners-Lee, is the foundation of the World Wide Web.", a: "HTTP (HyperText Transfer Protocol)", points: 400, type: "text" },
    { q: "This company's motto was 'Don't be evil'.", a: "Google", points: 400, type: "text" },
    { q: "This term describes a decentralized digital ledger technology underlying Bitcoin.", a: "Blockchain", points: 400, type: "text" },
    { q: "This operating system kernel was created by Linus Torvalds in 1991.", a: "Linux", points: 400, type: "text" },
    { q: "This AI research company created ChatGPT.", a: "OpenAI", points: 600, type: "text" },
    { q: "Moore's Law predicts that the number of transistors on a chip does this approximately every two years.", a: "Doubles", points: 600, type: "text" },
    { q: "This type of machine learning uses neural networks with many layers.", a: "Deep Learning", points: 600, type: "text" },
    { q: "This cryptographic method uses a pair of keys: one public and one private.", a: "Public-key cryptography (asymmetric encryption)", points: 600, type: "text" },
    { q: "This data structure uses LIFO (Last In, First Out) ordering.", a: "Stack", points: 600, type: "text" },
    { q: "This theoretical computing model, proposed in 1936, forms the foundation of computer science.", a: "Turing Machine", points: 800, type: "text" },
    { q: "This protocol suite, developed by Vint Cerf and Bob Kahn, is the foundation of internet communication.", a: "TCP/IP", points: 800, type: "text" },
    { q: "This quantum computing concept allows a qubit to be in multiple states simultaneously.", a: "Superposition", points: 800, type: "text" },
    { q: "This sorting algorithm has an average time complexity of O(n log n) and works by partitioning.", a: "Quicksort", points: 800, type: "text" },
    { q: "This computer scientist is considered the first programmer for her work on Charles Babbage's Analytical Engine.", a: "Ada Lovelace", points: 800, type: "text" },
    { q: "This type of database, abbreviated NoSQL, does not use traditional table-based relational structures.", a: "Non-relational database (NoSQL)", points: 1000, type: "text" },
    { q: "This network topology connects every node to every other node.", a: "Mesh topology (full mesh)", points: 1000, type: "text" },
    { q: "This 1965 concept describes a hypothetical point where AI surpasses human intelligence.", a: "The Singularity (Technological Singularity)", points: 1000, type: "text" },
    { q: "This complexity class contains problems that can be verified in polynomial time but may not be solvable in polynomial time.", a: "NP (Nondeterministic Polynomial time)", points: 1000, type: "text" },
    { q: "This protocol, designed by Phil Zimmermann in 1991, provides encryption for email.", a: "PGP (Pretty Good Privacy)", points: 1000, type: "text" }
  ],

  "Food & Drink": [
    { q: "This Italian dish consists of flat dough topped with sauce, cheese, and various toppings.", a: "Pizza", points: 200, type: "text" },
    { q: "This spice, derived from the Crocus sativus flower, is the most expensive spice by weight.", a: "Saffron", points: 200, type: "text" },
    { q: "This Japanese rice wine is traditionally served warm or cold.", a: "Sake", points: 200, type: "text" },
    { q: "This fruit is the main ingredient in guacamole.", a: "Avocado", points: 200, type: "text" },
    { q: "This French term describes cooking food slowly in fat at a low temperature.", a: "Confit", points: 200, type: "text" },
    { q: "This region of France is famous for its sparkling wine that shares its name.", a: "Champagne", points: 400, type: "text" },
    { q: "This popular Indian bread is baked in a tandoor oven.", a: "Naan", points: 400, type: "text" },
    { q: "This Korean side dish consists of fermented vegetables, typically cabbage.", a: "Kimchi", points: 400, type: "text" },
    { q: "This bean is the primary ingredient in tofu.", a: "Soybean", points: 400, type: "text" },
    { q: "This Italian dessert, whose name means 'pick me up', is made with coffee-soaked ladyfingers.", a: "Tiramisu", points: 400, type: "text" },
    { q: "This Middle Eastern dip is made from chickpeas, tahini, lemon juice, and garlic.", a: "Hummus", points: 600, type: "text" },
    { q: "This French cooking technique involves briefly immersing food in boiling water, then ice water.", a: "Blanching", points: 600, type: "text" },
    { q: "This Japanese cooking method involves deep-frying seafood and vegetables in a light batter.", a: "Tempura", points: 600, type: "text" },
    { q: "This spirit, made from the blue agave plant, can only be produced in certain regions of Mexico.", a: "Tequila", points: 600, type: "text" },
    { q: "This type of tea undergoes full oxidation during processing.", a: "Black tea", points: 600, type: "text" },
    { q: "This Peruvian dish consists of raw fish cured in citrus juices.", a: "Ceviche", points: 800, type: "text" },
    { q: "This Ethiopian staple is a spongy, fermented flatbread used to scoop up stews.", a: "Injera", points: 800, type: "text" },
    { q: "This chemical reaction between amino acids and sugars gives browned food its distinctive flavor.", a: "Maillard Reaction", points: 800, type: "text" },
    { q: "This Japanese fermented soybean paste is essential in many Japanese soups and sauces.", a: "Miso", points: 800, type: "text" },
    { q: "This grape variety is the most widely planted wine grape in the world.", a: "Cabernet Sauvignon", points: 800, type: "text" },
    { q: "This traditional Hawaiian dish consists of cubed raw fish seasoned with soy sauce and sesame oil.", a: "Poke", points: 1000, type: "text" },
    { q: "This term describes the fifth basic taste, identified by Japanese chemist Kikunae Ikeda in 1908.", a: "Umami", points: 1000, type: "text" },
    { q: "This Georgian dumpling, similar to xiaolongbao, is filled with spiced meat and broth.", a: "Khinkali", points: 1000, type: "text" },
    { q: "This Swedish tradition involves taking a coffee break with pastries, typically cinnamon buns.", a: "Fika", points: 1000, type: "text" },
    { q: "This high-end Japanese beef comes from specially raised Wagyu cattle in a specific prefecture.", a: "Kobe Beef", points: 1000, type: "text" }
  ],

  "Art": [
    { q: "This Italian artist painted the ceiling of the Sistine Chapel.", a: "Michelangelo", points: 200, type: "text" },
    { q: "This painting by Leonardo da Vinci hangs in the Louvre and is known for her enigmatic smile.", a: "Mona Lisa", points: 200, type: "text" },
    { q: "This Dutch painter cut off part of his own ear and painted 'Starry Night'.", a: "Vincent van Gogh", points: 200, type: "text" },
    { q: "This art movement, featuring artists like Monet and Renoir, emphasized light and color over detail.", a: "Impressionism", points: 200, type: "text" },
    { q: "This Spanish artist co-founded Cubism and painted 'Guernica'.", a: "Pablo Picasso", points: 200, type: "text" },
    { q: "This Mexican artist is famous for her self-portraits and was married to Diego Rivera.", a: "Frida Kahlo", points: 400, type: "text" },
    { q: "This sculptor created 'The Thinker' and 'The Kiss'.", a: "Auguste Rodin", points: 400, type: "text" },
    { q: "This art movement, led by Andy Warhol, blurred the line between fine art and commercial art.", a: "Pop Art", points: 400, type: "text" },
    { q: "This Dutch Golden Age painter created 'Girl with a Pearl Earring'.", a: "Johannes Vermeer", points: 400, type: "text" },
    { q: "This painting by Edvard Munch depicts a figure with an agonized expression against a tumultuous sky.", a: "The Scream", points: 400, type: "text" },
    { q: "This Russian artist is considered a pioneer of abstract art.", a: "Wassily Kandinsky", points: 600, type: "text" },
    { q: "This architectural style features pointed arches, ribbed vaults, and flying buttresses.", a: "Gothic architecture", points: 600, type: "text" },
    { q: "This Japanese art form involves the aesthetic arrangement of flowers.", a: "Ikebana", points: 600, type: "text" },
    { q: "This surrealist artist painted melting clocks in 'The Persistence of Memory'.", a: "Salvador Dali", points: 600, type: "text" },
    { q: "This artist wrapped buildings and landscapes in fabric as part of his large-scale environmental art.", a: "Christo (and Jeanne-Claude)", points: 600, type: "text" },
    { q: "This Renaissance technique creates the illusion of depth on a flat surface using mathematical principles.", a: "Linear perspective", points: 800, type: "text" },
    { q: "This art movement, born in Zurich in 1916, rejected logic and embraced chaos and absurdity.", a: "Dada (Dadaism)", points: 800, type: "text" },
    { q: "This American artist is famous for large-scale paintings of flowers and New Mexico landscapes.", a: "Georgia O'Keeffe", points: 800, type: "text" },
    { q: "This Chinese art form involves creating images by folding paper without cutting.", a: "Origami (actually Japanese - Chinese is Zhezhi)", points: 800, type: "text" },
    { q: "This Baroque painter was known for dramatic use of light and dark, called chiaroscuro.", a: "Caravaggio", points: 800, type: "text" },
    { q: "This Japanese woodblock print by Hokusai is one of the most recognizable artworks in the world.", a: "The Great Wave off Kanagawa", points: 1000, type: "text" },
    { q: "This artist created the readymade 'Fountain' (a urinal) in 1917, challenging the definition of art.", a: "Marcel Duchamp", points: 1000, type: "text" },
    { q: "This ancient Greek sculpture, now in the Louvre, depicts the goddess of victory.", a: "Winged Victory of Samothrace (Nike)", points: 1000, type: "text" },
    { q: "This abstract expressionist was famous for his drip painting technique.", a: "Jackson Pollock", points: 1000, type: "text" },
    { q: "This Italian term describes the technique of sfumato, meaning 'to tone down' or 'to evaporate like smoke'.", a: "Sfumato (as used by Leonardo da Vinci)", points: 1000, type: "text" }
  ],

  "Mathematics": [
    { q: "This is the value of pi rounded to two decimal places.", a: "3.14", points: 200, type: "text" },
    { q: "This theorem states that in a right triangle, a squared plus b squared equals c squared.", a: "Pythagorean Theorem", points: 200, type: "text" },
    { q: "This is the only even prime number.", a: "2", points: 200, type: "text" },
    { q: "A triangle with all three sides of equal length is called this.", a: "Equilateral triangle", points: 200, type: "text" },
    { q: "This number system uses only 0 and 1.", a: "Binary (Base-2)", points: 200, type: "text" },
    { q: "This sequence starts 0, 1, 1, 2, 3, 5, 8, 13, where each number is the sum of the two before it.", a: "Fibonacci Sequence", points: 400, type: "text" },
    { q: "This branch of mathematics deals with the study of rates of change and accumulation.", a: "Calculus", points: 400, type: "text" },
    { q: "This is the name for a polygon with eight sides.", a: "Octagon", points: 400, type: "text" },
    { q: "The factorial of 5 (written 5!) equals this number.", a: "120", points: 400, type: "text" },
    { q: "This mathematical constant, approximately 2.718, is the base of natural logarithms.", a: "e (Euler's number)", points: 400, type: "text" },
    { q: "This ancient Greek mathematician is known as the 'Father of Geometry'.", a: "Euclid", points: 600, type: "text" },
    { q: "This theorem states that every even integer greater than 2 can be expressed as the sum of two primes.", a: "Goldbach's Conjecture (still unproven)", points: 600, type: "text" },
    { q: "This type of number cannot be expressed as a fraction of two integers.", a: "Irrational number", points: 600, type: "text" },
    { q: "In set theory, this symbol represents 'is an element of'.", a: "The epsilon symbol", points: 600, type: "text" },
    { q: "This is the sum of angles in any triangle, in degrees.", a: "180 degrees", points: 600, type: "text" },
    { q: "This German mathematician proved the Incompleteness Theorems, showing the limits of formal systems.", a: "Kurt Godel", points: 800, type: "text" },
    { q: "This topology problem asks whether a coffee cup and a donut are the same shape.", a: "They are topologically equivalent (homeomorphic)", points: 800, type: "text" },
    { q: "This is the smallest perfect number (equal to the sum of its proper divisors).", a: "6 (1+2+3=6)", points: 800, type: "text" },
    { q: "This Indian mathematician discovered remarkable formulas for pi and infinite series despite no formal training.", a: "Srinivasa Ramanujan", points: 800, type: "text" },
    { q: "This problem, one of the Millennium Prize Problems, deals with the distribution of prime numbers.", a: "The Riemann Hypothesis", points: 800, type: "text" },
    { q: "This 17th-century mathematician claimed to have a proof too large for the margin of his book.", a: "Pierre de Fermat (Fermat's Last Theorem)", points: 1000, type: "text" },
    { q: "This mathematical structure, named after a Norwegian, is a set with two binary operations satisfying specific axioms.", a: "A group (or ring/field - Abel)", points: 1000, type: "text" },
    { q: "This is the only number that is both a perfect square and a perfect cube (other than 0 and 1).", a: "64 (8 squared, 4 cubed)", points: 1000, type: "text" },
    { q: "This fractal set, defined by iterating z = z^2 + c in the complex plane, creates infinitely complex boundaries.", a: "Mandelbrot Set", points: 1000, type: "text" },
    { q: "This theorem proves that there are different sizes of infinity.", a: "Cantor's Diagonal Argument (Cantor's Theorem)", points: 1000, type: "text" }
  ],

  "Nature": [
    { q: "This is the largest animal to have ever lived on Earth.", a: "Blue Whale", points: 200, type: "text" },
    { q: "This gas, produced by trees and plants, is essential for human breathing.", a: "Oxygen", points: 200, type: "text" },
    { q: "This bird is known for its ability to mimic human speech.", a: "Parrot", points: 200, type: "text" },
    { q: "This is the tallest species of tree in the world.", a: "Coast Redwood (Sequoia sempervirens)", points: 200, type: "text" },
    { q: "This insect undergoes metamorphosis from caterpillar to its adult winged form.", a: "Butterfly", points: 200, type: "text" },
    { q: "This deep-sea creature has three hearts and blue blood.", a: "Octopus", points: 400, type: "text" },
    { q: "This biome, found near the equator, contains the highest biodiversity of any land ecosystem.", a: "Tropical Rainforest", points: 400, type: "text" },
    { q: "This phenomenon, caused by algae, can turn bodies of water red and produce deadly toxins.", a: "Red tide (harmful algal bloom)", points: 400, type: "text" },
    { q: "This animal can survive being frozen solid and thawed out multiple times.", a: "Wood Frog", points: 400, type: "text" },
    { q: "This symbiotic relationship between fungi and plant roots helps plants absorb nutrients.", a: "Mycorrhiza", points: 400, type: "text" },
    { q: "This animal produces the most potent venom of any land snake.", a: "Inland Taipan", points: 600, type: "text" },
    { q: "This phenomenon occurs when Earth's magnetic poles reverse their orientation.", a: "Geomagnetic reversal (pole reversal)", points: 600, type: "text" },
    { q: "This process, by which rocks are broken down by weather and biological activity, forms soil.", a: "Weathering", points: 600, type: "text" },
    { q: "This animal can regenerate its entire body from a tiny piece of tissue.", a: "Planarian (flatworm) or Starfish", points: 600, type: "text" },
    { q: "This layer of the atmosphere protects Earth from ultraviolet radiation.", a: "Ozone layer (in the stratosphere)", points: 600, type: "text" },
    { q: "This deep-sea phenomenon, where superheated water erupts from the ocean floor, supports unique ecosystems.", a: "Hydrothermal vents", points: 800, type: "text" },
    { q: "This organism, neither plant nor animal, forms the largest living thing on Earth by area.", a: "Honey Fungus (Armillaria ostoyae)", points: 800, type: "text" },
    { q: "This Arctic animal's fur appears white but is actually transparent and hollow.", a: "Polar Bear", points: 800, type: "text" },
    { q: "This geological period, about 252 million years ago, saw the largest mass extinction in Earth's history.", a: "Permian period (Permian-Triassic extinction)", points: 800, type: "text" },
    { q: "This type of organism can survive in extreme conditions like boiling water, high radiation, and deep space.", a: "Tardigrade (water bear) or extremophile", points: 800, type: "text" },
    { q: "This bioluminescent bay in Puerto Rico glows blue at night due to microscopic organisms.", a: "Mosquito Bay (Vieques) - dinoflagellates", points: 1000, type: "text" },
    { q: "This animal uses echolocation to navigate and hunt in complete darkness.", a: "Bat (or Dolphin)", points: 1000, type: "text" },
    { q: "This plant, native to Sumatra, produces the world's largest flower and smells like rotting flesh.", a: "Rafflesia arnoldii (Corpse Flower)", points: 1000, type: "text" },
    { q: "This geological feature forms when tectonic plates diverge underwater, creating new oceanic crust.", a: "Mid-ocean ridge", points: 1000, type: "text" },
    { q: "This ancient tree species, essentially unchanged for 200 million years, is called a 'living fossil'.", a: "Ginkgo biloba", points: 1000, type: "text" }
  ],

  "World Languages": [
    { q: "This is the most spoken language in the world by number of native speakers.", a: "Mandarin Chinese", points: 200, type: "text" },
    { q: "'Bonjour' means 'hello' in this language.", a: "French", points: 200, type: "text" },
    { q: "This language uses the Cyrillic alphabet.", a: "Russian (among others)", points: 200, type: "text" },
    { q: "This ancient language of India is considered the mother of many modern South Asian languages.", a: "Sanskrit", points: 200, type: "text" },
    { q: "This is the official language of Brazil.", a: "Portuguese", points: 200, type: "text" },
    { q: "This writing system, used in Japanese, consists of characters borrowed from Chinese.", a: "Kanji", points: 400, type: "text" },
    { q: "This language family includes English, German, Hindi, and Persian.", a: "Indo-European", points: 400, type: "text" },
    { q: "This African language, also known as Kiswahili, is a lingua franca of East Africa.", a: "Swahili", points: 400, type: "text" },
    { q: "This constructed language was created by L.L. Zamenhof in 1887 to be a universal second language.", a: "Esperanto", points: 400, type: "text" },
    { q: "This is the only language that uses click consonants as a major feature of its phonology.", a: "Xhosa (or other Khoisan languages)", points: 400, type: "text" },
    { q: "This language has the most words, with over 170,000 words currently in use.", a: "English", points: 600, type: "text" },
    { q: "This dead language was the common language of the Roman Empire.", a: "Latin", points: 600, type: "text" },
    { q: "This is the only country in South America where Dutch is the official language.", a: "Suriname", points: 600, type: "text" },
    { q: "This writing direction, used in Arabic and Hebrew, goes from right to left.", a: "RTL (Right-to-Left)", points: 600, type: "text" },
    { q: "This Australian Aboriginal language has no words for 'left' or 'right', using cardinal directions instead.", a: "Guugu Yimithirr", points: 600, type: "text" },
    { q: "This language isolate, spoken in the Basque Country, is unrelated to any other known language.", a: "Basque (Euskara)", points: 800, type: "text" },
    { q: "This writing system, used by the Cherokee people, was created by Sequoyah in the 1820s.", a: "Cherokee syllabary", points: 800, type: "text" },
    { q: "This sign language is the most widely used sign language in the United States.", a: "ASL (American Sign Language)", points: 800, type: "text" },
    { q: "This phenomenon occurs when two languages blend to form a new simplified language for communication.", a: "Pidgin (or Creole when it becomes a native language)", points: 800, type: "text" },
    { q: "This ancient writing system, used in Mesopotamia, involved pressing a reed stylus into clay tablets.", a: "Cuneiform", points: 800, type: "text" },
    { q: "This Turkish language reform in 1928 changed the writing system from Arabic script to this.", a: "Latin alphabet", points: 1000, type: "text" },
    { q: "This language has the most grammatical cases of any widely spoken language, with 15 cases.", a: "Finnish (or Estonian/Hungarian)", points: 1000, type: "text" },
    { q: "This African country has the most official languages, with 11.", a: "South Africa", points: 1000, type: "text" },
    { q: "This endangered language of the Canary Islands uses whistled speech to communicate across valleys.", a: "Silbo Gomero", points: 1000, type: "text" },
    { q: "This ancient Egyptian writing system was deciphered using the Rosetta Stone.", a: "Hieroglyphics", points: 1000, type: "text" }
  ],

  "Pop Culture": [
    { q: "This streaming service produced 'Stranger Things' and 'Squid Game'.", a: "Netflix", points: 200, type: "text" },
    { q: "This boy wizard attends Hogwarts School of Witchcraft and Wizardry.", a: "Harry Potter", points: 200, type: "text" },
    { q: "This video game plumber has been a Nintendo mascot since the 1980s.", a: "Mario", points: 200, type: "text" },
    { q: "This reality TV show has contestants compete to win the heart of a bachelor or bachelorette.", a: "The Bachelor/The Bachelorette", points: 200, type: "text" },
    { q: "This superhero team includes Iron Man, Captain America, Thor, and the Hulk.", a: "The Avengers", points: 200, type: "text" },
    { q: "This South Korean boy band became one of the best-selling music groups in history.", a: "BTS", points: 400, type: "text" },
    { q: "This TV series about a high school chemistry teacher who becomes a drug manufacturer aired from 2008-2013.", a: "Breaking Bad", points: 400, type: "text" },
    { q: "This social media platform, known for short-form videos, was created by ByteDance.", a: "TikTok", points: 400, type: "text" },
    { q: "This fantasy TV series, based on George R.R. Martin's novels, featured the Iron Throne.", a: "Game of Thrones", points: 400, type: "text" },
    { q: "This Japanese art style of animation has become globally popular, with works by Studio Ghibli leading the way.", a: "Anime", points: 400, type: "text" },
    { q: "This video game franchise features a Battle Royale mode where 100 players fight to be the last one standing.", a: "Fortnite", points: 600, type: "text" },
    { q: "This true crime podcast, released in 2014, helped popularize the podcast medium.", a: "Serial", points: 600, type: "text" },
    { q: "This Swedish YouTuber was the most subscribed individual creator for many years.", a: "PewDiePie (Felix Kjellberg)", points: 600, type: "text" },
    { q: "This card game, created by Richard Garfield, features planeswalkers and mana.", a: "Magic: The Gathering", points: 600, type: "text" },
    { q: "This 2020 social deduction game features crewmates and impostors on a spaceship.", a: "Among Us", points: 600, type: "text" },
    { q: "This term describes the practice of watching multiple episodes of a TV show in rapid succession.", a: "Binge-watching", points: 800, type: "text" },
    { q: "This internet phenomenon involves a 2009 Rick Astley music video used to trick people.", a: "Rickrolling", points: 800, type: "text" },
    { q: "This manga series by Eiichiro Oda holds the record for the most copies published for a single author.", a: "One Piece", points: 800, type: "text" },
    { q: "This augmented reality mobile game, released in 2016, had players catching creatures in the real world.", a: "Pokemon Go", points: 800, type: "text" },
    { q: "This AI chatbot, created by Anthropic, is known for being helpful, harmless, and honest.", a: "Claude", points: 800, type: "text" },
    { q: "This viral internet challenge in 2014 raised awareness for ALS research.", a: "The Ice Bucket Challenge", points: 1000, type: "text" },
    { q: "This musical artist's real name is Stefani Joanne Angelina Germanotta.", a: "Lady Gaga", points: 1000, type: "text" },
    { q: "This Netflix documentary series about a big cat zoo owner became a massive hit during the 2020 pandemic.", a: "Tiger King", points: 1000, type: "text" },
    { q: "This open-world crafting game, created by Markus 'Notch' Persson, is the best-selling video game of all time.", a: "Minecraft", points: 1000, type: "text" },
    { q: "This meme cryptocurrency, featuring a Shiba Inu dog, was created as a joke in 2013.", a: "Dogecoin", points: 1000, type: "text" }
  ],

  "Space & Astronomy": [
    { q: "This planet is known as the 'Red Planet'.", a: "Mars", points: 200, type: "text" },
    { q: "This is the closest star to Earth.", a: "The Sun", points: 200, type: "text" },
    { q: "This planet has the most moons in our solar system.", a: "Saturn", points: 200, type: "text" },
    { q: "This was the first man-made satellite, launched by the Soviet Union in 1957.", a: "Sputnik", points: 200, type: "text" },
    { q: "This American astronaut was the first person to walk on the Moon.", a: "Neil Armstrong", points: 200, type: "text" },
    { q: "This planet is famous for its prominent ring system visible from Earth.", a: "Saturn", points: 400, type: "text" },
    { q: "This galaxy, the nearest large galaxy to the Milky Way, is on a collision course with us.", a: "Andromeda Galaxy", points: 400, type: "text" },
    { q: "This NASA rover, which landed on Mars in 2021, carried the Ingenuity helicopter.", a: "Perseverance", points: 400, type: "text" },
    { q: "This theoretical object has gravity so strong that not even light can escape it.", a: "Black Hole", points: 400, type: "text" },
    { q: "This space telescope, launched in 1990, has provided some of the most detailed images of deep space.", a: "Hubble Space Telescope", points: 400, type: "text" },
    { q: "This dwarf planet was reclassified from planet status in 2006.", a: "Pluto", points: 600, type: "text" },
    { q: "This belt of icy bodies lies beyond Neptune's orbit.", a: "Kuiper Belt", points: 600, type: "text" },
    { q: "This phenomenon occurs when charged particles from the Sun interact with Earth's magnetic field.", a: "Aurora (Northern/Southern Lights)", points: 600, type: "text" },
    { q: "This is the largest volcano in the solar system, located on Mars.", a: "Olympus Mons", points: 600, type: "text" },
    { q: "This moon of Jupiter is believed to have a subsurface ocean that could harbor life.", a: "Europa", points: 600, type: "text" },
    { q: "This region of space, theorized by Jan Oort, is a spherical shell of icy objects surrounding the solar system.", a: "Oort Cloud", points: 800, type: "text" },
    { q: "This type of stellar explosion occurs when a massive star exhausts its nuclear fuel.", a: "Supernova", points: 800, type: "text" },
    { q: "This space probe, launched in 1977, became the first human-made object to enter interstellar space.", a: "Voyager 1", points: 800, type: "text" },
    { q: "This effect causes the light from objects moving away from us to shift toward longer wavelengths.", a: "Redshift (Doppler effect)", points: 800, type: "text" },
    { q: "This is the name for the supermassive black hole at the center of the Milky Way.", a: "Sagittarius A* (Sgr A*)", points: 800, type: "text" },
    { q: "This theoretical form of matter makes up approximately 27% of the universe but has never been directly observed.", a: "Dark Matter", points: 1000, type: "text" },
    { q: "This moon of Saturn has a thick atmosphere and liquid methane lakes on its surface.", a: "Titan", points: 1000, type: "text" },
    { q: "This equation, E = mc squared, demonstrates the relationship between mass and energy.", a: "Einstein's mass-energy equivalence", points: 1000, type: "text" },
    { q: "This cosmic event, approximately 13.8 billion years ago, is theorized to have created the universe.", a: "The Big Bang", points: 1000, type: "text" },
    { q: "This paradox asks: if the universe is infinite, why isn't the night sky uniformly bright?", a: "Olbers' Paradox", points: 1000, type: "text" }
  ],

  "Video Games": [
    { q: "This Italian plumber is Nintendo's flagship mascot.", a: "Mario", points: 200, type: "text" },
    { q: "In Pokemon, this electric mouse is the franchise's mascot.", a: "Pikachu", points: 200, type: "text" },
    { q: "This sandbox game by Mojang lets players build with blocks and is the best-selling video game.", a: "Minecraft", points: 200, type: "text" },
    { q: "This green-clad hero rescues Princess Zelda in his namesake series.", a: "Link", points: 200, type: "text" },
    { q: "This blue hedgehog created by Sega is known for running at super speed.", a: "Sonic", points: 200, type: "text" },
    { q: "This company makes the PlayStation console.", a: "Sony", points: 400, type: "text" },
    { q: "In Super Mario Bros., this large spiked turtle is Mario's main nemesis.", a: "Bowser", points: 400, type: "text" },
    { q: "This battle royale game by Epic Games features building mechanics and a Battle Bus.", a: "Fortnite", points: 400, type: "text" },
    { q: "This 1972 Atari game simulated table tennis and helped launch the arcade industry.", a: "Pong", points: 400, type: "text" },
    { q: "In The Legend of Zelda, this villain is the main antagonist, often a Gerudo king.", a: "Ganon", points: 400, type: "text" },
    { q: "This falling-block puzzle game was created by Soviet engineer Alexey Pajitnov.", a: "Tetris", points: 600, type: "text" },
    { q: "This Naughty Dog game follows Joel and Ellie in a post-apocalyptic world.", a: "The Last of Us", points: 600, type: "text" },
    { q: "In Metroid, this armor-clad bounty hunter protagonist is revealed to be a woman.", a: "Samus Aran", points: 600, type: "text" },
    { q: "This 1986 Capcom series stars a robot also known in Japan as Rockman.", a: "Mega Man", points: 600, type: "text" },
    { q: "This open-world Rockstar series features cities like Vice City and Liberty City.", a: "Grand Theft Auto", points: 600, type: "text" },
    { q: "This yellow circle eats dots and avoids ghosts named Blinky, Pinky, Inky, and Clyde.", a: "Pac-Man", points: 800, type: "text" },
    { q: "This 2009 FromSoftware game launched the 'Souls' genre.", a: "Demon's Souls", points: 800, type: "text" },
    { q: "In Final Fantasy VII, this spiky-haired ex-SOLDIER is the protagonist.", a: "Cloud Strife", points: 800, type: "text" },
    { q: "This Valve game features a player using a portal gun, guided by the AI GLaDOS.", a: "Portal", points: 800, type: "text" },
    { q: "Super Mario Bros. debuted in 1985 on this Nintendo home console.", a: "Nintendo Entertainment System (NES)", points: 800, type: "text" },
    { q: "This Japanese designer created The Legend of Zelda and Super Mario Bros. for Nintendo.", a: "Shigeru Miyamoto", points: 1000, type: "text" },
    { q: "This influential 1962 game, often called the first true video game, was created by Steve Russell and team at MIT.", a: "Spacewar!", points: 1000, type: "text" },
    { q: "In EarthBound (Mother 2), this is the name of the young protagonist with psychic powers.", a: "Ness", points: 1000, type: "text" },
    { q: "This 1983 industry collapse in North America is named for the year it primarily occurred.", a: "The Video Game Crash of 1983", points: 1000, type: "text" },
    { q: "This studio behind early adventure games like King's Quest was co-founded by Roberta Williams.", a: "Sierra On-Line", points: 1000, type: "text" }
  ],

  "Anime & Manga": [
    { q: "This ninja-themed anime follows a boy named Naruto Uzumaki.", a: "Naruto", points: 200, type: "text" },
    { q: "In Dragon Ball, this Saiyan protagonist with spiky hair seeks the dragon balls.", a: "Goku", points: 200, type: "text" },
    { q: "This anime and manga features pirates and a hero named Monkey D. Luffy.", a: "One Piece", points: 200, type: "text" },
    { q: "This series features humans fighting giant humanoid Titans behind walls.", a: "Attack on Titan", points: 200, type: "text" },
    { q: "This Studio Ghibli film follows a girl named Chihiro in a spirit bathhouse.", a: "Spirited Away", points: 200, type: "text" },
    { q: "This anime features a notebook that kills anyone whose name is written in it.", a: "Death Note", points: 400, type: "text" },
    { q: "In Death Note, this is the high schooler who finds the notebook.", a: "Light Yagami", points: 400, type: "text" },
    { q: "This series features Tanjiro Kamado hunting demons to cure his sister Nezuko.", a: "Demon Slayer", points: 400, type: "text" },
    { q: "This anime stars Edward and Alphonse Elric, who use alchemy.", a: "Fullmetal Alchemist", points: 400, type: "text" },
    { q: "This Studio Ghibli co-founder directed Spirited Away and My Neighbor Totoro.", a: "Hayao Miyazaki", points: 400, type: "text" },
    { q: "In My Hero Academia, this is the name of the superpowers most people possess.", a: "Quirks", points: 600, type: "text" },
    { q: "This mecha series features Shinji Ikari piloting a giant biomechanical Eva.", a: "Neon Genesis Evangelion", points: 600, type: "text" },
    { q: "In Fullmetal Alchemist, this taboo is the act of bringing the dead back to life.", a: "Human transmutation", points: 600, type: "text" },
    { q: "This 1988 film by Katsuhiro Otomo is set in a dystopian Neo-Tokyo.", a: "Akira", points: 600, type: "text" },
    { q: "This space-western anime follows bounty hunter Spike Spiegel aboard the Bebop.", a: "Cowboy Bebop", points: 600, type: "text" },
    { q: "This long-running manga by Eiichiro Oda began serialization in 1997.", a: "One Piece", points: 800, type: "text" },
    { q: "In Naruto, this is the name of the nine-tailed fox sealed inside the protagonist.", a: "Kurama", points: 800, type: "text" },
    { q: "This Osamu Tezuka creation about a robot boy is often called the godfather of anime.", a: "Astro Boy", points: 800, type: "text" },
    { q: "This weekly Shueisha magazine serializes One Piece and (formerly) Naruto.", a: "Weekly Shonen Jump", points: 800, type: "text" },
    { q: "In Cowboy Bebop, this is the name of the Welsh Corgi aboard the ship.", a: "Ein", points: 800, type: "text" },
    { q: "This term refers to Japanese comics, distinct from animated anime.", a: "Manga", points: 1000, type: "text" },
    { q: "This 1979 series created the Gundam franchise; its giant piloted robots are this type of suit.", a: "Mobile Suit", points: 1000, type: "text" },
    { q: "This celebrated author created Dragon Ball and designed characters for Dragon Quest.", a: "Akira Toriyama", points: 1000, type: "text" },
    { q: "In Neon Genesis Evangelion, this organization, led by Gendo Ikari, builds the Evas.", a: "NERV", points: 1000, type: "text" },
    { q: "This studio produced Neon Genesis Evangelion in 1995.", a: "Gainax", points: 1000, type: "text" }
  ],

  "Superheroes": [
    { q: "This Kryptonian hero wears a red cape and an S on his chest.", a: "Superman", points: 200, type: "text" },
    { q: "This caped crusader protects Gotham City and has no superpowers.", a: "Batman", points: 200, type: "text" },
    { q: "This web-slinging Marvel hero is the alter ego of Peter Parker.", a: "Spider-Man", points: 200, type: "text" },
    { q: "This Amazonian princess wields a Lasso of Truth.", a: "Wonder Woman", points: 200, type: "text" },
    { q: "This green Avenger grows large and strong when angry; he is Bruce Banner.", a: "The Hulk", points: 200, type: "text" },
    { q: "This Marvel hero is a billionaire inventor who wears a powered suit of armor.", a: "Iron Man", points: 400, type: "text" },
    { q: "This Norse god of thunder wields the hammer Mjolnir in Marvel comics.", a: "Thor", points: 400, type: "text" },
    { q: "This city is home to Superman and the Daily Planet newspaper.", a: "Metropolis", points: 400, type: "text" },
    { q: "This team of mutants is led by Professor X in Marvel comics.", a: "The X-Men", points: 400, type: "text" },
    { q: "This clawed, regenerating X-Men member is also known as Logan.", a: "Wolverine", points: 400, type: "text" },
    { q: "This is Batman's loyal butler at Wayne Manor.", a: "Alfred Pennyworth", points: 600, type: "text" },
    { q: "This is the planet Superman came from before it was destroyed.", a: "Krypton", points: 600, type: "text" },
    { q: "This green substance is Superman's primary weakness.", a: "Kryptonite", points: 600, type: "text" },
    { q: "This Marvel hero is the king of the fictional African nation of Wakanda.", a: "Black Panther", points: 600, type: "text" },
    { q: "This clown-faced criminal is Batman's archenemy in Gotham.", a: "The Joker", points: 600, type: "text" },
    { q: "This artist co-created Spider-Man with Stan Lee and defined the character's look.", a: "Steve Ditko", points: 800, type: "text" },
    { q: "This is the New York City borough where Peter Parker was raised.", a: "Queens", points: 800, type: "text" },
    { q: "The Flash draws his speed from this energy field in DC Comics.", a: "The Speed Force", points: 800, type: "text" },
    { q: "This is the real first name of Wonder Woman.", a: "Diana", points: 800, type: "text" },
    { q: "This corps of intergalactic peacekeepers wields rings powered by willpower in DC.", a: "Green Lantern Corps", points: 800, type: "text" },
    { q: "This writer and editor co-created many Marvel heroes and was known for the phrase Excelsior.", a: "Stan Lee", points: 1000, type: "text" },
    { q: "This artist co-created Captain America and the X-Men with Stan Lee.", a: "Jack Kirby", points: 1000, type: "text" },
    { q: "This 1938 comic book issue introduced Superman.", a: "Action Comics #1", points: 1000, type: "text" },
    { q: "This 1939 comic introduced Batman.", a: "Detective Comics #27", points: 1000, type: "text" },
    { q: "This is Wonder Woman's home island, populated by Amazons.", a: "Themyscira", points: 1000, type: "text" }
  ],

  "Football (Soccer)": [
    { q: "This South American country has won the FIFA World Cup a record five times.", a: "Brazil", points: 200, type: "text" },
    { q: "This Argentine legend, known for the 'Hand of God' goal, wore the number 10 shirt.", a: "Diego Maradona", points: 200, type: "text" },
    { q: "A standard football match is divided into two halves of this many minutes each.", a: "45 minutes", points: 200, type: "text" },
    { q: "This card is shown by a referee to send a player off the field.", a: "Red card", points: 200, type: "text" },
    { q: "This Spanish club, based in the Catalan capital, is nicknamed Barca.", a: "FC Barcelona", points: 200, type: "text" },
    { q: "This Portuguese forward, famous for his 'Siuuu' celebration, played for Manchester United and Real Madrid.", a: "Cristiano Ronaldo", points: 400, type: "text" },
    { q: "This country hosted and won the very first FIFA World Cup in 1930.", a: "Uruguay", points: 400, type: "text" },
    { q: "The top scorer at the World Cup is awarded this footwear-named trophy.", a: "Golden Boot", points: 400, type: "text" },
    { q: "This English stadium in London is the national football venue, known for its iconic arch.", a: "Wembley Stadium", points: 400, type: "text" },
    { q: "This term describes a player scoring three goals in a single match.", a: "Hat-trick", points: 400, type: "text" },
    { q: "This German city's club Bayern is one of the most successful teams in Europe.", a: "Munich", points: 600, type: "text" },
    { q: "This Italian goalkeeper captained Italy to victory at the 2006 World Cup.", a: "Gianluigi Buffon", points: 600, type: "text" },
    { q: "This French striker scored a hat-trick in the 2022 World Cup final yet finished on the losing side.", a: "Kylian Mbappe", points: 600, type: "text" },
    { q: "This annual award, given by France Football, honors the world's best player with a golden trophy.", a: "Ballon d'Or", points: 600, type: "text" },
    { q: "This Dutch total-football icon gave his name to a famous turn move.", a: "Johan Cruyff", points: 600, type: "text" },
    { q: "This African nation, the Indomitable Lions, reached the World Cup quarterfinals in 1990.", a: "Cameroon", points: 800, type: "text" },
    { q: "This Brazilian, nicknamed 'O Fenomeno', won the Golden Boot at the 2002 World Cup.", a: "Ronaldo (Nazario)", points: 800, type: "text" },
    { q: "This English club from Merseyside won the European Cup in 1977, 1978, 1981, 1984, and 2005.", a: "Liverpool", points: 800, type: "text" },
    { q: "This Hungarian forward led the 'Magnificent Magyars' of the 1950s and later starred for Real Madrid.", a: "Ferenc Puskas", points: 800, type: "text" },
    { q: "This defensive tactic involves stepping up in a line to catch attackers offside.", a: "Offside trap", points: 800, type: "text" },
    { q: "This Italian club, nicknamed the Old Lady, is based in Turin.", a: "Juventus", points: 1000, type: "text" },
    { q: "This goalkeeper, the only one to win the Ballon d'Or, played for the Soviet Union and was nicknamed the Black Spider.", a: "Lev Yashin", points: 1000, type: "text" },
    { q: "This stadium in Rio de Janeiro hosted the 1950 World Cup final, where Uruguay shocked Brazil.", a: "Maracana", points: 1000, type: "text" },
    { q: "This Northern Irish forward for Manchester United in the 1960s was nicknamed 'El Beatle' for his fame.", a: "George Best", points: 1000, type: "text" },
    { q: "This French striker scored the golden goal that won France the 2000 European Championship.", a: "David Trezeguet", points: 1000, type: "text" }
  ],

  "Cars & Automotive": [
    { q: "This American carmaker, founded by Henry, popularized the assembly line with the Model T.", a: "Ford", points: 200, type: "text" },
    { q: "A three-pointed star is the logo of this German luxury brand.", a: "Mercedes-Benz", points: 200, type: "text" },
    { q: "This part of a car, located under the hood, is often measured in horsepower.", a: "Engine", points: 200, type: "text" },
    { q: "This Italian sports car brand uses a prancing horse as its logo.", a: "Ferrari", points: 200, type: "text" },
    { q: "This pedal, pressed to slow or stop a car, works the opposite of the gas pedal.", a: "Brake", points: 200, type: "text" },
    { q: "This German brand's name translates to 'people's car' and makes the Beetle.", a: "Volkswagen", points: 400, type: "text" },
    { q: "This Japanese automaker produces the Corolla, one of the best-selling cars of all time.", a: "Toyota", points: 400, type: "text" },
    { q: "This safety device inflates rapidly during a crash to cushion occupants.", a: "Airbag", points: 400, type: "text" },
    { q: "This American electric car company is led by Elon Musk and makes the Model S.", a: "Tesla", points: 400, type: "text" },
    { q: "This British car brand famously associated with James Bond made the DB5.", a: "Aston Martin", points: 400, type: "text" },
    { q: "This British luxury brand, known for the Spirit of Ecstasy hood ornament, makes the Phantom.", a: "Rolls-Royce", points: 600, type: "text" },
    { q: "This German engineer is credited with inventing the first practical automobile in 1886.", a: "Karl Benz", points: 600, type: "text" },
    { q: "This Italian supercar maker, named after its founder, produces the Aventador.", a: "Lamborghini", points: 600, type: "text" },
    { q: "This system of gears that transfers engine power to the wheels can be manual or automatic.", a: "Transmission", points: 600, type: "text" },
    { q: "This Chevrolet muscle car, sharing its name with a small spotted wildcat, debuted in 1966.", a: "Camaro", points: 600, type: "text" },
    { q: "This French brand, known for soft suspension and the DS model, has a double-chevron logo.", a: "Citroen", points: 800, type: "text" },
    { q: "This rotary engine design, used famously by Mazda, is named after its German inventor.", a: "Wankel engine", points: 800, type: "text" },
    { q: "This British sports car maker, founded by Colin Chapman, built lightweight cars like the Esprit.", a: "Lotus", points: 800, type: "text" },
    { q: "This 1960s Jaguar sports car was famously praised by Enzo Ferrari as a beautiful design.", a: "Jaguar E-Type", points: 800, type: "text" },
    { q: "This part of an internal combustion engine ignites the fuel-air mixture with a spark.", a: "Spark plug", points: 800, type: "text" },
    { q: "This French automaker built the Type 35 racing car and was revived for the hypercar Veyron.", a: "Bugatti", points: 1000, type: "text" },
    { q: "This German maker's iconic 911 sports car uses a rear-engine layout.", a: "Porsche", points: 1000, type: "text" },
    { q: "This Czech automaker, one of the oldest in the world, is now part of the Volkswagen Group.", a: "Skoda", points: 1000, type: "text" },
    { q: "This emissions-reducing device in an exhaust system uses precious metals to convert harmful gases.", a: "Catalytic converter", points: 1000, type: "text" },
    { q: "This American luxury brand, a division of General Motors, was named after the founder of Detroit.", a: "Cadillac", points: 1000, type: "text" }
  ],

  "Internet Culture": [
    { q: "This term describes a humorous image, video, or text that spreads rapidly online.", a: "Meme", points: 200, type: "text" },
    { q: "This video platform, owned by Google, is the largest site for sharing videos.", a: "YouTube", points: 200, type: "text" },
    { q: "This symbol, used to tag topics on social media, is also called the pound sign.", a: "Hashtag", points: 200, type: "text" },
    { q: "This short-form acronym means 'laughing out loud' in online chat.", a: "LOL", points: 200, type: "text" },
    { q: "This photo-sharing app, owned by Meta, is known for filters and Stories.", a: "Instagram", points: 200, type: "text" },
    { q: "This 1980s Rick Astley music video became the basis for the prank known as 'Rickrolling'.", a: "Never Gonna Give You Up", points: 400, type: "text" },
    { q: "This term refers to deliberately posting inflammatory messages online to provoke others.", a: "Trolling", points: 400, type: "text" },
    { q: "This Shiba Inu dog became a famous meme often paired with broken-English Comic Sans text.", a: "Doge", points: 400, type: "text" },
    { q: "This online encyclopedia, editable by anyone, launched in 2001.", a: "Wikipedia", points: 400, type: "text" },
    { q: "This term describes a video or post that achieves sudden, massive popularity online.", a: "Going viral", points: 400, type: "text" },
    { q: "This 2012 K-pop song by Psy was the first YouTube video to reach one billion views.", a: "Gangnam Style", points: 600, type: "text" },
    { q: "This early-2000s social network, with a 'Top 8' friends feature, was hugely popular before Facebook.", a: "MySpace", points: 600, type: "text" },
    { q: "This grumpy-faced cat named Tardar Sauce became a beloved meme around 2012.", a: "Grumpy Cat", points: 600, type: "text" },
    { q: "This anonymous imageboard, founded in 2003, was an early source of many internet memes.", a: "4chan", points: 600, type: "text" },
    { q: "This acronym for 'fear of missing out' describes anxiety from seeing others' online activities.", a: "FOMO", points: 600, type: "text" },
    { q: "This dancing baby animation, spread via email in the mid-1990s, is considered one of the first viral memes.", a: "Dancing Baby", points: 800, type: "text" },
    { q: "This term refers to a block of text copied and pasted repeatedly across the internet.", a: "Copypasta", points: 800, type: "text" },
    { q: "This website, calling itself 'the front page of the internet', is organized into communities called subreddits.", a: "Reddit", points: 800, type: "text" },
    { q: "This 2000s meme phrase, from a mistranslated game, declared 'All your base are belong to' this word.", a: "Us", points: 800, type: "text" },
    { q: "This AOL instant-messaging service of the 1990s and 2000s was abbreviated this way.", a: "AIM", points: 800, type: "text" },
    { q: "This 2010s meme format shows a man looking back at another woman while with his partner; it is called 'Distracted' this.", a: "Boyfriend", points: 1000, type: "text" },
    { q: "This early lolcats site paired cat photos with intentionally misspelled captions like 'I Can Has' this food.", a: "Cheezburger", points: 1000, type: "text" },
    { q: "A 1993 New Yorker cartoon coined the phrase 'On the internet, nobody knows you're a' this animal.", a: "Dog", points: 1000, type: "text" },
    { q: "This green frog character became a widespread reaction meme.", a: "Pepe (the Frog)", points: 1000, type: "text" },
    { q: "This blogging platform, launched in 2007 and known for short posts and GIFs, was acquired by Yahoo in 2013.", a: "Tumblr", points: 1000, type: "text" }
  ],

  "Mythology": [
    { q: "This king of the Greek gods ruled from Mount Olympus and wielded thunderbolts.", a: "Zeus", points: 200, type: "text" },
    { q: "In Norse mythology, this hammer-wielding god of thunder is the son of Odin.", a: "Thor", points: 200, type: "text" },
    { q: "This Greek hero was famous for completing twelve labors.", a: "Heracles (Hercules)", points: 200, type: "text" },
    { q: "This winged horse of Greek myth sprang from the blood of Medusa.", a: "Pegasus", points: 200, type: "text" },
    { q: "This Roman god of war gave his name to the fourth planet from the Sun.", a: "Mars", points: 200, type: "text" },
    { q: "This Greek goddess of wisdom and warfare was the patron of Athens.", a: "Athena", points: 400, type: "text" },
    { q: "In Egyptian mythology, this falcon-headed sky god was the son of Osiris and Isis.", a: "Horus", points: 400, type: "text" },
    { q: "This one-eyed chief god of the Norse pantheon presides over Asgard.", a: "Odin", points: 400, type: "text" },
    { q: "This Greek god of the sea carries a three-pronged trident.", a: "Poseidon", points: 400, type: "text" },
    { q: "This Greek messenger god wore winged sandals and a winged helmet.", a: "Hermes", points: 400, type: "text" },
    { q: "This Greek youth fell in love with his own reflection in a pool.", a: "Narcissus", points: 600, type: "text" },
    { q: "In Norse myth, this rainbow bridge connects Asgard to Midgard.", a: "Bifrost", points: 600, type: "text" },
    { q: "This Egyptian jackal-headed god was associated with mummification and the afterlife.", a: "Anubis", points: 600, type: "text" },
    { q: "This Greek hero slew the Minotaur in the Labyrinth on Crete.", a: "Theseus", points: 600, type: "text" },
    { q: "This Roman goddess of love and beauty is equivalent to the Greek Aphrodite.", a: "Venus", points: 600, type: "text" },
    { q: "This Titan was condemned to hold up the sky for eternity.", a: "Atlas", points: 800, type: "text" },
    { q: "In Hindu mythology, this elephant-headed god is the remover of obstacles.", a: "Ganesha", points: 800, type: "text" },
    { q: "This Greek musician charmed Hades to try to retrieve his wife Eurydice from the underworld.", a: "Orpheus", points: 800, type: "text" },
    { q: "This serpent in Norse myth encircles the world and is a child of Loki.", a: "Jormungandr", points: 800, type: "text" },
    { q: "This Greek hero used winged sandals and a reflective shield to behead Medusa.", a: "Perseus", points: 800, type: "text" },
    { q: "This three-headed dog guarded the entrance to the Greek underworld.", a: "Cerberus", points: 1000, type: "text" },
    { q: "This prophetess of Troy was fated never to be believed despite her accurate predictions.", a: "Cassandra", points: 1000, type: "text" },
    { q: "In Norse myth, this prophesied final battle brings about the death of many gods.", a: "Ragnarok", points: 1000, type: "text" },
    { q: "This Greek craftsman built wings of feathers and wax to escape Crete with his son Icarus.", a: "Daedalus", points: 1000, type: "text" },
    { q: "This Mesopotamian king is the hero of one of the oldest surviving works of literature.", a: "Gilgamesh", points: 1000, type: "text" }
  ],

  "World Religions": [
    { q: "This is the central holy text of Islam.", a: "The Quran", points: 200, type: "text" },
    { q: "This founder of Buddhism is also known as the Buddha.", a: "Siddhartha Gautama", points: 200, type: "text" },
    { q: "Christians believe this figure was born in Bethlehem and is central to their faith.", a: "Jesus", points: 200, type: "text" },
    { q: "This Jewish day of rest is observed from Friday evening to Saturday evening.", a: "Sabbath (Shabbat)", points: 200, type: "text" },
    { q: "This building is the Muslim place of worship.", a: "Mosque", points: 200, type: "text" },
    { q: "This holy city is sacred to Judaism, Christianity, and Islam.", a: "Jerusalem", points: 400, type: "text" },
    { q: "This Hindu and Buddhist concept refers to the cycle of action and consequence.", a: "Karma", points: 400, type: "text" },
    { q: "This annual Muslim pilgrimage to Mecca is one of the Five Pillars of Islam.", a: "Hajj", points: 400, type: "text" },
    { q: "This first book of the Hebrew Bible and Christian Old Testament describes creation.", a: "Genesis", points: 400, type: "text" },
    { q: "This Sikh place of worship is also called a gurdwara.", a: "Gurdwara", points: 400, type: "text" },
    { q: "This Hindu festival of lights is celebrated in autumn.", a: "Diwali", points: 600, type: "text" },
    { q: "This Jewish house of worship is also a center for study and community.", a: "Synagogue", points: 600, type: "text" },
    { q: "This month of fasting from dawn to sunset is observed by Muslims.", a: "Ramadan", points: 600, type: "text" },
    { q: "This founder of Sikhism was the first of its ten Gurus.", a: "Guru Nanak", points: 600, type: "text" },
    { q: "This collection of teachings forms the four sacred Vedas of Hinduism.", a: "The Vedas", points: 600, type: "text" },
    { q: "This Christian festival celebrates the resurrection of Jesus.", a: "Easter", points: 800, type: "text" },
    { q: "These four primary texts of the Christian New Testament recount the life of Jesus.", a: "The Gospels", points: 800, type: "text" },
    { q: "This eight-day Jewish festival of lights commemorates the rededication of the Second Temple.", a: "Hanukkah", points: 800, type: "text" },
    { q: "This figure is regarded in Islam as the final prophet.", a: "Muhammad", points: 800, type: "text" },
    { q: "This branch of Buddhism is prominent in Tibet and led by the Dalai Lama.", a: "Tibetan (Vajrayana) Buddhism", points: 800, type: "text" },
    { q: "This term refers to liberation from the cycle of rebirth in Hinduism.", a: "Moksha", points: 1000, type: "text" },
    { q: "This Japanese indigenous religion centers on the worship of kami, or spirits.", a: "Shinto", points: 1000, type: "text" },
    { q: "This Chinese philosophy and religion is traditionally attributed to Laozi.", a: "Taoism (Daoism)", points: 1000, type: "text" },
    { q: "This Jewish coming-of-age ceremony for a boy occurs at age thirteen.", a: "Bar Mitzvah", points: 1000, type: "text" },
    { q: "This ancient body of Jewish oral law and commentary is a central text of Rabbinic Judaism.", a: "The Talmud", points: 1000, type: "text" }
  ],

  "Chemistry": [
    { q: "This element has the chemical symbol O and is essential for breathing.", a: "Oxygen", points: 200, type: "text" },
    { q: "This is the chemical formula for water.", a: "H2O", points: 200, type: "text" },
    { q: "This lightest element has the atomic number 1.", a: "Hydrogen", points: 200, type: "text" },
    { q: "This precious metal has the chemical symbol Au.", a: "Gold", points: 200, type: "text" },
    { q: "This gas, with symbol CO2, is exhaled by humans and used by plants.", a: "Carbon dioxide", points: 200, type: "text" },
    { q: "This element with symbol Na is a key component of table salt.", a: "Sodium", points: 400, type: "text" },
    { q: "This term describes a substance with a pH less than 7.", a: "Acid", points: 400, type: "text" },
    { q: "This is the most abundant gas in Earth's atmosphere.", a: "Nitrogen", points: 400, type: "text" },
    { q: "This scientist is credited with creating the modern periodic table.", a: "Dmitri Mendeleev", points: 400, type: "text" },
    { q: "This element with symbol Fe is the main component of steel.", a: "Iron", points: 400, type: "text" },
    { q: "This positively charged subatomic particle is found in the nucleus.", a: "Proton", points: 600, type: "text" },
    { q: "This is the chemical symbol for the element potassium.", a: "K", points: 600, type: "text" },
    { q: "This process describes a liquid turning into a gas.", a: "Evaporation (vaporization)", points: 600, type: "text" },
    { q: "This noble gas, with symbol He, is lighter than air and used in balloons.", a: "Helium", points: 600, type: "text" },
    { q: "This number, roughly 6.022 times 10 to the 23rd, represents the particles in one mole.", a: "Avogadro's number", points: 600, type: "text" },
    { q: "This only liquid metal at room temperature has the symbol Hg.", a: "Mercury", points: 800, type: "text" },
    { q: "This type of chemical bond involves the sharing of electron pairs between atoms.", a: "Covalent bond", points: 800, type: "text" },
    { q: "This element with symbol C forms the basis of organic chemistry; diamond is one of its allotropes.", a: "Carbon", points: 800, type: "text" },
    { q: "This term describes a chemical reaction that releases heat.", a: "Exothermic", points: 800, type: "text" },
    { q: "This highly reactive element with symbol Cl is used to disinfect water.", a: "Chlorine", points: 800, type: "text" },
    { q: "This is the most electronegative element on the periodic table, with symbol F.", a: "Fluorine", points: 1000, type: "text" },
    { q: "This term refers to atoms of the same element with different numbers of neutrons.", a: "Isotopes", points: 1000, type: "text" },
    { q: "This element with symbol W, known for its high melting point, is used in light bulb filaments.", a: "Tungsten", points: 1000, type: "text" },
    { q: "This law states that, at constant temperature, the pressure of a gas is inversely proportional to its volume.", a: "Boyle's law", points: 1000, type: "text" },
    { q: "This process separates mixtures based on different boiling points, used to refine crude oil.", a: "Distillation", points: 1000, type: "text" }
  ],

  "Biology": [
    { q: "This is the basic structural and functional unit of all living organisms.", a: "Cell", points: 200, type: "text" },
    { q: "This green pigment allows plants to capture light energy.", a: "Chlorophyll", points: 200, type: "text" },
    { q: "This organ pumps blood throughout the human body.", a: "Heart", points: 200, type: "text" },
    { q: "This process is how plants make food using sunlight.", a: "Photosynthesis", points: 200, type: "text" },
    { q: "This molecule, abbreviated DNA, carries genetic information.", a: "DNA (deoxyribonucleic acid)", points: 200, type: "text" },
    { q: "This is the largest organ of the human body.", a: "Skin", points: 400, type: "text" },
    { q: "This part of the cell is known as its control center and contains DNA.", a: "Nucleus", points: 400, type: "text" },
    { q: "This scientist proposed the theory of evolution by natural selection.", a: "Charles Darwin", points: 400, type: "text" },
    { q: "This system in the human body includes the brain, spinal cord, and nerves.", a: "Nervous system", points: 400, type: "text" },
    { q: "This blood cell type fights infection and is part of the immune system.", a: "White blood cell", points: 400, type: "text" },
    { q: "This organelle is often called the powerhouse of the cell.", a: "Mitochondria", points: 600, type: "text" },
    { q: "This process by which cells divide to produce two identical daughter cells.", a: "Mitosis", points: 600, type: "text" },
    { q: "This protein in red blood cells carries oxygen.", a: "Hemoglobin", points: 600, type: "text" },
    { q: "This kingdom of life includes mushrooms, molds, and yeasts.", a: "Fungi", points: 600, type: "text" },
    { q: "This monk is considered the father of genetics for his work with pea plants.", a: "Gregor Mendel", points: 600, type: "text" },
    { q: "This term describes an animal that eats only plants.", a: "Herbivore", points: 800, type: "text" },
    { q: "This type of cell division produces gametes with half the number of chromosomes.", a: "Meiosis", points: 800, type: "text" },
    { q: "This part of the plant cell, made of cellulose, provides structure and is absent in animal cells.", a: "Cell wall", points: 800, type: "text" },
    { q: "This biological molecule serves as the main energy currency of the cell.", a: "ATP (adenosine triphosphate)", points: 800, type: "text" },
    { q: "This term refers to a group of organisms that can interbreed and produce fertile offspring.", a: "Species", points: 800, type: "text" },
    { q: "This naming system, devised by Carl Linnaeus, gives each species a two-part Latin name.", a: "Binomial nomenclature", points: 1000, type: "text" },
    { q: "This enzyme unwinds the DNA double helix during replication.", a: "Helicase", points: 1000, type: "text" },
    { q: "This part of the brain is responsible for balance and coordination.", a: "Cerebellum", points: 1000, type: "text" },
    { q: "This process in cellular respiration occurs in the cytoplasm and breaks down glucose into pyruvate.", a: "Glycolysis", points: 1000, type: "text" },
    { q: "This term describes the maintenance of a stable internal environment in an organism.", a: "Homeostasis", points: 1000, type: "text" }
  ],

  "Flags of the World": [
    { q: "Easy one to start: which country does this flag belong to?", a: "Japan", points: 200, type: "image", emoji: "🇯🇵" },
    { q: "Which country does this flag belong to?", a: "United States", points: 200, type: "image", emoji: "🇺🇸" },
    { q: "Which country does this flag belong to?", a: "United Kingdom", points: 200, type: "image", emoji: "🇬🇧" },
    { q: "Which country does this flag belong to?", a: "Canada", points: 200, type: "image", emoji: "🇨🇦" },
    { q: "Which country does this flag belong to?", a: "Brazil", points: 200, type: "image", emoji: "🇧🇷" },
    { q: "Which country does this flag belong to?", a: "France", points: 400, type: "image", emoji: "🇫🇷" },
    { q: "Which country does this flag belong to?", a: "Germany", points: 400, type: "image", emoji: "🇩🇪" },
    { q: "Which country does this flag belong to?", a: "Italy", points: 400, type: "image", emoji: "🇮🇹" },
    { q: "Which country does this flag belong to?", a: "China", points: 400, type: "image", emoji: "🇨🇳" },
    { q: "Which country does this flag belong to?", a: "India", points: 400, type: "image", emoji: "🇮🇳" },
    { q: "Getting trickier &mdash; which country does this flag belong to?", a: "Spain", points: 600, type: "image", emoji: "🇪🇸" },
    { q: "Which country does this flag belong to?", a: "South Korea", points: 600, type: "image", emoji: "🇰🇷" },
    { q: "Which country does this flag belong to?", a: "Mexico", points: 600, type: "image", emoji: "🇲🇽" },
    { q: "Which country does this flag belong to?", a: "Turkey", points: 600, type: "image", emoji: "🇹🇷" },
    { q: "Which country does this flag belong to?", a: "Greece", points: 600, type: "image", emoji: "🇬🇷" },
    { q: "Tough one: which country does this flag belong to?", a: "Portugal", points: 800, type: "image", emoji: "🇵🇹" },
    { q: "Which country does this flag belong to?", a: "South Africa", points: 800, type: "image", emoji: "🇿🇦" },
    { q: "Which country does this flag belong to?", a: "Argentina", points: 800, type: "image", emoji: "🇦🇷" },
    { q: "Careful, this red-and-white flag is often confused with Monaco &mdash; which country is it?", a: "Indonesia", points: 800, type: "image", emoji: "🇮🇩" },
    { q: "Which country does this flag belong to?", a: "Philippines", points: 800, type: "image", emoji: "🇵🇭" },
    { q: "Expert level &mdash; this flag is nearly identical to Romania's. Which country is it?", a: "Chad", points: 1000, type: "image", emoji: "🇹🇩" },
    { q: "Very few people get this one. Which country does this flag belong to?", a: "Bhutan", points: 1000, type: "image", emoji: "🇧🇹" },
    { q: "Which Central Asian country does this flag belong to?", a: "Kazakhstan", points: 1000, type: "image", emoji: "🇰🇿" },
    { q: "Which Central Asian country does this flag belong to?", a: "Turkmenistan", points: 1000, type: "image", emoji: "🇹🇲" },
    { q: "Final boss flag: which Pacific island nation is this?", a: "Kiribati", points: 1000, type: "image", emoji: "🇰🇮" }
  ]
};

// Merge in the broad, exciting themes built from the J!Archive dataset
// (loaded via jeopardy-data.js before this file). Each theme holds a large pool
// of real clues per point tier, so every click pulls a fresh random question.
if (typeof REAL_CATEGORIES !== 'undefined') {
  Object.assign(QUESTION_BANK, REAL_CATEGORIES);
}

// Curate the playable board to 25 broad, exciting categories. Anything not in
// this list (older narrow placeholders) is removed from the active set.
const ACTIVE_CATEGORIES = [
  // Real Jeopardy themes (hundreds of well-known clues, fully randomized)
  'General Knowledge', 'Sports', 'History', 'Geography', 'Movies & TV', 'Music & Songs',
  'Science', 'Animals & Nature', 'Food & Drink', 'Literature', 'Art & Culture', 'Word Play',
  'Pop Culture', 'Technology', 'Space & Astronomy', 'Business & Brands',
  // Bonus curated genres (modern topics the classic dataset lacks)
  'Video Games', 'Anime & Manga', 'Superheroes', 'Football (Soccer)',
  'Cars & Automotive', 'Internet Culture', 'Mythology', 'World Religions', 'Flags of the World'
];
Object.keys(QUESTION_BANK).forEach(k => {
  if (ACTIVE_CATEGORIES.indexOf(k) === -1) delete QUESTION_BANK[k];
});

// Sprinkle a few rapid-fire interactive challenges into fitting categories.
if (QUESTION_BANK['Geography']) {
  QUESTION_BANK['Geography'].push(
    { q: "Name 30 European countries in 60 seconds!", a: null, points: 1000, type: "interactive", challenge: "european_countries", timeLimit: 60, target: 30 },
    { q: "Name 25 world capitals in 60 seconds!", a: null, points: 800, type: "interactive", challenge: "world_capitals", timeLimit: 60, target: 25 }
  );
}
if (QUESTION_BANK['General Knowledge']) {
  QUESTION_BANK['General Knowledge'].push(
    { q: "Name 20 U.S. states in 45 seconds!", a: null, points: 800, type: "interactive", challenge: "us_states", timeLimit: 45, target: 20 }
  );
}

// Interactive challenge answer sets
const CHALLENGE_ANSWERS = {
  european_countries: [
    "albania", "andorra", "armenia", "austria", "azerbaijan", "belarus", "belgium",
    "bosnia", "bosnia and herzegovina", "bulgaria", "croatia", "cyprus", "czech republic",
    "czechia", "denmark", "estonia", "finland", "france", "georgia", "germany",
    "greece", "hungary", "iceland", "ireland", "italy", "kazakhstan", "kosovo",
    "latvia", "liechtenstein", "lithuania", "luxembourg", "malta", "moldova",
    "monaco", "montenegro", "netherlands", "north macedonia", "macedonia", "norway",
    "poland", "portugal", "romania", "russia", "san marino", "serbia", "slovakia",
    "slovenia", "spain", "sweden", "switzerland", "turkey", "ukraine",
    "united kingdom", "uk", "vatican", "vatican city", "england", "scotland", "wales"
  ],
  us_states: [
    "alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut",
    "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa",
    "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan",
    "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada",
    "new hampshire", "new jersey", "new mexico", "new york", "north carolina",
    "north dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "rhode island",
    "south carolina", "south dakota", "tennessee", "texas", "utah", "vermont",
    "virginia", "washington", "west virginia", "wisconsin", "wyoming"
  ],
  world_capitals: [
    "tokyo", "delhi", "beijing", "moscow", "london", "paris", "berlin", "madrid",
    "rome", "lisbon", "vienna", "brussels", "amsterdam", "copenhagen", "stockholm",
    "oslo", "helsinki", "warsaw", "prague", "budapest", "bucharest", "sofia",
    "athens", "ankara", "cairo", "nairobi", "pretoria", "canberra", "wellington",
    "ottawa", "washington", "brasilia", "buenos aires", "santiago", "lima", "bogota",
    "mexico city", "havana", "dublin", "reykjavik", "bangkok", "hanoi", "jakarta",
    "manila", "seoul", "taipei", "kabul", "baghdad", "tehran", "riyadh"
  ]
};

// Image question templates (using CSS/emoji representations)
const IMAGE_TEMPLATES = {
  south_america: {
    type: "continent_shape",
    emoji: "🌎",
    cssShape: "south-america",
    description: "A triangular landmass tapering to the south, with the Andes along the western edge"
  },
  landmark_eiffel: {
    type: "landmark",
    emoji: "🗼",
    name: "A famous iron lattice tower in Paris",
    answer: "Eiffel Tower"
  },
  landmark_pyramid: {
    type: "landmark",
    emoji: "🔺",
    name: "Ancient triangular stone structures in the desert",
    answer: "The Pyramids of Giza"
  },
  flag_japan: {
    type: "flag",
    colors: ["white", "red"],
    pattern: "circle",
    answer: "Japan"
  }
};

// Helper to get questions for a category at a specific point value
function getQuestionsByPoints(category, points) {
  if (!QUESTION_BANK[category]) return [];
  return QUESTION_BANK[category].filter(q => q.points === points);
}

// Helper to get a random question from a category at a point value
function getRandomQuestion(category, points) {
  const questions = getQuestionsByPoints(category, points);
  if (questions.length === 0) return null;
  return questions[Math.floor(Math.random() * questions.length)];
}

// Get all available categories
function getAvailableCategories() {
  return Object.keys(QUESTION_BANK);
}

// Build a game board from selected categories
function buildGameBoard(selectedCategories) {
  const board = {};
  const pointValues = [200, 400, 600, 800, 1000];

  selectedCategories.forEach(category => {
    board[category] = [];
    pointValues.forEach(points => {
      const question = getRandomQuestion(category, points);
      if (question) {
        board[category].push({ ...question });
      } else {
        // Fallback: pick any question from the category and adjust points
        const allQ = QUESTION_BANK[category];
        if (allQ && allQ.length > 0) {
          const fallback = allQ[Math.floor(Math.random() * allQ.length)];
          board[category].push({ ...fallback, points: points });
        }
      }
    });
  });

  return board;
}
