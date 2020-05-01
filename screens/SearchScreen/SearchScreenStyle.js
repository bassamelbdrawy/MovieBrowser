import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    search:{
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      fontSize:35,
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      minWidth: 300,
      marginTop: 20,
      marginHorizontal: 20,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 3,
      marginBottom: 20
    },
    item:{
      flexDirection:"row",
      //alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 15,
    },
    title:{
      fontSize: 20,
      textAlign: 'left',
    },
    image:{
      width: 60,
      height: 60,
      resizeMode: 'contain',
      marginRight:15,
    },
    movie:{
      flex: 1,
      justifyContent: 'space-around'
    }
  
  });

  export default styles;