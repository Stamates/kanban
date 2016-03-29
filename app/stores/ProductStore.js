import uuid from 'node-uuid';
import alt from '../libs/alt';
import ProductActions from '../actions/ProductActions';

class ProductStore {
  constructor() {
    this.bindActions(ProductActions);
    this.products = [];
    this.exportPublicMethods({
      getProductsByIds: this.getProductsByIds.bind(this)
    });
  }
  create(product) {
    const products = this.products;
    product.id = uuid.v4();
    this.setState({
      products: products.concat(product)
    });
    return product;
  }
  update(updatedProduct) {
    const products = this.products.map(product => {
      if (product.id === updatedProduct.id) {
        // Object.assign is used to patch the product data here. It
        // mutates target (first parameter). In order to avoid that,
        // I use {} as its target and apply data on it.
        //
        // Example: {}, {a: 5, b: 3}, {a: 17} -> {a: 17, b: 3}
        //
        // You can pass as many objects to the method as you want.
        return Object.assign({}, product, updatedProduct);
      }
      return product;
    });
    // This is same as `this.setState({products: products})`
    this.setState({products});
  }
  delete(id) {
    this.setState({
      products: this.products.filter(product => product.id !== id)
    });
  }
  getProductsByIds(ids) {
    return (ids || []).map(
      id => this.products.filter(product => product.id === id)
    ).filter(a => a.length).map(a => a[0]);
  }
}

export default alt.createStore(ProductStore, 'ProductStore');
