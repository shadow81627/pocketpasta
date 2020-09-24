import { createRxDatabase, addRxPlugin } from 'rxdb';
import taskSchema from '@/db/schema/task.json';
import indexeddb from 'pouchdb-adapter-indexeddb';

export default async (context, inject) => {
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
