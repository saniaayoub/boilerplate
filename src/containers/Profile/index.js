import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {Button, Forminput, Header} from '../../components';
import {Metrix, NavigationService, Colors, Utils} from '../../config';
import {AppAction} from '../../store/actions';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RBSheet from 'react-native-raw-bottom-sheet';

const Profile = () => {
  const refRBSheet = useRef();
  const loader = useSelector(state => state.AppReducer.loader);
  const userInfo = useSelector(state => state.AppReducer.userInfo);
  const userImage = useSelector(state => state.AppReducer.profileImg);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
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
    dispatch(AppAction.ImgRetrieve());
  }, []);

  const saveInfo = () => {
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

  const ImagePicker = () => {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <TouchableOpacity
          onPress={() => captureImage('photo')}
          style={{
            flexDirection: 'row',
            marginLeft: Metrix.HorizontalSize(20),
            marginTop: Metrix.VerticalSize(20),
          }}>
          <Icon name={'camera'} color={'black'} size={26} />
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: Metrix.FontLarge,
              marginLeft: Metrix.HorizontalSize(20),
            }}>
            {' '}
            Capture Image{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => chooseFile('photo')}
          style={{
            flexDirection: 'row',
            marginLeft: Metrix.HorizontalSize(20),
            marginTop: Metrix.VerticalSize(20),
          }}>
          <Icon name={'upload'} color={'black'} size={26} />
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: Metrix.FontLarge,
              marginLeft: Metrix.HorizontalSize(20),
            }}>
            {' '}
            Upload From Gallery{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.assets[0].base64);
        console.log('uri -> ', response.assets[0].uri);
        console.log('width -> ', response.assets[0].width);
        console.log('height -> ', response.assets[0].height);
        console.log('fileSize -> ', response.assets[0].fileSize);
        console.log('type -> ', response.assets[0].type);
        console.log('fileName -> ', response.assets[0].fileName);
        refRBSheet.current.close();
        dispatch(AppAction.ImgUpload({image: response.assets[0].uri}));
        dispatch(AppAction.ImgRetrieve());
        setImage(response.assets[0].uri);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);
      refRBSheet.current.close();
      dispatch(AppAction.ImgUpload({image: response.assets[0].uri}));
      dispatch(AppAction.ImgRetrieve());
      setImage(response.assets[0].uri);
    });
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
          <View style={{borderColor: 'red', borderWidth: 1}}>
            <Image
              source={{uri: image ? image : userImage}}
              style={styles.imageStyle}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                bottom: 10,
                zIndex: 1000,
              }}
              onPress={() => refRBSheet.current.open()}>
              <Icon name={'camera'} color={'red'} size={15} />
            </TouchableOpacity>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                container: {
                  borderTopLeftRadius: Metrix.VerticalSize(20),
                  borderTopRightRadius: Metrix.VerticalSize(20),
                  height: Metrix.VerticalSize(200),
                },
                wrapper: {
                  backgroundColor: 'transparent',
                },
                draggableIcon: {
                  backgroundColor: '#000',
                },
              }}>
              <ImagePicker />
            </RBSheet>
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

export default Profile;
