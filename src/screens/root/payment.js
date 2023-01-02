/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import CreditCard from 'react-native-credit-card';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import {AppButton, AppHeader, BaseView} from '../../components';
import {COLORS} from '../../constants/theme';
import server from '../../server/index';
import {useImmer} from 'use-immer';
import AuthContext from '../../store/AuthContext';
export const PaymentScreen = ({navigation, route}) => {
  const {user, trigger} = useContext(AuthContext);
  const {plan} = route.params;

  const [serverLoading, setServerLoading] = useState(true);
  const [card, setCard] = useState(null);
  const [key, setKey] = useState(null);
  const [load, setLoad] = useState(false);
  const [state, setState] = useImmer({
    type: '',
    focused: '',
    number: '',
    name: user?.name,
    expiry: '',
    cvc: '',
  });

  const {confirmPayment, loading} = useConfirmPayment();
  const gettingClientSecret = async () => {
    setServerLoading(true);
    const response = await server.getClientSecret({
      amount: plan?.price,
    });
    setServerLoading(false);
    if (response.ok) {
      const clientSecret = response.data;
      setKey(clientSecret);
    } else {
      Alert.alert('error', response.data?.message ?? 'client secret');
    }
  };
  useEffect(() => {
    gettingClientSecret();
  }, []);

  const onPayPress = async () => {
    if (!card) return;
    if (!card.complete) return;
    if (!key) return alert('stripe error');
    const billingDetails = {
      name: user.name,
      email: user.email,
    };
    const {paymentIntent, error} = await confirmPayment(key, {
      type: 'Card',
      billingDetails,
    });

    if (error) {
      return Alert.alert(
        'Payment confirmation error',
        error?.message ? error.message : '',
      );
    } else if (paymentIntent) {
      setLoad(true);
      server.subscribePackage(plan?.id).then(resp => {
        setLoad(false);
        if (!resp.ok)
          return Alert.alert(
            'Payment  error',
            error?.message ? error.message : '',
          );
        trigger.signin(resp.data);
        setTimeout(() => {
          navigation.goBack();
        }, 300);
      });
    }
  };

  return (
    <>
      <BaseView
        styles={styles.container}
        loading={serverLoading}
        overlayLoading={load}>
        <AppHeader title={'Payment'} backButton />
        <View style={{flex: 1, paddingHorizontal: 15}}>
          <View
            style={{
              height: 180,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CreditCard
              type={state.type}
              // imageFront={images.cartFront}
              // imageBack={images.cartBack}
              shiny={false}
              bar={false}
              focused={state.focused}
              number={state.number}
              name={state.name}
              expiry={state.expiry}
              cvc={state.cvc}
            />
          </View>
          <CardField
            dangerouslyGetFullCardDetails
            placeholder={{
              number: '4242 4242 4242 4242',
            }}
            postalCodeEnabled={false}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={cardDetails => {
              setCard(cardDetails);
              setState(draft => {
                draft.type = cardDetails.brand.toLowerCase();
                draft.cvc = cardDetails.last4;
                draft.number = cardDetails.number;
              });

              if (cardDetails.expiryMonth) {
                if (cardDetails.expiryMonth.toString().length > 1) {
                  setState(draft => {
                    draft.expiry =
                      cardDetails.expiryMonth + '' + cardDetails.expiryYear;
                  });
                } else {
                  setState(draft => {
                    draft.expiry =
                      '0' +
                      cardDetails.expiryMonth +
                      '' +
                      cardDetails.expiryYear;
                  });
                }
              }
            }}
            onFocus={focusedField => {
              setState(draft => {
                switch (focusedField) {
                  case 'CardNumber':
                    draft.focused = 'number';
                    break;
                  case 'ExpiryDate':
                    draft.focused = 'expiry';
                    break;
                  default:
                    break;
                }
              });
            }}
          />
          <AppButton
            disabled={!key}
            title={'Pay'}
            loading={loading}
            onPress={onPayPress}
            otherStyles={{
              width: '90%',
              alignSelf: 'center',
            }}
          />
          <View style={{height: 40}} />
        </View>
      </BaseView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
