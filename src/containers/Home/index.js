import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Button, Header} from '../../components';
import {AppAction} from '../../store/actions';
import styles from './styles';
import {Metrix} from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RenderItem = ({item}) => {
  return (
    <View style={styles.itemView}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.bodyText}>{item.body}</Text>
    </View>
  );
};

class Home extends Component {
  unsubNavigationEvent = () => {};

  componentDidMount() {
    this.props.GetPosts();
    this.unsubNavigationEvent = this.props.navigation.addListener(
      'focus',
      () => {
        this.flatListRef?.scrollToOffset({animated: true, offset: 0});
      },
    );
  }

  componentWillUnmount() {
    this.unsubNavigationEvent();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header.Standard
          rightIconName={'log-out'}
          Heading={'Home'}
          onPressRight={this.props.Logout}
        />
        <FlatList
          data={this.props.posts}
          ref={ref => (this.flatListRef = ref)}
          keyExtractor={(item, index) =>
            item?.id?.toString() || index.toString()
          }
          renderItem={RenderItem}
          contentContainerStyle={styles.listContentContainerStyle}
        />
        <Button.FloatingButton
          customStyle={{
            position: 'absolute',
            bottom: Metrix.VerticalSize(125),
            right: Metrix.HorizontalSize(20),
          }}
          onPress={() => {
            this.props.navigation.navigate('AddPost');
          }}
        />
        <Button.FloatingButton
          customStyle={{
            position: 'absolute',
            bottom: Metrix.VerticalSize(40),
            right: Metrix.HorizontalSize(20),
          }}
          iconComp={<Icon name="user" color="white" size={18} />}
          onPress={() => {
            this.props.navigation.navigate('Profile');
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.AppReducer.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AddPost: payload => {
      dispatch(AppAction.AddPost(payload));
    },
    GetPosts: () => {
      dispatch(AppAction.GetPosts());
    },
    Logout: () => {
      dispatch(AppAction.Logout());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
