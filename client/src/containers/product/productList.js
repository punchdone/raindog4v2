import React from 'react';

import Item from './productItem';

const productList = (props) => {
  
    console.log('props = ', props);

    if(props.products) {
        return props.products.map(product => {
            return (
                <div className="col m4">
                    <Item {...product} />
                </div>
                
            )
        })
    }
};

export default productList;