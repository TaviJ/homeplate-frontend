import { Routes, Route, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import * as recipeService from './services/recipeService'

import Homepage from './components/Homepage/Homepage';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import RecipeForm from './components/RecipeForm/RecipeForm';
import './App.css'


const App = () => {

  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([])

  useEffect(()=>{
    const fetchAllRecipes = async () =>{
      const recipesData = await recipeService.index();
      setRecipes(recipesData)
    }
    fetchAllRecipes()
  },[])

  const handleAddRecipe = async (recipeFormData) => {
    const payload = {
      title: recipeFormData.title,
      description: recipeFormData.description,
      imageUrl: recipeFormData.imageUrl,
      difficultyLevel: recipeFormData.difficultyLevel,
      typeRecipe: recipeFormData.typeRecipe,

      prepTime: Number(recipeFormData.prepTime),
      servings: Number(recipeFormData.servings),

      ingredients: recipeFormData.ingredients.map((ingredient) => ({
        nameIngredient: ingredient.nameIngredient,
        unitQuantity: Number(ingredient.unitQuantity),
      })),

      steps: recipeFormData.steps.map((step) => ({
        stepNumber: Number(step.stepNumber),
        stepTitle: step.stepTitle,
        stepDescription: step.stepDescription,
      })),

      tags: recipeFormData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    const newRecipe= await recipeService.create(payload);
    setRecipes([newRecipe, ...recipes])
    navigate("/recipes");
  };

  const handleDeleteRecipe = async(recipeId) =>{
    const deletedRecipe = await recipeService.deleteRecipe(recipeId)
    setRecipes(recipes.filter((recipe)=>recipe._id !== deletedRecipe._id));
    navigate('/recipes');
  }

  return(
    <>
      <Routes>
        <Route path='/recipes' element={<Homepage recipes={recipes}/>}/>
        <Route path='/recipes/new' element={<RecipeForm handleAddRecipe={handleAddRecipe} />}/>
        <Route path='/recipes/:recipeId' element={<RecipeDetails handleDeleteRecipe={handleDeleteRecipe}/>}/>
        
      </Routes>
    </>
  );
};

export default App;
