/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3549173383")

  // remove field
  collection.fields.removeById("relation1466534506")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3549173383")

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2105053228",
    "hidden": false,
    "id": "relation1466534506",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "role",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
