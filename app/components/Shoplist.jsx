import AltContainer from 'alt-container';
import React from 'react';
import Products from './Products.jsx';
import ProductActions from '../actions/ProductActions';
import ProductStore from '../stores/ProductStore';
import ShoplistActions from '../actions/ShoplistActions';
import Editable from './Editable.jsx';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const productTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
    if (!targetProps.shoplist.products.length) {
      ShoplistActions.attachToShoplist({
        shoplistId: targetProps.shoplist.id,
        productId: sourceId
      });
    }
  }
};

@DropTarget(ItemTypes.NOTE, productTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Shoplist extends React.Component {
  render() {
    const {connectDropTarget, shoplist, ...props} = this.props;
    return connectDropTarget(
      <div {...props}>
        <div className="shoplist-header" onClick={this.activateShoplistEdit}>
          <div className="shoplist-add-product">
            <button onClick={this.addProduct}>+</button>
          </div>
          <Editable className="shoplist-name" editing={shoplist.editing}
            value={shoplist.name} onEdit={this.editName} />
          <div className="shoplist-delete">
            <button onClick={this.deleteShoplist}>x</button>
          </div>
        </div>
        <AltContainer
          stores={[ProductStore]}
          inject={{
            products: () => ProductStore.getProductsByIds(shoplist.products)
          }}
        >
          <Products
            onValueClick={this.activateProductEdit}
            onEdit={this.editProduct}
            onDelete={this.deleteProduct} />
        </AltContainer>
      </div>
    );
  }

  editProduct(id, prod_name) {
    // Don't modify if trying set an empty value
    if (!prod_name.trim()) {
      ProductActions.update({id, editing: false});
      return;
    }
    ProductActions.update({id, prod_name, editing: false});
  }

  addProduct = (e) => {
    // If product is added, avoid opening shoplist name edit by stopping
    // event bubbling in this case.
    e.stopPropagation();
    const shoplistId = this.props.shoplist.id;
    const product = ProductActions.create({prod_name: 'Product', editing: true});
    ShoplistActions.attachToShoplist({
      productId: product.id,
      shoplistId
    });
  };

  deleteProduct = (productId, e) => {
    e.stopPropagation();
    const shoplistId = this.props.shoplist.id;
    ShoplistActions.detachFromShoplist({shoplistId, productId});
    ProductActions.delete(productId);
  };

  editName = (name) => {
    const shoplistId = this.props.shoplist.id;
    // Don't modify if trying set an empty value
    if (!name.trim()) {
      ShoplistActions.update({id: shoplistId, editing: false});
      return;
    }
    ShoplistActions.update({id: shoplistId, name, editing: false});
  };

  deleteShoplist = () => {
    const shoplistId = this.props.shoplist.id;
    ShoplistActions.delete(shoplistId);
  };

  activateShoplistEdit = () => {
    const shoplistId = this.props.shoplist.id;
    ShoplistActions.update({id: shoplistId, editing: true});
  };

  activateProductEdit(id) {
    ProductActions.update({id, editing: true});
  }
}
