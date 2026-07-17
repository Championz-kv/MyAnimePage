const lp = "lp",
  ga = "ga",
  mp = "mp",
  cb = "cb"

//theme filter
const themeNames = {
  lp: "Love & Peace",
  ga: "Growth & Adventure",
  mp: "Mind & Psychology",
  cb: "Conflict & Battle",
}

const animewatching = [
  {
    name: "That Time I Got Reincarnated as a Slime",
    image: "images/tensura.jpg",
    season: "4",
    status: "Airing",
    onEps: 14,
    totalEps: 60,
  },
  {
    name: "Liar Game",
    image: "images/liar-game.png",
    season: "",
    status: "Airing",
    onEps: 14,
    totalEps: 24,
  },
  {
    name: "Hana Kimi",
    image: "images/hana-kimi.jpg",
    season: "2",
    status: "Airing",
    onEps: 4,
    totalEps: 12,
  },
  {
    name: "Rich Girl Caretaker",
    image: "images/rich-girl-caretaker.png",
    season: "",
    status: "Airing",
    onEps: 2,
    totalEps: 12,
  },
  {
    name: "Grand Blue Dreaming",
    image: "images/grand-blue-dreaming.png",
    season: "3",
    status: "Airing",
    onEps: 2,
    totalEps: 12,
  },
  {
    name: "You and I Are Polar Opposites",
    image: "images/you-and-i-are-polar-opposites.jpg",
    season: "2",
    status: "Airing",
    onEps: 2,
    totalEps: 12,
  },
  {
    name: "Smoking Behind the Supermarket with You",
    image: "images/smoking-behind-the-supermarket-with-you.png",
    season: "",
    status: "Airing",
    onEps: 2,
    totalEps: 12,
  },
  {
    name: "Love Unseen Beneath the Clear Night Sky",
    image: "images/love-unseen-beneath-the-clear-night-sky.jpg",
    season: "",
    status: "Airing",
    onEps: 2,
    totalEps: 8,
  },
]

const animeplan = [
  {
    name: "Who Ever Steals This Book",
    image: "images/whoever-steals-this-book.jpg",
    status: "Upcoming",
    info: "Airing 2026"
  },
  {
    name: "The Ramparts of Ice",
    image: "images/the-ramparts-of-ice.jpg",
    status: "New Season Upcoming",
    info: "Yet to Start"
  },
  {
    name: "Gachiakuta",
    image: "images/gachiakuta.jpg",
    status: "New Season Upcoming",
    info: "Yet to Start"
  },
  {
    name: "The Future Diary",
    image: "images/the-future-diary.png",
    status: "Completed",
    info: "Yet to Start"
  },
  {
    name: "Lycoris Recoil",
    image: "images/lycoris-recoil.jpg",
    status: "Completed",
    info: "Yet to Start"
  },
  {
    name: "Makeine: Too Many Losing Heroines!",
    image: "images/makeine.jpg",
    status: "Completed",
    info: "Yet to Start"
  },
  {
    name: "Daemons of the Shadow Realm",
    image: "images/daemons-of-the-shadow-realm.jpg",
    status: "Airing",
    info: "Yet to Start"
  },
  {
    name: "Re:ZERO",
    image: "images/rezero.jpg",
    status: "New Season Upcoming",
    info: "Yet to Start"
  },
  {
    name: "Neon Genesis Evangelion",
    image: "images/evangelion.jpg",
    status: "Completed",
    info: "Yet to Start"
  },
  {
    name: "Mushoku Tensei: Jobless Reincarnation",
    image: "images/mushoku-tensei.jpg",
    status: "New Season Upcoming",
    info: "Airing"
  },
  {
    name: "Blue Box",
    image: "images/blue-box.jpg",
    status: "New Season Upcoming",
    info: "To continue, October 4"
  },
  {
    name: "The Detective Is Already Dead",
    image: "images/the-detective-is-already-dead.jpg",
    status: "New Season Upcoming",
    info: "To continue, October"
  },
  {
    name: "The Apothecary Diaries",
    image: "images/the-apothecary-diaries.jpg",
    status: "New Season Upcoming",
    info: "To continue, October"
  },
];

