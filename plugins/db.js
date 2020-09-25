import taskSchema from '@/db/schema/task.json';
import shoppingSchema from '@/db/schema/shopping.json';

export default async (context, inject) => {
  const { createRxDatabase, addRxPlugin } = await import(
    /* webpackChunkName: "db" */ 'rxdb'
  );
  const indexeddb = await import(
    /* webpackChunkName: "db" */ 'pouchdb-adapter-indexeddb'
  );

  addRxPlugin(indexeddb);

  const db = await createRxDatabase({
    name: 'pocketpasta',
    adapter: 'indexeddb',
    // password: '12345678',
  });

  await db.collection({
    name: 'tasks',
    schema: taskSchema,
  });
  await db.collection({
    name: 'shopping',
    schema: shoppingSchema,
  });

  inject('db', db);
};
