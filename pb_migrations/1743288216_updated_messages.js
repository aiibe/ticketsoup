/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2605467279")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.collectionName = \"agents\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2605467279")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.collectionName = \"agents\" || @request.auth.id = customer_id"
  }, collection)

  return app.save(collection)
})
