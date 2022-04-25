# Recipe Manager
This app is the course project of https://www.udemy.com/course/the-complete-guide-to-angular-2/.

## Description
In this app you'll find:
* A personal shopping list of ingredients, which one can add, delete and update it's content.
* A personal recipe list, which one can manage: add new recipe, edit existing one and send ingredients to  the shopping list. 

## Design
Firstly, the user is routed to the login page, and asked to either signin or login. The data is stored at a Firebase DB.

After authentication, the main page is loaded, which is the recipe list page.

At each point, the user can navigate to his shopping list/recipe list, through a tab found in the header.

In addition, the user can logout at any time, and fetch/save his content throw the 'Manage' button. 
