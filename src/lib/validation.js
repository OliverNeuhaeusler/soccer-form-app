const validateName = (name) => name.length >= 2;
const validateEmail = (email) => email.includes('@');
const validatePrice = (price, free_transfer) =>
  (parseFloat(price) > 0 && !free_transfer) || free_transfer;

const validatePlayer = (player) =>
  validateName(player.name) &&
  validateEmail(player.email) &&
  validatePrice(player.price, player.free_transfer);

export default validatePlayer;
