// FIFA Men's World Cup Quiz Questions Database

const ROUND_1_QUESTIONS = [
  {
    question: "Identify the player shown in this picture (his face is hidden!):",
    options: ["Eden Hazard", "Romelu Lukaku", "Kevin De Bruyne", "Dries Mertens"],
    correctIndex: 2,
    image: "images/player.jpg",
    hideFace: true,
    explanation: "Kevin De Bruyne is the creative playmaker for Belgium and Manchester City, famously wearing the number 7 jersey for his national team."
  },
  {
    question: "Who is the oldest goalkeeper to have ever played in a FIFA World Cup tournament?",
    options: ["Faryd Mondragón (Colombia)", "Dino Zoff (Italy)", "Essam El-Hadary (Egypt)", "Peter Shilton (England)"],
    correctIndex: 2,
    explanation: "Egypt's Essam El-Hadary became the oldest goalkeeper and player in World Cup history at 45 years and 161 days old when he played against Saudi Arabia in the 2018 tournament."
  },
  {
    question: "How many countries are hosting the 2026 FIFA World Cup?",
    options: ["1", "2", "3", "4"],
    correctIndex: 2,
    explanation: "The 2026 FIFA World Cup is jointly hosted by three countries: Canada, Mexico, and the United States."
  },
  {
    question: "How many teams are participating in the 2026 FIFA World Cup?",
    options: ["32", "40", "48", "64"],
    correctIndex: 2,
    explanation: "The 2026 tournament features an expanded format with 48 participating teams, up from the previous 32-team format."
  },
  {
    question: "How many matches in total will be played in the 2026 FIFA World Cup?",
    options: ["64", "80", "96", "104"],
    correctIndex: 3,
    explanation: "Due to the expanded 48-team format, the 2026 World Cup will feature a record-breaking 104 matches."
  },
  {
    question: "Who was the official mascot for the 1998 FIFA World Cup held in France?",
    options: ["Footix", "Zakumi", "Fuleco", "Ciao"],
    correctIndex: 0,
    explanation: "Footix, a blue cockerel representing France's national emblem, was the popular official mascot of the 1998 World Cup."
  },
  {
    question: "Which nation has hosted (or co-hosted) the FIFA World Cup the most times?",
    options: ["Brazil", "Germany", "Mexico", "Italy"],
    correctIndex: 2,
    explanation: "Mexico has hosted the tournament a record three times (1970, 1986, and as a co-host in 2026)."
  },
  {
    question: "How many players have scored a hat-trick in a FIFA World Cup final match?",
    options: ["1", "2", "3", "4"],
    correctIndex: 1,
    explanation: "Only two players have scored a hat-trick in a Men's World Cup final: Geoff Hurst (England in 1966) and Kylian Mbappé (France in 2022)."
  },
  {
    question: "Which country has won the most FIFA World Cup titles in history?",
    options: ["Germany", "Italy", "Brazil", "Argentina"],
    correctIndex: 2,
    explanation: "Brazil holds the record with five FIFA World Cup trophies (1958, 1962, 1970, 1994, and 2002)."
  },
  {
    question: "Which country has played in every single FIFA World Cup tournament?",
    options: ["Germany", "Italy", "Argentina", "Brazil"],
    correctIndex: 3,
    explanation: "Brazil is the only country to have qualified for and participated in all 22 FIFA World Cup tournaments since the inaugural tournament in 1930."
  },
  {
    question: "Which country has reached the FIFA World Cup final the most times without ever winning the title?",
    options: ["Croatia", "Sweden", "Hungary", "Netherlands"],
    correctIndex: 3,
    explanation: "The Netherlands has reached the World Cup final three times (1974, 1978, and 2010) but lost all three, holding the record for the most final appearances without a victory."
  },
  {
    question: "Who is the only player to have won three FIFA World Cup trophies as a player?",
    options: ["Pelé", "Diego Maradona", "Ronaldo Nazário", "Franz Beckenbauer"],
    correctIndex: 0,
    explanation: "The legendary Brazilian forward Pelé won the World Cup in 1958, 1962, and 1970, making him the only player to win the tournament three times."
  },
  {
    question: "Which country hosted the 1994 FIFA World Cup, which concluded with the first-ever penalty shootout in a final?",
    options: ["Italy", "United States", "France", "Japan"],
    correctIndex: 1,
    explanation: "The 1994 World Cup was hosted by the United States and was decided by a penalty shootout in the final, where Brazil defeated Italy."
  },
  {
    question: "Who won the Best Young Player award at the 2018 FIFA World Cup in Russia?",
    options: ["Kylian Mbappé", "Benjamin Pavard", "Youri Tielemans", "Julian Brandt"],
    correctIndex: 0,
    explanation: "France's Kylian Mbappé won the Best Young Player award in 2018 after scoring four goals in the tournament, including one in the final."
  },
  {
    question: "Which country won the 2010 FIFA World Cup, winning all four of their knockout stage matches by a score of 1-0?",
    options: ["Germany", "Netherlands", "Spain", "Argentina"],
    correctIndex: 2,
    explanation: "Spain won their first World Cup in 2010 with a defensive masterclass, defeating Portugal, Paraguay, Germany, and the Netherlands all by a score of 1-0."
  },
  {
    question: "Under which continental football confederation does Uzbekistan play?",
    options: ["UEFA", "AFC", "CAF", "OFC"],
    correctIndex: 1,
    explanation: "Uzbekistan belongs to the Asian Football Confederation (AFC), having officially joined it in 1994."
  },
  {
    question: "Which player scored a famous 'flying header' goal for the Netherlands against Spain in the 2014 World Cup?",
    options: ["Arjen Robben", "Robin van Persie", "Wesley Sneijder", "Dirk Kuyt"],
    correctIndex: 1,
    explanation: "Robin van Persie scored a spectacular diving header from a long-range pass, helping the Netherlands defeat Spain 5-1 in the group stage."
  },
  {
    question: "Which nation won the 1954 FIFA World Cup in a match famously known as the 'Miracle of Bern'?",
    options: ["West Germany", "Hungary", "Austria", "Uruguay"],
    correctIndex: 0,
    explanation: "West Germany defeated the legendary, heavily favored Hungarian team 3-2 in the 1954 final, a historic upset known as the 'Miracle of Bern'."
  },
  {
    question: "Who is the all-time leading FIFA World Cup goalscorer for England, with 10 goals?",
    options: ["Harry Kane", "Wayne Rooney", "Gary Lineker", "Bobby Charlton"],
    correctIndex: 2,
    explanation: "Gary Lineker scored 10 goals across the 1986 and 1990 tournaments, holding the record for the most World Cup goals scored by an English player."
  },
  {
    question: "Which team won the 2006 FIFA World Cup final in a penalty shootout after a 1-1 draw in extra time?",
    options: ["Germany", "France", "Brazil", "Italy"],
    correctIndex: 3,
    explanation: "Italy defeated France 5-3 in a penalty shootout in 2006 to claim their fourth World Cup title, in a match famously remembered for Zinedine Zidane's red card."
  }
];

