


CREATE TABLE IF NOT EXISTS cart_items (
    id integer NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL
);


CREATE TABLE IF NOT EXISTS carts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    created date NOT NULL,
    modified date NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS order_items (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2)
);



CREATE TABLE IF NOT EXISTS orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    status character varying(255) NOT NULL,
    total numeric(10,2),
    created date NOT NULL
);



CREATE TABLE IF NOT EXISTS products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    category_id integer NOT NULL
);





CREATE TABLE IF NOT EXISTS users (
    id integer NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created date NOT NULL
);















