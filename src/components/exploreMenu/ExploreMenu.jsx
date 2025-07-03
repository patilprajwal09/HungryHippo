import React from 'react'
import './exploremenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  const handleCategoryClick = (menuName) => {
    // If the clicked category is already active, set to "All"
    // Otherwise, set to the clicked category
    setCategory(category === menuName ? "All" : menuName);
  };

  return (
    <section id="explore" className="explore-menu">
      <h1>
        Explore our menu
      </h1>

      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes.
        Our mission is to satisfy your cravings with quality food.
      </p>

      <div className="explore-menu-list" id='menu-list'>
        {
            menu_list.map((item) => (
                <div 
                  key={item.menu_name}
                  onClick={() => handleCategoryClick(item.menu_name)}
                  className="explore-menu-list-item"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCategoryClick(item.menu_name);
                    }
                  }}
                >
                  <img 
                    className={category === item.menu_name ? "active" : ""} 
                    src={item.menu_image} 
                    alt={`${item.menu_name} category`}
                  />

                  <p>
                    {item.menu_name}
                  </p>

                </div>
            ))
        }

      </div>

      <hr />
      
    </section> 
  )
}

export default ExploreMenu;
