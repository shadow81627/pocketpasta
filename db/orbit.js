import {
  Coordinator,
  RequestStrategy,
  SyncStrategy,
  LogLevel,
} from '@orbit/coordinator';
import { RecordSchema } from '@orbit/records';
import { MemorySource } from '@orbit/memory';
import { IndexedDBSource } from '@orbit/indexeddb';

import { JSONAPISource } from '@orbit/jsonapi';

const STRING = 'string';
const NUMBER = 'number';
const DATETIME = 'datetime';

const schema = new RecordSchema({
  models: {
    tag: {
      name: { type: STRING },
      slug: { type: STRING },
      createdAt: { type: DATETIME },
      updatedAt: { type: DATETIME },
    },
    product: {
      attributes: {
        name: { type: STRING },
        slug: { type: STRING },
        description: { type: STRING },
        gtin13: { type: NUMBER },
        sku: { type: STRING },
        color: { type: STRING },
        pattern: { type: STRING },
        slogan: { type: STRING },
        productionDate: { type: DATETIME },
        purchaseDate: { type: DATETIME },
        releaseDate: { type: DATETIME },
        createdAt: { type: DATETIME },
        updatedAt: { type: DATETIME },
      },
      relationships: {
        tags: { kind: 'hasMany', type: 'tag', inverse: 'products' },
      },
    },
  },
});

export const memory = new MemorySource({ schema });

export const remote = new JSONAPISource({
  schema,
  name: 'remote',
  host: `${process.env.API_URL ?? 'http://localhost'}/api/v1`,
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
