const animesascending = [
    { name: "365 Days to the Wedding", image: "images/365-days-to-the-wedding.jpg", released: "2024-10" },
    { name: "86", image: "images/86.jpg", released: "2021-04" },

    { name: "Agents of the Four Seasons: Dance of Spring", image: "images/agents-of-the-four-seasons.jpg", released: "2026-03" },
    { name: "Akudama Drive", image: "images/akudama-drive.jpg", released: "2020-10" },
    { name: "Alya Sometimes Hides Her Feelings in Russian", image: "images/alya-sometimes-hides-her-feelings-in-russian.jpg", released: "2024-07" },
    { name: "Ameku M.D.: Doctor Detective", image: "images/ameku-md-doctor-detective.jpg", released: "2025-01" },
    { name: "The Angel Next Door Spoils Me Rotten", image: "images/the-angel-next-door-spoils-me-rotten.jpg", released: "2023-01" },
    { name: "Another", image: "images/another.png", released: "2012-01" },
    { name: "The Apothecary Diaries", image: "images/the-apothecary-diaries.jpg", released: "2023-10" },
    { name: "Assassination Classroom", image: "images/assassination-classroom.jpg", released: "2015-01" },

    { name: "The Beginning After the End", image: "images/the-beginning-after-the-end.jpg", released: "2025-04" },
    { name: "Blue Box", image: "images/blue-box.jpg", released: "2024-10" },
    { name: "Bocchi the Rock!", image: "images/bocchi-the-rock.jpg", released: "2022-10" },
    { name: "Bubble", image: "images/bubble.jpg", released: "2022-04" },
    { name: "Buddy Daddies", image: "images/buddy-daddies.jpg", released: "2023-01" },
    { name: "Bungo Stray Dogs", image: "images/bungo-stray-dogs.jpg", released: "2016-04" },

    { name: "The Case Study of Vanitas", image: "images/the-case-study-of-vanitas.jpg", released: "2021-07" },
    { name: "Chainsaw Man", image: "images/chainsaw-man.png", released: "2022-10" },
    { name: "Classroom of the Elite", image: "images/classroom-of-the-elite.jpg", released: "2017-07" },
    { name: "Colorful Stage! The Movie: A Miku Who Can't Sing", image: "images/colorful-stage-movie.jpg", released: "2025-01" },
    { name: "Cosmic Princess Kaguya!", image: "images/cosmic-princess-kaguya.jpg", released: "2026-01" },

    { name: "Dandadan", image: "images/dandadan.jpg", released: "2024-10" },
    { name: "Darling in the FRANXX", image: "images/darling-in-the-franxx.png", released: "2018-01" },
    { name: "Death Note", image: "images/death-note.jpg", released: "2006-10" },
    { name: "Demon Lord 2099", image: "images/demon-lord-2099.jpg", released: "2024-10" },
    { name: "Demon Slayer", image: "images/demon-slayer.jpg", released: "2019-04" },
    { name: "Demon Sword Master of Excalibur Academy", image: "images/demon-sword-master.jpg", released: "2023-10" },
    { name: "The Detective Is Already Dead", image: "images/the-detective-is-already-dead.jpg", released: "2021-07" },

    { name: "Erased", image: "images/erased.jpg", released: "2016-01" },

    { name: "The Fragrant Flower Blooms with Dignity", image: "images/the-fragrant-flower-blooms-with-dignity.jpg", released: "2025-07" },
    { name: "Frieren: Beyond Journey's End", image: "images/frieren.jpg", released: "2023-09" },
    { name: "Fruits Basket", image: "images/fruits-basket.jpg", released: "2019-04" },

    { name: "The Garden of Words", image: "images/the-garden-of-words.jpg", released: "2013-05" },
    { name: "Grand Blue Dreaming", image: "images/grand-blue-dreaming.png", released: "2018-07" },

    { name: "Hana Kimi", image: "images/hana-kimi.jpg", released: "2026-01" },
    { name: "Headhunted to Another World: From Salaryman to Big Four!", image: "images/headhunted-to-another-world.jpg", released: "2025-01" },
    { name: "Hell's Paradise", image: "images/hells-paradise.jpg", released: "2023-04" },
    { name: "Hello World", image: "images/hello-world.png", released: "2019-09" },
    { name: "Honey Lemon Soda", image: "images/honey-lemon-soda.jpg", released: "2025-01" },
    { name: "Horimiya", image: "images/horimiya.jpg", released: "2021-01" },

    { name: "I Made Friends with the Second Prettiest Girl in My Class", image: "images/second-prettiest-girl.jpg", released: "2026-04" },
    { name: "I Want to Eat Your Pancreas", image: "images/i-want-to-eat-your-pancreas.jpg", released: "2018-09" },
    { name: "If My Wife Becomes an Elementary School Student", image: "images/if-my-wife-becomes-an-elementary-school-student.jpg", released: "2024-10" },

    { name: "Jingai-san no Yome", image: "images/jingai-san-no-yome.jpg", released: "2018-10" },
    { name: "Josee, the Tiger and the Fish", image: "images/josee-the-tiger-and-the-fish.jpg", released: "2020-12" },
    { name: "Jujutsu Kaisen", image: "images/jujutsu-kaisen.jpg", released: "2020-10" },

    { name: "Kaguya-sama: Love Is War", image: "images/kaguya-sama-love-is-war.png", released: "2019-01" },
    { name: "Kaiju No. 8", image: "images/kaiju-no-8.jpg", released: "2024-04" },
    { name: "King's Game", image: "images/kings-game.jpg", released: "2017-10" },

    { name: "Let This Grieving Soul Retire", image: "images/let-this-grieving-soul-retire.png", released: "2024-10" },
    { name: "Liar Game", image: "images/liar-game.png", released: "2026-04" },

    { name: "Maid Sama!", image: "images/maid-sama.png", released: "2010-04" },
    { name: "Marriagetoxin", image: "images/marriagetoxin.jpg", released: "2026-04" },
    { name: "Mecha-Ude: Mechanical Arms", image: "images/mecha-ude.jpg", released: "2024-10" },
    { name: "Monthly Girls' Nozaki-kun", image: "images/monthly-girls-nozaki-kun.png", released: "2014-07" },
    { name: "More Than a Married Couple, but Not Lovers", image: "images/more-than-a-married-couple.jpg", released: "2022-10" },
    { name: "The Most Notorious Talker Runs the World's Greatest Clan", image: "images/the-most-notorious-talker.jpg", released: "2024-10" },
    { name: "My Dress-Up Darling", image: "images/my-dress-up-darling.jpg", released: "2022-01" },
    
    { name: "Oshi no Ko", image: "images/oshi-no-ko.jpg", released: "2023-04" },

    { name: "The Pet Girl of Sakurasou", image: "images/the-pet-girl-of-sakurasou.jpg", released: "2012-10" },
    { name: "Plastic Neesan", image: "images/plastic-neesan.png", released: "2011-05" },
    { name: "The Promised Neverland", image: "images/the-promised-neverland.jpg", released: "2019-01" },

    { name: "The Quintessential Quintuplets", image: "images/the-quintessential-quintuplets.png", released: "2019-01" },

    { name: "Rascal Does Not Dream Series", image: "images/rascal-does-not-dream.jpg", released: "2018-10" },
    { name: "Rent-a-Girlfriend", image: "images/rent-a-girlfriend.jpg", released: "2020-07" },
    { name: "Ron Kamonohashi's Forbidden Deductions", image: "images/ron-kamonohashi.jpg", released: "2023-10" },
    { name: "Rurouni Kenshin", image: "images/rurouni-kenshin.png", released: "2023-07" },

    { name: "Sakamoto Days", image: "images/sakamoto-days.png", released: "2025-01" },
    { name: "Shangri-La Frontier", image: "images/shangri-la-frontier.jpg", released: "2023-10" },
    { name: "Shikimori's Not Just a Cutie", image: "images/shikimori.jpg", released: "2022-04" },
    { name: "The Shiunji Family Children", image: "images/the-shiunji-family-children.jpg", released: "2025-04" },
    { name: "Solo Leveling", image: "images/solo-leveling.png", released: "2024-01" },
    { name: "Spy x Family", image: "images/spyxfamily.png", released: "2022-04" },
    { name: "The Strongest Magician in the Demon Lord's Army Was a Human", image: "images/the-strongest-magician.jpg", released: "2024-07" },
    { name: "The Summer Hikaru Died", image: "images/the-summer-hikaru-died.jpg", released: "2025-07" },
    { name: "Summertime Rendering", image: "images/summertime-rendering.png", released: "2022-04" },
    { name: "Suzume", image: "images/suzume.jpg", released: "2022-11" },

    { name: "Takopi's Original Sin", image: "images/takopis-original-sin.jpg", released: "2025-06" },
    { name: "Tasokare Hotel", image: "images/tasokare-hotel.jpg", released: "2025-01" },
    { name: "That Time I Got Reincarnated as a Slime", image: "images/tensura.jpg", released: "2018-10" },
    { name: "To Every You I've Loved Before", image: "images/to-every-you-ive-loved-before.jpg", released: "2022-10" },
    { name: "To Me, the One Who Loved You", image: "images/to-me-the-one-who-loved-you.jpg", released: "2022-10" },
    { name: "Toilet-Bound Hanako-kun", image: "images/toilet-bound-hanako-kun.jpg", released: "2020-01" },
    { name: "Toradora!", image: "images/toradora.jpg", released: "2008-10" },
    { name: "Tower of God", image: "images/tower-of-god.jpg", released: "2020-04" },
    { name: "Trapezium", image: "images/trapezium.jpg", released: "2024-05" },
    { name: "The Tunnel to Summer, the Exit of Goodbye", image: "images/the-tunnel-to-summer.jpg", released: "2022-09" },

    { name: "Weathering with You", image: "images/weathering-with-you.png", released: "2019-07" },
    { name: "Wind Breaker", image: "images/wind-breaker.jpg", released: "2024-04" },
    { name: "Wistoria: Wand and Sword", image: "images/wistoria.jpg", released: "2024-07" },
    { name: "Witch Hat Atelier", image: "images/witch-hat-atelier.jpg", released: "2026-04" },

    { name: "Yakuza Fiance", image: "images/yakuza-fiance.jpg", released: "2024-10" },
    { name: "You and I Are Polar Opposites", image: "images/you-and-i-are-polar-opposites.jpg", released: "2026-01" },
    { name: "You Are Ms. Servant", image: "images/you-are-ms-servant.jpg", released: "2024-10" },
    { name: "Your Lie in April", image: "images/your-lie-in-april.png", released: "2014-10" },
    { name: "Your Name", image: "images/your-name.png", released: "2016-08" },

    { name: "Zom 100: Bucket List of the Dead", image: "images/zom-100.png", released: "2023-07" }
];

