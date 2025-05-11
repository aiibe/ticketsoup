/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3549173383");

  // add field
  collection.fields.addAt(
    6,
    new Field({
      autogeneratePattern: "",
      hidden: false,
      id: "text827839120",
      max: 128,
      min: 1,
      name: "fullName",
      pattern: "",
      presentable: false,
      primaryKey: false,
      required: true,
      system: false,
      type: "text",
    }),
  );

  return app.save(collection);
});
