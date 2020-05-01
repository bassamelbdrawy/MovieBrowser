import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../screens/SearchScreen/SearchScreenStyle';


function Item({ item , onPress}) {
    const {Title='',Poster='',Type='',Year=''} = item;
    return (
      <TouchableOpacity  style={styles.item} onPress={() => onPress()}>
        <Image
          style={styles.image}
          source={{
            uri:`${Poster}`,
          }}
        />
        <View style={styles.movie}>
          <Text style={styles.title}>{Title}</Text>
          <Text>{Year}({Type})</Text>
        </View>
      </TouchableOpacity >
    );
  };

  export default Item;