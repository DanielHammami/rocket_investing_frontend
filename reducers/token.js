export default function(token = null, action) {

    if(action.type == 'saveToken') {
        // console.log("token reducer :", action.token)
        return action.token;
  
    } else {
        return token;
    }
  }