/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2605467279")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.collectionName = \"agents\" || @request.auth.id = customer_id"
  }, collection)

  // add field
  collection.fields.addAt(5, new Field({
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

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3549173383",
    "hidden": false,
    "id": "relation873754891",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "agent_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2605467279")

  // update collection data
  unmarshal({
    "listRule": null
  }, collection)

  // remove field
  collection.fields.removeById("relation2476065779")

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3549173383",
    "hidden": false,
    "id": "relation873754891",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "agent_id",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
