function applyFlat10Discount(products, subTotal) {
  const discountAmount = 10;
  console.log("Flat 10 Discount Applied: ", discountAmount);
  return discountAmount;
}

function applyBulk5Discount(products, shortlistedProducts, subTotal) {
  let discountAmount = 0;

  for (const product of shortlistedProducts) {
    discountAmount += product[1] * product[2] * 0.05;
  }

  console.log("Bulk 5 Discount Applied: ", discountAmount);
  return discountAmount;
}

function applyBulk10Discount(products, subTotal) {
  const discountAmount = subTotal * 0.1;
  console.log("Bulk 10 Discount Applied: ", discountAmount);
  return discountAmount;
}

function applyTiered50Discount(products, shortlistedProducts, subTotal) {
  let discountAmount = 0;

  for (const product of shortlistedProducts) {
    discountAmount += product[1] * (product[2] - 15) * 0.5;
  }

  console.log("Tiered 50 Discount Applied: ", discountAmount);
  return discountAmount;
}

function generateBill(products, isGiftWrap) {
  let subTotal = 0;
  let subUnits = 0;
  const bulk5DiscountedProducts = [];
  const tiered50DiscountedProducts = [];

  const discounts = [false, false, false, false];
  let flagTiered = false;

  console.log("Product List:");
  console.log("Name Units Amount");

  for (const product of products) {
    subTotal += product[1] * product[2];
    subUnits += product[2];

    if (product[2] > 10) {
      bulk5DiscountedProducts.push(product);
      discounts[1] = true;
    }

    if (product[2] > 15) {
      tiered50DiscountedProducts.push(product);
      flagTiered = true;
    }

    console.log(product[0], product[2], product[1] * product[2]);
  }

  console.log("Subtotal: ", subTotal);

  if (subUnits > 30 && flagTiered) {
    discounts[3] = true;
  }

  if (subUnits > 20) {
    discounts[2] = true;
  }

  if (subTotal > 200) {
    discounts[0] = true;
  }

  if (discounts[0]) {
    subTotal -= applyFlat10Discount(products, subTotal);
  }

  if (discounts[1]) {
    subTotal -= applyBulk5Discount(products, bulk5DiscountedProducts, subTotal);
  }

  if (discounts[2]) {
    subTotal -= applyBulk10Discount(products, subTotal);
  }

  if (discounts[3]) {
    subTotal -= applyTiered50Discount(
      products,
      tiered50DiscountedProducts,
      subTotal
    );
  }

  const shippingFee = 10 * Math.ceil(subUnits / 10);
  subTotal += shippingFee;

  if (isGiftWrap) {
    subTotal += subUnits;
    console.log("Shipping and Gift Wrap Fee Applied: ", shippingFee + subUnits);
  } else {
    console.log("Shipping Fee Applied: ", shippingFee + subUnits);
  }

  console.log("Total Amount: ", subTotal);
}

const productsArray = [
  ["A", 20, 30],
  ["B", 40, 11],
  ["C", 50, 7],
];

generateBill(productsArray, true);
