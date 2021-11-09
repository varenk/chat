import { promiseTHC } from "../reducers/promiseReducer"

const getGQL = url => {
    return function (query, variables = {}) {
        return fetch(url,
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json",
                    ...(localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {})
                },
                body: JSON.stringify({ query, variables })
            }).then(resp => resp.json())
            .then(data => {
                if ("errors" in data) {
                    throw new Error(JSON.stringify(data.errors, null, 4))
                }
                else {
                    return data.data[Object.keys(variables)[0]]
                }
            })
    }
}

const chatGQL = getGQL('http://chat.fs.a-level.com.ua/graphql')

export const promiseLoginTHC = (login, password) => {
    return promiseTHC('login', chatGQL(`
        query login($login:String, $password: String) 
        {login(login:$login, password:$password)}`,
        { login, password }))
}

export const promiseRegisterTHC = (login, password) => {
    return promiseTHC('register', chatGQL(`mutation register($login:String, $password:String) {
        UserUpsert(user:{
          login:$login, password:$password
        })
        {_id login}
      }`,
        { UserUpsert: '', login, password }))
}

export const promiseGetUsersTHC = () => {
    return promiseTHC('users', chatGQL(`query findUsers{
        UserFind(query: "[{}]"){
          _id login nick avatar {
            _id url
          }
        }
      }`,
      {UserFind: ''}))
}

export const promiseNewChatTHC = (title, _id) => {
  return promiseTHC('newChat', chatGQL(`mutation createChat($title: String, $members:[UserInput]){
        ChatUpsert(chat:{
          title: $title, members:$members
        }) {
          _id createdAt lastModified owner {
            _id login
          } members {
            _id login
          }
        }
      }`, { ChatUpsert: '', title, members: [{ _id }] }))
}

export const promiseGetChatsTHC = (myId) => {
  return promiseTHC('myChats', chatGQL(`query findChats($id:String){
    ChatFind(query: $id){
      _id createdAt lastModified title members {_id login} owner {_id login} messages {_id createdAt owner {login} text media {_id url}}
    }
  }`, {ChatFind: '', id: JSON.stringify([{"members._id": myId}])}))
}

export const promiseChatByIdTHC = (id) => {
  return promiseTHC('chat', chatGQL(`query findExactChat($chatId:String){
    ChatFindOne(query: $chatId){
      _id createdAt lastModified owner {_id login} title members {
        _id login
      } messages {_id owner {_id login } text  createdAt forwarded {_id owner {login}}
      }
    }
  }`, {ChatFindOne: '', chatId: JSON.stringify([{_id: id}])}))
}

export const promiseGetChatMessagesTHC = (chatId) => {
  return promiseTHC('messages', chatGQL(`query FindMessages($chatId:String){
    MessageFind(query: $chatId){
      _id createdAt owner {_id login} text chat { _id title}
    }
  }`, {MessageFind: '', chatId: JSON.stringify([{"chat._id": chatId}])}))
}

export const promiseNewMessageTHC = (text, chatId) => {
  return promiseTHC('newMessage', chatGQL(`mutation addMessage($text: String, $chatId: ID){
    MessageUpsert(message:{
      text: $text, chat: {_id: $chatId}
    }){
      _id chat {_id title} text
    }
  }`, { MessageUpsert: '', text, chatId}))
}