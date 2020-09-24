import taskSchema from '@/db/schema/task.json';

export default async (context, inject) => {
  const { createRxDatabase, addRxPlugin } = await import(
    /* webpackChunkName: "db" */ 'rxdb'
  );
  const indexeddb = await import(
    /* webpackChunkName: "db" */ 'pouchdb-adapter-indexeddb'
  );

  // const taskSchema = await import(
  //   /* webpackChunkName: "db" */ '@/db/schema/task.json'
  // );

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

  inject('db', db);
};
