/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306545694");

  // add field
  collection.fields.addAt(
    5,
    new Field({
      hidden: false,
      id: "bool80170468",
      name: "closed",
      presentable: false,
      required: false,
      system: false,
      type: "bool",
    }),
  );

  // update collection data
  unmarshal(
    {
      createRule: '@request.auth.collectionName = "customers"',
    },
    collection,
  );

  return app.save(collection);
});
