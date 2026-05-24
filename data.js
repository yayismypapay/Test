const catalogData = [
  // ==================== MOVIES ====================
  {
    id: "m1",
    category: "movies",
    title: {
      en: "Dune: Part Two",
      ru: "Дюна: Часть вторая"
    },
    year: 2024,
    rating: 8.8,
    genres: {
      en: ["Sci-Fi", "Adventure", "Drama"],
      ru: ["Фантастика", "Приключения", "Драма"]
    },
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    trailer: "https://www.youtube.com/embed/Way9Dexny3w",
    shortDescription: {
      en: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      ru: "Пол Атрейдес объединяется с Чани и фременами, чтобы отомстить заговорщикам, уничтожившим его семью."
    },
    fullDescription: {
      en: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.",
      ru: "Пол Атрейдес объединяется с Чани и фременами, жаждя отомстить заговорщикам, которые уничтожили его семью. Стоя перед выбором между любовью всей своей жизни и судьбой известной вселенной, он пытается предотвратить ужасное будущее, которое может предвидеть только он сам."
    },
    specs: {
      en: {
        "Director": "Denis Villeneuve",
        "Cast": "Timothée Chalamet, Zendaya, Rebecca Ferguson, Austin Butler",
        "Duration": "166 min",
        "Budget": "$190 Million"
      },
      ru: {
        "Режиссер": "Дени Вильнёв",
        "В ролях": "Тимоти Шаламе, Зендея, Ребекка Фергюсон, Остин Батлер",
        "Длительность": "166 мин",
        "Бюджет": "$190 млн"
      }
    },
    reviews: [
      { author: "Cinemaphile99", rating: 10, date: "2026-03-12", text: { en: "A visual masterpiece that surpasses the first part in every possible way!", ru: "Визуальный шедевр, превосходящий первую часть во всех отношениях!" } },
      { author: "ArrakisWatcher", rating: 9, date: "2026-04-01", text: { en: "The sound design and Hans Zimmer's score are absolutely breathtaking.", ru: "Звуковой дизайн и музыка Ханса Циммера просто захватывают дух." } }
    ]
  },
  {
    id: "m2",
    category: "movies",
    title: {
      en: "Interstellar",
      ru: "Интерстеллар"
    },
    year: 2014,
    rating: 8.7,
    genres: {
      en: ["Sci-Fi", "Drama", "Adventure"],
      ru: ["Фантастика", "Драма", "Приключения"]
    },
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    poster: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
    shortDescription: {
      en: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      ru: "Группа исследователей отправляется через черную дыру в космосе, чтобы спасти человечество от гибели."
    },
    fullDescription: {
      en: "In Earth's future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand, a brilliant NASA physicist, is working on plans to save mankind by transporting Earth's population to a new home via a wormhole.",
      ru: "Когда жизнь на Земле подходит к концу из-за засухи и пыльных бурь, группа исследователей и ученых отправляется в самое важное путешествие в истории человечества: сквозь пространственно-временной тоннель в поисках новой обитаемой планеты."
    },
    specs: {
      en: {
        "Director": "Christopher Nolan",
        "Cast": "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        "Duration": "169 min",
        "Budget": "$165 Million"
      },
      ru: {
        "Режиссер": "Кристофер Нолан",
        "В ролях": "Мэттью Макконахи, Энн Хэтэуэй, Джессика Честейн",
        "Длительность": "169 мин",
        "Бюджет": "$165 млн"
      }
    },
    reviews: [
      { author: "NolanFanboy", rating: 10, date: "2025-11-20", text: { en: "Make me cry every single time. Masterpiece.", ru: "Плачу каждый раз при просмотре. Шедевр." } }
    ]
  },
  {
    id: "m3",
    category: "movies",
    title: {
      en: "Oppenheimer",
      ru: "Оппенгеймер"
    },
    year: 2023,
    rating: 8.5,
    genres: {
      en: ["Biography", "Drama", "History"],
      ru: ["Биография", "Драма", "История"]
    },
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1200&q=80",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
    trailer: "https://www.youtube.com/embed/uYPbbksJxIg",
    shortDescription: {
      en: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      ru: "История жизни американского физика-теоретика Роберта Оппенгеймера, стоявшего во главе первых разработок ядерного оружия."
    },
    fullDescription: {
      en: "A dramatization of the life of J. Robert Oppenheimer, the physicist who led the Manhattan Project to create the first atomic bomb, examining his triumphs and the immense psychological and political toll the weapon took on his life.",
      ru: "Масштабная биографическая драма о Роберте Оппенгеймере — человеке, который возглавил «Манхэттенский проект» по созданию атомной бомбы, и о той огромной психологической и политической цене, которую ему пришлось заплатить за свое величайшее изобретение."
    },
    specs: {
      en: {
        "Director": "Christopher Nolan",
        "Cast": "Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr.",
        "Duration": "180 min",
        "Budget": "$100 Million"
      },
      ru: {
        "Режиссер": "Кристофер Нолан",
        "В ролях": "Киллиан Мерфи, Эмили Блант, Мэтт Дэймон, Роберт Дауни мл.",
        "Длительность": "180 мин",
        "Бюджет": "$100 млн"
      }
    },
    reviews: [
      { author: "HistoryBuff", rating: 9, date: "2026-01-15", text: { en: "Cillian Murphy is absolutely spectacular. Robert Downey Jr. earned that Oscar!", ru: "Киллиан Мерфи великолепен. Роберт Дауни-младший абсолютно заслуженно получил Оскар!" } }
    ]
  },
  {
    id: "m4",
    category: "movies",
    title: {
      en: "Spider-Man: Into the Spider-Verse",
      ru: "Человек-паук: Через вселенные"
    },
    year: 2018,
    rating: 8.4,
    genres: {
      en: ["Animation", "Action", "Adventure"],
      ru: ["Анимация", "Экшен", "Приключения"]
    },
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80",
    poster: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=600&q=80",
    trailer: "https://www.youtube.com/embed/g4HbzUK14SU",
    shortDescription: {
      en: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions.",
      ru: "Подросток Майлз Моралес становится новым Человеком-пауком и объединяется с пауками из других измерений для борьбы с общей угрозой."
    },
    fullDescription: {
      en: "Miles Morales is a New York teen struggling with school and friends. When he gains spider-like powers, he realizes there are multiple universes (the 'Spider-Verse') with other versions of Spider-Man. Together, they must defeat Kingpin to save their realities.",
      ru: "Майлз Моралес — обычный бруклинский подросток, чей мир переворачивается, когда он получает суперспособности и узнает о существовании Мультивселенной. Он встречает Питера Паркера и команду пауков из других измерений, готовых защитить мир от Кингпина."
    },
    specs: {
      en: {
        "Director": "Bob Persichetti, Peter Ramsey, Rodney Rothman",
        "Cast": "Shameik Moore, Jake Johnson, Hailee Steinfeld",
        "Duration": "117 min",
        "Budget": "$90 Million"
      },
      ru: {
        "Режиссер": "Боб Персичетти, Питер Рэмзи, Родни Ротман",
        "В ролях": "Шамеик Мур, Джейк Джонсон, Хейли Стайнфелд",
        "Длительность": "117 мин",
        "Бюджет": "$90 млн"
      }
    },
    reviews: [
      { author: "ArtLover", rating: 10, date: "2026-02-18", text: { en: "A visual comic book brought to life. Groundbreaking animation style.", ru: "Оживший комикс. Прорыв в стиле анимации, который изменил индустрию навсегда." } }
    ]
  },
  {
    id: "m5",
    category: "movies",
    title: {
      en: "The Dark Knight",
      ru: "Темный рыцарь"
    },
    year: 2008,
    rating: 9.0,
    genres: {
      en: ["Action", "Crime", "Drama"],
      ru: ["Экшен", "Криминал", "Драма"]
    },
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80",
    poster: "https://images.unsplash.com/photo-1534375971785-5c1826f739d8?auto=format&fit=crop&w=600&q=80",
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
    shortDescription: {
      en: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      ru: "Когда опасный и безумный Джокер сеет хаос и ужас в Готэме, Бэтмен должен пройти одно из величайших испытаний своей жизни в борьбе с несправедливостью."
    },
    fullDescription: {
      en: "With the help of allies Lt. Jim Gordon and DA Harvey Dent, Batman has been able to keep a tight lid on crime in Gotham City. But when a vile young criminal calling himself the Joker suddenly throws the town into chaos, the caped Crusader begins to tread a fine line between heroism and vigilantism.",
      ru: "Бэтмен поднимает ставки в войне с криминалом. С помощью лейтенанта Джима Гордона и прокурора Харви Дента он намерен очистить улицы Готэма от преступности. Но вскоре они сталкиваются с гениальным и зловещим разумом Джокера, который повергает город в полный хаос."
    },
    specs: {
      en: {
        "Director": "Christopher Nolan",
        "Cast": "Christian Bale, Heath Ledger, Aaron Eckhart, Maggie Gyllenhaal",
        "Duration": "152 min",
        "Budget": "$185 Million"
      },
      ru: {
        "Режиссер": "Кристофер Нолан",
        "В ролях": "Кристиан Бейл, Хит Леджер, Аарон Экхарт, Мэгги Джилленхол",
        "Длительность": "152 мин",
        "Бюджет": "$185 млн"
      }
    },
    reviews: [
      { author: "JokerCard", rating: 10, date: "2026-05-10", text: { en: "Heath Ledger's performance is legendary. Best comic book movie ever made.", ru: "Игра Хита Леджера легендарна. Лучший кинокомикс в истории кинематографа." } }
    ]
  },

  // ==================== GAMES ====================
  {
    id: "g1",
    category: "games",
    title: {
      en: "Cyberpunk 2077",
      ru: "Cyberpunk 2077"
    },
    year: 2020,
    rating: 8.6,
    genres: {
      en: ["RPG", "Sci-Fi", "Action"],
      ru: ["RPG", "Фантастика", "Экшен"]
    },
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    trailer: "https://www.youtube.com/embed/LembwKqqpbY",
    shortDescription: {
      en: "An action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped in a fight for survival.",
      ru: "Приключенческая ролевая игра, действие которой происходит в мегаполисе Найт-Сити, где вы играете за наемника в борьбе за выживание."
    },
    fullDescription: {
      en: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.",
      ru: "Cyberpunk 2077 — приключенческая ролевая игра в открытом мире Найт-Сити, одержимого властью, роскошью и модификациями тела. Вы играете за наемника V в поисках уникального импланта, дарующего бессмертие, деля сознание с цифровым призраком легендарного рокера Джонни Сильверхенда."
    },
    specs: {
      en: {
        "Developer": "CD Projekt Red",
        "Platforms": "PC, PS5, Xbox Series X/S, PS4, Xbox One",
        "Playtime": "50-100 Hours",
        "Publisher": "CD Projekt"
      },
      ru: {
        "Разработчик": "CD Projekt Red",
        "Платформы": "PC, PS5, Xbox Series X/S, PS4, Xbox One",
        "Время прохождения": "50-100 часов",
        "Издатель": "CD Projekt"
      }
    },
    reviews: [
      { author: "Choomba2077", rating: 9, date: "2026-03-24", text: { en: "With the 2.0 update and Phantom Liberty, this game became the masterpiece it was always promised to be.", ru: "С обновлением 2.0 и дополнением Phantom Liberty игра наконец стала тем шедевром, который нам обещали." } }
    ]
  },
  {
    id: "g2",
    category: "games",
    title: {
      en: "The Witcher 3: Wild Hunt",
      ru: "Ведьмак 3: Дикая Охота"
    },
    year: 2015,
    rating: 9.3,
    genres: {
      en: ["RPG", "Fantasy", "Adventure"],
      ru: ["RPG", "Фэнтези", "Приключения"]
    },
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    poster: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
    trailer: "https://www.youtube.com/embed/XHrsk3UX9kA",
    shortDescription: {
      en: "Geralt of Rivia, a monster hunter, searches for his adopted daughter Ciri, who is on the run from the otherworldly Wild Hunt.",
      ru: "Геральт из Ривии, профессиональный охотник на чудовищ, отправляется на поиски Дитя Предназначения — Цири, спасающейся от Дикой Охоты."
    },
    fullDescription: {
      en: "The Witcher: Wild Hunt is a story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences. You play as professional monster hunter Geralt of Rivia, tasked with finding a child of prophecy in a vast world.",
      ru: "«Ведьмак 3: Дикая Охота» — сюжетная ролевая игра с открытым миром, действие которой разворачивается в удивительной фэнтезийной вселенной. Вы станете Геральтом из Ривии, наемным убийцей чудовищ, и отправитесь на поиски ребенка из древнего пророчества."
    },
    specs: {
      en: {
        "Developer": "CD Projekt Red",
        "Platforms": "PC, PS4, PS5, Xbox One, Xbox Series X/S, Switch",
        "Playtime": "100+ Hours",
        "Publisher": "CD Projekt"
      },
      ru: {
        "Разработчик": "CD Projekt Red",
        "Платформы": "PC, PS4, PS5, Xbox One, Xbox Series X/S, Switch",
        "Время прохождения": "100+ часов",
        "Издатель": "CD Projekt"
      }
    },
    reviews: [
      { author: "WhiteWolf", rating: 10, date: "2025-12-05", text: { en: "Best story and quests in any game ever. Bloody Baron questline is unmatched.", ru: "Лучший сюжет и дополнительные квесты в истории видеоигр. Квест с Кровавым Бароном непревзойден." } }
    ]
  },
  {
    id: "g3",
    category: "games",
    title: {
      en: "Elden Ring",
      ru: "Elden Ring"
    },
    year: 2022,
    rating: 9.2,
    genres: {
      en: ["RPG", "Dark Fantasy", "Action"],
      ru: ["RPG", "Темное фэнтези", "Экшен"]
    },
    image: "https://images.unsplash.com/photo-1655821888788-6107699e173b?auto=format&fit=crop&w=1200&q=80",
    poster: "https://images.unsplash.com/photo-1656073818817-48f8832a84cb?auto=format&fit=crop&w=600&q=80",
    trailer: "https://www.youtube.com/embed/E3Huy2cdIh0",
    shortDescription: {
      en: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
      ru: "Восстань, Погасший, и под руководством благодати овладей силой Кольца Элден, чтобы стать Повелителем Элдена в Междуземье."
    },
    fullDescription: {
      en: "In the Lands Between ruled by Queen Marika the Eternal, the Elden Ring, the source of the Erdtree, has been shattered. Marika's offspring, demigods all, claimed the shards of the Elden Ring known as the Great Runes, triggering a war: The Shattering. You must explore, fight, and claim the throne.",
      ru: "В Междуземье, которым правит королева Марика Вечная, Кольцо Элден — источник величия Древа Эрд — было расколото. Полубоги прибрали к рукам его осколки, развязав кровопролитную войну. Вы — Погасший, которому предстоит бросить вызов полубогам и занять трон."
    },
    specs: {
      en: {
        "Developer": "FromSoftware",
        "Platforms": "PC, PS4, PS5, Xbox One, Xbox Series X/S",
        "Playtime": "80-150 Hours",
        "Publisher": "Bandai Namco"
      },
      ru: {
        "Разработчик": "FromSoftware",
        "Платформы": "PC, PS4, PS5, Xbox One, Xbox Series X/S",
        "Время прохождения": "80-150 часов",
        "Издатель": "Bandai Namco"
      }
    },
    reviews: [
      { author: "SoulsVeteran", rating: 10, date: "2026-04-18", text: { en: "A magnificent evolution of the souls formula in a breathtaking open world.", ru: "Великолепная эволюция формулы Dark Souls в невероятном открытом мире." } }
    ]
  },
  {
    id: "g4",
    category: "games",
    title: {
      en: "Red Dead Redemption 2",
      ru: "Red Dead Redemption 2"
    },
    year: 2018,
    rating: 9.4,
    genres: {
      en: ["Action", "Adventure", "Western"],
      ru: ["Экшен", "Приключения", "Вестерн"]
    },
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
    trailer: "https://www.youtube.com/embed/eaW0tYpxyp0",
    shortDescription: {
      en: "Amidst the decline of the Wild West, outlaw Arthur Morgan and the Van der Linde gang flee federal agents and bounty hunters.",
      ru: "На закате эпохи Дикого Запада Артур Морган и банда Ван дер Линде вынуждены пуститься в бега, спасаясь от федеральных агентов."
    },
    fullDescription: {
      en: "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive.",
      ru: "Америка, 1899 год. Артур Морган и банда Датча Ван дер Линде пускаются в бега после неудачного ограбления банка. Чтобы выжить в меняющемся мире Дикого Запада, банде приходится совершать налеты, кражи и участвовать в перестрелках, пока внутренние разногласия грозят полностью её расколоть."
    },
    specs: {
      en: {
        "Developer": "Rockstar Games",
        "Platforms": "PC, PS4, Xbox One",
        "Playtime": "60-120 Hours",
        "Publisher": "Rockstar Games"
      },
      ru: {
        "Разработчик": "Rockstar Games",
        "Платформы": "PC, PS4, Xbox One",
        "Время прохождения": "60-120 часов",
        "Издатель": "Rockstar Games"
      }
    },
    reviews: [
      { author: "ArthurBeliever", rating: 10, date: "2026-02-02", text: { en: "Arthur Morgan is the most human and beautifully written character in media history.", ru: "Артур Морган — самый человечный и глубоко прописанный персонаж в истории медиа." } }
    ]
  },

  // ==================== CARS ====================
  {
    id: "c1",
    category: "cars",
    title: {
      en: "Porsche 911 GT3 RS (992)",
      ru: "Porsche 911 GT3 RS (992)"
    },
    year: 2023,
    rating: 9.5,
    genres: {
      en: ["Supercar", "Track Focus", "Naturally Aspirated"],
      ru: ["Суперкар", "Трековый", "Атмосферный"]
    },
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
    poster: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
    trailer: "https://www.youtube.com/embed/ZqA1Eryy6sw",
    shortDescription: {
      en: "A street-legal racing machine designed for absolute aerodynamic efficiency, featuring a 518hp flat-six engine.",
      ru: "Дорожный гоночный болид с непревзойденной аэродинамикой и оппозитным двигателем мощностью 525 л.с."
    },
    fullDescription: {
      en: "The Porsche 911 GT3 RS is designed for maximum performance without compromise. With an atmospheric 4.0-liter flat-six engine producing 518 horsepower and an active DRS wing taken straight from Formula 1, it represents the absolute peak of track-focused sports car engineering.",
      ru: "Porsche 911 GT3 RS создан для максимальной динамики без компромиссов. С атмосферным 4,0-литровым оппозитным двигателем мощностью 525 л.с. и активной системой DRS, взятой прямо из Формулы-1, этот автомобиль представляет собой абсолютную вершину трековой инженерной мысли."
    },
    specs: {
      en: {
        "Top Speed": "296 km/h (184 mph)",
        "0-100 km/h": "3.2 seconds",
        "Engine": "4.0L Naturally Aspirated Flat-6",
        "Horsepower": "518 hp"
      },
      ru: {
        "Макс. скорость": "296 км/ч",
        "0-100 км/ч": "3.2 сек",
        "Двигатель": "4.0L Атмосферный Оппозитный 6-цил.",
        "Мощность": "525 л.с."
      }
    },
    reviews: [
      { author: "NurburgringKing", rating: 10, date: "2026-04-30", text: { en: "A race car with number plates. Cornering speeds are simply physics-defying.", ru: "Гоночный болид с номерами. Скорость прохождения поворотов просто нарушает законы физики." } }
    ]
  },
  {
    id: "c2",
    category: "cars",
    title: {
      en: "Lamborghini Revuelto",
      ru: "Lamborghini Revuelto"
    },
    year: 2024,
    rating: 9.3,
    genres: {
      en: ["V12", "Plug-in Hybrid", "Supercar"],
      ru: ["V12", "Гибрид", "Суперкар"]
    },
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80",
    poster: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80",
    trailer: "https://www.youtube.com/embed/5F_uLw09kC0",
    shortDescription: {
      en: "The first super sports V12 hybrid plug-in HPEV (High Performance Electrified Vehicle) from Sant'Agata, delivering 1001 hp.",
      ru: "Первый супергибрид V12 HPEV от Lamborghini мощностью 1015 л.с., объединяющий классический мотор и три электродвигателя."
    },
    fullDescription: {
      en: "Lamborghini Revuelto is the brand's next-generation flagship. Retaining the legendary naturally aspirated 6.5L V12 engine and coupling it with three electric motors, it produces a combined 1,001 horsepower, wrapping it in a stunning carbon fiber monocoque.",
      ru: "Lamborghini Revuelto — новое флагманское купе, пришедшее на смену Aventador. Сохранив легендарный атмосферный 6,5-литровый двигатель V12 и объединив его с тремя электродвигателями, суперкар выдает суммарную мощность 1015 л.с. в футуристичном углепластиковом кузове."
    },
    specs: {
      en: {
        "Top Speed": "350 km/h (217 mph)",
        "0-100 km/h": "2.5 seconds",
        "Engine": "6.5L V12 + 3 Electric Motors",
        "Horsepower": "1001 hp"
      },
      ru: {
        "Макс. скорость": "350 км/ч",
        "0-100 км/ч": "2.5 сек",
        "Двигатель": "6.5L V12 + 3 Электродвигателя",
        "Мощность": "1015 л.с."
      }
    },
    reviews: [
      { author: "V12Lover", rating: 9, date: "2026-01-20", text: { en: "Lamborghini saved the V12 scream by hybridizing it! Sounds absolutely mental.", ru: "Lamborghini сохранила кричащий звук V12 за счет гибридизации! Звучит невероятно." } }
    ]
  },
  {
    id: "c3",
    category: "cars",
    title: {
      en: "Ferrari LaFerrari",
      ru: "Ferrari LaFerrari"
    },
    year: 2013,
    rating: 9.4,
    genres: {
      en: ["V12", "HY-KERS", "Legendary"],
      ru: ["V12", "Гибрид", "Легендарный"]
    },
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
    poster: "https://images.unsplash.com/photo-1592853625597-7d17be820d0c?auto=format&fit=crop&w=600&q=80",
    trailer: "https://www.youtube.com/embed/iR0sWmvsqQI",
    shortDescription: {
      en: "A limited-production hybrid supercar representing Ferrari's absolute pinnacle of performance and technology in the 2010s.",
      ru: "Лимитированный гибридный гиперкар, представляющий собой абсолютную вершину технологий и динамики Ferrari в 2010-х."
    },
    fullDescription: {
      en: "LaFerrari represents Ferrari's most ambitious project, combining a screaming 6.3L V12 naturally aspirated engine with an F1-derived HY-KERS electric assistance system. Producing 950 hp combined, it remains a timeless holy trinity member.",
      ru: "LaFerrari — один из самых амбициозных проектов в истории итальянской марки, объединивший пронзительный 6,3-литровый V12 с гоночной системой рекуперации энергии HY-KERS. Общая мощность в 963 л.с. делает этот гиперкар частью великой «святой троицы»."
    },
    specs: {
      en: {
        "Top Speed": "350 km/h (217 mph)",
        "0-100 km/h": "2.6 seconds",
        "Engine": "6.3L V12 + Electric Motor (HY-KERS)",
        "Horsepower": "950 hp"
      },
      ru: {
        "Макс. скорость": "350 км/ч",
        "0-100 км/ч": "2.6 сек",
        "Двигатель": "6.3L V12 + Электродвигатель (HY-KERS)",
        "Мощность": "963 л.с."
      }
    },
    reviews: [
      { author: "PrancingHorse", rating: 10, date: "2026-05-15", text: { en: "A masterpiece of automotive art. The design will look beautiful even in 50 years.", ru: "Шедевр автомобильного искусства. Этот дизайн будет выглядеть великолепно даже через 50 лет." } }
    ]
  }
];

