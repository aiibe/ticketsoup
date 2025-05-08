/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306545694")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "[a-z0-9]{30}",
    "hidden": false,
    "id": "text2929936659",
    "max": 0,
    "min": 0,
    "name": "reference",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306545694")

  // remove field
  collection.fields.removeById("text2929936659")

  return app.save(collection)
})