const ROUND_2_QUESTIONS = [
  {
    question: "Which stadium is scheduled to host the 2026 FIFA World Cup Final?",
    options: ["Estadio Azteca", "MetLife Stadium", "SoFi Stadium", "AT&T Stadium"],
    correctIndex: 1,
    explanation: "MetLife Stadium in East Rutherford, New Jersey, has been chosen to host the final match of the 2026 FIFA World Cup on July 19, 2026."
  },
  {
    question: "What is the maximum number of matches the World Cup champion can play in the 2026 format?",
    options: ["7", "8", "9", "10"],
    correctIndex: 1,
    explanation: "With the expansion of the tournament to 48 teams, the champion will play 8 matches (3 group matches and 5 knockout matches) instead of the previous 7."
  },
  {
    question: "Which team defeated Germany 2–1 in Group E?",
    options: ["Ivory Coast", "Ecuador", "Curacao", "Japan"],
    correctIndex: 1,
    explanation: "Ecuador defeated Germany 2-1 in a highly contested Group E matchup."
  },
  {
    question: "Which match ended 5–1 in Group F?",
    options: ["Japan vs Tunisia", "Netherlands vs Sweden", "Sweden vs Tunisia", "Netherlands vs Japan"],
    correctIndex: 1,
    explanation: "Netherlands put on a dominant display to defeat Sweden 5-1 in Group F."
  },
  {
    question: "Which co-host nation won all three of its Group A matches?",
    options: ["Canada", "Mexico", "United States", "None"],
    correctIndex: 1,
    explanation: "Mexico won all three of their group matches in Group A, putting on a spectacular performance on home soil."
  },
  {
    question: "Which country competing in the FIFA World Cup 26 has an official national anthem that contains no lyrics or words?",
    options: ["Tunisia", "Spain", "Paraguay", "Bosnia and Herzegovina"],
    correctIndex: 1,
    explanation: "Spain's national anthem, 'La Marcha Real' (The Royal March), is one of the few national anthems in the world that has no official lyrics."
  },
  {
    question: "Who scored the fastest goal of the 2022 World Cup knockout stage against Morocco?",
    options: ["Olivier Giroud", "Theo Hernández", "Kylian Mbappé", "Antoine Griezmann"],
    correctIndex: 1,
    explanation: "Theo Hernández scored for France after just 4 minutes and 39 seconds in the semi-final match against Morocco."
  },
  {
    question: "Which national team is known as the 'Samurai Blue' and famously defeated Germany in the 2022 World Cup?",
    options: ["South Korea", "Japan", "Saudi Arabia", "Uzbekistan"],
    correctIndex: 1,
    explanation: "Japan's national team, nicknamed the Samurai Blue, defeated Germany 2-1 in their opening match of the 2022 World Cup."
  },
  {
    question: "Which team became the first African nation to reach a FIFA World Cup semifinal?",
    options: ["Senegal", "Cameroon", "Morocco", "Ghana"],
    correctIndex: 2,
    explanation: "Morocco became the first African nation to ever reach a World Cup semifinal after defeating Portugal in the quarterfinals of the 2022 tournament."
  },
  {
    question: "Which team scored the 173rd goal that made the 2026 World Cup the highest-scoring tournament in history?",
    options: ["Canada", "Mexico", "United States", "Panama"],
    correctIndex: 2,
    explanation: "United States defender Auston Trusty scored the historic 173rd goal of the 2026 tournament, breaking the record for most total goals in a single World Cup."
  },
  {
    question: "Which co-host reached the knockout stage for the first time in its World Cup history during the 2026 tournament?",
    options: ["Mexico", "Canada", "United States", "None of them"],
    correctIndex: 1,
    explanation: "Canada made history during the 2026 tournament by qualifying for the knockout stage for the first time ever."
  },
  {
    question: "Who is the fastest player on this edition of the World Cup?",
    options: ["Erling Haaland", "Jordan Bos", "Kylian Mbappé", "Abdukodir Khusanov"],
    correctIndex: 1,
    explanation: "Australia's Jordan Bos was clocked at a top speed of 36.7 km/h, making him the fastest player recorded in the tournament."
  },
  {
    question: "Who became Portugal's youngest player to score a World Cup hat-trick?",
    options: ["Cristiano Ronaldo", "Gonçalo Ramos", "João Félix", "Rafael Leão"],
    correctIndex: 1,
    explanation: "Gonçalo Ramos scored a hat-trick for Portugal against Switzerland at the age of 21 years and 169 days, breaking the record."
  },
  {
    question: "Which nation knocked out Spain on penalties in 2022?",
    options: ["Croatia", "Morocco", "Japan", "Switzerland"],
    correctIndex: 1,
    explanation: "Morocco defeated Spain 3-0 on penalties in the round of 16 of the 2022 World Cup."
  },
  {
    question: "Which country has lost the most FIFA World Cup Finals?",
    options: ["Netherlands", "Argentina", "Germany", "Italy"],
    correctIndex: 2,
    explanation: "Germany has lost in the World Cup Final a record 4 times (1966, 1982, 1986, 2002) in history."
  },
  {
    question: "Who scored the winning goal in the 2014 World Cup Final?",
    options: ["Thomas Müller", "Mario Götze", "Miroslav Klose", "Toni Kroos"],
    correctIndex: 1,
    explanation: "Mario Götze scored in the 113th minute of extra time to secure Germany's 1-0 victory against Argentina."
  },
  {
    question: "Identify the country by its flag shown in this picture:",
    options: ["Aruba", "Curaçao", "Sint Maarten", "Nauru"],
    correctIndex: 1,
    image: "images/curacao.png",
    explanation: "This is the flag of Curaçao. It features a blue field with a horizontal yellow stripe and two white five-pointed stars representing Curaçao and Klein Curaçao."
  },
  {
    question: "Who scored the fastest goal in this edition of the World Cup?",
    options: ["Ismael Saibari", "Matías Galarza", "Theo Hernández", "Kylian Mbappé"],
    correctIndex: 1,
    explanation: "Paraguay's Matías Galarza scored just 64 seconds into their match against Türkiye, recording the fastest goal of the 2026 World Cup."
  },
  {
    question: "What is the name of the official football that is played in this edition of the World Cup?",
    options: ["Al Rihla", "Trionda", "Brazuca", "Telstar 18"],
    correctIndex: 1,
    explanation: "The official match ball of the 2026 FIFA World Cup is named Trionda, representing the unity of the three host nations (Canada, Mexico, and the United States)."
  },
  {
    question: "In which FIFA World Cup edition did Lionel Messi fail to score any goals?",
    options: ["2006", "2010", "2014", "2018"],
    correctIndex: 1,
    explanation: "Despite starting all five of Argentina's matches in South Africa, Lionel Messi did not score any goals in the 2010 FIFA World Cup."
  }
];

