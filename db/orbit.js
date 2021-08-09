import Coordinator, {
  RequestStrategy,
  SyncStrategy,
  LogLevel,
} from '@orbit/coordinator';
import { Schema } from '@orbit/data';
import MemorySource from '@orbit/memory';
import IndexedDBSource from '@orbit/indexeddb';

import JSONAPISource from '@orbit/jsonapi';

const schema = new Schema({
  models: {
    thing: {
      attributes: {
        name: { type: 'string' },
        description: { type: 'string' },
      },
      relationships: {
        products: { type: 'hasMany', model: 'product', inverse: 'thing' },
      },
    },
    product: {
      attributes: {
        gtin13: { type: 'number' },
      },
      relationships: {
        thing: { type: 'hasOne', model: 'thing', inverse: 'products' },
      },
    },
  },
});

export const memory = new MemorySource({ schema });

const remote = new JSONAPISource({
  schema,
  name: 'remote',
  host: process.env.API_URL,
});

if (process.client) {
  const indexeddb = new IndexedDBSource({
    schema,
    name: 'indexeddb',
  });

  const indexeddbMemorySync = new SyncStrategy({
    source: 'memory',
    target: 'indexeddb',
    blocking: true,
  });

  const coordinator = new Coordinator({
    sources: [memory, indexeddb, remote],
  });

  coordinator.addStrategy(indexeddbMemorySync);
  coordinator.addSource(remote);

  // Query the remote server whenever the memory source is queried
  coordinator.addStrategy(
    new RequestStrategy({
      source: 'memory',
      on: 'beforeQuery',
      target: 'remote',
      action: 'query',
      blocking: false,
    }),
  );

  // Update the remote server whenever the memory source is updated
  coordinator.addStrategy(
    new RequestStrategy({
      source: 'memory',
      on: 'beforeUpdate',
      target: 'remote',
      action: 'update',
      blocking: false,
    }),
  );

  // Sync all changes received from the remote server to the memory source
  coordinator.addStrategy(
    new SyncStrategy({
      source: 'remote',
      target: 'memory',
      blocking: false,
    }),
  );

  const setup = async () => {
    const transform = await indexeddb.pull((q) => q.findRecords());
    await memory.sync(transform);
    // `activate` resolves when all strategies have been activated
    await coordinator.activate({ logLevel: LogLevel.Info });
  };

  setup();
}
