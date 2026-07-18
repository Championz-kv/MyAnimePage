// mode on website
const MODE = {
    WATCHED: "watched",
    WATCHING: "watching",
    PLAN: "plan"
}
let currentMode = MODE.WATCHED

// filter and sort options
let searchText = ""
let selectedThemes = new Set()
const SORT = { OFF: 0, ASC: 1, DESC: 2 }
let sortState = { alpha: SORT.ASC, time: SORT.OFF }

// card setups
function getCardText(anime) {

  if (currentMode === MODE.WATCHED) {
  return `
    <img src="${anime.image}">
    <p>
      ${anime.name}
      <span class="year">(${anime.released.slice(0, 4)})</span>
    </p>
  `
  }

  if (currentMode === MODE.WATCHING) {
  return `
    <img src="${anime.image}">
    <p>
      ${anime.name}
      ${anime.season ? `<span class="season">(Season ${anime.season})</span>` : ""}
      <br>
      <span class="status">Status : ${anime.status}</span>
      <br>
      <span class="episodes"><strong>${anime.current_episode} / ${anime.total_episodes}</strong> Episodes</span>
    </p>
  `
  }

  return `
    <img src="${anime.image}">
    <p>
      ${anime.name}
      <br>
      <span class="status">Status : ${anime.status}</span>
      ${anime.info ? `<br><span class="info">${anime.info}</span>` : ""}
    </p>
  `
  }

// active source list depending on current mode
function getBaseList() {

    if (currentMode === MODE.WATCHED)
        return animeData.filter(anime => anime.watched)

    if (currentMode === MODE.WATCHING)
        return animeData.filter(anime => anime.watching)

    return animeData.filter(anime => anime.planned)

}
// the list actually shown on screen (base list, filtered + sorted)
let animeList = []

// single unified filter + sort function
function updateAnimeList() {
  let list = [...getBaseList()]

  if (currentMode === MODE.WATCHED) {

    if (selectedThemes.size > 0) {
      list = list.filter(anime =>
        anime.theme.some(theme => selectedThemes.has(theme))
      )
    }

    if (searchText !== "") {
      list = list.filter(anime =>
        anime.name.toLowerCase().includes(searchText)
      )
    }

    if (sortState.alpha !== SORT.OFF) {
      if (sortState.alpha === SORT.DESC) {
        list = list.toReversed()
      }
    }

    else if (sortState.time !== SORT.OFF) {
      list = list.sort((a, b) =>
        sortState.time === SORT.ASC
          ? a.released.localeCompare(b.released)
          : b.released.localeCompare(a.released)
      )
    }
  }

  animeList = list
}

// render grid
const numberOfColumns = 5
const grid = document.getElementById("anime-grid")

function renderAnimeGrid() {
  grid.innerHTML = ""
  // create columns
  const columns = []
  for (let i = 0; i < numberOfColumns; i++) {
    const column = document.createElement("div")
    column.classList.add("column")

    if (i % 2 === 1) {
      column.classList.add("offset")
    }
    grid.appendChild(column)
    columns.push(column)
  }

  const completeRows = Math.floor(animeList.length / numberOfColumns)
  const normalCount = completeRows * numberOfColumns

  // Fill all complete rows
  for (let index = 0; index < normalCount; index++) {
    const anime = animeList[index]
    const card = document.createElement("div")
    card.classList.add("anime-card")
    card.classList.add(currentMode)

    card.innerHTML = getCardText(anime)

    const columnIndex = index % numberOfColumns
    columns[columnIndex].appendChild(card)
  }

  // Create last incomplete row
  const remaining = animeList.length - normalCount

  const lastRowPositions = {
    1: [2],
    2: [0, 4],
    3: [0, 2, 4],
    4: [0, 1, 3, 4],
  }

  if (remaining > 0) {
    const positions = lastRowPositions[remaining]

    for (let i = 0; i < remaining; i++) {
      const anime = animeList[normalCount + i]
      const card = document.createElement("div")
      card.classList.add("anime-card")
      card.classList.add(currentMode)

      card.innerHTML = getCardText(anime)

      columns[positions[i]].appendChild(card)
    }
  }

  if (selectedThemes.size === 0) {
    document.getElementById("anime-count").textContent =
      `Showing all ${animeList.length} anime.`
  } else {
    document.getElementById("anime-count").textContent =
      `Showing selected ${animeList.length} anime.`
  }
}