// setting anime list to display
const SORT = { OFF: 0, ASC: 1, DESC: 2 };
let sortState = { alpha: SORT.ASC, time: SORT.OFF };

function toggleAlpha() {
  sortState.alpha = sortState.alpha === SORT.ASC ? SORT.DESC : SORT.ASC;
  sortState.time = SORT.OFF;
}
function toggleTime() {
  sortState.time = sortState.time === SORT.DESC ? SORT.ASC : SORT.DESC;
  sortState.alpha = SORT.OFF;
}

let animeList = [...animesascending]

const numberOfColumns = 5;
const grid = document.getElementById("anime-grid");
function renderAnimeGrid() {
    grid.innerHTML = "";
    // create columns
    const columns = [];

    for (let i = 0; i < numberOfColumns; i++) {

        const column = document.createElement("div");
        column.classList.add("column");

        if (i % 2 === 1) {
            column.classList.add("offset");
        }
        grid.appendChild(column);
        columns.push(column);
    }

    const completeRows = Math.floor(animeList.length / numberOfColumns);
    const normalCount = completeRows * numberOfColumns;

    // Fill all complete rows
    for (let index = 0; index < normalCount; index++) {

        const anime = animeList[index];
        const card = document.createElement("div");
        card.classList.add("anime-card");

        card.innerHTML = `
            <img src="${anime.image}">
            <p>${anime.name}</p>
        `;

        const columnIndex = index % numberOfColumns;
        columns[columnIndex].appendChild(card);
    }

    // Create last incomplete row
    const remaining = animeList.length - normalCount;

    const lastRowPositions = {
        1: [2],
        2: [0, 4],
        3: [0, 2, 4],
        4: [0, 1, 3, 4]
    };

    if (remaining > 0) {
        const positions = lastRowPositions[remaining];

        for (let i = 0; i < remaining; i++) {

            const anime = animeList[normalCount + i];
            const card = document.createElement("div");
            card.classList.add("anime-card");

            card.innerHTML = `
                <img src="${anime.image}">
                <p>${anime.name}</p>
            `;

            columns[positions[i]].appendChild(card);
        }
    }

    document.getElementById("anime-count").textContent =
        `${animeList.length} animes included.`;
}

