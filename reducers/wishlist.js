export default function(wishlist = null, action) {

  if(action.type == 'saveWishlist') {
      // console.log("action.data_id reducer :", action.data_id)
      return action.data_id;

  } else {
      return wishlist;
  }
}