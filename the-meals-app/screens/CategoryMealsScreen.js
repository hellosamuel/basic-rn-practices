import React from "react"
import { View, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import DefaultText from "../components/DefaultText"

import MealList from "../components/MealList"

const CategoryMealScreen = props => {
  const { categoryId } = props.route.params

  const availableMeals = useSelector(state => state.meals.filteredMeals)

  const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0)

  if (!displayedMeals.length) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check your filters?</DefaultText>
      </View>
    )
  }
  return <MealList listData={displayedMeals} navigation={props.navigation} />
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
export default CategoryMealScreen
