This project is a website named "BizSpot" which allows business owners display information about their business as cards on the website with the ability to also edit and delete existing cards and explore other different businesses based on their needs.

There are currently 3 existing users - each with different permissions:
Guest User -
email: guest@test.com
password: 1234

Business User -
email: business@test.com
password: 1234

Admin User -
email: Admin
password: 1234

Explanation about each user:
Guest - the most basic user which only has the option to view existing cards
Business - has the option to create/edit/delete their cards
Admin - same as Business but with access to Management page

The site contains several different functions, for example the Search tab uses Array.Prototype.Filter to filter the related data.

The API is split to 3 files, 1 for each of the categories - Card,Favorites,Users. The API call use many different Array objects which are used for different purposes depending on the needs of the currently used API.

There are also loaders which are used to provide data to different routes before they render, they receive the data from the API.

Other functions are

PLEASE NOTE THAT SOME OF THE USER INFORMATION DOESN'T CHANGE ON EDIT BECAUSE OF ISSUES WITH SIMON'S API.
