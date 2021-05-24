export default function(wishlist = "", action) {
  if(action.type == 'saveWishlist') {
<<<<<<< HEAD
    // console.log("action.name reducer :", action.name)
=======
>>>>>>> strategy
    var newName = action.name
    return newName;
  } else {
    return wishlist;
  }
}