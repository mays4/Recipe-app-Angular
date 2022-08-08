
import { Recipe } from "../recipe.model";
import * as RecipeActions from './recipe.actions'
export interface State{
  recipes:Recipe[]

}
const  intitaleState:State ={
  recipes:[]

}

export function RecipeReducer(
state= intitaleState
,action : RecipeActions.RecipesActionsType
){
  switch (action.type) {
  case RecipeActions.SET_RECIPES:
    return{
      ...state,
      recipes:[...action.payLoad]
    }
  case RecipeActions.ADD_RECIPE:
    return {
      ... state,
      recipes:[...state.recipes,action.payLoad]
    }

  case RecipeActions.UPDATE_RECIPE:
    const updatedRecipe ={...state.recipes[action.payLoad.index],...action.payLoad.newRecipe};
    const updatedRecipes = [...state.recipes];
    updatedRecipes[action.payLoad.index]=updatedRecipe;
    return {
      ...state,
      recipes:updatedRecipes
    }

  case RecipeActions.DELETE_RECIPE:

    return {
      ...state,
      recipes: state.recipes.filter((recipe,index)=>{
        return index !== action.payLoad;
      })
    }

  default:
    return state

}
}
