import React from "react"
import { StyleSheet } from "react-native"

import MealList from "../components/MealList"

import { MEALS } from "../data/dummy-data"

const FavoriteScreen = props => {
  const favMeals = MEALS.filter(meal => ["m1", "m2"].includes(meal.id))

  return <MealList listData={favMeals} navigation={props.navigation} />
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default FavoriteScreen
