/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306545694")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.collectionName = \"customer\"",
    "viewRule": "@request.auth.collectionName = \"agents\" || @request.auth.id = customer_id"
  }, collection)

  // remove field
  collection.fields.removeById("email1593854671")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
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
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306545694")

  // update collection data
  unmarshal({
    "createRule": "",
    "viewRule": ""
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "exceptDomains": [],
    "hidden": false,
    "id": "email1593854671",
    "name": "sender",
    "onlyDomains": [],
    "presentable": false,
    "required": true,
    "system": false,
    "type": "email"
  }))

  // remove field
  collection.fields.removeById("relation2476065779")

  return app.save(collection)
})
