const spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
}

const bandsInTown = {
  id: process.env.BANDSINTOWN_ID
}

const omdb = {
  key: process.env.OMDB_API
}

module.exports = {
  spotify: spotify,
  bandsInTown: bandsInTown,
  omdb: omdb
}