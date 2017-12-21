import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet,FlatList} from 'react-native'
import {white, purple} from '../utils/colors'
import {saveDeckTitle, getDecks, removeDeckTitle} from '../utils/api'
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation'

class Quiz extends React.Component {
	state={
		deck: 'nodata',
		qdat: [],
		tdat:[],
		cdat:[],
    	new: false,
    	count:0,
    	card:'question',
    	correct:0,
    	wrong:0,
    	timeStamp:0,
	}







	// componentDidMount(){
	componentDidUpdate(){
		// console.log("asasasa")
		// if (this.props.navigation.state.params && this.state.count===0 && this.state.qdat.length===0){
			
			
			// tmp.push(this.props.navigation.state.params.cdat[0].questions)
			getDecks().then(res=>{
					var tmp = []
					
					for (let key in res){
						if(key===this.props.navigation.state.params.shouldDelete){
							tmp.push(res[key])
						}
					}
					
					this.setState({qdat: tmp, timeStamp:this.props.navigation.state.params.timeStamp})

			})
			
			// this.setState({deck: 'yes'})

			
		// }
		// if(this.props.navigation.state.params && this.state.qdat[0]){
		// 		console.log( '))))',this.state.qdat[0].questions[0].question)//, this.props.navigation.state.params.cdat[0].questions[0].question)
		// 	}
		// if (this.props.navigation.state.params && this.state.qdat[0] && this.state.qdat[0][0].question!==this.props.navigation.state.params.cdat[0].questions[0].question && this.state.count>0){

		// 	console.log("qdat", this.state.qdat)
		// 	var tmp = []
		// 	tmp.push(this.props.navigation.state.params.cdat[0].questions)
		// 	this.setState({qdat: tmp, count: 0, card: 'question', wrong: 0, correct: 0})
		// }
		if(this.props.navigation.state.params && this.state.qdat[0] && this.props.navigation.state.params.timeStamp!==this.state.timeStamp && this.state.count>0){
			this.setState({count:0, correct:0, wrong:0, timeStamp:this.props.navigation.state.params.timeStamp})
		}
		
	}




 	// renderItem({ item }) {
 		

  //   	return (
  //   		<View>
		// 	<TouchableOpacity 
  //   			style={styles.container}
  //   			onPress={() => console.log(item)}>
  //   			<View><Text>{item}</Text></View>
  //   		</TouchableOpacity>
  //   		</View>

  //   )}

	render(){	

		
		if (this.state.qdat["0"]){
			// console.log(this.props.navigation.state.params.cdat[0].questions.length, this.state.count)
				// if(this.props.navigation.state.params.cdat[0].questions.length>=this.state.count+1){
				if(this.state.qdat[0].questions.length>=this.state.count+1){

				
					
					if(this.state.card==='question'){
							return(
									
							   <View style={{flex:1}}>
							   <Text>{this.state.qdat[0].title} - {this.state.count+1}/{this.state.qdat[0].questions.length}</Text>
							   <TouchableOpacity style={styles.container} onPress={() => (this.setState({card: 'answer'}))}>
							   		<Text style={styles.container}>question: {this.state.qdat[0].questions[this.state.count].question}</Text>
							   </TouchableOpacity>

									        <TouchableOpacity style={styles.button} onPress={() => (
							                                           this.state.qdat[0].questions.length>this.state.count && this.setState({count: this.state.count+1, card: 'question', correct: this.state.correct+1})

							                 )}>
							              <Text style={styles.submitBtnText}>Correct</Text>
							               </TouchableOpacity>
									        <TouchableOpacity style={styles.button} onPress={() => (
							                                           this.state.qdat[0].questions.length>this.state.count && this.setState({count: this.state.count+1, card: 'question', wrong: this.state.wrong+1})

							                 )}>
							              <Text style={styles.submitBtnText}>Wrong</Text>
							               </TouchableOpacity>

							   </View>
							   )
							}
					else{

							return(
									
							   <View style={{flex:1}}>
							   <Text>{this.state.qdat[0].title} - {this.state.count+1}/{this.state.qdat[0].questions.length}</Text>
							   <TouchableOpacity style={styles.container} onPress={() => (this.setState({card: 'question'}))}>
							   		<Text style={styles.container}>answer: {this.state.qdat[0].questions[this.state.count].answer}</Text>
							   </TouchableOpacity>
									        <TouchableOpacity style={styles.button} onPress={() => (
							                                           this.state.qdat[0].questions.length>this.state.count && this.setState({count: this.state.count+1, card: 'question', correct: this.state.correct+1})

							                 )}>
							              <Text style={styles.submitBtnText}>Correct</Text>
							               </TouchableOpacity>

									        <TouchableOpacity style={styles.button} onPress={() => (
							                                           this.state.qdat[0].questions.length>this.state.count && this.setState({count: this.state.count+1, card: 'question', wrong: this.state.wrong+1})

							                 )}>
							              <Text style={styles.submitBtnText}>Wrong</Text>
							               </TouchableOpacity>
							   </View>
							   )						

					}

					}
				else{
					return(
						<View style={{flex:1}}>
							<Text>{this.state.qdat[0].title} - {this.state.qdat[0].questions.length}/{this.state.qdat[0].questions.length}</Text>
							<Text style={styles.container}>
								Congrats you did it
							</Text>
							<Text style={styles.container}>
								Rate:{Math.round((this.state.correct/(this.state.correct+this.state.wrong))*100)}%
							</Text>
							<Text>
								Correct: {this.state.correct}
							</Text>
							<Text>
								Wrong: {this.state.wrong}
							</Text>
							    <TouchableOpacity style={styles.button} onPress={() => (
							    								this.setState({count:0, wrong: 0, correct: 0})

							           )}>
							        <Text style={styles.submitBtnText}>Quiz again</Text>
							         </TouchableOpacity>
							    <TouchableOpacity style={styles.button} onPress={() => (
							                                     this.props.navigation.navigate(
							                                                                     'Card',
							                                                                   ),
							                                     this.setState({new: true})
							           )}>
							        <Text style={styles.submitBtnText}>Return to Deck</Text>
							         </TouchableOpacity>
						</View>
					)
					
				}
			}
		else{
			return(<View><Text>no data found</Text></View>)
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
    // borderBottomWidth: 10,
    // behavior='padding',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 5,
    // background: '#ecf0f1'
    marginTop: 8, 
    marginLeft: 8,
    marginRight: 8,
    alignItems: 'stretch',
    // fontSize: 22,
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

export default Quiz