const animeall = [
  {
    name: "365 Days to the Wedding",
    image: "images/365-days-to-the-wedding.jpg",
    released: "2024-10",
    theme: [lp],
  },
  {
    name: "86",
    image: "images/86.jpg",
    released: "2021-04",
    theme: [cb, mp],
  },
  {
    name: "Agents of the Four Seasons: Dance of Spring",
    image: "images/agents-of-the-four-seasons.jpg",
    released: "2026-03",
    theme: [lp, ga],
  },
  {
    name: "Akudama Drive",
    image: "images/akudama-drive.jpg",
    released: "2020-10",
    theme: [cb, mp],
  },
  {
    name: "Alya Sometimes Hides Her Feelings in Russian",
    image: "images/alya-sometimes-hides-her-feelings-in-russian.jpg",
    released: "2024-07",
    theme: [lp],
  },
  {
    name: "Ameku M.D.: Doctor Detective",
    image: "images/ameku-md-doctor-detective.jpg",
    released: "2025-01",
    theme: [mp],
  },
  {
    name: "The Angel Next Door Spoils Me Rotten",
    image: "images/the-angel-next-door-spoils-me-rotten.jpg",
    released: "2023-01",
    theme: [lp],
  },
  {
    name: "Another",
    image: "images/another.png",
    released: "2012-01",
    theme: [mp],
  },
  {
    name: "The Apothecary Diaries",
    image: "images/the-apothecary-diaries.jpg",
    released: "2023-10",
    theme: [mp, lp, ga],
  },
  {
    name: "Assassination Classroom",
    image: "images/assassination-classroom.jpg",
    released: "2015-01",
    theme: [ga, cb, lp],
  },

  {
    name: "The Beginning After the End",
    image: "images/the-beginning-after-the-end.jpg",
    released: "2025-04",
    theme: [ga, cb],
  },
  {
    name: "Blue Box",
    image: "images/blue-box.jpg",
    released: "2024-10",
    theme: [lp],
  },
  {
    name: "Bocchi the Rock!",
    image: "images/bocchi-the-rock.jpg",
    released: "2022-10",
    theme: [lp],
  },
  {
    name: "Bubble",
    image: "images/bubble.jpg",
    released: "2022-04",
    theme: [ga, lp],
  },
  {
    name: "Buddy Daddies",
    image: "images/buddy-daddies.jpg",
    released: "2023-01",
    theme: [lp, cb],
  },
  {
    name: "Bungo Stray Dogs",
    image: "images/bungo-stray-dogs.jpg",
    released: "2016-04",
    theme: [ga, cb, mp],
  },

  {
    name: "The Case Study of Vanitas",
    image: "images/the-case-study-of-vanitas.jpg",
    released: "2021-07",
    theme: [ga, cb],
  },
  {
    name: "Chainsaw Man",
    image: "images/chainsaw-man.png",
    released: "2022-10",
    theme: [cb],
  },
  {
    name: "Classroom of the Elite",
    image: "images/classroom-of-the-elite.jpg",
    released: "2017-07",
    theme: [mp],
  },
  {
    name: "Colorful Stage! The Movie: A Miku Who Can't Sing",
    image: "images/colorful-stage-movie.jpg",
    released: "2025-01",
    theme: [lp],
  },
  {
    name: "Cosmic Princess Kaguya!",
    image: "images/cosmic-princess-kaguya.jpg",
    released: "2026-01",
    theme: [ga, lp],
  },

  {
    name: "Dandadan",
    image: "images/dandadan.jpg",
    released: "2024-10",
    theme: [cb, ga],
  },
  {
    name: "Darling in the FRANXX",
    image: "images/darling-in-the-franxx.png",
    released: "2018-01",
    theme: [lp, cb],
  },
  {
    name: "Death Note",
    image: "images/death-note.jpg",
    released: "2006-10",
    theme: [mp],
  },
  {
    name: "Demon Lord 2099",
    image: "images/demon-lord-2099.jpg",
    released: "2024-10",
    theme: [ga, cb],
  },
  {
    name: "Demon Slayer",
    image: "images/demon-slayer.jpg",
    released: "2019-04",
    theme: [cb, ga],
  },
  {
    name: "Demon Sword Master of Excalibur Academy",
    image: "images/demon-sword-master.jpg",
    released: "2023-10",
    theme: [ga, cb],
  },
  {
    name: "The Detective Is Already Dead",
    image: "images/the-detective-is-already-dead.jpg",
    released: "2021-07",
    theme: [mp, lp],
  },

  {
    name: "Erased",
    image: "images/erased.jpg",
    released: "2016-01",
    theme: [mp],
  },

  {
    name: "The Fragrant Flower Blooms with Dignity",
    image: "images/the-fragrant-flower-blooms-with-dignity.jpg",
    released: "2025-07",
    theme: [lp],
  },
  {
    name: "Frieren: Beyond Journey's End",
    image: "images/frieren.jpg",
    released: "2023-09",
    theme: [ga, cb, lp],
  },
  {
    name: "Fruits Basket",
    image: "images/fruits-basket.jpg",
    released: "2019-04",
    theme: [lp],
  },

  {
    name: "The Garden of Words",
    image: "images/the-garden-of-words.jpg",
    released: "2013-05",
    theme: [lp],
  },
  {
    name: "Grand Blue Dreaming",
    image: "images/grand-blue-dreaming.png",
    released: "2018-07",
    theme: [lp],
  },

  {
    name: "Hana Kimi",
    image: "images/hana-kimi.jpg",
    released: "2026-01",
    theme: [lp],
  },
  {
    name: "Headhunted to Another World: From Salaryman to Big Four!",
    image: "images/headhunted-to-another-world.jpg",
    released: "2025-01",
    theme: [ga],
  },
  {
    name: "Hell's Paradise",
    image: "images/hells-paradise.jpg",
    released: "2023-04",
    theme: [cb, ga],
  },
  {
    name: "Hello World",
    image: "images/hello-world.png",
    released: "2019-09",
    theme: [lp, ga],
  },
  {
    name: "Honey Lemon Soda",
    image: "images/honey-lemon-soda.jpg",
    released: "2025-01",
    theme: [lp],
  },
  {
    name: "Horimiya",
    image: "images/horimiya.jpg",
    released: "2021-01",
    theme: [lp],
  },

  {
    name: "I Made Friends with the Second Prettiest Girl in My Class",
    image: "images/second-prettiest-girl.jpg",
    released: "2026-04",
    theme: [lp],
  },
  {
    name: "I Want to Eat Your Pancreas",
    image: "images/i-want-to-eat-your-pancreas.jpg",
    released: "2018-09",
    theme: [lp],
  },
  {
    name: "If My Wife Becomes an Elementary School Student",
    image: "images/if-my-wife-becomes-an-elementary-school-student.jpg",
    released: "2024-10",
    theme: [lp, mp],
  },

  {
    name: "Jingai-san no Yome",
    image: "images/jingai-san-no-yome.jpg",
    released: "2018-10",
    theme: [lp],
  },
  {
    name: "Josee, the Tiger and the Fish",
    image: "images/josee-the-tiger-and-the-fish.jpg",
    released: "2020-12",
    theme: [lp],
  },
  {
    name: "Jujutsu Kaisen",
    image: "images/jujutsu-kaisen.jpg",
    released: "2020-10",
    theme: [cb],
  },

  {
    name: "Kaguya-sama: Love Is War",
    image: "images/kaguya-sama-love-is-war.png",
    released: "2019-01",
    theme: [lp],
  },
  {
    name: "Kaiju No. 8",
    image: "images/kaiju-no-8.jpg",
    released: "2024-04",
    theme: [cb],
  },
  {
    name: "King's Game",
    image: "images/kings-game.jpg",
    released: "2017-10",
    theme: [cb, mp],
  },

  {
    name: "Let This Grieving Soul Retire",
    image: "images/let-this-grieving-soul-retire.png",
    released: "2024-10",
    theme: [ga],
  },
  {
    name: "Liar Game",
    image: "images/liar-game.png",
    released: "2026-04",
    theme: [mp],
  },
  {
    name: "Love Unseen Beneath the Clear Night Sky",
    image: "images/love-unseen-beneath-the-clear-night-sky.jpg",
    released: "2026-07",
    theme: [lp],
  },

  {
    name: "Maid Sama!",
    image: "images/maid-sama.png",
    released: "2010-04",
    theme: [lp],
  },
  {
    name: "Marriagetoxin",
    image: "images/marriagetoxin.jpg",
    released: "2026-04",
    theme: [ga, cb],
  },
  {
    name: "The Master of Killing Time",
    image: "images/the-master-of-killing-time.jpg",
    released: "2014-01",
    theme: [lp],
  },
  {
    name: "Mecha-Ude: Mechanical Arms",
    image: "images/mecha-ude.jpg",
    released: "2024-10",
    theme: [cb, ga],
  },
  {
    name: "Monthly Girls' Nozaki-kun",
    image: "images/monthly-girls-nozaki-kun.png",
    released: "2014-07",
    theme: [lp],
  },
  {
    name: "More Than a Married Couple, but Not Lovers",
    image: "images/more-than-a-married-couple.jpg",
    released: "2022-10",
    theme: [lp],
  },
  {
    name: "The Most Notorious Talker Runs the World's Greatest Clan",
    image: "images/the-most-notorious-talker.jpg",
    released: "2024-10",
    theme: [ga, cb],
  },
  {
    name: "My Dress-Up Darling",
    image: "images/my-dress-up-darling.jpg",
    released: "2022-01",
    theme: [lp],
  },

  {
    name: "Oshi no Ko",
    image: "images/oshi-no-ko.jpg",
    released: "2023-04",
    theme: [mp, lp],
  },

  {
    name: "The Pet Girl of Sakurasou",
    image: "images/the-pet-girl-of-sakurasou.jpg",
    released: "2012-10",
    theme: [lp],
  },
  {
    name: "Plastic Neesan",
    image: "images/plastic-neesan.png",
    released: "2011-05",
    theme: [lp],
  },
  {
    name: "The Promised Neverland",
    image: "images/the-promised-neverland.jpg",
    released: "2019-01",
    theme: [mp, ga],
  },

  {
    name: "The Quintessential Quintuplets",
    image: "images/the-quintessential-quintuplets.png",
    released: "2019-01",
    theme: [lp],
  },

  {
    name: "Rascal Does Not Dream Series",
    image: "images/rascal-does-not-dream.jpg",
    released: "2018-10",
    theme: [lp, mp],
  },
  {
    name: "Rent-a-Girlfriend",
    image: "images/rent-a-girlfriend.jpg",
    released: "2020-07",
    theme: [lp],
  },
  {
    name: "Rich Girl Caretaker",
    image: "images/rich-girl-caretaker.png",
    released: "2026-07",
    theme: [lp],
  },
  {
    name: "Ron Kamonohashi's Forbidden Deductions",
    image: "images/ron-kamonohashi.jpg",
    released: "2023-10",
    theme: [mp],
  },
  {
    name: "Rurouni Kenshin",
    image: "images/rurouni-kenshin.png",
    released: "2023-07",
    theme: [cb, ga],
  },

  {
    name: "Sakamoto Days",
    image: "images/sakamoto-days.png",
    released: "2025-01",
    theme: [ga, cb, lp],
  },
  {
    name: "Shangri-La Frontier",
    image: "images/shangri-la-frontier.jpg",
    released: "2023-10",
    theme: [ga, cb],
  },
  {
    name: "Shikimori's Not Just a Cutie",
    image: "images/shikimori.jpg",
    released: "2022-04",
    theme: [lp],
  },
  {
    name: "The Shiunji Family Children",
    image: "images/the-shiunji-family-children.jpg",
    released: "2025-04",
    theme: [lp],
  },
  {
    name: "Smoking Behind the Supermarket with You",
    image: "images/smoking-behind-the-supermarket-with-you.png",
    released: "2026-06",
    theme: [lp]
  },
  {
    name: "Solo Leveling",
    image: "images/solo-leveling.png",
    released: "2024-01",
    theme: [cb, ga],
  },
  {
    name: "Spy x Family",
    image: "images/spyxfamily.png",
    released: "2022-04",
    theme: [lp, cb],
  },
  {
    name: "The Strongest Magician in the Demon Lord's Army Was a Human",
    image: "images/the-strongest-magician.jpg",
    released: "2024-07",
    theme: [ga, cb],
  },
  {
    name: "Summer Ghost",
    image: "images/summer-ghost.jpg",
    released: "2021-01",
    theme: [mp, lp],
  },
  {
    name: "The Summer Hikaru Died",
    image: "images/the-summer-hikaru-died.jpg",
    released: "2025-07",
    theme: [mp, cb],
  },
  {
    name: "Summertime Rendering",
    image: "images/summertime-rendering.png",
    released: "2022-04",
    theme: [mp],
  },
  {
    name: "Suzume",
    image: "images/suzume.jpg",
    released: "2022-11",
    theme: [ga, lp],
  },

  {
    name: "Takopi's Original Sin",
    image: "images/takopis-original-sin.jpg",
    released: "2025-06",
    theme: [mp],
  },
  {
    name: "Tasokare Hotel",
    image: "images/tasokare-hotel.jpg",
    released: "2025-01",
    theme: [mp],
  },
  {
    name: "That Time I Got Reincarnated as a Slime",
    image: "images/tensura.jpg",
    released: "2018-10",
    theme: [ga, cb],
  },
  {
    name: "To Every You I've Loved Before",
    image: "images/to-every-you-ive-loved-before.jpg",
    released: "2022-10",
    theme: [lp],
  },
  {
    name: "To Me, the One Who Loved You",
    image: "images/to-me-the-one-who-loved-you.jpg",
    released: "2022-10",
    theme: [lp],
  },
  {
    name: "Toilet-Bound Hanako-kun",
    image: "images/toilet-bound-hanako-kun.jpg",
    released: "2020-01",
    theme: [lp, ga],
  },
  {
    name: "Toradora!",
    image: "images/toradora.jpg",
    released: "2008-10",
    theme: [lp],
  },
  {
    name: "Tower of God",
    image: "images/tower-of-god.jpg",
    released: "2020-04",
    theme: [cb, ga],
  },
  {
    name: "Trapezium",
    image: "images/trapezium.jpg",
    released: "2024-05",
    theme: [lp],
  },
  {
    name: "The Tunnel to Summer, the Exit of Goodbye",
    image: "images/the-tunnel-to-summer.jpg",
    released: "2022-09",
    theme: [lp],
  },

  {
    name: "Violet Evergarden",
    image: "images/violet-evergarden.jpg",
    released: "2018-01",
    theme: [lp, mp],
  },

  {
    name: "Weathering with You",
    image: "images/weathering-with-you.png",
    released: "2019-07",
    theme: [lp],
  },
  {
    name: "Wind Breaker",
    image: "images/wind-breaker.jpg",
    released: "2024-04",
    theme: [cb],
  },
  {
    name: "Wistoria: Wand and Sword",
    image: "images/wistoria.jpg",
    released: "2024-07",
    theme: [cb, ga],
  },
  {
    name: "Witch Hat Atelier",
    image: "images/witch-hat-atelier.jpg",
    released: "2026-04",
    theme: [ga, lp],
  },

  {
    name: "Yakuza Fiance",
    image: "images/yakuza-fiance.jpg",
    released: "2024-10",
    theme: [mp, cb],
  },
  {
    name: "You and I Are Polar Opposites",
    image: "images/you-and-i-are-polar-opposites.jpg",
    released: "2026-01",
    theme: [lp],
  },
  {
    name: "You Are Ms. Servant",
    image: "images/you-are-ms-servant.jpg",
    released: "2024-10",
    theme: [lp],
  },
  {
    name: "Your Lie in April",
    image: "images/your-lie-in-april.png",
    released: "2014-10",
    theme: [lp],
  },
  {
    name: "Your Name",
    image: "images/your-name.png",
    released: "2016-08",
    theme: [lp],
  },

  {
    name: "Zom 100: Bucket List of the Dead",
    image: "images/zom-100.png",
    released: "2023-07",
    theme: [ga],
  },
]
