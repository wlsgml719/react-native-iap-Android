/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';

import * as RNIap from 'react-native-iap';

const itemSkus = Platform.select({
  ios: ['com.cooni.point1000', 'com.cooni.point5000'],
  android: [
    'android.test.purchased',
    'android.test.canceled',
    'android.test.refunded',
    'android.test.item_unavailable',
  ],
});

const App = () => {
  const [product, setProduct] = useState({});

  useEffect(async () => {
    try {
      const response = await RNIap.getProducts(itemSkus);
      console.log(response);
    } catch (e) {
      console.log('error:: ', e);
    }
  });

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.prod_btn}>
        <Text style={{color: 'white'}}>Get Products</Text>
      </TouchableOpacity>
      <FlatList
        data={[1, 2, 3]}
        renderItem={(item, index) => <Product key={index} />}
      />
    </View>
  );
};

const Product = (props) => {
  return (
    <View style={styles.prod_item}>
      <Text>상품번호</Text>

      <Text>상품명</Text>
      <Text>할인율</Text>
      <Text>할인기간</Text>
      <Text>가격</Text>

      <Text>정기결제</Text>
      <Text>정기결제 기간</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  prod_btn: {
    width: 300,
    borderRadius: 10,
    padding: 30,
    backgroundColor: 'red',
  },
  prod_item: {
    padding: 20,
  },
});

export default App;
