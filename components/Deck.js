import React from 'react'
import {View, 
    Text, 
    TouchableOpacity, 
    Button, 
    FlatList, 
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Platform} from 'react-native'
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation'
import {white, purple} from '../utils/colors'
import{FontAwesome, Ionicons, MaterialIcons} from '@expo/vector-icons'
import {saveDeckTitle, getDecks, removeDeckTitle} from '../utils/api'
import Card from './Card'
import SinglCard from './SinglCard'
import Quiz from './Quiz'




export default class Deck extends React.Component {


  constructor(props) {
      super(props)

      this.state={
         dat: [],
         new: false,
         text: 'NewDeckName',
      }

      this.renderItem = this.renderItem.bind(this);
      this.changes = this.changes.bind(this);
      this.inserts = this.inserts.bind(this);
      this.insertNewDeck = this.insertNewDeck.bind(this);
      this.updateState = this.updateState.bind(this);
      this.deleteDeck = this.deleteDeck.bind(this);



      // this = this.bind(this);
    }


  componentDidMount(){

   getDecks().then(res => {
          var arrayvar=[]

         for(key in res){
  
           arrayvar.push(res[key])

         }

          this.setState({dat: arrayvar})

       })


  } 



  updateState = () => {
    this.setState({new: !this.state.new})
  }

  updateStatedat=(newD)=>{
      // this.setState({dat: newValue})
      console.log('YESSSSSSSSSS')
  }

  insertNewDeck=(newDeck) =>{
    var hilf=this.state.dat.slice()
    var newDeckArray={}
    console.log('newDeck',newDeck)
    newDeckArray[newDeck]={'title': newDeck, 'questions':[]}
    hilf.push(newDeckArray[newDeck])
    console.log('hilfhilfhilf',hilf)
    this.setState({dat: hilf})
  }

  deleteDeck=(removeDeck) =>{
    var hilf=this.state.dat.slice()
    res=[]
    // console.log('üüü',hilf)
    for (i in hilf){ 
      console.log('üüühhh',hilf[i].title, removeDeck.title.title)
      if (hilf[i].title!==removeDeck.title.title){ 
            res.push(hilf[i])
      }
    }
    console.log('hilfhilfhilf',res, this.state)

    this.setState({dat: res})
  }

  static navigationOptions = {
      title: 'Deck',
      
    }


    componentDidUpdate(prevProps, prevState) {

    if(this.props.navigation.state.params){ 
          const{shouldDelete} = this.props.navigation.state.params
          console.log('shouldDelete',shouldDelete)

    }
    var x = 0

        if(this.props.navigation.state.params){
                      removeDeckTitle(this.props.navigation.state.params.shouldDelete.title.title)


                    }

    }





  renderItem({ item }) {
    console.log('check',item, this.state, this)
      const { navigation } = this.props;

      return (
        <TouchableOpacity 
          style={styles.container}
          onPress={() => this.props.navigation.navigate('Card',{title:item, deleteDeck:this.deleteDeck, deletet:false})}>
          <View><Text>{item.title}</Text></View>
        </TouchableOpacity>

    )
    }

  changes(){
    this.setState({new: true})
  }

  inserts(){

      saveDeckTitle(this.state.text),
      this.insertNewDeck(this.state.text),
      // 
      // this.updateState(),
      this.setState({text:'NewDeckName'}),
      this.props.navigation.navigate('Card',{title:{'title':this.state.text, 'questions':[]}, deleteDeck:this.deleteDeck, deletet:false})
      
  }

  render(){


  if (this.state.new===false){
  
            return(
             <View style={{flex:1}}>
              <View style={{flex:1}}>
                <FlatList style={{flex:1}}
                  data={this.state.dat}
                  keyExtractor={item => item.title}
                  renderItem={this.renderItem}>
                </FlatList>
              </View>
               <TouchableOpacity style={styles.button} onPress={() => (
                                              this.changes()
                                            // console.log('this',this), 
                                            // this.setState({new: true}),
                                            // console.log('18:15',this)
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
                            this.inserts()
                            // console.log('this',this.state.text),
                            // saveDeckTitle(this.state.text),
                            // this.insertNewDeck(this.state.text),
                            // this.updateState(),
                            // this.props.navigation.navigate('Card',{title:{'title':this.state.text, 'questions':[]}, deleteDeck:this.deleteDeck, deletet:false}),
                            // this.setState({text:'NewDeckName'})


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

