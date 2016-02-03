# Week Four of Restaurants

Read through this entire document and create a DATA MODEL of your app!
Use *lucidchart* or *draw.io*

___Drop your data model here___

You will be using your skills in:
  * Authorization
  * Authentication
  * Cookies
  * Password Hashing
  * oAuth

### A Non-logged in User
```
- As a user that just got to this site, I should see a splash page that tells me what this site is about
- User has the option to either signup or login for this site, or to just enter as a guest
- When the user enters the site as a guest, they see all the restaurants
- User can click on a restaurant and are taken to the restaurant show page
- User can see the google map, the restaurant information, and the reviews about the restaurant
- User does not see the restaurant Edit / Delete buttons
- User does not see the review Edit buttons
- User does not see the employees table
- User has the option to signup or login on any page of the site
- When the user clicks 'Add Review' button, they are redirected to the splash page to Sign Up or Login, with a message that says 'You have to be logged in to add a review'
- User can see all neighborhoods of the restaurants
```
### Sign Up
```
- User should be able to sign up on any page of the site
- Sign Up consists of:
  * First Name - Must be less than 40 Char, not blank
  * Last Name - Must be less than 40 Char, not blank
  * Email Address - Must be an email address, < 40 char, not blank
  * Password - At least 8 char, One capital, One lower case, One number
  * Confirm Password - Must match password
- When a user submits sign up with passing credentials, they are redirected to the restaurants show page
- When a user submits sign up with non passing credentials, they are redirected to the same page, with pre-filled information and error messages
- When a user signs up, the hashed password is stored in the database
- User has the option to Logout

```

### Log In
```
- User should be able to login on any page of the site
- Log in consists of:
  * Email Address
  * Password
- When a user logs in, their password is hashed and matched with what's stored in the database
- If Login credentials pass, user is redirected to the restaurants show page
- If login credentials fail, page is re rendered with pre-filled information and error messages
```

### Both Sign Up and Login
```
- When a user signs up or logs in successfully, a cookie is created
- When a user logs out, the cookie is deleted
```

### A Logged In User
```
- User can see everything that a non logged in User can
- User can add a new review
- User can edit THEIR OWN review
- User can delete THEIR OWN review
```

### Restaurant Admin
```
- Admin can see everything a non logged in user can see
- Admin can edit and delete a restaurant
- Admin can see employees table
- Admin can add/edit/delete employees
- Admin can NOT edit/delete/add a review
- Admin can see all of their restaurants
```

### OAuth
```
- User has the option to sign up or log in with EITHER Google, Twitter, or Facebook
```

### Stretch
Let your creativity run wild and add what ever other features and functionality to this as you would like !

## Congratulations! You just built your first fully functioning and real world applicable full stack web application!!! 
