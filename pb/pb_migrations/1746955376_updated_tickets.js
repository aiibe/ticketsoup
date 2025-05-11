/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306545694");

  // remove field
  collection.fields.removeById("text2929936659");

  // update collection data
  unmarshal(
    {
      updateRule: '@request.auth.collectionName = "agents"',
    },
    collection,
  );

  return app.save(collection);
});
