# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products
- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
- id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Implementation notes

### Routes

#### Products
- Index ([get] /products)
- Show (args: product id) ([get] /products/:id)
- Create (args: product) [token required] ([post] /products)

#### Users
- Index [token required] ([get] /users)
- Show (args: user id) [token required] ([get] /users/:id)
- Create (args: user) ([post] /users)

#### Orders
- Current Orders by user (args: user id) [token required] ([get] /orders/:id)

### Database schema
- users (id SERIAL PRIMARY KEY, user_name VARCHAR(200), first_name VARCHAR(200), last_name VARCHAR(200), password VARCHAR(400))
- products (id SERIAL PRIMARY KEY, name VARCHAR(200), price INTEGER, category VARCHAR(400))
- orders (id SERIAL PRIMARY KEY, user_id BIGINT REFERENCES users(id), status VARCHAR(10))
- order_products (id SERIAL PRIMARY KEY, order_id BIGINT REFERENCES orders(id), product_id BIGINT REFERENCES products(id), quantity INTEGER);
