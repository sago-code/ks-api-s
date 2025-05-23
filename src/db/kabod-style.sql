PGDMP  	                    }            kabod-style    17.4    17.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16405    kabod-style    DATABASE     s   CREATE DATABASE "kabod-style" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-CO';
    DROP DATABASE "kabod-style";
                     postgres    false            �            1255    16447 �   create_user(character varying, character varying, integer, character varying, character varying, bigint, character varying, integer) 	   PROCEDURE     �  CREATE PROCEDURE public.create_user(IN p_first_name character varying, IN p_last_name character varying, IN p_age integer, IN p_email character varying, IN p_password character varying, IN p_phone bigint, IN p_photo character varying, IN p_rol_id integer)
    LANGUAGE plpgsql
    AS $$ 
BEGIN 
    -- Verificar si el email ya existe 
    IF EXISTS (SELECT 1 FROM "user" WHERE email = p_email) THEN 
        RAISE EXCEPTION 'Ya existe un usuario con este email'; 
    END IF; 
    
    -- Verificar si el teléfono ya existe 
    IF EXISTS (SELECT 1 FROM "user" WHERE phone = p_phone) THEN 
        RAISE EXCEPTION 'Ya existe un usuario con este número de teléfono'; 
    END IF; 
    
    -- Insertar el nuevo usuario 
    INSERT INTO "user" ( 
        "firstName", 
        "lastName", 
        age, 
        email, 
        password, 
        phone, 
        photo,
        "rolId",
        "createdAt", 
        "updatedAt" 
    ) VALUES ( 
        p_first_name, 
        p_last_name, 
        p_age, 
        p_email, 
        p_password, 
        p_phone, 
        p_photo,
        p_rol_id,
        CURRENT_TIMESTAMP, 
        CURRENT_TIMESTAMP 
    ); 
END; 
$$;
 �   DROP PROCEDURE public.create_user(IN p_first_name character varying, IN p_last_name character varying, IN p_age integer, IN p_email character varying, IN p_password character varying, IN p_phone bigint, IN p_photo character varying, IN p_rol_id integer);
       public               postgres    false            �            1259    16475    rol    TABLE     �   CREATE TABLE public.rol (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.rol;
       public         heap r       postgres    false            �            1259    16474 
   rol_id_seq    SEQUENCE     �   CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.rol_id_seq;
       public               postgres    false    220            �           0    0 
   rol_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id;
          public               postgres    false    219            �            1259    16460    user    TABLE     �  CREATE TABLE public."user" (
    id integer NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    age integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    phone bigint NOT NULL,
    photo character varying,
    "rolId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public."user";
       public         heap r       postgres    false            �            1259    16491    user_access_token    TABLE     +  CREATE TABLE public.user_access_token (
    id integer NOT NULL,
    token character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "tokenActive" boolean NOT NULL
);
 %   DROP TABLE public.user_access_token;
       public         heap r       postgres    false            �            1259    16490    user_access_token_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_access_token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.user_access_token_id_seq;
       public               postgres    false    222            �           0    0    user_access_token_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.user_access_token_id_seq OWNED BY public.user_access_token.id;
          public               postgres    false    221            �            1259    16459    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public               postgres    false    218            �           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public               postgres    false    217            /           2604    16478    rol id    DEFAULT     `   ALTER TABLE ONLY public.rol ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);
 5   ALTER TABLE public.rol ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219    220            ,           2604    16463    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            2           2604    16494    user_access_token id    DEFAULT     |   ALTER TABLE ONLY public.user_access_token ALTER COLUMN id SET DEFAULT nextval('public.user_access_token_id_seq'::regclass);
 C   ALTER TABLE public.user_access_token ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221    222            �          0    16475    rol 
   TABLE DATA           A   COPY public.rol (id, name, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    220   �)       �          0    16460    user 
   TABLE DATA           �   COPY public."user" (id, "firstName", "lastName", age, email, password, phone, photo, "rolId", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    218   "*       �          0    16491    user_access_token 
   TABLE DATA           i   COPY public.user_access_token (id, token, "createdAt", "updatedAt", "userId", "tokenActive") FROM stdin;
    public               postgres    false    222   ?*       �           0    0 
   rol_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.rol_id_seq', 2, true);
          public               postgres    false    219            �           0    0    user_access_token_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.user_access_token_id_seq', 1, false);
          public               postgres    false    221            �           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 1, false);
          public               postgres    false    217            <           2606    16484 "   rol PK_c93a22388638fac311781c7f2dd 
   CONSTRAINT     b   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.rol DROP CONSTRAINT "PK_c93a22388638fac311781c7f2dd";
       public                 postgres    false    220            6           2606    16469 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public                 postgres    false    218            >           2606    16500 0   user_access_token PK_e22a5afad287e66ff09914a2a9d 
   CONSTRAINT     p   ALTER TABLE ONLY public.user_access_token
    ADD CONSTRAINT "PK_e22a5afad287e66ff09914a2a9d" PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.user_access_token DROP CONSTRAINT "PK_e22a5afad287e66ff09914a2a9d";
       public                 postgres    false    222            8           2606    16473 #   user UQ_8e1f623798118e629b46a9e6299 
   CONSTRAINT     c   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE (phone);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_8e1f623798118e629b46a9e6299";
       public                 postgres    false    218            :           2606    16471 #   user UQ_e12875dfb3b1d92d7d7c5377e22 
   CONSTRAINT     c   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22";
       public                 postgres    false    218            @           2606    16501 0   user_access_token FK_c9c6ac4970ddbe5a8c4887e1e7e    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_access_token
    ADD CONSTRAINT "FK_c9c6ac4970ddbe5a8c4887e1e7e" FOREIGN KEY ("userId") REFERENCES public."user"(id);
 \   ALTER TABLE ONLY public.user_access_token DROP CONSTRAINT "FK_c9c6ac4970ddbe5a8c4887e1e7e";
       public               postgres    false    222    4662    218            ?           2606    16485 #   user FK_f66058a8f024b32ce70e0d6a929    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_f66058a8f024b32ce70e0d6a929" FOREIGN KEY ("rolId") REFERENCES public.rol(id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_f66058a8f024b32ce70e0d6a929";
       public               postgres    false    218    4668    220            �   =   x�3�LL����4202�50�54S0��25�26�3�4�00�#�eę����W�J��=... 2��      �      x������ � �      �      x������ � �     