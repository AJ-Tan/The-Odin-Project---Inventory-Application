--
-- PostgreSQL database dump
--

\restrict ky6UoXjAcYWR8Vxi1Fel5ord9yshNAllvC4GJUKMiupgN5rerq2irnQ9PMUdpWp

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-04-02 20:37:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 24576)
-- Name: inventory_application; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA inventory_application;


ALTER SCHEMA inventory_application OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 24582)
-- Name: categories; Type: TABLE; Schema: inventory_application; Owner: postgres
--

CREATE TABLE inventory_application.categories (
    id integer NOT NULL,
    parent_id integer,
    name text DEFAULT 'undefined'::text,
    level integer DEFAULT 0,
    status text DEFAULT 'active'::text
);


ALTER TABLE inventory_application.categories OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24581)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: inventory_application; Owner: postgres
--

ALTER TABLE inventory_application.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME inventory_application.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 229 (class 1259 OID 24704)
-- Name: inventory; Type: TABLE; Schema: inventory_application; Owner: postgres
--

CREATE TABLE inventory_application.inventory (
    product_id integer NOT NULL,
    warehouse_id integer NOT NULL,
    quantity integer DEFAULT 0
);


ALTER TABLE inventory_application.inventory OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 33497)
-- Name: products; Type: TABLE; Schema: inventory_application; Owner: postgres
--

CREATE TABLE inventory_application.products (
    id integer NOT NULL,
    name text,
    price numeric,
    status text DEFAULT 'active'::text,
    category_id integer
);


ALTER TABLE inventory_application.products OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 33496)
-- Name: products_id_seq; Type: SEQUENCE; Schema: inventory_application; Owner: postgres
--

ALTER TABLE inventory_application.products ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME inventory_application.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 228 (class 1259 OID 24617)
-- Name: warehouse; Type: TABLE; Schema: inventory_application; Owner: postgres
--

CREATE TABLE inventory_application.warehouse (
    id integer NOT NULL,
    name text,
    location text,
    email text,
    phone text,
    status text DEFAULT 'active'::text
);


ALTER TABLE inventory_application.warehouse OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24616)
-- Name: warehouse_id_seq; Type: SEQUENCE; Schema: inventory_application; Owner: postgres
--

ALTER TABLE inventory_application.warehouse ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME inventory_application.warehouse_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 5046 (class 0 OID 24582)
-- Dependencies: 226
-- Data for Name: categories; Type: TABLE DATA; Schema: inventory_application; Owner: postgres
--

COPY inventory_application.categories (id, parent_id, name, level, status) FROM stdin;
1	\N	Electronics	0	active
2	\N	Clothing	0	active
3	\N	Furniture	0	active
4	1	Mobile Phones	1	active
5	4	Smartphones	2	active
\.


--
-- TOC entry 5049 (class 0 OID 24704)
-- Dependencies: 229
-- Data for Name: inventory; Type: TABLE DATA; Schema: inventory_application; Owner: postgres
--

COPY inventory_application.inventory (product_id, warehouse_id, quantity) FROM stdin;
1	1	10
1	2	5
2	1	8
2	2	6
3	1	15
3	2	10
4	1	50
4	2	30
5	1	20
5	2	12
\.


--
-- TOC entry 5051 (class 0 OID 33497)
-- Dependencies: 231
-- Data for Name: products; Type: TABLE DATA; Schema: inventory_application; Owner: postgres
--

COPY inventory_application.products (id, name, price, status, category_id) FROM stdin;
1	iPhone 13	45000	active	5
2	Samsung Galaxy S22	42000	active	5
3	Wooden Table	3500	active	3
4	T-Shirt Basic	300	active	2
5	Office Chair	2500	active	3
6	Sample phone	123	active	4
\.


--
-- TOC entry 5048 (class 0 OID 24617)
-- Dependencies: 228
-- Data for Name: warehouse; Type: TABLE DATA; Schema: inventory_application; Owner: postgres
--

COPY inventory_application.warehouse (id, name, location, email, phone, status) FROM stdin;
1	Main Warehouse	Manila City	mainwarehouse@email.com	09171234567	active
2	Secondary Warehouse	Pagadian City	secondarywarehouse@email.com	09987654321	active
\.


--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 225
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: inventory_application; Owner: postgres
--

SELECT pg_catalog.setval('inventory_application.categories_id_seq', 5, true);


--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 230
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: inventory_application; Owner: postgres
--

SELECT pg_catalog.setval('inventory_application.products_id_seq', 6, true);


--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 227
-- Name: warehouse_id_seq; Type: SEQUENCE SET; Schema: inventory_application; Owner: postgres
--

SELECT pg_catalog.setval('inventory_application.warehouse_id_seq', 2, true);


--
-- TOC entry 4887 (class 2606 OID 24592)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: inventory_application; Owner: postgres
--

ALTER TABLE ONLY inventory_application.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4892 (class 2606 OID 24711)
-- Name: inventory pk_inventory; Type: CONSTRAINT; Schema: inventory_application; Owner: postgres
--

ALTER TABLE ONLY inventory_application.inventory
    ADD CONSTRAINT pk_inventory PRIMARY KEY (product_id, warehouse_id);


--
-- TOC entry 4894 (class 2606 OID 33504)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: inventory_application; Owner: postgres
--

ALTER TABLE ONLY inventory_application.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4890 (class 2606 OID 24624)
-- Name: warehouse warehouse_pkey; Type: CONSTRAINT; Schema: inventory_application; Owner: postgres
--

ALTER TABLE ONLY inventory_application.warehouse
    ADD CONSTRAINT warehouse_pkey PRIMARY KEY (id);


--
-- TOC entry 4888 (class 1259 OID 24598)
-- Name: fki_fk_category_parent; Type: INDEX; Schema: inventory_application; Owner: postgres
--

CREATE INDEX fki_fk_category_parent ON inventory_application.categories USING btree (parent_id);


--
-- TOC entry 4897 (class 2606 OID 33505)
-- Name: products fk_category; Type: FK CONSTRAINT; Schema: inventory_application; Owner: postgres
--

ALTER TABLE ONLY inventory_application.products
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES inventory_application.categories(id) ON DELETE SET NULL;


--
-- TOC entry 4895 (class 2606 OID 24593)
-- Name: categories fk_category_parent; Type: FK CONSTRAINT; Schema: inventory_application; Owner: postgres
--

ALTER TABLE ONLY inventory_application.categories
    ADD CONSTRAINT fk_category_parent FOREIGN KEY (parent_id) REFERENCES inventory_application.categories(id) ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4896 (class 2606 OID 24717)
-- Name: inventory fk_warehouse; Type: FK CONSTRAINT; Schema: inventory_application; Owner: postgres
--

ALTER TABLE ONLY inventory_application.inventory
    ADD CONSTRAINT fk_warehouse FOREIGN KEY (warehouse_id) REFERENCES inventory_application.warehouse(id) ON DELETE CASCADE;


-- Completed on 2026-04-02 20:37:32

--
-- PostgreSQL database dump complete
--

\unrestrict ky6UoXjAcYWR8Vxi1Fel5ord9yshNAllvC4GJUKMiupgN5rerq2irnQ9PMUdpWp

