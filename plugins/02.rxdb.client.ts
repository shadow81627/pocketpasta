import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { createRxDatabase } from 'rxdb';

import {
  replicateCouchDB,
  getFetchWithCouchDBAuthorization,
} from 'rxdb/plugins/replication-couchdb';

import shoppingSchema from '@/rxdb/schema/shopping.json';
// import {
//   replicateWebRTC,
//   getConnectionHandlerSimplePeer,
// } from 'rxdb/plugins/replication-webrtc';

export default defineNuxtPlugin(async () => {
  //   if (process.env.NODE_ENV !== "production") {
  //     await import('rxdb/plugins/dev-mode').then(
  //         module => addRxPlugin(module.RxDBDevModePlugin)
  //     );
  // }
  addRxPlugin(RxDBDevModePlugin);

  const myDatabase = await createRxDatabase({
    name: 'mydatabase',
    storage: getRxStorageDexie(),
  });
  await myDatabase.addCollections({
    shopping: {
      schema: shoppingSchema,
    },
  });
  // const myDocument = await myDatabase.shopping.upsert({
  //   id: 'todo1',
  //   name: 'Learn RxDB',
  //   done: false,
  // });
  // await myDocument.patch({
  //   done: true,
  // });

  // const replicationState = await replicateWebRTC({
  //   collection: myDatabase.shopping,
  //   connectionHandlerCreator: getConnectionHandlerSimplePeer({
  //     // signalingServerUrl: 'wss://signaling.rxdb.info/',
  //   }),
  //   topic: 'pocketpasta', // <- set any app-specific room id here.
  //   pull: {},
  //   push: {},
  // });

  const dbRemote = useCookie('dbRemote');
  const dbUsername = useCookie('dbUsername');
  const dbPassword = useCookie('dbPassword');

  if (dbRemote.value) {
    const replicationState = replicateCouchDB({
      replicationIdentifier: 'my-vue-couch-replication',
      collection: myDatabase.shopping,
      url: dbRemote.value,
      fetch:
        dbUsername.value && dbPassword.value
          ? getFetchWithCouchDBAuthorization(dbUsername.value, dbPassword.value)
          : undefined,
      live: true,
      pull: {},
      push: {},
      autoStart: true,
    });

    replicationState.error$.subscribe((err: any) => {
      console.log('replication error:');
      console.dir(err);
    });
  }

  return {
    provide: {
      rxdb: myDatabase,
    },
  };
});
