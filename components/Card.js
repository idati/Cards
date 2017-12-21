import React from 'react';
import {  StyleSheet, 
          Text, 
          View,
          StatusBar,
          TouchableOpacity,
          KeyboardAvoidingView,
          TextInput,
          Platform,
          FlatList, } from 'react-native';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation'


import {white, purple} from '../utils/colors'

import {Constants} from 'expo'
import{FontAwesome, Ionicons, MaterialIcons} from '@expo/vector-icons'
import Quiz from './Quiz'
import {addCardToDeck, getDecks, setLocalNotification, clearLocalNotification} from '../utils/api'
import SinglCard from './SinglCard'





export default class Card extends React.Component {

  state= {
    values: 'text',
    cdat: [],
    new: false,
    deletet: false,
  }

    componentDidMount(){
       this.runNotifiy()
    }


    componentDidUpdate(){
    var o = 0
    getDecks().then(res => {
      resu=[]
      for(key in res){
        
        if (key === this.props.navigation.state.params.title.title){
          
          o+=1
          resu.push(res[key])
          this.setState({cdat: resu, deletet: false})
        }
      }
      if(o===0){
        this.setState({deletet: true})
      }

    })
  }

  static navigationOptions = {
    title: 'Crad',

  }

  constructor(props) {
    super(props)


    this.renderItem = this.renderItem.bind(this);
    this.update = this.update.bind(this);
    this.delDeck = this.delDeck.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.getcdat = this.getcdat.bind(this);
    this.runNotifiy = this.runNotifiy.bind(this);
  }



    updateState = () => {
    this.setState({new: !this.state.new})
  }


  insertNewCard=(deckName) =>{
    // this.setState({values: 'super'})
    this.setState({values: 'HoHO'})

    getDecks().then(res => {
      resu=[]
      for(key in res){
        if (key === deckName){
          
          resu.push(res[key])
          this.setState({cdat: resu})
        }
        
      }

    })

  }


  static navigationOptions = ({navigation}) => {
    

    if(navigation.state.params!== undefined){const {viewer} = navigation.state.params}

  }

 
  renderItem({ item }) {
   
   if(this.props)
    {
          const { navigation } = this.props;
          return (
            <TouchableOpacity 
              style={styles.container}
              onPress={() => this.props.navigation.navigate('SinglCard',{viewer: item, title: this.props.navigation.state.params.title.title})}>
              <View><Text>{item.question}</Text></View>
            </TouchableOpacity>
    
        )}
    
    }

  update(value){
     this.setState({new: value})
  }


  getcdat(){
    return this.state.cdat
  }
  delDeck(){
    this.props.navigation.state.params.deleteDeck(this.props.navigation.state.params),
    this.setState({deletet: false}),
    this.props.navigation.navigate(
            'Deck',
            { shouldDelete: this.props.navigation.state.params }
    )

  }

  startQuiz(){
    // console.log('ccc',this.state.cdat, this.props.navigation.state.params.title.title, Date.now(), this.props.navigation.state.params.title.title)
    // this.props.navigation.navigate('Quiz',{ shouldDelete: this.props.navigation.state.params, cdat: this.state.cdat, timeStamp: Date.now()})
    // this.props.navigation.navigate('Quiz',{ cdat: this.getcdat(), timeStamp: Date.now()})
    // var datc=this.state.cdat.slice()
    this.props.navigation.navigate('Quiz',{shouldDelete: this.props.navigation.state.params.title.title, timeStamp: Date.now()})
  }


  runNotifiy(){
    clearLocalNotification().then(setLocalNotification)
  }

// 
  render() {

  if(this.state.new===false){
    
        if(this.props.navigation.state.params && this.state.cdat[0] && this.state.deletet==false){

              return (
          
                  <View style={{flex:1}}>
                    <Text>{this.props.navigation.state.params.title.title} - {this.state.cdat[0].questions.length} cards</Text>
                      <View style={{flex:1}}>
                        <FlatList
                          data={this.state.cdat[0].questions}
                          keyExtractor={item => item.question}
                          renderItem={this.renderItem}>
                        </FlatList>
                      </View>
                    <View style={styles.cont}>
                    <TouchableOpacity style={styles.button} 
                                onPress={() => 
                                  this.delDeck()
                                  // (console.log('this',this), 
                                  // this.setState({deletet: true}),
                                  // this.props.navigation.state.params.deleteDeck(this.props.navigation.state.params),
                                  // this.props.navigation.navigate(
                                  //         'Deck',
                                  //         { shouldDelete: this.props.navigation.state.params }
                                  // )
                                }>
                      <Text style={styles.submitBtnText}>Delete Deck</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} 
                                onPress={() => 
                                  
                                  this.update(true)
                                    // this.setState({new: true})
                                  // this.props.navigation.state.params.deleteDeck(this.props.navigation.state.params),
                                  // this.props.navigation.navigate(
                                  //         'SinglCard',
                                  //         { shouldDelete: this.props.navigation.state.params }
                      // )
                      }>
                      <Text style={styles.submitBtnText}>New Card</Text>
                    </TouchableOpacity>
                   
                    <TouchableOpacity style={styles.button} 
                                onPress={() => 
                                  // clearLocalNotification().then(setLocalNotification),
                                  // this.runNotifiy(),
                                  this.props.navigation.navigate('Quiz',{shouldDelete: this.props.navigation.state.params.title.title, timeStamp: Date.now()})
                                  
                                    // this.setState({new: true})
                                  // this.props.navigation.state.params.deleteDeck(this.props.navigation.state.params),
                                  // this.props.navigation.navigate('Quiz',{ shouldDelete: this.props.navigation.state.params, cdat: this.state.cdat, timeStamp: Date.now()}
                      // )
                      }>
                      <Text style={styles.submitBtnText}>Start Quiz</Text>
                    </TouchableOpacity>

                    </View>
                  </View>
              )}
          else{
            return(
              <View style={{flex:1}}>
                <Text>no data found</Text>
              </View>
              )}
            }
    else{

              return(
               <View style={{flex:1}}>
               <KeyboardAvoidingView>
                <View style={{flex:1}}>
                  <FlatList style={{flex:1}}
                    data={this.state.dat}
                    keyExtractor={item => item.question}
                    renderItem={this.renderItem}>
                  </FlatList>
                </View>
                  <SinglCard updateState={this.updateState} insertNewCard={this.insertNewCard} deckName={this.props.navigation.state.params.title.title}/>
                </KeyboardAvoidingView>
              </View>
              )
    }



  // }
}

}
// </Provider>
const styles = StyleSheet.create({
  cont: {
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-between'
  },
  container:{
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    // paddingTop: 9,
    paddingRight: 15,
    paddingBottom: 9,
    paddingLeft: 15,
    borderBottomWidth: 1,
    // behavior='padding',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 5,
    // background: '#ecf0f1'
    marginTop: 8, 
    marginLeft: 8,
    marginRight: 8,
    alignItems: 'stretch',
    // justifyContent: 'center',
  },
  input:{
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 50,
  },
    img:{
    width: 100,
    height: 100,
    margin: 50,
  },
    submitBtnText:{
    color:'white',
    fontSize: 22,
    textAlign: 'center',
  },
    button: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 30,
  },
})