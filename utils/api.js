
// {
//   React: {
//     title: 'React',
//     questions: [
//       {
//         question: 'What is React?',
//         answer: 'A library for managing user interfaces'
//       },
//       {
//         question: 'Where do you make Ajax requests in React?',
//         answer: 'The componentDidMount lifecycle event'
//       }
//     ]
//   },
//   JavaScript: {
//     title: 'JavaScript',
//     questions: [
//       {
//         question: 'What is a closure?',
//         answer: 'The combination of a function and the lexical environment within which that function was declared.'
//       }
//     ]
//   }
// }

// import Reactotron, {
//   trackGlobalErrors,
//   openInEditor,
//   overlay,
//   asyncStorage,
//   networking
// } from 'reactotron-react-native'
import {AsyncStorage} from 'react-native'
import {Notifications, Permissions} from 'expo'

const NOTIFICATION_KEY = 'Reminderr'

const STOREAGE_KEY_DECK = "Titleseee"
const STOREAGE_KEY_CARD = "cardss"

// getDecks: return all of the decks along with their titles, questions, and answers. 
export function getDecks(){
	var jsonVariable={}
	var title='test'
	var tmp= jsonVariable[title]={'title': title, 'questions':[]}
	
	// var tmp
	// AsyncStorage.getItem(STOREAGE_KEY_DECK).then((value) => {console.log('tmp',JSON.parse(value))})
	
	return AsyncStorage.getItem(STOREAGE_KEY_DECK).then(results => {return(JSON.parse(results))}
		)

}
// getDeck: take in a single id argument and return the deck associated with that id. 

// saveDeckTitle: take in a single title argument and add it to the decks. 
export function saveDeckTitle(title){ 
	var jsonVariable={}
	var check=false
	jsonVariable[title]={'title': title, 'questions':[]}
	AsyncStorage.getItem(STOREAGE_KEY_DECK).then(results => {
		var res={}
		var res2=JSON.parse(results)
		for(var key in res2){ 
			res[key]=res2[key]
			if (key === title){
				check=true
			}
		}
		for(var key in jsonVariable) {
			if(check===false){
						res[key]=jsonVariable[key]
					}	
		}
		
		return(res)
	}).then(res => {
		return AsyncStorage.setItem(STOREAGE_KEY_DECK, JSON.stringify(res))
	})

	// var tmp= {title :{'title': title, 'questions':[]}}
	
	// var tmp = AsyncStorage.getItem(STOREAGE_KEY_DECK)
	// tmp=JSON.parse(tmp)
	// tmp.push({title:{'title': title, 'questions':[]}})
	 
	// return AsyncStorage.mergeItem(STOREAGE_KEY_DECK, JSON.stringify(title:{'title': title, 'questions':[]}))
	// return AsyncStorage.setItem(STOREAGE_KEY_DECK, 'I like to save it.')
	// return console.log('insertText',JSON.stringify({title:{'title': title, 'questions':[]}}))
	// return AsyncStorage.setItem(STOREAGE_KEY_DECK, JSON.stringify({title :{'title': title, 'questions':[]}}))
}

export function removeDeckTitle(title){
	AsyncStorage.getItem(STOREAGE_KEY_DECK).then(results => {
		var res={}
		var res2=JSON.parse(results)
		for (var key in res2) if( key!==title) res[key]=res2[key]
		
		return(res)
	}).then(res=> {return AsyncStorage.setItem(STOREAGE_KEY_DECK, JSON.stringify(res))})
}
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
export function addCardToDeck(title, question, answer){
	
	AsyncStorage.getItem(STOREAGE_KEY_DECK).then(results => {
		
		var res2=JSON.parse(results)
		var res={}
		var check=false
		for(var key in res2){
			
			res[key]=res2[key]
			if( key===title){
				for(var key2 in res[key].questions){
					if(res[key].questions[key2].question === question){
						check=true
					}
				}

					if (check === false){
										res[key].questions.push({'question': question, 'answer': answer})
									}
				}
				
			}
		
			
		return(res)
	}).then(res => {
		
		return AsyncStorage.setItem(STOREAGE_KEY_DECK, JSON.stringify(res))
	})
}

export function removeCardFromCards(title, question){
	AsyncStorage.getItem(STOREAGE_KEY_DECK).then(results => {
		var res2=JSON.parse(results)
		var res={}
		var cres={}
		
		for(var key in res2){
			
			if( key===title){
				res[key]={'title': title, 'questions':[]}
				for(var key2 in res2[key].questions){
					
					if(res2[key].questions[key2].question!==question){
						res[key].questions.push(res2[key].questions[key2])
					}
				}
			}
			else{
				res[key]=res2[key]
			}
		}
		
		return res
	}).then(res => {
		return AsyncStorage.setItem(STOREAGE_KEY_DECK, JSON.stringify(res))
	})
}

export function editCard(title, question_old, question_new, answer){
	AsyncStorage.getItem(STOREAGE_KEY_DECK).then(results => {
		var res2=JSON.parse(results)
		var res={}
		var cres={}
		
		for(var key in res2){
			
			if( key===title){
				res[key]={'title': title, 'questions':[]}
				
				for(var key2 in res2[key].questions){
					
					
					if(res2[key].questions[key2].question!==question_old){
						res[key].questions.push(res2[key].questions[key2])
					}
					
					if (res2[key].questions[key2].question===question_old){
						
						res[key].questions.push({'question': question_new, 'answer': answer})
						
					}
				}
			}
			else{
				res[key]=res2[key]
			}
		}
		
		return res
	}).then(res => {
		return AsyncStorage.setItem(STOREAGE_KEY_DECK, JSON.stringify(res))
	})
}


// 

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduleNotificationsAsync)

}

function createNotification() {
	return{
		title: 'Teach Yourself',
		body: ' Don not forget to learn today',
		ios:{
			sound: true,
		},
		android:{
			sound: true,
			priotity: 'high',
			sticky: false,
			vibrate: true,

		}
	}

}

export function setLocalNotification() {
	// AsyncStorage.removeItem(NOTIFICATION_KEY)
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if(data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({status}) => {
						if(status === 'granted'){
							Notifications.cancelAllScheduledNotificationsAsync()

							let tomorrow = new Date()
							tomorrow.setDate(tomorrow.getDate()+1)
							tomorrow.setHours(1)
							tomorrow.setMinutes(30)
							console.log(tomorrow)
							Notifications.scheduleLocalNotificationAsync(
								createNotification(),
								{
									time: tomorrow,
									repeat: 'day',
								})

							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
						}
					})
			}

		})
}