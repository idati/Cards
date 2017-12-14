import React from 'react'
import {View, 
		Text,
		TextInput,
		StyleSheet,
		TouchableOpacity,} from 'react-native'
import {white, purple} from '../utils/colors'
import {addCardToDeck, removeCardFromCards, editCard} from '../utils/api'


class SingleCard extends React.Component {
	constructor(props) {
    super(props);
    	this.state = {
      		question: 'NewQuestion',
      		answer: 'NewAnswer',
      		view: false,
      		info:{question: 'start'}
    	};
  	}


	render(){
		
		if (this.props.navigation){
				if(this.props.navigation.state.params){
								console.log('checkkk',this.state, this.props.navigation.state.params.viewer)}

				// if(this.props.navigation.state.params && this.state.view===false){
				if(this.props.navigation.state.params && this.props.navigation.state.params.viewer.question!==this.state.info.question){	
					if( this.props.navigation.state.params.viewer){
										console.log('IamLookingForYou',this.props.navigation.state.params.viewer)
										this.setState({ view:true, 
														question: this.props.navigation.state.params.viewer.question,
														answer: this.props.navigation.state.params.viewer.answer,
														info: this.props.navigation.state.params.viewer
										})
					}
				}

				if(this.state.view===true){
			return(
		
				<View>
				    <TextInput
		       	      style={styles.input}
		              onChangeText={(text) => this.setState({question: text})}
		              value={this.state.question}
		       		/>
				    <TextInput
		       	      style={styles.input}
		              onChangeText={(text) => this.setState({answer: text})}
		              value={this.state.answer}
		       		/>
		       		 <TouchableOpacity style={styles.button} onPress={() => (
		        		console.log('thisSingleCard',this,this.props.deckName, this.state.question, this.state.answer),
		        		// this.props.navigate('Quiz',{ entryId: key}),
		        		editCard(this.props.navigation.state.params.title, this.props.navigation.state.params.viewer.question, this.state.question, this.state.answer),

		        		this.setState({view: false}),
		        		this.props.navigation.navigate('Card', {newDeck: this.state.text})

		        	)}><Text style={styles.submitBtnText}>Edit</Text>
		       		 </TouchableOpacity>
		       		 <TouchableOpacity style={styles.button} onPress={() => (
		        		console.log('thisSingleCard',this,this.props.deckName, this.state.question, this.state.answer),
		        		removeCardFromCards(this.props.navigation.state.params.title, this.state.question),

		        		this.setState({view: false}),
		        		this.props.navigation.navigate('Card', {newDeck: this.state.text})

		        	)}><Text style={styles.submitBtnText}>Delete</Text>
		       		 </TouchableOpacity>
		       		 
				</View>
		
				)
			}
			else {
				console.log('NEWNEWSINGLE!!!', this.props.navigation.state.key)
				return(
					<View>
						<Text>no data available</Text>
					</View>
				)
			}
		}
		else{
				return(
					<View>
				    <TextInput
		       	      style={styles.input}
		              onChangeText={(text) => this.setState({question: text})}
		              value={this.state.question}
		       		/>
				    <TextInput
		       	      style={styles.input}
		              onChangeText={(text) => this.setState({answer: text})}
		              value={this.state.answer}
		       		/>
		       		 <TouchableOpacity style={styles.button} onPress={() => (
		        		console.log('thisSingleCard',this,this.props.deckName, this.state.question, this.state.answer),
		        		addCardToDeck(this.props.deckName, this.state.question, this.state.answer),
		        		this.setState({view:false}),
		        		this.props.updateState()
		        	)}><Text style={styles.submitBtnText}>Insert</Text>
		       		 </TouchableOpacity>
		       		 <TouchableOpacity style={styles.button} onPress={() => (
		        		console.log('thisSingleCard',this,this.props.deckName, this.state.question, this.state.answer),
		        		this.setState({view:false}),
		        		this.props.navigation.goBack()
		        	)}><Text style={styles.submitBtnText}>Back</Text>
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
    borderBottomWidth: 10,
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
  // input:{
  //   width: 200,
  //   height: 44,
  //   padding: 8,
  //   borderWidth: 1,
  //   borderColor: '#757575',
  //   margin: 50,
  input: {
    backgroundColor: white,
    borderRadius: 10,
    borderWidth: 3,
    borderColor:'#757575',
    height: 44,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 20,
    padding: 9
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
    marginLeft: 70,
    marginRight: 70,
    marginTop: 50, 
  },
})

export default SingleCard