// create the grid and display anime
renderAnimeGrid();
// background lines
const colors = [
    "rgba(120, 180, 255, 0.20)", // blue
    "rgba(120, 255, 180, 0.20)", // green
    "rgba(255, 235, 120, 0.20)", // yellow
    "rgba(255, 150, 150, 0.20)", // red
];

for (let i = 0; i < 30; i++) {
    const line = document.createElement("div");
    line.classList.add("bg-line");
    document.querySelector(".background-lines").appendChild(line);

    line.style.width = (100 + Math.random() * 300) + "px";
    line.style.left = "-200px";
    line.style.top = 30 + Math.random() * 250 + "%";
    line.style.animationDelay = -(Math.random() * 20) + "s";
    line.style.animationDuration = (10 + Math.random() * 20) + "s";
    line.style.setProperty("--travel",(2000 + Math.random() * 1000) + "px");
    const color = colors[Math.floor(Math.random() * colors.length)];
    line.style.setProperty("--line-color", color);
}

//buttons
const sortBtnalpha = document.getElementById("sort-btn-alpha");
const sortBtntime = document.getElementById("sort-btn-time");
function togglebtn(){
    if (sortState.alpha === 1) {
            sortBtnalpha.textContent = "▼ A to Z"
        }
    else if (sortState.alpha === 2) {
            sortBtnalpha.textContent =  "▲ Z to A"
        }
    else {
            sortBtnalpha.textContent =  "Alphabetical"
        }
    if (sortState.time === 1) {
            sortBtntime.textContent = "▲ Oldest first"
        }
    else if (sortState.time === 2) {
            sortBtntime.textContent =  "▼ Newest first"
        }
    else {
            sortBtntime.textContent =  "Released"
        }
}

//a to z button
sortBtnalpha.addEventListener("click", () => {
    toggleAlpha()
    animeList = sortState.alpha===1 ? animesascending : animesascending.toReversed()
    togglebtn()
    renderAnimeGrid()
});

//time button
sortBtntime.addEventListener("click", () => {
    toggleTime()
    animeList = sortState.time===2 ? [...animesascending].sort((a, b) => b.released.localeCompare(a.released)) : [...animesascending].sort((a, b) => a.released.localeCompare(b.released))
    togglebtn()
    renderAnimeGrid()
});