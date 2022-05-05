import React, {Component, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Forminput, Header} from '../../components';
import {Metrix, NavigationService, Utils} from '../../config';
import {AppAction} from '../../store/actions';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Spotify = () => {
  const dispatch = useDispatch();
  const [song, setSong] = useState('');
  const [songErrorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    dispatch(AppAction.GetToken());
  }, []);
  const loader = useSelector(state => state.AppReducer.loader);
  const token = useSelector(state => state.AppReducer.accessToken);
  const searchMusic = () => {
    if (!song) setErrorMsg('Please Enter song.');
    else {
      dispatch(
        AppAction.SearchSong({
          offset: 2,
          limit: 2,
          q: song,
          spotify_token: token,
        }),
      );
    }
  };
  const songInfo = useSelector(state => state.AppReducer.songs);
  const RenderItem = ({item}) => {
    console.log(item);
    return (
      <View style={styles.itemView}>
        <Image
          source={{uri: item.imageUri ? item.imageUri : null}}
          resizeMode={'contain'}
          style={{
            width: Metrix.HorizontalSize(50),
            height: Metrix.HorizontalSize(50),
          }}
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.bodyText}>{item.artist}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header.Standard
        leftIconName={'arrow-left'}
        onPressLeft={NavigationService.goBack}
        Heading={'Music'}
      />
      <View
        style={{
          width: '100%',
          position: 'absolute',
          top: Metrix.VerticalSize(150),
        }}>
        <View style={styles.content}>
          <View style={{marginBottom: Metrix.VerticalSize(20)}}>
            <Forminput.TextField
              placeholder="Enter Song Name"
              returnKeyType="done"
              onChangeText={song => {
                setSong(song);
                setErrorMsg('');
              }}
              value={song}
              blurOnSubmit={false}
              errMsg={songErrorMsg}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
            />
          </View>
          <Button.Standard text="Search" onPress={() => searchMusic()} />

          {loader ? (
            <ActivityIndicator />
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <FlatList
                data={songInfo}
                keyExtractor={(item, index) =>
                  item?.id?.toString() || index.toString()
                }
                renderItem={item => RenderItem(item)}
                contentContainerStyle={styles.listContentContainerStyle}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Spotify;