// Translate/Localize dynamic content helpers
const translations = {
  en: {
    appTitle: "CinePlay Drive",
    navMovies: "Movies",
    navGames: "Games",
    navCars: "Supercars",
    navWatchlist: "Watchlist",
    searchPlaceholder: "Search movies, games, cars...",
    categoryAll: "All Categories",
    categoryMovies: "Movies",
    categoryGames: "Games",
    categoryCars: "Cars",
    filterGenre: "Genre: All",
    filterYear: "Year: All",
    sortRating: "Top Rated First",
    sortYear: "Newest First",
    sortAlphabetical: "Alphabetical",
    watchlistEmpty: "Your watchlist is empty. Add items from the catalog!",
    watchlistTitle: "My Watchlist",
    featuredTitle: "Featured Today",
    watchTrailer: "Watch Trailer",
    addToWatchlist: "Add to Watchlist",
    removeFromWatchlist: "Remove",
    quickView: "Quick View",
    ratingLabel: "Rating",
    releaseYear: "Release Year",
    specifications: "Specifications & Cast",
    reviewsTitle: "User Reviews",
    noReviews: "No reviews yet. Be the first to write one!",
    writeReviewPlaceholder: "Share your thoughts about this item...",
    submitReview: "Submit Review",
    yourName: "Your Name",
    yourRating: "Your Rating",
    similarTitle: "You May Also Like",
    footerText: "Mini-Kinopoisk. Premium catalog designed with love for cinema, gaming, and hypercars.",
    itemsFound: "items found",
    closeBtn: "Close",
    reviewSuccess: "Review added successfully!",
    reviewError: "Please fill in all fields and select a rating.",
    closeModal: "Close detailed view",
    watchTrailerText: "Trailer Simulation"
  },
  ru: {
    appTitle: "CinePlay Drive",
    navMovies: "Фильмы",
    navGames: "Игры",
    navCars: "Суперкары",
    navWatchlist: "Избранное",
    searchPlaceholder: "Искать фильмы, игры, тачки...",
    categoryAll: "Все категории",
    categoryMovies: "Фильмы",
    categoryGames: "Игры",
    categoryCars: "Машины",
    filterGenre: "Жанр: Все",
    filterYear: "Год: Все",
    sortRating: "Сначала высокий рейтинг",
    sortYear: "Сначала новые",
    sortAlphabetical: "По алфавиту",
    watchlistEmpty: "Ваш список избранного пуст. Добавьте что-нибудь из каталога!",
    watchlistTitle: "Мое Избранное",
    featuredTitle: "Популярно сегодня",
    watchTrailer: "Смотреть трейлер",
    addToWatchlist: "В избранное",
    removeFromWatchlist: "Удалить",
    quickView: "Подробнее",
    ratingLabel: "Рейтинг",
    releaseYear: "Год выпуска",
    specifications: "Характеристики и детали",
    reviewsTitle: "Отзывы пользователей",
    noReviews: "Отзывов пока нет. Будьте первыми!",
    writeReviewPlaceholder: "Поделитесь своим мнением...",
    submitReview: "Оставить отзыв",
    yourName: "Ваше имя",
    yourRating: "Ваша оценка",
    similarTitle: "Вам также может понравиться",
    footerText: "Мини-Кинопоиск. Премиальный каталог, созданный с любовью к кино, играм и суперкарам.",
    itemsFound: "объектов найдено",
    closeBtn: "Закрыть",
    reviewSuccess: "Отзыв успешно добавлен!",
    reviewError: "Пожалуйста, заполните все поля и выберите оценку.",
    closeModal: "Закрыть окно просмотра",
    watchTrailerText: "Трейлер"
  }
};
