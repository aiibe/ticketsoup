/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1751747783")

  // update collection data
  unmarshal({
    "listRule": "@request.query.email != \"\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1751747783")

  // update collection data
  unmarshal({
    "listRule": null
  }, collection)

  return app.save(collection)
})
