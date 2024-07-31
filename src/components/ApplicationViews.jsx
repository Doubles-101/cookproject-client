import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../pages/Login.jsx"
import Home from "../pages/Home"
import { Register } from '../pages/Register.jsx'
import { RecipeList } from './RecipeList/RecipeList.jsx'
import { RecipeDetail } from './RecipeDetail/RecipeDetail.jsx'
import { ProfileDetail } from './Profile/ProfileDetail.jsx'
import { EditProfile } from './Profile/EditProfile.jsx'
import { CreateRecipe } from './CreateRecipe/CreateRecipe.jsx'
import { MyRecipeList } from './RecipeList/MyRecipeList.jsx'
import { EditRecipe } from './EditRecipe/EditRecipe.jsx'
import { BlogList } from './Blog/BlogList.jsx'


export const ApplicationViews = () => {

    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="/recipelist" element={<RecipeList />} />
                <Route path="/myRecipeList" element={<MyRecipeList />} />
                <Route path="/createRecipe" element={<CreateRecipe />} />
                <Route path="/recipeDetails/:recipeId" element={<RecipeDetail />} />
                <Route path="/editRecipe/:recipeId" element={<EditRecipe />} />
                <Route path='/profile/:profileId' element={<ProfileDetail />} />
                <Route path='/editProfile/:profileId' element={<EditProfile />} />
                <Route path="/bloglist" element={<BlogList />} />
            </Route>
        </Routes>
    </BrowserRouter>
}