const TIEBREAKER_QUESTIONS = [
  {
    question: "Which country won the very first FIFA World Cup match in history on July 13, 1930?",
    options: ["France", "USA", "Uruguay", "Argentina"],
    correctIndex: 0,
    explanation: "France defeated Mexico 4-1 in the opening match of the 1930 World Cup, with Lucien Laurent scoring the first-ever World Cup goal."
  },
  {
    question: "Who holds the record for the most goals scored in FIFA Men's World Cup finals matches?",
    options: ["Pelé", "Lionel Messi", "Kylian Mbappé", "Vavá"],
    correctIndex: 2,
    explanation: "Kylian Mbappé scored a total of 4 goals across the 2018 and 2022 World Cup finals, holding the all-time record."
  },
  {
    question: "Which player was the first to ever be sent off in a FIFA Men's World Cup final?",
    options: ["Pedro Monzón", "Gustavo Dezotti", "Zinedine Zidane", "Marcel Desailly"],
    correctIndex: 0,
    explanation: "Argentina's Pedro Monzón was sent off in the 1990 final against West Germany, becoming the first player to receive a red card in a final."
  },
  {
    question: "Which host nation is the only one to be eliminated in the group stage of a Men's World Cup before 2022?",
    options: ["South Africa", "Qatar", "Switzerland", "Japan"],
    correctIndex: 0,
    explanation: "South Africa in 2010 was the first host nation to fail to advance past the group stage. Qatar became the second in 2022."
  },
  {
    question: "Which country has played the most matches in FIFA Men's World Cup history without ever winning the title?",
    options: ["Mexico", "Sweden", "Belgium", "Netherlands"],
    correctIndex: 0,
    explanation: "Mexico has played 60 matches in World Cup history but has never won the tournament, reaching the quarterfinals twice as their best result."
  }
];
