export const CONSTANTS = {
  productImagesPath: '/static/product-images',
  categoryImagesPath: '/static/category-images',
  sliderImagesPath: '/static/slider-images',
  logoImage: '/static/logo.png',
  companyName: 'Boston Gaming',
  navbarItems: [
    { text: 'Products', slug: 'products' },
    { text: 'Design Your Own', slug: 'design-your-own' },
    { text: 'About', slug: 'about' },
    { text: 'Contact', slug: 'contact' },
  ],
}

export const fakeData = {
  components: {
    CPU: [
      { model: 'core i3-9100F', price: 100 },
      { model: 'core i3-9100F', price: 100 },
    ],
    Motherboard: [
      { model: 'Gigabyte B365M DS3H Micro ATX LGA1151', price: 200 },
    ],
  },
}
