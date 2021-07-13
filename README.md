<p align="center">
  App to help NGOs built with ReactJS, React Native, Laravel and more. 
</p>

## Tech

- Laravel
- React
- React Native
- Expo
- MySQL
- Jest

## Development setup

### Local Environment
- Install PHP-8.0.8.
- Install Xampp and Nodejs.
- Run Apache & MySQL service using Xampp Control Panel.
- In MySQL admin, create a DB name `test`. 
- The DB name can be edited in the file `.env`: 

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=test
DB_USERNAME=root
DB_PASSWORD=

### Api
- Run `composer install` in the `api` folder.
- Run `php artisan migrate` to migrate data.
- Run `php artisan passport:install` to install passport auth_client.
- Run `php artisan db::seed` to seed database datas.
- Run `php artisan serve` to start server.
- Currently we have 3 Apis: 
  + /register (POST): create multiple of user records and save into DB.
  + /user (PUT): update the user record.
  + /users (GET): get multiple record (if have) of users data from the DB using search string.    

### Front-End
- Install yarn using npm : `npm install yarn`.
- Run `yarn` in the `frontend` folder;
- Run `yarn start` to up the project;

### Test
- Use the following user information:
  + Username : abc.
  + Password : abcdx.
- The user information can be edited.
  
## Contribution

See the [contribution guide](CONTRIBUTING.md) for more details on how to contribute to this project.

# License
[MIT License](/LICENSE)
