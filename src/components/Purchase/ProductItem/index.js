import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

const ProductItem = ({data: {item}, index, onChange, selectProducts}) => {
  console.log(item);
  return (
    <ScrollView style={styles.prod_container}>
      <Text>상품번호</Text>

      <Image src={item.iconUrl} />
      <Text>상품명 {item.title}</Text>
      <Text>상품설명 {item.description}</Text>
      <Text>할인율</Text>
      <Text>할인가격 {item.introductoryPrice}</Text>
      <Text>할인기간 {item.introductoryPricePeriodAndroid}</Text>
      <Text>정상가격 {item.originalPrice}</Text>
      <Text>가격 {item.price}</Text>

      <Text>정기결제</Text>
      <Text>정기결제 기간</Text>

      <TouchableOpacity
        style={styles.select_default}
        // onPress={() => onChange(item.productId)}>
        onPress={() => onChange(index)}>
        <Text style={styles.select_default_text}>선택</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  prod_container: {
    width: 350,
    borderWidth: 1,
    borderColor: '#eeeef6',
    borderRadius: 20,
    padding: 30,
    marginVertical: 10,
  },
  select_default: {
    width: 50,
    textAlign: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#eeeef6',
    backgroundColor: '#f5f5f8',
    padding: 10,
  },
  select_active: {
    width: 50,
    textAlign: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#e4a8b0',
    padding: 10,
  },
  select_default_text: {
    color: '#75798c',
  },
  select_active_text: {
    color: '#e4a8b0',
  },
});
export default React.memo(ProductItem);
