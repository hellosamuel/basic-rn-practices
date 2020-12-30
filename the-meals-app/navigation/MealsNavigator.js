import React from "react"
import { Platform } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { Ionicons } from "@expo/vector-icons"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import CategoriesScreen from "../screens/CategoriesScreen"
import CategoryMealsScreen from "../screens/CategoryMealsScreen"
import MealDetailScreen from "../screens/MealDetailScreen"
import FavoritesScreen from "../screens/FavoritesScreen"
import FilterScreen from "../screens/FilterScreen"

import Colors from "../constants/Colors"

import { CATEGORIES, MEALS } from "../data/dummy-data"
import HeaderButton from "../components/HeaderButton"

const defaultStackNavOptions = {
  headerStyle: Platform.OS === "android" && {
    backgroundColor: Colors.primaryColor,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
}

const MealsStack = createStackNavigator()
const MealsStackNavigator = () => {
  return (
    <MealsStack.Navigator screenOptions={defaultStackNavOptions}>
      <MealsStack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={({ navigation }) => ({
          headerTitle: "Meal Categories",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer()
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <MealsStack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={({ route }) => {
          const { categoryId } = route.params
          const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId)

          return {
            headerTitle: selectedCategory.title,
          }
        }}
      />
      <MealsStack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => {
          const { mealId } = route.params
          const selectedMeal = MEALS.find(meal => meal.id === mealId)

          return {
            headerTitle: selectedMeal.title,
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Favorite" iconName="ios-star" onPress={() => console.log("Mark as favorite!")} />
              </HeaderButtons>
            ),
          }
        }}
      />
    </MealsStack.Navigator>
  )
}

const FavoritesStack = createStackNavigator()
const FavoritesStackNavigator = () => {
  return (
    <FavoritesStack.Navigator screenOptions={defaultStackNavOptions}>
      <FavoritesStack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={({ navigation }) => ({
          headerTitle: "Your Favorites",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer()
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <FavoritesStack.Screen name="MealDetail" component={MealDetailScreen} />
    </FavoritesStack.Navigator>
  )
}

const FiltersStack = createStackNavigator()
const FiltersStackNavigator = () => {
  return (
    <FiltersStack.Navigator screenOptions={defaultStackNavOptions}>
      <FiltersStack.Screen
        name="Filter Meals"
        component={FilterScreen}
        options={({ navigation, route }) => ({
          headerTitle: "Filter Meals",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer()
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item title="Save" iconName="ios-save" onPress={route.params.save} />
            </HeaderButtons>
          ),
        })}
      />
    </FiltersStack.Navigator>
  )
}

const MealsFavTab = createBottomTabNavigator()
const MealsFavTabNavigator = () => {
  return (
    <MealsFavTab.Navigator
      tabBarOptions={{ activeTintColor: Colors.accentColor, labelStyle: { fontFamily: "open-sans" } }}
    >
      <MealsFavTab.Screen
        name="Meals"
        component={MealsStackNavigator}
        options={{
          tabBarIcon: tabInfo => {
            return <Ionicons name="ios-restaurant" size={25} color={tabInfo.color} />
          },
        }}
      />
      <MealsFavTab.Screen
        name="Favorites"
        component={FavoritesStackNavigator}
        options={{
          tabBarIcon: tabInfo => {
            return <Ionicons name="ios-star" size={25} color={tabInfo.color} />
          },
        }}
      />
    </MealsFavTab.Navigator>
  )
}

const MainDrawer = createDrawerNavigator()
const MainDrawerNavigator = () => {
  return (
    <MainDrawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.accentColor,
        labelStyle: {
          fontFamily: "open-sans-bold",
        },
      }}
    >
      <MainDrawer.Screen name="MealsFavs" component={MealsFavTabNavigator} options={{ drawerLabel: "Meals" }} />
      <MainDrawer.Screen name="Filters" component={FiltersStackNavigator} />
    </MainDrawer.Navigator>
  )
}

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MainDrawerNavigator />
    </NavigationContainer>
  )
}

export default MainNavigator
