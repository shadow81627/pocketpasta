import Model from './Model';

export default class Product extends Model {
  // Set the resource route of the model
  resource() {
    return 'products';
  }
}
