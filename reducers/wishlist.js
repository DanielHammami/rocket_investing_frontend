export default function(wishlist = null, action) {

  if(action.type == 'saveWishlist') {
      console.log("action.data_id reducer :", action.name)
      return action.name;

  } else {
      return wishlist;
  }
}