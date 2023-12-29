import React from 'react';
import { View, Image } from 'react-native';


const BottomTabIcon = ({ route, isFocused }) => {
  let height = 34;
  let width = 34;

  const renderIcon = (route, isFocused) => {
    switch (route) {
      case 'Home':
        return (
          <Image
            source={require('../assets/image/movie.png')}
            style={{
              width: width,
              height: height,
              tintColor: isFocused ? '#0067FF' : '#ffffff',
            }}
          />
        );
      case 'Ticket':
        return (
          <SearchIcon
            width={width}
            height={height}
            fill={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      case 'News':
        return (
          <SettingIcon
            width={width}
            height={height}
            fill={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      case 'Account':
        return (
          <ProfileIcon
            width={width}
            height={height}
            fill={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

export default BottomTabIcon;
