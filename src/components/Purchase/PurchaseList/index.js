import React from 'react';
import {FlatList} from 'react-native';
import ProductItem from '../ProductItem';

const PurchaseList = ({data, onChange, selectProducts}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${index}`}
      renderItem={(item, index) => (
        <ProductItem
          data={item}
          index={index}
          onChange={onChange}
          selectProducts={selectProducts}
        />
      )}
    />
  );
};

export default React.memo(PurchaseList);
