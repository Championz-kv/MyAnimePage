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

console.log("animedata.js loaded")

let animeData = []

async function loadAnimeData() {

    console.log("loadAnimeData called")

    try {
        const response = await fetch("/api/anime")
        if (!response.ok)
            throw new Error("Failed to fetch anime")

        //animeData = await response.json()
        animeData = (await response.json()).map(anime => {

          anime.image = anime.image_path
          anime.released = anime.release_month
          anime.theme = []

          if (anime.love_peace)
            anime.theme.push(lp)
          if (anime.growth_adventure)
            anime.theme.push(ga)
          if (anime.mind_psychology)
            anime.theme.push(mp)
          if (anime.conflict_battle)
            anime.theme.push(cb)

          return anime
        })

        updateAnimeList()
        renderAnimeGrid()
    }

    catch (err) {
        console.error(err)
    }
}

loadAnimeData()