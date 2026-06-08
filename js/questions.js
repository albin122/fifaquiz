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
    question: "Which country hosted the first-ever FIFA Men's World Cup in 1930?",
    options: ["Italy", "Uruguay", "Argentina", "Brazil"],
    correctIndex: 1,
    explanation: "Uruguay hosted and won the inaugural FIFA World Cup in 1930, defeating Argentina 4-2 in the final in Montevideo."
  },
  {
    question: "Which nation has played in every single FIFA Men's World Cup tournament since 1930?",
    options: ["Germany", "Italy", "Argentina", "Brazil"],
    correctIndex: 3,
    explanation: "Brazil is the only country to have qualified for and participated in all 22 World Cup tournaments."
  },
  {
    question: "Which country won the 2022 Men's FIFA World Cup in Qatar?",
    options: ["France", "Brazil", "Argentina", "Croatia"],
    correctIndex: 2,
    explanation: "Argentina won the 2022 World Cup after defeating France in a thrilling final match."
  },
  {
    question: "Who is the legendary captain who led Argentina to victory in the 2022 World Cup?",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Neymar Jr", "Kylian Mbappé"],
    correctIndex: 1,
    explanation: "Lionel Messi captained the Argentina team, scoring 7 goals and winning the Golden Ball award."
  },
  {
    question: "Which country has won the most FIFA Men's World Cup titles in history?",
    options: ["Germany", "Italy", "Brazil", "Argentina"],
    correctIndex: 2,
    explanation: "Brazil has won a record 5 World Cup trophies (1958, 1962, 1970, 1994, and 2002)."
  },
  {
    question: "In which country was the 2010 FIFA World Cup held, the first one in Africa?",
    options: ["Egypt", "Morocco", "Nigeria", "South Africa"],
    correctIndex: 3,
    explanation: "South Africa hosted the historic 2010 tournament, welcoming fans with vuvuzela horns."
  },
  {
    question: "Which player scored the famous 'Hand of God' goal in 1986?",
    options: ["Pelé", "Diego Maradona", "Gary Lineker", "Zico"],
    correctIndex: 1,
    explanation: "Diego Maradona scored the controversial 'Hand of God' goal and the spectacular 'Goal of the Century' in the same match against England in 1986."
  },
  {
    question: "Which country did France defeat in the final to win the 2018 FIFA World Cup?",
    options: ["Croatia", "Belgium", "England", "Argentina"],
    correctIndex: 0,
    explanation: "France won their second World Cup title by defeating Croatia 4-2 in an action-packed final in Moscow."
  },
  {
    question: "Who won the Golden Boot (top scorer) at the 2022 FIFA World Cup in Qatar?",
    options: ["Lionel Messi", "Kylian Mbappé", "Olivier Giroud", "Julián Álvarez"],
    correctIndex: 1,
    explanation: "France's Kylian Mbappé won the Golden Boot in 2022 by scoring 8 goals, including a hat-trick in the final."
  },
  {
    question: "Which team did Spain defeat in the 2010 World Cup final to win their first title?",
    options: ["Germany", "Netherlands", "Uruguay", "France"],
    correctIndex: 1,
    explanation: "Spain defeated the Netherlands 1-0 in extra time through an Andrés Iniesta goal to win their historic first title."
  },
  {
    question: "Which player scored the winning goal for Germany in the 2014 World Cup final against Argentina?",
    options: ["Mario Götze", "Thomas Müller", "Bastian Schweinsteiger", "Miroslav Klose"],
    correctIndex: 0,
    explanation: "Substitute Mario Götze scored a stunning volley in the 113th minute of extra time to secure a 1-0 win for Germany."
  },
  {
    question: "Which goalkeeper won the Golden Glove award at the 2022 FIFA World Cup?",
    options: ["Hugo Lloris", "Emiliano Martínez", "Yassine Bounou", "Dominik Livaković"],
    correctIndex: 1,
    explanation: "Argentina's Emiliano Martínez won the Golden Glove after crucial penalty shootout saves and a legendary last-second save in the final."
  },
  {
    question: "Who is the youngest player to ever score in a FIFA Men's World Cup match?",
    options: ["Pelé", "Kylian Mbappé", "Lionel Messi", "Gavi"],
    correctIndex: 0,
    explanation: "Pelé was just 17 years and 239 days old when he scored against Wales in the 1958 World Cup quarterfinals."
  },
  {
    question: "What color cards were introduced to the World Cup for the first time in 1970?",
    options: ["Green and Blue", "Red and Yellow", "White and Black", "Blue and Orange"],
    correctIndex: 1,
    explanation: "Yellow and red cards were introduced in the 1970 World Cup in Mexico to make disciplinary actions clearer across language barriers."
  },
  {
    question: "Which African nation became the first to reach a World Cup semi-final in 2022?",
    options: ["Senegal", "Cameroon", "Ghana", "Morocco"],
    correctIndex: 3,
    explanation: "Morocco made history in Qatar 2022 by defeating Spain and Portugal to become the first African nation in a semi-final."
  },
  {
    question: "Which player scored a hat-trick in the 2022 FIFA World Cup final?",
    options: ["Lionel Messi", "Kylian Mbappé", "Olivier Giroud", "Angel Di Maria"],
    correctIndex: 1,
    explanation: "France's Kylian Mbappé scored a hat-trick in the historic 2022 final against Argentina, although Argentina ultimately won on penalties."
  },
  {
    question: "In what year did England win their only FIFA Men's World Cup?",
    options: ["1958", "1962", "1966", "1970"],
    correctIndex: 2,
    explanation: "England won the tournament on home soil in 1966, famously defeating West Germany 4-2 in extra time at Wembley Stadium."
  },
  {
    question: "Which country won the FIFA Men's World Cup on home soil in 1998?",
    options: ["France", "Brazil", "Italy", "Croatia"],
    correctIndex: 0,
    explanation: "France hosted and won the 1998 World Cup, defeating Brazil 3-0 in the final at the Stade de France."
  },
  {
    question: "Which country hosted the 2002 FIFA World Cup, the first to be co-hosted by two nations?",
    options: ["Japan & South Korea", "USA & Canada", "Spain & Portugal", "Belgium & Netherlands"],
    correctIndex: 0,
    explanation: "The 2002 tournament was co-hosted by Japan and South Korea, which was also the first World Cup held in Asia."
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
