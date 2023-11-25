import ScreenData from '~/app/core/class/ScreenData';

const ProductScreen = {
  PRODUCT: new ScreenData<any>({
    KEY: 'Product',
    TITLE: 'Product',
  }),
  DETAIL_PRODUCT: new ScreenData<any>({
    KEY: 'DetailProduct',
    TITLE: 'Detail Product',
  }),
  ADD_PRODUCT: new ScreenData<any>({
    KEY: 'AddProduct',
    TITLE: 'Add Product',
  }),
};

export default ProductScreen;
