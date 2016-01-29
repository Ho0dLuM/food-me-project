# Week Two Of Restaurants
Read through this entire document and create a DATA MODEL of your app!
Use *lucidchart* or *draw.io*

___Drop your data model here___

You will be using your skills in:
  * Joins
  * Migrations
  * Associations
  * Data Modeling
  * Validations
  * Unirest

#### User Show Page (Reviews)
```
- When a user comes to the restaurant show page, they will see restaurant information, restaurant reviews, and employees of the restaurant
- reviews and employees should be in 2 column format
- Users should have an option to add a new review
- Reviews should have a reviewer name, date of review, review, rating and option to edit
```
##### Stretch:
```
- The restaurant rating is calculated based on the average of the reviews
- Reviews are ordered with the most recent DATE at the top
```
![image](images/show.jpg)

### New Review

```
- When a user clicks to add a new review, they are taken to a new review page for that restaurant
- The new review should include:
  - Reviewer name
  - Review date
  - Rating
  - Review
- The user has the option to submit or cancel from this page
- When the user posts their new review, they are taken to the restaurant show page where they see all the reviews for that restaurant
```

### Show Review
```
- When a user clicks on a review, they are taken to a review show page where they can now read the full review
```

### Edit Review
```
- When the user clicks 'edit' on a review, they are taken to an edit review page
- User sees all the information for the review already pre-filled
- User can cancel or submit their changes
- User has the option to delete their review  
- When the user submits their changes, they are taken to the restaurant show page where they can see all the reviews including the changes they just made
```
#### Stretch:
```
- When a user sees the overall restaurant rating, it is an average of the ratings of all the reviews
- The reviews are shown as snippets if they are longer than the a lotted space
- The review can be expanded by clicking on the *...* of the snippet
```
![image](images/review.jpg)



### User Show Page (Employees)
```
- When a user comes to the restaurant show page, they should be able see a table of restaurant employees
- A user should be able to add a new employee
- Employees should have a:
  - First Name
  - Last Name
  - Position (Manager, Server, Host, Chef)
- Users should be able to click on an employee's name and go to an employee show page
```
![image](images/show.jpg)
![image](images/employee.jpg)


### Employee Edit Page
```
- The user can edit the Employee Information
- Employee information should be pre-filled when editing
- User has the option to cancel the edit
- The user can delete an Employee
```

#### Stretch:
```
* The user can add multiple employees at once
* The User can delete multiple employees at once
```

### ADMIN Show Page
```
- From the restaurants index page, user should be able to go to an admin page
- The admin home page should list all the restaurants and their ratings. 
```



### ADMIN Show page
```
- User has the option
```
![image](images/admin.png)


####Stretch
* The user should see an error when a duplicate is submitted
* The error should be specific and say "This *item* already exists!"

### Validations
```
-
```
* The user should be able to enter info about an employee and submits the form.
* The form should not be able to be submitted with blank fields.
* The user should see an error with unique styling when the form is incomplete.
* The user should see specific errors about what is missing in the form.
* The user's form data should persist when the page reloads with errors.
