# <img src="src/recipe%20manager%20icon.png" width=40> Recipe Manager

Link: https://tom-recipe-manager.web.app/

## Description
Ever forgot to buy some ingredient for a delicious recipe you wanted to made? Well not any more! 

This website allows you to add your own recipes with all of your favorite ingredients, then by a single click send it to your personal shopping list. There you will find all the ingredients for this recipe, which can help you at the supermatrket.

<<<<<<< HEAD
=======
<p align="center">
<img src="website pictures/recipes.png" width=500px>
</p>

>>>>>>> 72a052e38004b33e3b9298ca9809e1dabdbe2a1e
![alt text](https://github.com/tom-nachum/RecipeManager/blob/master/Website_pictures/recipes.png?raw=true)


## Design
### Authentication
Firstly, the user is routed to the login page, and asked to either signin or login. The user cannot enter to any other route at this point.
After authentication, the main page is loaded, which includes the recipe list componnent.

### Recipes List
 The main page includes a description of the available functionalities for the user. 
 The user can select a recipe from the list to show it's information, then the user can edit the data, delete the recipe or send it to the shopping list. 

 When the user adds a recipe to the shopping list, a pop-up is open to show feedback that the operation suceeded. In addition, a badge is presented at the header component indicates the number of new elements added to the shopping list. 

 The user can also add a new recipe, which includes the following information:
 
 1. Name: a mandatory input, when the user doens't add this field an alert is presented at the bottom of the form. 
 2. Picture: this is an optional field. The user can pick a picture from google and add the img url to his recipe. 
 3. Description
 4. Ingredients: each ingredient has name and amount. When the user tries to enter an invalid amount an alert is presented, and the form submission will be disabled.

### Shopping list
The user can manually add new ingredients to the shopping list as well. In addition, the user can edit an existing element in the list, then a form is loaded with the current info of the ingredient to edit. 

New ingredients has a mark on it, and when pressing it the mark disappear.

If the user delets all the ingredients from the list, an informative message presents. 

### Header 
At each point, the user can navigate to his shopping list/recipe list, through tabs found in the header. The user can also logout at any time. 

![alt text](https://github.com/tom-nachum/RecipeManager/blob/master/Website_pictures/mobile_shopping_list.png?raw=true)


## Backend
For the backend I've used Firebase:
*  It allowed me to manage the authentication section, to store users credentials and limit access to data based on whether the user is logged in or not. 
* I saved in the realtime database default recipes which loaded initially when a user is signing in. 
* All the users data is saved also in the DB: it's recipes, shopping list and the new ingredients added to the shopping list. 
* I hosted the website using firebase as well. 
