import React, { useContext, useMemo } from 'react'
import './fooddisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../foodItem/FoodItem'

const FoodDisplay = ({category}) => {

  const {food_list}=useContext(StoreContext)

  // Memoize filtered food list to prevent unnecessary re-renders
  const filteredFoodList = useMemo(() => {
    if (!food_list) return [];
    
    return category === "All" 
      ? food_list 
      : food_list.filter(item => item.category === category);
  }, [food_list, category]);

  // Handle empty state
  if (!food_list || food_list.length === 0) {
    return (
      <div className="food-display" id="food-display">
        <h2>Top Dishes near you</h2>
        <div className="food-display-empty">
          <p>No dishes available at the moment.</p>
        </div>
      </div>
    );
  }

  // Handle no results for specific category
  if (filteredFoodList.length === 0) {
    return (
      <div className="food-display" id="food-display">
        <h2>Top Dishes near you</h2>
        <div className="food-display-empty">
          <p>No dishes found in the "{category}" category.</p>
          <p>Try selecting a different category or check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="food-display" id="food-display">
      <h2>Top Dishes near you</h2>
      
      <div className="food-display-list" role="list">
        {filteredFoodList.map((item) => (
          <FoodItem 
            key={item._id} 
            id={item._id} 
            name={item.name} 
            description={item.description} 
            price={item.price} 
            image={item.image}
          />
        ))}
      </div>
    </section>
  )
}

export default FoodDisplay;
