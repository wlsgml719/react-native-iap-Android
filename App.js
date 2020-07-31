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
  Platform,
} from 'react-native';
import PurchaseList from './src/components/Purchase/PurchaseList';
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
  ProductPurchase,
  PurchaseError,
} from 'react-native-iap';

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
  const [product, setProduct] = useState([]);
  const [selectProducts, setSelectProducts] = useState([]);

  const getProducts = async () => {
    try {
      const result = await RNIap.getProducts(itemSkus);
      // const result = await RNIap.getSubscriptions(itemSkus); // 정기결제 상품

      setProduct(result);
    } catch (e) {
      console.log('error:: ', e);
    }
  };

  const handlePurchase = async (select) => {
    try {
      const test = 'android.test.refunded';
      const result = await RNIap.requestPurchase(test);
      // const result = await RNIap.requestSubscription(test); // 정기결제 싱품
    } catch (e) {
      console.log('error:: ', e.code, e.message);
    }
  };

  const handleProducts = (id) => {};

  useEffect(() => {
    // !상품에 대한 체크로직 다름
    if (product.length > 0) {
      product.reduce((a, c, i) => {
        setSelectProducts((s) =>
          s.concat({id: i, productId: c.productId, select: false}),
        );
      });
    }

    // 두 리스너는 구매를 하기 전, 앱이 시작할 때 설정하기를 권장
    let purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase) => {
        console.log('useEffect:: ', purchaseUpdatedListener, purchase);

        const receipt = purchase.transactionReceipt;
        // 영수증이 있을 때
        if (receipt) {
          // 해당위치에 Backend API 호출 - 리워드(coin)관련
          // Back API 결과값이 성공했을경우 Transaction 관련(아래내용) 핸들링
          if (Platform.OS === 'ios') {
            await RNIap.finishTransactionIOS(purchase.transactionId);
          } else if (Platform.OS === 'android') {
            // 소모품인 경우(다시 구매가능)
            await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
            // 소모품이 아닌 경우
            // await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
          }

          try {
            await RNIap.finishTransaction(purchase, true);
          } catch (e) {
            await RNIap.finishTransaction(purchase, false);
            console.log('error:: ', e);
          }
        } else {
        }
      },
    );

    let purchaseErrorSubscription = purchaseErrorListener((error) => {
      console.log('error purchaseErrorListener:: ', error);
    });

    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (this.purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    };
  }, [product]);

  return (
    <View style={styles.wrapper}>
      {/* 화면으로 변경 */}
      <PurchaseList
        data={product}
        onChange={(id) => {
          setSelectProducts((s) => (s[id].select = !s[id].select));
        }}
        selectProducts={selectProducts}
      />
      {/* 화면으로 변경 */}

      <TouchableOpacity style={styles.btn_default} onPress={getProducts}>
        <Text style={styles.btn_text}>상품목록</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn_default} onPress={handlePurchase}>
        <Text style={styles.btn_text}>구매하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // color 별도 분리, align 수치, fontsize 별도 분리, image 크기 별도분리
  wrapper: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  btn_default: {
    width: 300,
    borderRadius: 100,
    padding: 30,
    borderWidth: 1,
    borderColor: '#eeeef6',
    backgroundColor: '#f5f5f8',
    marginVertical: 10,
  },
  btn_active: {
    width: 300,
    borderRadius: 10,
    padding: 30,
    backgroundColor: '#e4a8b0',
  },
  btn_text: {textAlign: 'center'},
  btn_text_active: {color: 'white', textAlign: 'center'},
  prod_item: {
    padding: 20,
  },
});

export default App;
