import React from 'react'
import {View, 
    Text, 
    TouchableOpacity, 
    Button, 
    FlatList, 
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    ScrollView,
    Platform} from 'react-native'
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation'
import {white, purple} from '../utils/colors'
import{FontAwesome, Ionicons, MaterialIcons} from '@expo/vector-icons'
import {saveDeckTitle, getDecks, removeDeckTitle} from '../utils/api'
import Card from './Card'
import SinglCard from './SinglCard'
import Quiz from './Quiz'
import { connect } from 'react-redux'

import { _getDecks } from '../actions'


class Deck extends React.Component {


  constructor(props) {
      super(props)

      this.state={
        dat:[],
         new: false,
         text: 'NewDeckName',
      }

      this.renderItem = this.renderItem.bind(this);
      this.changes = this.changes.bind(this);
      this.inserts = this.inserts.bind(this);
      this.insertNewDeck = this.insertNewDeck.bind(this);
      this.updateState = this.updateState.bind(this);
      this.deleteDeck = this.deleteDeck.bind(this);
      this.change_to_false = this.change_to_false.bind(this);
      this.insert_new_deck = this.insert_new_deck.bind(this);
      this.insertdat = this.insertdat.bind(this);
      // this.insertarray = this.insertarray.bind(this)


      // this = this.bind(this);
    }


  async componentWillMount(){
     // async componentDidUpdate(){
    const { dispatch, decks } = this.props
    // var z =[]
    let wait 
    wait = await getDecks().then(res => {
                                var data=[]
                                // data.push(res)
                                for (let key in res){
                                  data.push(res[key])
                                }
                                
                                return data
                            }
                    )
                    // .then(data => {
                    //                 try{
                    //                   // this.setState({dat: data})
                    //                   console.log(data)
                    //                 } catch(error){
                    //                   // console.log('error',error)
                    //                 }
                    //                   // console.log('here', data)
                    //                   // return data
                    //                 })
    this.setState({dat: wait})
    
  
  } 


  insertdat(){
    this.setState({dat: [{title:'test', questions:[]}]})
  }



  updateState = () => {
    this.setState({new: !this.state.new})
  }

  updateStatedat=(newD)=>{
      // this.setState({dat: newValue})
      
  }

  insertNewDeck=(newDeck) =>{
    var hilf=this.state.dat.slice()
    var newDeckArray={}
    newDeckArray[newDeck]={'title': newDeck, 'questions':[]}
    hilf.push(newDeckArray[newDeck])
    this.setState({dat: hilf})
  }

  deleteDeck=(removeDeck) =>{
    var hilf=this.state.dat.slice()
    res=[]
    removeDeckTitle(removeDeck.title.title)
   
    for (i in hilf){ 
     
      if (hilf[i].title!==removeDeck.title.title){ 
            res.push(hilf[i])
      }
    }
    

    this.setState({dat: res})
  }

  static navigationOptions = {
      title: 'Deck',
      
    }


    // componentDidUpdate(prevProps, prevState) {

    // if(this.props.navigation.state.params){ 
    //       const{shouldDelete} = this.props.navigation.state.params
    

    // }
    // var x = 0

        // if(this.props.navigation.state.params){
        //               removeDeckTitle(this.props.navigation.state.params.shouldDelete.title.title)


        //             }

    // }



    componentDidUpdate(){
    // const { dispatch, decks } = this.props
    // var z =[]
    getDecks().then(res => {
                                var data=[]
                                // data.push(res)
                                for (let key in res){
                                  data.push(res[key])
                                }
                                
                                this.setState({dat: data})
                            }
                    )
    
  
  } 


  renderItem({ item }) {
    
      const { navigation } = this.props;

      return (
        <TouchableOpacity 
          style={styles.container}
          onPress={() => this.props.navigation.navigate('Card',{title:item, deleteDeck:this.deleteDeck, deletet:false})}
          >
          <View><Text>{item.title}</Text></View>
        </TouchableOpacity>

    )
    }

  changes(){
    this.setState({new: true})
  }

  change_to_false(){
    this.setState({new: false})
  }

  inserts(){

      // saveDeckTitle(this.state.text),
      this.insertNewDeck(this.state.text)
      // 
      // this.updateState(),
      // this.setState({text:'NewDeckName'})
      // this.props.navigation.navigate('Card',{title:{'title':this.state.text, 'questions':[]}, deleteDeck:this.deleteDeck, deletet:false})
      
      
  }


  insert_new_deck(){
    this.setState({text:'NewDeckName'})
  }

  render(){


  if (this.state.new===false){
  
            return(
             <View style={{flex:1}}>
              <View style={{flex:1}}>
              <ScrollView>
                {
                  this.state.dat.map((item, key) =>(
                       <TouchableOpacity key={key}
                            style={styles.container}
                            onPress={() => this.props.navigation.navigate('Card',{title:item, deleteDeck:this.deleteDeck, deletet:false})}>
                            <View><Text>{item.title} #Cards:{item.questions.length}</Text></View>
                       </TouchableOpacity>
                    ))
                }
              </ScrollView>
              </View>
               <TouchableOpacity style={styles.button} onPress={() => (
                                              this.changes()
                                            
                                            // this.setState({new: true}),
                                            
                  )}>
               <Text style={styles.submitBtnText}>New Deck</Text>
                </TouchableOpacity>
            </View>
            )}

  else{

            return(

                    <View>
                       <View >
                         <TextInput
                           style={styles.input}
                           onChangeText={(text) => this.setState({text})}
                           value={this.state.text}
                         />
                     </View>
                        <TouchableOpacity style={styles.button} onPress={() => (
                            this.change_to_false(),
                            // this.inserts(),
                            
                            saveDeckTitle(this.state.text),
                            this.insertNewDeck(this.state.text),
                            // this.updateState(),
                            this.props.navigation.navigate('Card',{title:{'title':this.state.text, 'questions':[]}, deleteDeck:this.deleteDeck, deletet:false}),
                            // this.setState({text:'NewDeckName'})
                            this.insert_new_deck()

                          )}><Text style={styles.submitBtnText}>Insert</Text>
                        </TouchableOpacity>
                     </View>                

            )
  

      }
  }
}



const styles = StyleSheet.create({
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
      button: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 30,
  },
  submitBtnText:{
    color:'white',
    fontSize: 22,
    textAlign: 'center',
  },
})


function mapStateToProps (decks) {

  return {

    decks

  }

}

export default connect(

  mapStateToProps,

)(Deck)