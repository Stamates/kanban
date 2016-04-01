import uuid from 'node-uuid';
import alt from '../libs/alt';
import ProductActions from '../actions/ProductActions';
import Firebase from 'firebase';

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
    this.productsRef = new Firebase('https://stamates-shopping.firebaseio.com/products');
    this.productsRef.push(product);
    return product;
  }
  update(updatedProduct) {
    const products = this.products.map(product => {
      if (product.id === updatedProduct.id) {
        return Object.assign({}, product, updatedProduct);
      }
      return product;
    });
    this.setState({products});
    this.productsRef = new Firebase('https://stamates-shopping.firebaseio.com/products');
    this.productsRef.set(products);
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
