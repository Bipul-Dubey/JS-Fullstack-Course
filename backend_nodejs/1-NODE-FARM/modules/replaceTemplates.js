const replateProductCard = (temp, data) => {
  let output = temp.replace("%PRODUCT_CARDS%}", data);
  return output;
};

const replaceProductDetails = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product?.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%PRODUCTDESCRIPTION%}/g, product.description);
  output = output.replace(/ {%NUTRITIONS%}/g, product.nutrients);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

module.exports = {
  replaceProductDetails,
  replateProductCard,
};
