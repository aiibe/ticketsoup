/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_");

  return app.delete(collection);
});
