import React from 'react';
import Editable from './Editable.jsx';
import Product from './Product.jsx';
import ShoplistActions from '../actions/ShoplistActions';

export default ({products, onValueClick, onEdit, onDelete}) => {
  return (
    <ul className="products">{products.map(product =>
      <Product className="product" id={product.id} key={product.id}
        editing={product.editing} onMove={ShoplistActions.move}
        onDelete={onDelete.bind(null, product.id)} >
        <table>
          <tbody>
            <tr>
              <td>
                <Editable
                  editing={product.editing}
                  value={product.qty}
                  item="qty"
                  onValueClick={onValueClick.bind(null, product.id)}
                  onEdit={onEdit.bind(null, product.id)}/>
              </td>
              <td>
                <Editable
                  editing={product.editing}
                  value={product.prodName}
                  item="prodName"
                  onValueClick={onValueClick.bind(null, product.id)}
                  onEdit={onEdit.bind(null, product.id)}/>
              </td>
              <td>
                <Editable
                  editing={product.editing}
                  value={product.price}
                  item="price"
                  onValueClick={onValueClick.bind(null, product.id)}
                  onEdit={onEdit.bind(null, product.id)}/>
              </td>
            </tr>
          </tbody>
        </table>
      </Product>
    )}</ul>
  );
};

// <Editable
//   editing={product.editing}
//   qty={product.qty}
//   value={product.prodName}
//   price={product.price}
//   onValueClick={onValueClick.bind(null, product.id)}
//   onEdit={onEdit.bind(null, product.id)}
//   onDelete={onDelete.bind(null, product.id)} />
