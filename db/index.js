import taskSchema from '@/db/schema/task.json';
import shoppingSchema from '@/db/schema/shopping.json';

export async function init({ remote, username, password }) {
  if (process.client) {
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
      multiInstance: true,
      ignoreDuplicate: true,
    });

    await db.collection({
      name: 'tasks',
      schema: taskSchema,
      sync: true,
    });
    const shopping = await db.collection({
      name: 'shopping',
      schema: shoppingSchema,
      sync: true,
    });

    if (remote) {
      const replicationState = shopping.sync({
        // remote database. This can be the serverURL, another RxCollection or a PouchDB-instance
        remote,
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
            username,
            password,
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

    return db;
  }
}
