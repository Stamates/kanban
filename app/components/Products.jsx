import React from 'react';
import Editable from './Editable.jsx';
import Product from './Product.jsx';
import ShoplistActions from '../actions/ShoplistActions';

export default ({products, onValueClick, onEdit, onDelete}) => {
  return (
    <ul className="products">{products.map(product =>
      <Product className="product" id={product.id} key={product.id}
        editing={product.editing} onMove={ShoplistActions.move}>
          <Editable
            editing={product.editing}
            value={product.prod_name}
            onValueClick={onValueClick.bind(null, product.id)}
            onEdit={onEdit.bind(null, product.id)}
            onDelete={onDelete.bind(null, product.id)} />
      </Product>
    )}</ul>
  );
};
