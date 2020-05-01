import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexGrow:1
      },
      movie:{
          flexDirection:'row',
          justifyContent: 'space-between',
          alignItems: 'center',
      },
      movietitle:{
        fontSize: 30,
        textAlign: 'left',
        fontWeight:'bold',
        maxWidth: 300
      },
      image:{
        width: '100%',
        height: 580,
        resizeMode: 'stretch',
      },
      movietype:{
          fontSize:20,
          fontWeight:'normal'
      },
      plot:{
        paddingVertical: 10,
        fontSize:20,
      },
      bar:{
          width:'100%',
          height:15,
          backgroundColor:'green',
          marginVertical:10,
      },
      source:{
          paddingTop:10,
          fontSize:20,
      }

  });

  export default styles;