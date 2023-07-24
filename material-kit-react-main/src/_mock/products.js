// ----------------------------------------------------------------------
const PRODUCTID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const PRODUCT_NAME = ['kaushik', 'sagar', 'punit', 'akshay', 'raghav', 'ashish', 'naimit'];
const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];
const PRODUCT_PRICE = [50, 60, 70, 10, 15, 12, 13, 14, 18, 700, 100, 200];
// ----------------------------------------------------------------------

const products = [...Array(10)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: PRODUCTID[index],
    cover: `/assets/images/products/product_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    price: PRODUCT_PRICE[index],
    priceSale: PRODUCT_PRICE[index],
    colors: PRODUCT_COLOR,
  };
});

export default products;
