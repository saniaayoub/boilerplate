import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import {Button, Forminput, Header} from '../../components';
import {Metrix, NavigationService, Utils} from '../../config';
import {AppAction} from '../../store/actions';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Weather extends Component {
  state = {
    city: 'Karachi',
    validCity: false,
    cityErrMsg: '',
  };

  componentDidMount = () => {
    this.props.weatherCheck({city: this.state.city});
  };
  checkWeather = () => {
    const {city, validCity} = this.state;
    if (!city) this.setState({cityErrMsg: 'Please Enter city.'});
    else if (!validCity) this.setState({cityErrMsg: 'Please enter valid city'});
    else {
      this.props.weatherCheck({city});
    }
  };

  render() {
    const {city, validCity, cityErrMsg} = this.state;
    const {main, name, wind} = this.props.weatherData;
    console.log(main);
    return (
      <View style={styles.container}>
        <Header.Standard
          leftIconName={'arrow-left'}
          onPressLeft={NavigationService.goBack}
          Heading={'Weather'}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          style={{width: '100%'}}>
          <View style={styles.content}>
            <View style={{marginBottom: Metrix.VerticalSize(20)}}>
              <Forminput.TextField
                placeholder="Enter City"
                returnKeyType="done"
                onChangeText={city => {
                  let validate = Utils.isFullNameValid(city);
                  this.setState({
                    city: city,
                    validCity: validate,
                    cityErrMsg: '',
                  });
                }}
                value={city}
                blurOnSubmit={false}
                errMsg={cityErrMsg}
                containerStyle={{marginTop: Metrix.VerticalSize(25)}}
              />
            </View>
            <Button.Standard
              text="Check Weather"
              onPress={() => this.checkWeather()}
            />
            <View>
              <Text
                style={{
                  marginVertical: Metrix.VerticalSize(15),
                  color: 'white',
                  fontSize: Metrix.FontExtraLarge,
                }}>
                {' '}
                {name}
              </Text>
              <Icon
                name={'cloud'}
                color={'skyblue'}
                size={Metrix.VerticalSize(100)}
              />
              <Text style={{color: 'yellow'}}>{main.temp}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    weatherCheck: payload => {
      dispatch(AppAction.WeatherCheck(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    weatherData: state.AppReducer.weatherData,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Weather);
