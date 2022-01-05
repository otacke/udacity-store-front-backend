## Usage

In order to run this, you will need a local POSTGRESQL database. There are
multiple ways to install one - I used it on Ubuntu Linux (but it should be
very similar on other platforms):

### Get this repository
Just get it :-)

### Setting up the environment
Inside the repository's main directory, create a plain text file named '.env'
that will hold the configuration. The file should look like this:

```
PORT=3000
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_TEST_DB=store_test
POSTGRES_USER=test_user
POSTGRES_PASSWORD=test_user
SALT_ROUNDS=10
BCRYPT_PASSWORD=pepperkake
TOKEN_SECRET=salzteig
#ENV=test
```

If the `ENV` variable is set to test, the `store_test` database will be used
instead of the `store` database later on.

### Setting up postgresql
I couldn't figure out why Docker didn't work, sorry. Running a local database.

1. Run `sudo apt-get install postgresql` to install postgresql if you don't have
it running already.
2. Run `sudo -u postgres createuser -P -d test_user` and enter `test_user`
twice. This will add the user `test_user` to postgresql and give that user the
password `test_user`.
3. Run `sudo -u postgres createdb -O test_user store` to set up a database
`store` that the user `test_user` can use.
4. Optionally run `sudo -u postgres createdb -O test_user store_test` to set up
a database `store_test` that the user `test_user` can use and that will be used
for testing.

### Install the modules
Run `npm run install` to install all required modules.

### Run the automated tests
Run `npm run test` to build the serer and run Jasmine tests as often as you
would like. The test will switch to the `store_test` database automatically,
run db-migrate, run the tests and revert everything again and switch back to the
`store` database for normal use.

### Run the server

#### Building
1. Run `npm run db-up` to set up the regular database tables.
2. Run `npm run build` to build the server.
3. Run `npm run start` to run the server.

#### Using
The database will run on port 5432. You can access the server on localhost on
port 3000 (unless you change it in in `.env`), so http://localhost:3000.
It will give you nothing but a greeting message.

From there you can start your journey ...

##### Users routes
- Create: [post] http://localhost:3000/api/users to create a user.
Parameters are: `user_name`, `first_name`, `last_name` and `password`.
You will receive a JWT that is required for accessing most other routes.
- Index: [get] http://localhost:3000/api/users while providing authorization
will list all users.
- Show: [get] http://localhost:3000/api/users/:id while providing authorization
will list the information for the user with the `id`.
- Edit: [put] http://localhost:3000/api/users/:id while providing authorization
will edit the user with the `id` and set `user_name`, `first_name`, `last_name`
and `password` as provided as parameters.
- Delete: [delete] http://localhost:3000/api/users/:id while providing
authorization will delete the user with the `id`.

##### Products routes
- Index: [get] http://localhost:3000/api/products to get a list of all
products.
- Show: [get] http://localhost:3000/api/products/:id to get the product with
`id`.
- Create: [post] http://localhost:3000/api/products while providing
authorization to create a product. Parameters are: `name`, `price` and
`category`.
- Edit: [put] http://localhost:3000/api/products/:id while providing
authorization to edit a product with `id`. Parameters are: `name`, `price` and
`category`.
- Delete: [delete] http://localhost:3000/api/products/:id while providing
authorization to delete a product with `id`.

##### Order routes
- Index: [get] http://localhost:3000/api/orders while providing authorization
to get a list of all orders.
- Show: [get] http://localhost:3000/api/orders/:user_id while providing
authorization to get a list of all orders from user `user_id`.
- Create: [post] http://localhost:3000/api/orders while providing
authorization to create an order. Parameters are: `user_id` and `status`.
- Edit: [put] http://localhost:3000/api/orders/:id while providing
authorization to edit an order with `id`. Parameters are: `user_id` and
`status`.
- Delete: [delete] http://localhost:3000/api/orders/:id while providing
authorization to delete an order with `id`.

##### Order product routes
- Index: [get] http://localhost:3000/api/orderproducts while providing authorization
to get a list of all order/product combinations.
- Show: [get] http://localhost:3000/api/orderproducts/:id while providing
authorization to get order/product combination with `id`.
- Create: [post] http://localhost:3000/api/orderproducts while providing
authorization to add a product with parameter `product_id` to order with
`order_id` in quantity of parameter `quantity`.
- Edit: [put] http://localhost:3000/api/orderproducts/:id while providing
authorization to edit a product/order combination with `id`. Parameters are
`product_id`, `order_id` and `quantity`.
- Delete: [delete] http://localhost:3000/api/orderproducts/:id while providing
authorization to delete an order/product combination with `id`.

#### Deconstruction
1. Run `npm run db-down` to drop the regular database tables.
2. Run `sudo -u postgres dropdb store` to delete the store database.
3. Run `sudo -u postgres dropdb store_test` to delete the store database.
4. Run `sudo -u postgres dropuser test_user` to detele the test user.
5. Run `sudo apt-get remove postgresql` to remove postgresql if you don't need it.
