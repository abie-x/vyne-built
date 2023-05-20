import express from 'express'
import Restaurant from '../models/restaurantModel.js';
import asyncHandler from 'express-async-handler'

const getMenuList = asyncHandler(async (req, res) => {
    const { restaurantId } = req.params;

    try {
        // Retrieve the restaurant by ID
        const restaurant = await Restaurant.findById(restaurantId).lean();

        if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found.' });
        }

        // Organize the data into the desired structure
        const menuData = {
        categories: restaurant.menu_items.reduce((categories, item) => {
            if (!categories.includes(item.category)) {
            categories.push(item.category);
            }
            return categories;
        }, []),
        products: restaurant.menu_items.map((item) => ({
            id: item._id,
            name: item.item_name,
            description: item.item_description,
            category: item.category,
            price: item.item_price,
            image: item.item_image,
            vegetarian: item.vegetarian,
            spicy: item.spicy,
            allergens: item.allergens,
            calorie: item.calorie,
            category: item.category,
            cheffSpecial: item.cheffSpecial,
            remaining: item.remaining,
        })),
        };

        // Return the menu data as the response
        res.json(menuData);
    } catch (error) {
        console.error('Error fetching menu data:', error);
        res.status(500).json({ message: 'Failed to fetch menu data.' });
    }
})

export {
    getMenuList
}