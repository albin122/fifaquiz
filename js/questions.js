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
    options: ["Kylian Mbappé", "Luka Modrić", "Paul Pogba", "Harry Kane"],
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
    question: "Who is the all-time top goalscorer in Men's FIFA World Cup history, with 16 goals?",
    options: ["Pelé", "Miroslav Klose", "Ronaldo Nazário", "Gerd Müller"],
    correctIndex: 1,
    explanation: "Germany's Miroslav Klose scored 16 goals across four World Cup tournaments (2002, 2006, 2010, and 2014) to claim the record."
  },
  {
    question: "Who scored two headed goals for France in their 3-0 victory against Brazil in the 1998 World Cup final?",
    options: ["Zinedine Zidane", "Thierry Henry", "Emmanuel Petit", "Didier Deschamps"],
    correctIndex: 0,
    explanation: "Zinedine Zidane scored two header goals from corner kicks in the first half of the 1998 final, earning France their first title."
  },
  {
    question: "Which player won the Golden Boot (top scorer) at the 2014 World Cup in Brazil with 6 goals?",
    options: ["James Rodríguez", "Thomas Müller", "Lionel Messi", "Neymar Jr"],
    correctIndex: 0,
    explanation: "Colombia's James Rodríguez won the Golden Boot in 2014 by scoring 6 goals in just 5 matches."
  },
  {
    question: "Which player has scored the most goals in a single FIFA Men's World Cup tournament?",
    options: ["Gerd Müller", "Just Fontaine", "Pelé", "Sandor Kocsis"],
    correctIndex: 1,
    explanation: "France's Just Fontaine scored an incredible 13 goals in just 6 games during the 1958 World Cup in Sweden."
  },
  {
    question: "Which country became the first Asian nation to reach a World Cup semi-final in 2002?",
    options: ["South Korea", "Japan", "Saudi Arabia", "Australia"],
    correctIndex: 0,
    explanation: "South Korea reached the semi-finals on home soil in 2002, recording historic wins over Italy and Spain."
  },
  {
    question: "Which team did Italy defeat in the semi-finals of the 2006 World Cup with two dramatic extra-time goals?",
    options: ["Germany", "France", "Ukraine", "Australia"],
    correctIndex: 0,
    explanation: "Italy defeated hosts Germany 2-0 in extra time with dramatic late goals from Fabio Grosso and Alessandro Del Piero in Dortmund."
  },
  {
    question: "Which team has finished in the top three of the World Cup the most times without ever winning the title?",
    options: ["Netherlands", "Croatia", "Sweden", "Poland"],
    correctIndex: 0,
    explanation: "The Netherlands finished 2nd in 1974, 1978, 2010, and 3rd in 2014, placing in the top three 4 times without winning."
  },
  {
    question: "Who is the only person to win the World Cup twice as a player (1958, 1962) and once as a manager (1970)?",
    options: ["Franz Beckenbauer", "Mário Zagallo", "Didier Deschamps", "Pelé"],
    correctIndex: 1,
    explanation: "Mário Zagallo won twice as a player (1958, 1962), managed the legendary 1970 Brazil team to victory, and was assistant manager in 1994."
  },
  {
    question: "Who is the only manager to lead a country to two consecutive FIFA Men's World Cup titles?",
    options: ["Vittorio Pozzo", "Carlos Bilardo", "Helmut Schön", "Enzo Bearzot"],
    correctIndex: 0,
    explanation: "Vittorio Pozzo led Italy to consecutive World Cup triumphs in 1934 and 1938, a feat unmatched by any other manager."
  },
  {
    question: "In what country was the 1986 World Cup held after original hosts Colombia declared they could not host it?",
    options: ["Mexico", "Argentina", "Brazil", "Spain"],
    correctIndex: 0,
    explanation: "Mexico stepped in to host the 1986 tournament after Colombia declared they could not afford to host under FIFA's expanded requirements."
  },
  {
    question: "Which player won the Golden Ball (best player) at the 2018 FIFA World Cup in Russia?",
    options: ["Luka Modrić", "Eden Hazard", "Antoine Griezmann", "Kylian Mbappé"],
    correctIndex: 0,
    explanation: "Luka Modrić won the Golden Ball after captaining Croatia to their historic first-ever World Cup final."
  },
  {
    question: "What was the name of the official match ball for the 2022 FIFA World Cup in Qatar?",
    options: ["Jabulani", "Telstar", "Al Rihla", "Brazuca"],
    correctIndex: 2,
    explanation: "The official match ball was named 'Al Rihla', which translates to 'The Journey' in Arabic, inspired by Qatar's culture, architecture, and flag."
  },
  {
    question: "Which player scored the fastest goal in World Cup history, netting after just 11 seconds in 2002?",
    options: ["Hakan Şükür", "Clint Dempsey", "Bryan Robson", "Bernard Lacombe"],
    correctIndex: 0,
    explanation: "Turkey's Hakan Şükür scored in the 11th second of the third-place match against South Korea in 2002."
  },
  {
    question: "Which nation did Spain defeat 1-0 in the semi-finals of the 2010 World Cup thanks to a header from Carles Puyol?",
    options: ["Germany", "Portugal", "Paraguay", "Chile"],
    correctIndex: 0,
    explanation: "Spain defeated Germany 1-0 in the semi-finals before beating the Netherlands in the final."
  },
  {
    question: "Which player holds the record for the most matches played in Men's World Cup history?",
    options: ["Lothar Matthäus", "Lionel Messi", "Miroslav Klose", "Paolo Maldini"],
    correctIndex: 1,
    explanation: "Lionel Messi broke Lothar Matthäus's record (25 matches) during the 2022 final in Qatar, reaching 26 World Cup appearances."
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