// background lines
const colors = [
  "rgba(120, 180, 255, 0.20)",
  "rgba(120, 255, 180, 0.20)",
  "rgba(255, 235, 120, 0.20)",
  "rgba(255, 150, 150, 0.20)",
]
for (let i = 0; i < 30; i++) {
  const line = document.createElement("div")
  line.classList.add("bg-line")
  document.querySelector(".background-lines").appendChild(line)

  line.style.width = 100 + Math.random() * 300 + "px"
  line.style.left = "-200px"
  line.style.top = 30 + Math.random() * 250 + "%"
  line.style.animationDelay = -(Math.random() * 20) + "s"
  line.style.animationDuration = 10 + Math.random() * 20 + "s"
  line.style.setProperty("--travel", 2000 + Math.random() * 1000 + "px")
  const color = colors[Math.floor(Math.random() * colors.length)]
  line.style.setProperty("--line-color", color)
}

//buttons
const headerText = document.getElementById("header-text")

const mainControls = document.getElementById("main-controls")

const watchedBtn = document.getElementById("mode-watched-btn")
watchedBtn.style.display = "none"
const watchingBtn = document.getElementById("mode-watching-btn")
const planBtn = document.getElementById("mode-plan-btn")

watchedBtn.addEventListener("click", () => {
  currentMode = MODE.WATCHED
  updateModeUI()
  updateAnimeList()
  renderAnimeGrid()
})

watchingBtn.addEventListener("click", () => {
  currentMode = MODE.WATCHING
  updateModeUI()
  updateAnimeList()
  renderAnimeGrid()
})

planBtn.addEventListener("click", () => {
  currentMode = MODE.PLAN
  updateModeUI()
  updateAnimeList()
  renderAnimeGrid()
})

function updateModeUI() {
  const selectedThemesBox = document.getElementById("selected-themes")
  watchedBtn.style.display = "inline-block"
  watchingBtn.style.display = "inline-block"
  planBtn.style.display = "inline-block"

  if (currentMode === MODE.WATCHED) {
    watchedBtn.style.display = "none"
    mainControls.style.display = "inline-flex"
    selectedThemesBox.style.display = "block"
    headerText.textContent = "Animes I've watched so far..."
  }

  else if (currentMode === MODE.WATCHING) {
    watchingBtn.style.display = "none"
    mainControls.style.display = "none"
    selectedThemesBox.style.display = "none"
    headerText.textContent = "Animes I'm currently watching..."
  }

  else {
    planBtn.style.display = "none"
    mainControls.style.display = "none"
    selectedThemesBox.style.display = "none"
    headerText.textContent = "Animes I plan to watch..."
  }
}

// sorting buttons
function toggleAlpha() {
  sortState.alpha = sortState.alpha === SORT.ASC ? SORT.DESC : SORT.ASC
  sortState.time = SORT.OFF
}
function toggleTime() {
  sortState.time = sortState.time === SORT.DESC ? SORT.ASC : SORT.DESC
  sortState.alpha = SORT.OFF
}

const sortBtnalpha = document.getElementById("sort-btn-alpha")
const sortBtntime = document.getElementById("sort-btn-time")
function togglebtn() {
  if (sortState.alpha === 1) {
    sortBtnalpha.textContent = "▼ A to Z"
  } else if (sortState.alpha === 2) {
    sortBtnalpha.textContent = "▲ Z to A"
  } else {
    sortBtnalpha.textContent = "Alphabetical"
  }
  if (sortState.time === 1) {
    sortBtntime.textContent = "▲ Oldest first"
  } else if (sortState.time === 2) {
    sortBtntime.textContent = "▼ Newest first"
  } else {
    sortBtntime.textContent = "Released"
  }
}

sortBtnalpha.addEventListener("click", () => {
  toggleAlpha()
  togglebtn()
  updateAnimeList()
  renderAnimeGrid()
})

sortBtntime.addEventListener("click", () => {
  toggleTime()
  togglebtn()
  updateAnimeList()
  renderAnimeGrid()
})

// theme filter
function updateThemeTags() {
  const container = document.getElementById("selected-themes")
  container.innerHTML = ""

  selectedThemes.forEach((theme) => {
    const tag = document.createElement("span")
    const colors = {
      [cb]: "#ff9500",
      [ga]: "#43ff82",
      [lp]: "#ff2f74",
      [mp]: "#9c38ff",
    }
    tag.style.color = colors[theme]
    tag.textContent = "<" + themeNames[theme] + ">"
    tag.classList.add("theme-tag")
    container.appendChild(tag)
  })
}

const themeSelect = document.getElementById("theme-select")
themeSelect.addEventListener("change", () => {
  const selected = themeSelect.value
  if (!selected) {
    return
  }
  if (selectedThemes.has(selected)) {
    selectedThemes.delete(selected)
  } else {
    selectedThemes.add(selected)
  }
  if (selectedThemes.size === 4) {
    selectedThemes.clear()
  }
  updateThemeTags()
  updateAnimeList()
  renderAnimeGrid()
  themeSelect.value = ""
})

const searchBox = document.getElementById("search-box")
searchBox.addEventListener("input", () => {
    searchText = searchBox.value.trim().toLowerCase()

    updateAnimeList()
    renderAnimeGrid()
})
