import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  initConnection,
  getProducts,
  requestPurchase,
  purchaseUpdatedListener,
  finishTransaction,
  getAvailablePurchases,
  validateReceiptIos,
} from 'react-native-iap';
import {AppButton, AppHeader, BaseView} from '../../components';
import {AppNoDataFound} from '../../components/base/AppNoData';
import {View} from 'moti';
import {FONTS} from '../../constants/theme';
import toast from '../../toast';
import server from '../../server';
import AuthContext from '../../store/AuthContext';

const InAppPurchased = ({navigation, route}) => {
  const {plan} = route.params;
  const {user, trigger} = useContext(AuthContext);

  const productIds =
    plan && plan.days == 30
      ? ['kb_5_1m']
      : plan.days == 365
      ? ['kb_40_1y']
      : [];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [overlayLoading, setOverlayloading] = useState(false);

  const getAvailableProducts = async () => {
    try {
      setLoading(true);
      const availableProducts = await getProducts({skus: productIds});
      setProducts(availableProducts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error fetching products', JSON.stringify(error?.message));
    }
  };

  const handlePurchase = async pID => {
    try {
      setOverlayloading(true);
      const purchase = await requestPurchase({sku: pID});
      const {productId, transactionDate, transactionId, transactionReceipt} =
        purchase;
      await validate(transactionReceipt);
      const resp = await server.subscribePackage(plan?.id);
      if (!resp.ok) {
        setOverlayloading(false);
        return Alert.alert(
          'Payment error',
          resp.data?.message ? resp.data?.message : '',
        );
      }
      setOverlayloading(false);
      console.log('Purchase successful inside handlePurchase:');
      finishTransactionInIos(purchase);
      trigger.signin(resp.data);
      setTimeout(() => {
        navigation.goBack();
      }, 300);
    } catch (error) {
      setOverlayloading(false);
      console.log('Purchase failed:', error);
      if (error?.code === 'E_ALREADY_OWNED') {
        Alert.alert('Purchase failed', 'You have already purchased this item.');
      } else {
        Alert.alert(
          'Purchase failed',
          'There was an error while processing your purchase.',
        );
      }
    }
  };

  const init = async () => {
    try {
      await initConnection();
      getAvailableProducts();
    } catch (error) {
      Alert.alert('Error initializing connection', error.message);
      console.error(error);
    }
  };

  const validate = async receipt => {
    const receiptBody = {
      'receipt-data': receipt,
      password: '44ff9bcbd2844015ad95cf69f18abd09',
    };
    try {
      const response = await validateReceiptIos({
        receiptBody: receiptBody,
        isTest: false,
      });
      const message = response?.status === 21002 ? 'success' : response.status;

      response?.status ? toast.show(message) : null;
    } catch (error) {
      toast.show(JSON.stringify(error?.message));
    }
  };

  const finishTransactionInIos = async purchase => {
    try {
      await finishTransaction({purchase, isConsumable: true});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <BaseView
      styles={{flex: 1}}
      loading={loading}
      overlayLoading={overlayLoading}>
      <AppHeader title={'Payment'} backButton />
      {!productIds.length ? (
        <AppNoDataFound title="this package is not avaliable on apple" />
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            data={products}
            keyExtractor={item => item.productId}
            renderItem={({item: product}) => (
              <View style={styles.card} key={product?.productId}>
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{product?.title}</Text>
                  <Text style={styles.price}>{product?.localizedPrice}</Text>
                  <Text style={styles.description}>{plan?.row_1}</Text>
                  <Text style={styles.description}>{plan?.row_2}</Text>
                  <Text style={styles.description}>{plan?.row_3}</Text>
                  <Text style={styles.description}>{product?.description}</Text>
                </View>
                <AppButton
                  title="Purchase"
                  onPress={() => handlePurchase(product?.productId)}
                />
              </View>
            )}
          />
        </View>
      )}
    </BaseView>
  );
};

export default InAppPurchased;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  cardContent: {
    marginBottom: 10,
  },
  title: {
    ...FONTS.h3,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    ...FONTS.body4,
    marginBottom: 5,
  },
  price: {
    ...FONTS.h1,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#008CBA',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
