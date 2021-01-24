import React from "react"
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"

import MealList from "../components/MealList"
import DefaultText from "../components/DefaultText"

const FavoriteScreen = props => {
  const favMeals = useSelector(state => state.meals.favoriteMeals)

  if (!favMeals.length || !favMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meals found. Start adding some!</DefaultText>
      </View>
    )
  }

  return <MealList listData={favMeals} navigation={props.navigation} />
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default FavoriteScreen
