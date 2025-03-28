/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306545694")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3549173383",
    "hidden": false,
    "id": "relation2314121105",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "assigned_to",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306545694")

  // remove field
  collection.fields.removeById("relation2314121105")

  return app.save(collection)
})
