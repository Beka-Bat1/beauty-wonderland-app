class Product {
   constructor(id, ownerId, title, imageUrl, description, price, tag) {
      this.id = id;
      this.ownerId = ownerId;
      this.imageUrl = imageUrl;
      this.title = title;
      this.description = description;
      this.price = price;
      this.tag = tag;
   }
}

export default Product;
