/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306545694")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.collectionName = \"customers\""
  }, collection)

  return app.save(collection)
})
