export default function(wishlist = "", action) {
  if(action.type == 'saveWishlist') {
    console.log("action.name reducer :", action.name)
    var newName = action.name
    return newName;
  } else {
    return wishlist;
  }
}