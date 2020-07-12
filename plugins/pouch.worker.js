// worker-side code
import PouchDB from 'pouchdb';
import registerWorkerPouch from 'worker-pouch/worker';
import find from 'pouchdb-find';

PouchDB.plugin(find);

function pouchCreator(opts) {
  const pouch = new PouchDB(opts);
  // pouch.createIndex({
  //   index: { fields: ['name'] },
  // });
  return pouch;
}

// attach to global `self` object
registerWorkerPouch(self, pouchCreator);
