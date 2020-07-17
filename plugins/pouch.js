// // import { isSupportedBrowser } from 'worker-pouch';

export default async (context, inject) => {
  if (process.browser) {
    // webpack code split into a pouch bundle
    const { default: PouchDB } = await import(
      /* webpackChunkName: "pouch" */ 'pouchdb'
    );
    const { default: find } = await import(
      /* webpackChunkName: "pouch" */ 'pouchdb-find'
    );
    // const { default: search } = await import(
    //   /* webpackChunkName: "pouch" */ 'pouchdb-quick-search'
    // );
    const { default: upsert } = await import(
      /* webpackChunkName: "pouch" */ 'pouchdb-upsert'
    );

    // PouchDB.plugin(search);
    PouchDB.plugin(find);
    PouchDB.plugin(upsert);

    const dbname = 'my_database';
    const options = {};
    // const supported = await isSupportedBrowser();
    // if (supported) {
    //   options.adapter = 'worker';
    //   // PouchDB.adapter('worker', require('worker-pouch'));
    //   PouchDB.adapter('worker', require('worker-pouch/client'));
    //   const PouchWorker = require('./pouch.worker.js');
    //   const worker = () => new PouchWorker();
    //   options.worker = worker;
    // }

    const pouch = new PouchDB(dbname, options);

    pouch.createIndex({
      index: { fields: ['category', 'name', 'type'] },
    });
    // PouchDB.debug.enable('*');
    inject('pouch', pouch);
  }
};
