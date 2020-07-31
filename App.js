/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const App = () => {
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
