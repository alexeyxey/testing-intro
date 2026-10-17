function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {

  if (quantity <= 0 || quantity > product.stock) {
    throw new RangeError('...');
  }

  const newCart = [...cart];

  const existingProduct = newCart.find((item) => item.id === product.id);
  if (existingProduct) {

    if (existingProduct.quantity + quantity > product.stock) {
      throw new RangeError('...');
    }
    existingProduct.quantity += quantity;
  }
  else {

    newCart.push({

      ...product,
      quantity

    });
  }

  return newCart
}

function changeQuantity(cart, productID, quantity) {

  const newCart = [...cart];
  const findProduct = newCart.find((item) => productID === item.id)

  if (findProduct) {
    if (quantity <= 0 || findProduct.stock < quantity) {
      throw new RangeError('...');
    }

    findProduct.quantity = quantity
  }
  return newCart
}
function removeFromCart(cart, productID) {

  const newCart = [...cart];

  const findProduct = newCart.filter((item) => item.id !== productID)
  return findProduct
}

function calculateCartSubtotal(cart) {

  if (cart.length === 0) {
    return 0
  }

  return cart.reduce((sum, item) => sum += item.price * item.quantity, 0)

}
function calculateOrderTotal(cart, promoCode) {

  const subtotal = calculateCartSubtotal(cart);

  let discount = 0;
  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = subtotal * 0.1;
  }

  let delivery;
  let total
  if (subtotal < 50000) {
    delivery = 30000
    total = subtotal + delivery - discount
  }
  else {
    delivery = 0;
    total = subtotal + delivery - discount
  }

  return {
    subtotal,
    discount,
    delivery,
    total
  }
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
