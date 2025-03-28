/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3549173383")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.collectionName = \"agents\"",
    "viewRule": "@request.auth.collectionName = \"agents\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3549173383")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": ""
  }, collection)

  return app.save(collection)
})
