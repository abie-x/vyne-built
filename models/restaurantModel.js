import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        restaurant_name: {
            type: String,
            required: true
          },
          city: {
            type: String,
            required: true
          },
          address: {
            type: String,
            required: true
          },
          image: {
            type: String,
            required: true
          },
          phone_number: {
            type: String,
            required: true
          },
          cuisines: {
            type: [String],
            required: true
          },
          ambience: {
            type: [String],
            required: true
          },
          reviews: [{
            reviewer_name: {
              type: String,
              required: true
            },
            review_text: {
              type: String,
              required: true
            },
            review_date: {
              type: Date,
              default: Date.now()
            },
            rating: {
              type: Number,
              required: true,
              min: 1,
              max: 5
            }
          }],
          menu_items: [{
            item_name: {
              type: String,
              required: true
            },
            item_description: {
              type: String,
              required: true
            },
            item_image: {
              type: String,
              required: true
            },
            item_price: {
              type: Number,
              required: true
            },
            vegetarian: {
              type: Boolean,
              default: false
            },
            spicy: {
              type: Boolean,
              default: false
            },
            allergens: {
              type:  [String],
              default: []
            },
            calorie: {
                type: Number
            },
            category: {
                type: String,
                required: true,
            },
            cheffSpecial: {
                type: Boolean,
                default: false
            },
            remaining: {
              type: Number,
              required: true,
              min: 0
            },
            created_at: {
              type: Date,
              default: Date.now
            },
            updated_at: {
              type: Date,
              default: Date.now
            }
          }]
    }
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant