import React from 'react';

import Item from './productItem';

const productList = (props) => {
  
    console.log('props = ', props);

    if(props.products) {
        return props.products.map(product => {
            return (
                <div className="col m4">
                    <Item 
                        key={product._id}
                        {...product} 
                        removeProduct={props.removeProduct}
                        viewProduct={props.viewProduct}
                     />
                </div>
                
            )
        })
    }
};

export default productList;