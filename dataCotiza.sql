PGDMP                      |            cotiza    16.3    16.3 @    =           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            >           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            @           1262    17515    cotiza    DATABASE     x   CREATE DATABASE cotiza WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Peru.1252';
    DROP DATABASE cotiza;
                postgres    false            X           1247    17530    ESTADO    TYPE     k   CREATE TYPE public."ESTADO" AS ENUM (
    'PENDIENTE',
    'ACEPTADA',
    'RECHAZADA',
    'CANCELADA'
);
    DROP TYPE public."ESTADO";
       public          postgres    false            �            1259    17518    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false            �            1259    17577 	   articulos    TABLE     �   CREATE TABLE public.articulos (
    id integer NOT NULL,
    nombre text NOT NULL,
    descripcion text NOT NULL,
    precio double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.articulos;
       public         heap    postgres    false            �            1259    17576    articulos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.articulos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.articulos_id_seq;
       public          postgres    false    224            A           0    0    articulos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.articulos_id_seq OWNED BY public.articulos.id;
          public          postgres    false    223            �            1259    17561    cotizaciones    TABLE     �  CREATE TABLE public.cotizaciones (
    id integer NOT NULL,
    numero_cotizacion text NOT NULL,
    fecha_cotizacion date NOT NULL,
    estado_cotizacion public."ESTADO" DEFAULT 'PENDIENTE'::public."ESTADO" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    proyecto_id integer NOT NULL
);
     DROP TABLE public.cotizaciones;
       public         heap    postgres    false    856    856            �            1259    17560    cotizaciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cotizaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.cotizaciones_id_seq;
       public          postgres    false    221            B           0    0    cotizaciones_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.cotizaciones_id_seq OWNED BY public.cotizaciones.id;
          public          postgres    false    220            �            1259    17571    detalle_cotizaciones    TABLE     �   CREATE TABLE public.detalle_cotizaciones (
    id integer NOT NULL,
    item integer NOT NULL,
    cotizacion_id integer NOT NULL,
    cantidad integer NOT NULL,
    precio_unitario double precision NOT NULL,
    articulo_id integer NOT NULL
);
 (   DROP TABLE public.detalle_cotizaciones;
       public         heap    postgres    false            �            1259    17597    detalle_ordenes    TABLE     �   CREATE TABLE public.detalle_ordenes (
    id integer NOT NULL,
    item integer NOT NULL,
    cantidad integer NOT NULL,
    precio_unitario double precision NOT NULL,
    oservicio_id integer NOT NULL,
    articulo_id integer NOT NULL
);
 #   DROP TABLE public.detalle_ordenes;
       public         heap    postgres    false            �            1259    17596    detalle_ordenes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_ordenes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.detalle_ordenes_id_seq;
       public          postgres    false    228            C           0    0    detalle_ordenes_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.detalle_ordenes_id_seq OWNED BY public.detalle_ordenes.id;
          public          postgres    false    227            �            1259    17540    empresas    TABLE     K  CREATE TABLE public.empresas (
    id integer NOT NULL,
    nombre text NOT NULL,
    ruc text NOT NULL,
    direccion text NOT NULL,
    telefono text NOT NULL,
    correo_electronico text NOT NULL,
    habilitado boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.empresas;
       public         heap    postgres    false            �            1259    17539    empresas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.empresas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.empresas_id_seq;
       public          postgres    false    217            D           0    0    empresas_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.empresas_id_seq OWNED BY public.empresas.id;
          public          postgres    false    216            �            1259    17587 
   oservicios    TABLE     W  CREATE TABLE public.oservicios (
    id integer NOT NULL,
    numero_orden text NOT NULL,
    fecha_orden date NOT NULL,
    estaddo_orden public."ESTADO" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    cotizacion_id integer NOT NULL
);
    DROP TABLE public.oservicios;
       public         heap    postgres    false    856            �            1259    17586    oservicios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.oservicios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.oservicios_id_seq;
       public          postgres    false    226            E           0    0    oservicios_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.oservicios_id_seq OWNED BY public.oservicios.id;
          public          postgres    false    225            �            1259    17551 	   proyectos    TABLE       CREATE TABLE public.proyectos (
    id integer NOT NULL,
    nombre text NOT NULL,
    descripcion text NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    empresa_id integer NOT NULL
);
    DROP TABLE public.proyectos;
       public         heap    postgres    false            �            1259    17550    proyectos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.proyectos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.proyectos_id_seq;
       public          postgres    false    219            F           0    0    proyectos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.proyectos_id_seq OWNED BY public.proyectos.id;
          public          postgres    false    218            ~           2604    17580    articulos id    DEFAULT     l   ALTER TABLE ONLY public.articulos ALTER COLUMN id SET DEFAULT nextval('public.articulos_id_seq'::regclass);
 ;   ALTER TABLE public.articulos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            {           2604    17564    cotizaciones id    DEFAULT     r   ALTER TABLE ONLY public.cotizaciones ALTER COLUMN id SET DEFAULT nextval('public.cotizaciones_id_seq'::regclass);
 >   ALTER TABLE public.cotizaciones ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    17600    detalle_ordenes id    DEFAULT     x   ALTER TABLE ONLY public.detalle_ordenes ALTER COLUMN id SET DEFAULT nextval('public.detalle_ordenes_id_seq'::regclass);
 A   ALTER TABLE public.detalle_ordenes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    228    228            v           2604    17543    empresas id    DEFAULT     j   ALTER TABLE ONLY public.empresas ALTER COLUMN id SET DEFAULT nextval('public.empresas_id_seq'::regclass);
 :   ALTER TABLE public.empresas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            �           2604    17590    oservicios id    DEFAULT     n   ALTER TABLE ONLY public.oservicios ALTER COLUMN id SET DEFAULT nextval('public.oservicios_id_seq'::regclass);
 <   ALTER TABLE public.oservicios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            y           2604    17554    proyectos id    DEFAULT     l   ALTER TABLE ONLY public.proyectos ALTER COLUMN id SET DEFAULT nextval('public.proyectos_id_seq'::regclass);
 ;   ALTER TABLE public.proyectos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            -          0    17518    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   �Q       6          0    17577 	   articulos 
   TABLE DATA           Q   COPY public.articulos (id, nombre, descripcion, precio, "createdAt") FROM stdin;
    public          postgres    false    224   HR       3          0    17561    cotizaciones 
   TABLE DATA           �   COPY public.cotizaciones (id, numero_cotizacion, fecha_cotizacion, estado_cotizacion, "createdAt", "updatedAt", proyecto_id) FROM stdin;
    public          postgres    false    221   iS       4          0    17571    detalle_cotizaciones 
   TABLE DATA           o   COPY public.detalle_cotizaciones (id, item, cotizacion_id, cantidad, precio_unitario, articulo_id) FROM stdin;
    public          postgres    false    222   �S       :          0    17597    detalle_ordenes 
   TABLE DATA           i   COPY public.detalle_ordenes (id, item, cantidad, precio_unitario, oservicio_id, articulo_id) FROM stdin;
    public          postgres    false    228   �S       /          0    17540    empresas 
   TABLE DATA           u   COPY public.empresas (id, nombre, ruc, direccion, telefono, correo_electronico, habilitado, "createdAt") FROM stdin;
    public          postgres    false    217   �S       8          0    17587 
   oservicios 
   TABLE DATA           {   COPY public.oservicios (id, numero_orden, fecha_orden, estaddo_orden, "createdAt", "updatedAt", cotizacion_id) FROM stdin;
    public          postgres    false    226   �T       1          0    17551 	   proyectos 
   TABLE DATA           n   COPY public.proyectos (id, nombre, descripcion, fecha_inicio, fecha_fin, "createdAt", empresa_id) FROM stdin;
    public          postgres    false    219   �T       G           0    0    articulos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.articulos_id_seq', 4, true);
          public          postgres    false    223            H           0    0    cotizaciones_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.cotizaciones_id_seq', 1, false);
          public          postgres    false    220            I           0    0    detalle_ordenes_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.detalle_ordenes_id_seq', 1, false);
          public          postgres    false    227            J           0    0    empresas_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.empresas_id_seq', 2, true);
          public          postgres    false    216            K           0    0    oservicios_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.oservicios_id_seq', 1, false);
          public          postgres    false    225            L           0    0    proyectos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.proyectos_id_seq', 1, true);
          public          postgres    false    218            �           2606    17526 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            �           2606    17585    articulos articulos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.articulos
    ADD CONSTRAINT articulos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.articulos DROP CONSTRAINT articulos_pkey;
       public            postgres    false    224            �           2606    17570    cotizaciones cotizaciones_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.cotizaciones
    ADD CONSTRAINT cotizaciones_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.cotizaciones DROP CONSTRAINT cotizaciones_pkey;
       public            postgres    false    221            �           2606    17575 .   detalle_cotizaciones detalle_cotizaciones_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.detalle_cotizaciones
    ADD CONSTRAINT detalle_cotizaciones_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.detalle_cotizaciones DROP CONSTRAINT detalle_cotizaciones_pkey;
       public            postgres    false    222            �           2606    17602 $   detalle_ordenes detalle_ordenes_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.detalle_ordenes
    ADD CONSTRAINT detalle_ordenes_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.detalle_ordenes DROP CONSTRAINT detalle_ordenes_pkey;
       public            postgres    false    228            �           2606    17549    empresas empresas_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.empresas
    ADD CONSTRAINT empresas_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.empresas DROP CONSTRAINT empresas_pkey;
       public            postgres    false    217            �           2606    17595    oservicios oservicios_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.oservicios
    ADD CONSTRAINT oservicios_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.oservicios DROP CONSTRAINT oservicios_pkey;
       public            postgres    false    226            �           2606    17559    proyectos proyectos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT proyectos_pkey;
       public            postgres    false    219            �           1259    17604 "   cotizaciones_numero_cotizacion_key    INDEX     o   CREATE UNIQUE INDEX cotizaciones_numero_cotizacion_key ON public.cotizaciones USING btree (numero_cotizacion);
 6   DROP INDEX public.cotizaciones_numero_cotizacion_key;
       public            postgres    false    221            �           1259    17603    empresas_correo_electronico_key    INDEX     i   CREATE UNIQUE INDEX empresas_correo_electronico_key ON public.empresas USING btree (correo_electronico);
 3   DROP INDEX public.empresas_correo_electronico_key;
       public            postgres    false    217            �           1259    17606    oservicios_cotizacion_id_key    INDEX     c   CREATE UNIQUE INDEX oservicios_cotizacion_id_key ON public.oservicios USING btree (cotizacion_id);
 0   DROP INDEX public.oservicios_cotizacion_id_key;
       public            postgres    false    226            �           1259    17605    oservicios_numero_orden_key    INDEX     a   CREATE UNIQUE INDEX oservicios_numero_orden_key ON public.oservicios USING btree (numero_orden);
 /   DROP INDEX public.oservicios_numero_orden_key;
       public            postgres    false    226            �           2606    17612 *   cotizaciones cotizaciones_proyecto_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cotizaciones
    ADD CONSTRAINT cotizaciones_proyecto_id_fkey FOREIGN KEY (proyecto_id) REFERENCES public.proyectos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public.cotizaciones DROP CONSTRAINT cotizaciones_proyecto_id_fkey;
       public          postgres    false    219    4745    221            �           2606    17622 :   detalle_cotizaciones detalle_cotizaciones_articulo_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_cotizaciones
    ADD CONSTRAINT detalle_cotizaciones_articulo_id_fkey FOREIGN KEY (articulo_id) REFERENCES public.articulos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 d   ALTER TABLE ONLY public.detalle_cotizaciones DROP CONSTRAINT detalle_cotizaciones_articulo_id_fkey;
       public          postgres    false    4752    224    222            �           2606    17617 <   detalle_cotizaciones detalle_cotizaciones_cotizacion_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_cotizaciones
    ADD CONSTRAINT detalle_cotizaciones_cotizacion_id_fkey FOREIGN KEY (cotizacion_id) REFERENCES public.cotizaciones(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 f   ALTER TABLE ONLY public.detalle_cotizaciones DROP CONSTRAINT detalle_cotizaciones_cotizacion_id_fkey;
       public          postgres    false    4748    222    221            �           2606    17632 0   detalle_ordenes detalle_ordenes_articulo_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_ordenes
    ADD CONSTRAINT detalle_ordenes_articulo_id_fkey FOREIGN KEY (articulo_id) REFERENCES public.articulos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Z   ALTER TABLE ONLY public.detalle_ordenes DROP CONSTRAINT detalle_ordenes_articulo_id_fkey;
       public          postgres    false    224    228    4752            �           2606    17637 1   detalle_ordenes detalle_ordenes_oservicio_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_ordenes
    ADD CONSTRAINT detalle_ordenes_oservicio_id_fkey FOREIGN KEY (oservicio_id) REFERENCES public.oservicios(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 [   ALTER TABLE ONLY public.detalle_ordenes DROP CONSTRAINT detalle_ordenes_oservicio_id_fkey;
       public          postgres    false    4756    226    228            �           2606    17627 (   oservicios oservicios_cotizacion_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.oservicios
    ADD CONSTRAINT oservicios_cotizacion_id_fkey FOREIGN KEY (cotizacion_id) REFERENCES public.cotizaciones(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 R   ALTER TABLE ONLY public.oservicios DROP CONSTRAINT oservicios_cotizacion_id_fkey;
       public          postgres    false    221    4748    226            �           2606    17607 #   proyectos proyectos_empresa_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 M   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT proyectos_empresa_id_fkey;
       public          postgres    false    219    217    4743            -   �   x�m�K
�0 ��)�@��$yy=�'(��DA���j���f$����K݇.����56%)��;U.E��V�`��Ӡ"2i�+Z��EK5L��8�����/��2#e�O�	�V�����o�������q�o���- 
�l�[g���;6      6     x�e��N!����:�wg�4�Y4���\�D�����/55i�-���;G�÷K�t���`>ۘy�:�9���:��4�)&��ap����b5�\��w�h����zѱZH*ɀs
3և%��<�{4�k&��v��m!��ag���]�D���Im/;�eKKr���o��4wEc��|:��5�z�g��g�	�M��e֥��q�/ϗ���)+�ڕ��}%XS�T�7�od�6��ǽ ��-�>#�b�n���� �5~       3      x������ � �      4      x������ � �      :      x������ � �      /   �   x�}��n� Eg��7u3�xj�HI�JU\u�B�'�
�$���u���b�|�R#e�p
sB�Q0%;iԡ�ΰ���a��P׸�ՆI�������u^BLb�����t#}�P�׺7FH�y���ḕJ���/��c�Dspq�g�무N?
�H�0�2!8����J��D9Lļq^[g,��#庥�
���d�vB��[p�� ��J�      8      x������ � �      1   d   x�EȻ�  ���x$����lP(h�,�^�,��=TS8�$iK�C���qE),j�|ǭ�R���^�E�cG��G$�ÿ��a�l]��+�K��~ 2�     