export default function(token = null, action) {
    if(action.type == 'saveToken') {
        console.log("action.token:",action.token)
        return action.token;
    } else {
        return token;
    }
  }