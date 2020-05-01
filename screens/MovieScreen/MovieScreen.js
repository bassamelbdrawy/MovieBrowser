import React from 'react';
import { Text, View, TextInput, FlatList, SafeAreaView, Image, Dimensions, ActivityIndicator,ScrollView} from 'react-native';
import styles from './MovieScreenStyle';
import axios from 'axios';


export default class MovieScreen extends React.Component {

state={
    movieApi:{},
    loader:true
}

    componentDidMount(){this.getMovie()}

     async getMovie() {
        const {imdbID} = this.props.route.params
        try {
          const response = await axios.get(`http://www.omdbapi.com/?apikey=7560df15&i=${imdbID}&plot=full`);
          console.log(response);
          if(response.data.Response == "True"){
            this.setState(()=>({movieApi:response.data,loader: false}))
          }
          else if(response.data.Response == "False"){
            this.setState(()=>({api:{}}))
          }
        } catch (error) {
          console.error(error);
        }
      }


  render() {
    const { Title = '', Year = '', Poster = '',Type='',imdbID} = this.props.route.params
    const {Plot,Rated,Runtime} = this.state.movieApi
    console.log(this.state)

    return ( 
      <SafeAreaView style={{flex: 1}}>
          {
              !this.state.loader ? (
                <ScrollView style={styles.container}  contentContainerStyle={{paddingHorizontal:15}}>
                <Image
                  style={styles.image}
                  source={{
                      uri:`${Poster}`,
                  }}
                  />
              <View style={styles.movie}>
              <Text style ={styles.movietitle} numberOfLines={1}>{Title}</Text>
              <Text style={styles.movietype}>({Year})</Text>    
              </View>
              <View>
                <Text style={{paddingVertical:10}}>{Rated},  {Runtime}</Text>
              </View>
              <Text style={styles.plot}>{Plot}</Text>
              { 
              this.state.movieApi.Ratings.map((item, index)=> {
                let ratio = 0
                let color =''

                if(item.Value[(item.Value.length-1)]=='%'){
                   ratio = item.Value.slice(0,(item.Value.length)-1)}
                else{
                  let i = item.Value.split('/')
                   ratio = (i[0]/i[1])*100;
                   }

                  if(ratio <= 100 && ratio>70){ color = 'green'}
                  else if(ratio<=70 && ratio>50){ color = 'yellow'}
                  else if(ratio<=50){ color = 'red'}
                  return(
                  <View key={index}>
                  <Text style={styles.source}>{item.Source}  ({item.Value})</Text>
                  <View style={[styles.bar,{width:`${ratio}%`},{backgroundColor:`${color}`}]}/>
                  </View>
                )})}
                </ScrollView>      
              ) : <ActivityIndicator />
          }

      </SafeAreaView>
    );
  }
}