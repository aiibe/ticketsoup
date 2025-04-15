/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1751747783")

  // update collection data
  unmarshal({
    "passwordAuth": {
      "enabled": true
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1751747783")

  // update collection data
  unmarshal({
    "passwordAuth": {
      "enabled": false
    }
  }, collection)

  return app.save(collection)
})
