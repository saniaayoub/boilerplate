import React, {Component, useEffect, useRef, useState} from 'react';
import {View, ScrollView, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import {Button, Forminput, Header} from '../../components';
import {Metrix, NavigationService, Colors, Utils} from '../../config';
import {AppAction} from '../../store/actions';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
const Profile = () => {
  const loader = useSelector(state => state.AppReducer.loader);
  const userInfo = useSelector(state => state.AppReducer.userInfo);
  const dispatch = useDispatch();
  const [filePath, setFilePath] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [validName, setValidName] = useState(true);
  const [validAddress, setValidAddress] = useState(true);
  const [validState, setValidState] = useState(true);
  const [validCountry, setValidCountry] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [errName, setErrName] = useState('');
  const [errAddress, setErrAddress] = useState('');
  const [errState, setErrState] = useState('');
  const [errCountry, setErrCountry] = useState('');
  const [errPhone, setErrPhone] = useState('');

  useEffect(() => {
    dispatch(AppAction.GetInfo());
  }, []);
  const saveInfo = () => {
    // const {saveInfo} = props;
    if (!name) setErrName('Name cannot be empty');
    if (!state) setErrState('state cannot be empty');
    if (!address) setErrAddress('address cannot be empty');
    if (!country) setErrCountry('country cannot be empty');
    if (!phone) setErrPhone('Phoneno cannot be empty');
    else if (!validName) setErrName('Please enter valid name.');
    else if (!validState) setErrState('Please enter valid state.');
    else if (!validAddress) setErrAddress('Please enter valid address.');
    else if (!validCountry) setErrCountry('Please enter valid Country name.');
    else if (!validPhone) setErrPhone('Please enter valid Phone no.');
    else
      dispatch(
        AppAction.SaveInfo({email, name, phone, address, state, country}),
      );
  };
  return (
    <View style={styles.container}>
      <Header.Standard
        leftIconName={'arrow-left'}
        onPressLeft={NavigationService.goBack}
        Heading={'Profile'}
      />
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: Colors.White, fontSize: Metrix.FontExtraLarge}}>
            My Profile
          </Text>
          <Text style={{color: Colors.White, fontSize: Metrix.FontSmall}}>
            Please Complete your Profile
          </Text>
          <View>
            <Image source={{uri: filePath}} style={styles.imageStyle} />
          </View>
          <View style={{paddingBottom: Metrix.VerticalSize(5)}}>
            <Text
              style={{
                paddingTop: Metrix.VerticalSize(5),
                color: Colors.White,
                fontSize: Metrix.FontSmall,
              }}>
              {' '}
              Name{' '}
            </Text>
            <Forminput.TextField
              placeholder={userInfo.name}
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={name => {
                let validName = Utils.isFullNameValid(name);
                setName(name);
                setValidName(validName);
                setErrName('');
              }}
              errMsg={errName}
              value={name}
              blurOnSubmit={false}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
            />
          </View>
          <View
            style={{
              paddingTop: Metrix.VerticalSize(5),
              paddingVertical: Metrix.VerticalSize(5),
            }}>
            <Text
              style={{
                paddingTop: Metrix.VerticalSize(5),
                color: Colors.White,
                fontSize: Metrix.FontSmall,
              }}>
              {' '}
              Email{' '}
            </Text>
            <Forminput.TextField
              placeholder={userInfo.email}
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={email => {
                setEmail(email);
              }}
              value={email}
              blurOnSubmit={false}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
            />
          </View>
          <View style={{paddingVertical: Metrix.VerticalSize(5)}}>
            <Text
              style={{
                paddingTop: Metrix.VerticalSize(5),
                color: Colors.White,
                fontSize: Metrix.FontSmall,
              }}>
              {' '}
              Address{' '}
            </Text>
            <Forminput.TextField
              placeholder={userInfo.address}
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={address => {
                let validAddress = Utils.isFullNameValid(address);
                setAddress(address);
                setValidAddress(validAddress);
                setErrAddress('');
              }}
              errMsg={errAddress}
              value={address}
              blurOnSubmit={false}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
            />
          </View>

          <View style={{paddingVertical: Metrix.VerticalSize(5)}}>
            <Text
              style={{
                paddingTop: Metrix.VerticalSize(5),
                color: Colors.White,
                fontSize: Metrix.FontSmall,
              }}>
              {' '}
              State{' '}
            </Text>
            <Forminput.TextField
              placeholder={userInfo.state}
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={state => {
                let validState = Utils.isFullNameValid(state);
                setState(state);
                setValidState(validState);
                setErrState('');
              }}
              errMsg={errState}
              value={state}
              blurOnSubmit={false}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
            />
          </View>
          <View
            style={{
              paddingTop: Metrix.VerticalSize(5),
              paddingVertical: Metrix.VerticalSize(5),
            }}>
            <Text
              style={{
                paddingTop: Metrix.VerticalSize(5),
                color: Colors.White,
                fontSize: Metrix.FontSmall,
              }}>
              {' '}
              Country{' '}
            </Text>
            <Forminput.TextField
              placeholder={userInfo.country}
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={country => {
                let validCountry = Utils.isFullNameValid(country);
                setCountry(country);
                setValidCountry(validCountry);
                setErrCountry('');
              }}
              errMsg={errCountry}
              value={country}
              blurOnSubmit={false}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
            />
          </View>
          <View
            style={{
              paddingTop: Metrix.VerticalSize(5),
              paddingVertical: Metrix.VerticalSize(5),
            }}>
            <Text
              style={{
                paddingTop: Metrix.VerticalSize(5),
                color: Colors.White,
                fontSize: Metrix.FontSmall,
              }}>
              {' '}
              Phone No.{' '}
            </Text>
            <Forminput.TextField
              placeholder={userInfo.phoneno}
              returnKeyType="done"
              autoCapitalize="none"
              onChangeText={phone => {
                let validPhone = Utils.isPhoneNumberValid(phone);
                setPhone(phone);
                setValidPhone(validPhone);
                setErrPhone('');
              }}
              errMsg={errPhone}
              value={phone}
              blurOnSubmit={false}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
              onSubmitEditing={() => saveInfo()}
            />
          </View>
          <Button.Standard
            text="Save"
            isLoading={loader}
            disabled={loader}
            onPress={() => {
              saveInfo();
            }}
            containerStyle={{marginTop: Metrix.VerticalSize(35)}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    saveInfo: payload => {
      dispatch(AppAction.SaveInfo(payload));
    },
  };
};
const mapStateToProps = state => {
  return {
    loading: state.AppReducer.loader,
  };
};

export default Profile;
