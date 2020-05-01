import React from 'react';
import { Text, View, TextInput, FlatList, SafeAreaView, Image, Dimensions, ActivityIndicator} from 'react-native';
import styles from './SearchScreenStyle';
import axios from 'axios';
import Item from '../../components/components';

const { width } = Dimensions.get('window');

export default class SearchScreen extends React.Component {

  state ={
    pageLoader: false,
    search:'',
    api: [],
    page: 1,
    numOfAllResults: '',
    paginationLoader: false,
    thereAreMoreData: true,
  }

TextChange = (text) =>{
  this.setState(()=>({search:text, page: 1, pageLoader: text.length >= 3 ? true : false, thereAreMoreData: true, numOfAllResults: '', paginationLoader: false}
  ),() => this.getMovieList())
}
getMovieList = async (pagination = false) => {
  let validationText = this.state.search.trim()
  let page = pagination ? this.state.page + 1 : this.state.page;
  if ( pagination ) {
    this.setState({paginationLoader: true});
  }
  if (this.state.search.length >=3) {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=7560df15&s=${validationText}&page=${page}`);
      console.log(response);
      if(response.data.Response == "True"){
        if ( pagination ) { 
          let checkOfMoreData = response.data.Search.length + this.state.api.length < response.data.totalResults ? true : false;
          this.setState(()=>({api:[...this.state.api, ...response.data.Search], thereAreMoreData: checkOfMoreData ,pageLoader: false, numOfAllResults: response.data.totalResults, page, paginationLoader: false}))
        } else {
          let checkOfMoreData = response.data.Search.length < response.data.totalResults ? true : false;
          this.setState(()=>({api:response.data.Search, thereAreMoreData: checkOfMoreData ,pageLoader: false, numOfAllResults: response.data.totalResults}))
        }
      }
      else{
        this.setState(()=>({api:[], pageLoader: false}))
      }
      console.log(this.state.api)
    } catch (error) {
      this.setState(()=>({pageLoader: false}))
      console.error(error);
    }    
  }
  else{
    this.setState(()=>({api:[]}))
  }
}

renderItem = ({item}) => {
  return (
    <Item 
      item={item}
      onPress={()=>this.props.navigation.navigate('Movie', item)}
    />
  )
}

renderFooter = () => {
  if ( this.state.paginationLoader ) {
    return (
      <ActivityIndicator style={{alignSelf: 'center'}}/>
    )
  }else {
    return null;
  }
}

rendrtEmptyItem = () => {
  return this.state.pageLoader ? <ActivityIndicator /> : <Text style={{color:'red', textAlign:'center'}}>No Result</Text>
}

  render() {
    const { pageLoader, thereAreMoreData} = this.state;
    return ( 
      <SafeAreaView style={styles.container}>
        <View style={styles.search}>
        <Text style={styles.text}>search</Text>
        <TextInput
          style={styles.input}
          value={this.state.search}
          onChangeText={this.TextChange}
          placeholder="search here"
        />
        </View>
        <FlatList
          style={{flex: 1}}
          data={this.state.api}
          renderItem={this.renderItem}
          keyExtractor= {item => item.imdbID}
          contentContainerStyle={[{flexGrow: 1,width}, !this.state.api.length && pageLoader && { justifyContent: 'center', alignItems: 'center'}]}
          ItemSeparatorComponent={() => <View style={{height: 20}}/>}
          ListEmptyComponent = {this.rendrtEmptyItem}
          onEndReachedThreshold={0}
          onEndReached={!pageLoader && thereAreMoreData && this.getMovieList.bind(this, true)}
          ListFooterComponent={this.renderFooter}
        />
      </SafeAreaView>
    );
  }
}