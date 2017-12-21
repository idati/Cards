
export const GET_DECKS = 'GET_DECKS'


export function _getDecks (decks) {

  return {

    type: GET_DECKS,

    decks,

  }

}