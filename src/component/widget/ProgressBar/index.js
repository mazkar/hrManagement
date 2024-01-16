import React from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import {ProgressBar} from 'react-native-paper';

const ProgressBars = ({
  icon = [],
  numberScreen = 0,
  progressBarScreen = '',
}) => {
  console.log(icon, 'INI ICON WOI');

  const renderItems = (props) => {
    console.log('INI PROPS =>', props.item.items);
    return props.item.items;
  };

  return (
    <View style={styles.progressBar}>
      <ProgressBar
        progress={progressBarScreen}
        color={'#65D170'}
        style={styles.linesBar}
      />
      <FlatList
        data={icon}
        horizontal
        renderItem={renderItems}
        keyExtractor={(item) => item.id}
      />
      {/* <Map style={styles.imagesStart} />
      {numberScreen === 0 ? (
        <Battery style={styles.imagesEnds} />
      ) : (
        <BatteryOn style={styles.imagesEnds} />
      )} */}
    </View>
  );
};

export default ProgressBars;

const styles = StyleSheet.create({
  progressBar: {
    position: 'relative',
    paddingVertical: 30,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  linesBar: {
    backgroundColor: '#E6EAF3',
  },
  imagesStart: {
    position: 'absolute',
    left: 0,
    flex: 1,
    top: 15,
  },
  imagesEnds: {
    position: 'absolute',
    right: 0,
    flex: 1,
    top: 15,
  },
});
