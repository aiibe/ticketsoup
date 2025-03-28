/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306545694")

  // update field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_1751747783",
    "hidden": false,
    "id": "relation2476065779",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "customer_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306545694")

  // update field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_1751747783",
    "hidden": false,
    "id": "relation2476065779",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "customer_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
