const sanitizeImageList = (imageArr, categories) => {
  let obj = {};
  categories.forEach(category => {
    obj[category.category] = [];
  })
  imageArr.forEach(image => {
    obj[image.category].push(image.photo_url);
  });
  return obj;
}

class ImageService {
  static async getImages(db) {
    try {
      const categories = await db.any('select category from animal_categories');
      const res = await db.any('select c.category, p.photo_url from animal_categories c, animal_photos p where c.id = p.category_id');
      const sanitizedResponse = sanitizeImageList(res, categories);
      return sanitizedResponse;
    } catch(e) {
      console.error(e);
      return e;
    }
  }
}

module.exports = ImageService;