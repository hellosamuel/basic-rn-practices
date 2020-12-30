import React from "react"

import { MEALS } from "../data/dummy-data"

import MealList from "../components/MealList"

const CategoryMealScreen = props => {
  const { categoryId } = props.route.params
  const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0)

  return <MealList listData={displayedMeals} navigation={props.navigation} />
}

export default CategoryMealScreen
