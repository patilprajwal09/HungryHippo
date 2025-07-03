import React, { useState } from 'react';
import Header from '../../components/header/Header';
import MultipleItemCarousel from '../../components/reactCarousel/MultipleItemCarousel';
import FoodDisplay from '../../components/foodDisplay/FoodDisplay';

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <div>
      <Header />
      </div>
  
      <MultipleItemCarousel category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/>
    </div>
  );
}

export default Home;
