--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-04-05 15:45:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3380 (class 1262 OID 32894)
-- Name: ecommerce_API; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "ecommerce_API" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'French_France.1252';


\connect "ecommerce_API"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3370 (class 0 OID 32935)
-- Dependencies: 218
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3368 (class 0 OID 32928)
-- Dependencies: 216
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3364 (class 0 OID 32905)
-- Dependencies: 212
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories VALUES (1, 'Jouets', 'Des jolis joujous');
INSERT INTO public.categories VALUES (2, 'Vêtements', 'De beaux vêtements');
INSERT INTO public.categories VALUES (3, 'Mobilier', 'Des chaises, des tables et plein de trucs comme ça !');


--
-- TOC entry 3374 (class 0 OID 32975)
-- Dependencies: 222
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3372 (class 0 OID 32942)
-- Dependencies: 220
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3362 (class 0 OID 32896)
-- Dependencies: 210
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.products VALUES (1, 'Chaise ', 'Chaise en bois pour s''asseoir', 15.99, 3);
INSERT INTO public.products VALUES (2, 'Peluche', 'Une peluche rose', 6.99, 1);
INSERT INTO public.products VALUES (3, 'Pantalon', 'Un pantalon bleu et vert', 10.49, 2);
INSERT INTO public.products VALUES (4, 'T-shirt', 'Un t-shirt vert', 3.99, 2);
INSERT INTO public.products VALUES (5, 'Veste', 'Veste en cuir', 41.99, 2);
INSERT INTO public.products VALUES (6, 'Fourchette', 'Aie ca pique...', 3.99, 3);
INSERT INTO public.products VALUES (7, 'Couteau', 'Ouh ca coupe...', 3.99, 3);
INSERT INTO public.products VALUES (8, 'Voiture', 'Pas cher ! Ah c''est un jouet...', 13.49, 1);


--
-- TOC entry 3366 (class 0 OID 32914)
-- Dependencies: 214
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 217
-- Name: cartItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_id_seq"', 64, true);


--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 215
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.carts_id_seq', 30, true);


--
-- TOC entry 3390 (class 0 OID 0)
-- Dependencies: 211
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 3, true);


--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 221
-- Name: orderItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orderItems_id_seq"', 55, true);


--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 219
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 41, true);


--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 209
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 8, true);


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 213
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


-- Completed on 2022-04-05 15:45:36

--
-- PostgreSQL database dump complete
--

