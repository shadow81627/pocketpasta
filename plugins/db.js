import taskSchema from '@/db/schema/task.json';
import shoppingSchema from '@/db/schema/shopping.json';

export default async ({ $config, $warehouse }, inject) => {
  const { createRxDatabase, addRxPlugin } = await import(
    /* webpackChunkName: "db" */ 'rxdb'
  );
  const indexeddb = await import(
    /* webpackChunkName: "db" */ 'pouchdb-adapter-indexeddb'
  );

  const httpAdapter = require('pouchdb-adapter-http');

  addRxPlugin(indexeddb);
  addRxPlugin(httpAdapter); // enable syncing over http (remote database)

  const db = await createRxDatabase({
    name: 'pocketpasta',
    adapter: 'indexeddb',
    // password: '12345678',
  });

  await db.collection({
    name: 'tasks',
    schema: taskSchema,
  });
  const shopping = await db.collection({
    name: 'shopping',
    schema: shoppingSchema,
  });

  const remote = $warehouse.get('dbRemote') || $config.DB_REMOTE;
  if (remote) {
    const replicationState = shopping.sync({
      // remote database. This can be the serverURL, another RxCollection or a PouchDB-instance
      remote: $warehouse.get('dbRemote') || $config.DB_REMOTE,
      waitForLeadership: true, // (optional) [default=true] to save performance, the sync starts on leader-instance only
      direction: {
        // direction (optional) to specify sync-directions
        pull: true, // default=true
        push: true, // default=true
      },
      options: {
        // sync-options (optional) from https://pouchdb.com/api.html#replication
        live: true,
        retry: true,
        auth: {
          username: $warehouse.get('dbUsername') || $config.DB_USERNAME,
          password: $warehouse.get('dbPassword') || $config.DB_PASSWORD,
        },
      },
    });

    replicationState.change$.subscribe((change) => console.dir(change));
    replicationState.docs$.subscribe((docData) => console.dir(docData));
    // replicationState.denied$.subscribe((docData) => console.dir(docData));
    // replicationState.active$.subscribe((active) => console.dir(active));
    // replicationState.alive$.subscribe((alive) => console.dir(alive));
    // replicationState.complete$.subscribe((completed) => console.dir(completed));
    replicationState.error$.subscribe((error) => console.dir(error));
  }

  inject('db', db);
};
