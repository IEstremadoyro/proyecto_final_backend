PGDMP  8    
                |            cotiza    16.3    16.3 O    O           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            P           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            Q           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            R           1262    18448    cotiza    DATABASE     x   CREATE DATABASE cotiza WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Peru.1252';
    DROP DATABASE cotiza;
                postgres    false            [           1247    18576    ESTADO    TYPE     k   CREATE TYPE public."ESTADO" AS ENUM (
    'PENDIENTE',
    'ACEPTADA',
    'RECHAZADA',
    'CANCELADA'
);
    DROP TYPE public."ESTADO";
       public          postgres    false            �            1259    18566    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
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
       public         heap    postgres    false            �            1259    18623 	   articulos    TABLE     �   CREATE TABLE public.articulos (
    id integer NOT NULL,
    nombre text NOT NULL,
    descripcion text NOT NULL,
    precio double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.articulos;
       public         heap    postgres    false            �            1259    18622    articulos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.articulos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.articulos_id_seq;
       public          postgres    false    224            S           0    0    articulos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.articulos_id_seq OWNED BY public.articulos.id;
          public          postgres    false    223            �            1259    18607    cotizaciones    TABLE     �  CREATE TABLE public.cotizaciones (
    id integer NOT NULL,
    numero_cotizacion text NOT NULL,
    fecha_cotizacion date NOT NULL,
    estado_cotizacion public."ESTADO" DEFAULT 'PENDIENTE'::public."ESTADO" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    proyecto_id integer NOT NULL,
    usuario_id integer NOT NULL
);
     DROP TABLE public.cotizaciones;
       public         heap    postgres    false    859    859            �            1259    18606    cotizaciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cotizaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.cotizaciones_id_seq;
       public          postgres    false    221            T           0    0    cotizaciones_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.cotizaciones_id_seq OWNED BY public.cotizaciones.id;
          public          postgres    false    220            �            1259    18617    detalle_cotizaciones    TABLE     �   CREATE TABLE public.detalle_cotizaciones (
    id integer NOT NULL,
    item integer NOT NULL,
    cotizacion_id integer NOT NULL,
    cantidad integer NOT NULL,
    precio_unitario double precision NOT NULL,
    articulo_id integer NOT NULL
);
 (   DROP TABLE public.detalle_cotizaciones;
       public         heap    postgres    false            �            1259    18688    detalle_cotizaciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_cotizaciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.detalle_cotizaciones_id_seq;
       public          postgres    false    222            U           0    0    detalle_cotizaciones_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.detalle_cotizaciones_id_seq OWNED BY public.detalle_cotizaciones.id;
          public          postgres    false    229            �            1259    18643    detalle_ordenes    TABLE     �   CREATE TABLE public.detalle_ordenes (
    id integer NOT NULL,
    item integer NOT NULL,
    cantidad integer NOT NULL,
    precio_unitario double precision NOT NULL,
    oservicio_id integer NOT NULL,
    articulo_id integer NOT NULL
);
 #   DROP TABLE public.detalle_ordenes;
       public         heap    postgres    false            �            1259    18642    detalle_ordenes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_ordenes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.detalle_ordenes_id_seq;
       public          postgres    false    228            V           0    0    detalle_ordenes_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.detalle_ordenes_id_seq OWNED BY public.detalle_ordenes.id;
          public          postgres    false    227            �            1259    18586    empresas    TABLE     K  CREATE TABLE public.empresas (
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
       public         heap    postgres    false            �            1259    18585    empresas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.empresas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.empresas_id_seq;
       public          postgres    false    217            W           0    0    empresas_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.empresas_id_seq OWNED BY public.empresas.id;
          public          postgres    false    216            �            1259    18633 
   oservicios    TABLE     w  CREATE TABLE public.oservicios (
    id integer NOT NULL,
    numero_orden text NOT NULL,
    fecha_orden date NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    cotizacion_id integer NOT NULL,
    estado_orden public."ESTADO" NOT NULL,
    usuario_id integer NOT NULL
);
    DROP TABLE public.oservicios;
       public         heap    postgres    false    859            �            1259    18632    oservicios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.oservicios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.oservicios_id_seq;
       public          postgres    false    226            X           0    0    oservicios_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.oservicios_id_seq OWNED BY public.oservicios.id;
          public          postgres    false    225            �            1259    18597 	   proyectos    TABLE     =  CREATE TABLE public.proyectos (
    id integer NOT NULL,
    nombre text NOT NULL,
    descripcion text NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    empresa_id integer NOT NULL,
    usuario_id integer NOT NULL
);
    DROP TABLE public.proyectos;
       public         heap    postgres    false            �            1259    18596    proyectos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.proyectos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.proyectos_id_seq;
       public          postgres    false    219            Y           0    0    proyectos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.proyectos_id_seq OWNED BY public.proyectos.id;
          public          postgres    false    218            �            1259    18923    usuarios    TABLE     �   CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombres text NOT NULL,
    apellidos text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    habilitado boolean DEFAULT true NOT NULL
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    18922    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public          postgres    false    231            Z           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public          postgres    false    230            �           2604    18626    articulos id    DEFAULT     l   ALTER TABLE ONLY public.articulos ALTER COLUMN id SET DEFAULT nextval('public.articulos_id_seq'::regclass);
 ;   ALTER TABLE public.articulos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    18610    cotizaciones id    DEFAULT     r   ALTER TABLE ONLY public.cotizaciones ALTER COLUMN id SET DEFAULT nextval('public.cotizaciones_id_seq'::regclass);
 >   ALTER TABLE public.cotizaciones ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    18689    detalle_cotizaciones id    DEFAULT     �   ALTER TABLE ONLY public.detalle_cotizaciones ALTER COLUMN id SET DEFAULT nextval('public.detalle_cotizaciones_id_seq'::regclass);
 F   ALTER TABLE public.detalle_cotizaciones ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    222            �           2604    18646    detalle_ordenes id    DEFAULT     x   ALTER TABLE ONLY public.detalle_ordenes ALTER COLUMN id SET DEFAULT nextval('public.detalle_ordenes_id_seq'::regclass);
 A   ALTER TABLE public.detalle_ordenes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227    228            |           2604    18589    empresas id    DEFAULT     j   ALTER TABLE ONLY public.empresas ALTER COLUMN id SET DEFAULT nextval('public.empresas_id_seq'::regclass);
 :   ALTER TABLE public.empresas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �           2604    18636    oservicios id    DEFAULT     n   ALTER TABLE ONLY public.oservicios ALTER COLUMN id SET DEFAULT nextval('public.oservicios_id_seq'::regclass);
 <   ALTER TABLE public.oservicios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226                       2604    18600    proyectos id    DEFAULT     l   ALTER TABLE ONLY public.proyectos ALTER COLUMN id SET DEFAULT nextval('public.proyectos_id_seq'::regclass);
 ;   ALTER TABLE public.proyectos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    18926    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    231    231            <          0    18566    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   �d       E          0    18623 	   articulos 
   TABLE DATA           Q   COPY public.articulos (id, nombre, descripcion, precio, "createdAt") FROM stdin;
    public          postgres    false    224   Rf       B          0    18607    cotizaciones 
   TABLE DATA           �   COPY public.cotizaciones (id, numero_cotizacion, fecha_cotizacion, estado_cotizacion, "createdAt", "updatedAt", proyecto_id, usuario_id) FROM stdin;
    public          postgres    false    221   }g       C          0    18617    detalle_cotizaciones 
   TABLE DATA           o   COPY public.detalle_cotizaciones (id, item, cotizacion_id, cantidad, precio_unitario, articulo_id) FROM stdin;
    public          postgres    false    222   �g       I          0    18643    detalle_ordenes 
   TABLE DATA           i   COPY public.detalle_ordenes (id, item, cantidad, precio_unitario, oservicio_id, articulo_id) FROM stdin;
    public          postgres    false    228   (h       >          0    18586    empresas 
   TABLE DATA           u   COPY public.empresas (id, nombre, ruc, direccion, telefono, correo_electronico, habilitado, "createdAt") FROM stdin;
    public          postgres    false    217   Eh       G          0    18633 
   oservicios 
   TABLE DATA           �   COPY public.oservicios (id, numero_orden, fecha_orden, "createdAt", "updatedAt", cotizacion_id, estado_orden, usuario_id) FROM stdin;
    public          postgres    false    226   gi       @          0    18597 	   proyectos 
   TABLE DATA           z   COPY public.proyectos (id, nombre, descripcion, fecha_inicio, fecha_fin, "createdAt", empresa_id, usuario_id) FROM stdin;
    public          postgres    false    219   �i       L          0    18923    usuarios 
   TABLE DATA           W   COPY public.usuarios (id, nombres, apellidos, email, password, habilitado) FROM stdin;
    public          postgres    false    231   ;j       [           0    0    articulos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.articulos_id_seq', 5, true);
          public          postgres    false    223            \           0    0    cotizaciones_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.cotizaciones_id_seq', 2, true);
          public          postgres    false    220            ]           0    0    detalle_cotizaciones_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.detalle_cotizaciones_id_seq', 5, true);
          public          postgres    false    229            ^           0    0    detalle_ordenes_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.detalle_ordenes_id_seq', 1, false);
          public          postgres    false    227            _           0    0    empresas_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.empresas_id_seq', 3, true);
          public          postgres    false    216            `           0    0    oservicios_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.oservicios_id_seq', 1, false);
          public          postgres    false    225            a           0    0    proyectos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.proyectos_id_seq', 2, true);
          public          postgres    false    218            b           0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 2, true);
          public          postgres    false    230            �           2606    18574 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            �           2606    18631    articulos articulos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.articulos
    ADD CONSTRAINT articulos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.articulos DROP CONSTRAINT articulos_pkey;
       public            postgres    false    224            �           2606    18616    cotizaciones cotizaciones_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.cotizaciones
    ADD CONSTRAINT cotizaciones_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.cotizaciones DROP CONSTRAINT cotizaciones_pkey;
       public            postgres    false    221            �           2606    18621 .   detalle_cotizaciones detalle_cotizaciones_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.detalle_cotizaciones
    ADD CONSTRAINT detalle_cotizaciones_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.detalle_cotizaciones DROP CONSTRAINT detalle_cotizaciones_pkey;
       public            postgres    false    222            �           2606    18648 $   detalle_ordenes detalle_ordenes_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.detalle_ordenes
    ADD CONSTRAINT detalle_ordenes_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.detalle_ordenes DROP CONSTRAINT detalle_ordenes_pkey;
       public            postgres    false    228            �           2606    18595    empresas empresas_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.empresas
    ADD CONSTRAINT empresas_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.empresas DROP CONSTRAINT empresas_pkey;
       public            postgres    false    217            �           2606    18641    oservicios oservicios_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.oservicios
    ADD CONSTRAINT oservicios_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.oservicios DROP CONSTRAINT oservicios_pkey;
       public            postgres    false    226            �           2606    18605    proyectos proyectos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT proyectos_pkey;
       public            postgres    false    219            �           2606    18931    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    231            �           1259    18650 "   cotizaciones_numero_cotizacion_key    INDEX     o   CREATE UNIQUE INDEX cotizaciones_numero_cotizacion_key ON public.cotizaciones USING btree (numero_cotizacion);
 6   DROP INDEX public.cotizaciones_numero_cotizacion_key;
       public            postgres    false    221            �           1259    18649    empresas_correo_electronico_key    INDEX     i   CREATE UNIQUE INDEX empresas_correo_electronico_key ON public.empresas USING btree (correo_electronico);
 3   DROP INDEX public.empresas_correo_electronico_key;
       public            postgres    false    217            �           1259    18652    oservicios_cotizacion_id_key    INDEX     c   CREATE UNIQUE INDEX oservicios_cotizacion_id_key ON public.oservicios USING btree (cotizacion_id);
 0   DROP INDEX public.oservicios_cotizacion_id_key;
       public            postgres    false    226            �           1259    18651    oservicios_numero_orden_key    INDEX     a   CREATE UNIQUE INDEX oservicios_numero_orden_key ON public.oservicios USING btree (numero_orden);
 /   DROP INDEX public.oservicios_numero_orden_key;
       public            postgres    false    226            �           1259    18932    usuarios_email_key    INDEX     O   CREATE UNIQUE INDEX usuarios_email_key ON public.usuarios USING btree (email);
 &   DROP INDEX public.usuarios_email_key;
       public            postgres    false    231            �           2606    18658 *   cotizaciones cotizaciones_proyecto_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cotizaciones
    ADD CONSTRAINT cotizaciones_proyecto_id_fkey FOREIGN KEY (proyecto_id) REFERENCES public.proyectos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public.cotizaciones DROP CONSTRAINT cotizaciones_proyecto_id_fkey;
       public          postgres    false    4754    219    221            �           2606    18938 )   cotizaciones cotizaciones_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cotizaciones
    ADD CONSTRAINT cotizaciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public.cotizaciones DROP CONSTRAINT cotizaciones_usuario_id_fkey;
       public          postgres    false    221    231    4770            �           2606    18668 :   detalle_cotizaciones detalle_cotizaciones_articulo_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_cotizaciones
    ADD CONSTRAINT detalle_cotizaciones_articulo_id_fkey FOREIGN KEY (articulo_id) REFERENCES public.articulos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 d   ALTER TABLE ONLY public.detalle_cotizaciones DROP CONSTRAINT detalle_cotizaciones_articulo_id_fkey;
       public          postgres    false    224    4761    222            �           2606    18663 <   detalle_cotizaciones detalle_cotizaciones_cotizacion_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_cotizaciones
    ADD CONSTRAINT detalle_cotizaciones_cotizacion_id_fkey FOREIGN KEY (cotizacion_id) REFERENCES public.cotizaciones(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 f   ALTER TABLE ONLY public.detalle_cotizaciones DROP CONSTRAINT detalle_cotizaciones_cotizacion_id_fkey;
       public          postgres    false    222    221    4757            �           2606    18678 0   detalle_ordenes detalle_ordenes_articulo_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_ordenes
    ADD CONSTRAINT detalle_ordenes_articulo_id_fkey FOREIGN KEY (articulo_id) REFERENCES public.articulos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Z   ALTER TABLE ONLY public.detalle_ordenes DROP CONSTRAINT detalle_ordenes_articulo_id_fkey;
       public          postgres    false    224    4761    228            �           2606    18683 1   detalle_ordenes detalle_ordenes_oservicio_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_ordenes
    ADD CONSTRAINT detalle_ordenes_oservicio_id_fkey FOREIGN KEY (oservicio_id) REFERENCES public.oservicios(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 [   ALTER TABLE ONLY public.detalle_ordenes DROP CONSTRAINT detalle_ordenes_oservicio_id_fkey;
       public          postgres    false    4765    228    226            �           2606    18673 (   oservicios oservicios_cotizacion_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.oservicios
    ADD CONSTRAINT oservicios_cotizacion_id_fkey FOREIGN KEY (cotizacion_id) REFERENCES public.cotizaciones(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 R   ALTER TABLE ONLY public.oservicios DROP CONSTRAINT oservicios_cotizacion_id_fkey;
       public          postgres    false    221    226    4757            �           2606    18943 %   oservicios oservicios_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.oservicios
    ADD CONSTRAINT oservicios_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 O   ALTER TABLE ONLY public.oservicios DROP CONSTRAINT oservicios_usuario_id_fkey;
       public          postgres    false    4770    226    231            �           2606    18653 #   proyectos proyectos_empresa_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 M   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT proyectos_empresa_id_fkey;
       public          postgres    false    217    4752    219            �           2606    18933 #   proyectos proyectos_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 M   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT proyectos_usuario_id_fkey;
       public          postgres    false    231    4770    219            <   �  x�u�Q�1 ������d˒���	ے!�͔�l�=}����1�%=I
V�*�@�8h���=Y釔={�5ڬ���K�D�8Ē	v�����^�Q)&�C�H4D���BrB��1@~��bF�����~^��^ۥn�,�������~>�ⓖ����7�%xR4��!��&���^c,Ei�����A�&
���<�����y�ע	@� *���j���}=_��ͯ�r��|���/O��-�>,�'��i�����J�	�s&HU�ہ�R�A��d2�� ��!W��.%�"�;e6���~х�永����AI���o���r�K�'h[~��?��u���mYg���lߚg5�%���z:�� 철      E     x���1R�0Ek�{{dي���P@f��f�6��Rf��>���!�@��������-�
_{K�d��}���-�gm #��xb��exD������8�R0�Q,�Z�*S�L+(�֨֘|a�R��,k3SK}C-ڢ�+#K�%>;�;������l8��)�&�l�:��BVb7U�0q��cz�S�u�[<bjf �=��cl�Vv��4~��ۭW�gQ���u[T�nr-�x<��²4"i�p����<�z�9}ǘ��GѨ|��`�sTM-_r)�����      B   O   x�3�4000�4202�5��52�p�s�t�qET02�20�22�3CQ�*��2�gD�y�VƖz����9�b���� �ug      C   <   x�%�� 1�PL�q%�l�ul�aq3���/�3w;�%!���QB������k$��	�      I      x������ � �      >     x�}��N�0F��)�%���d&j0���n��h�-��[�����n����9�|_��x�lX����=<"�YY	�S��3޹�V�aI�E���OΪ�CR��e!�[��Q7ä̘�nB���L��\�yQ�"�%���}0��^M&*���o� ./W�����;�WS�0������7�P]$��˸���K%�	�:l�?��_�Kݫ����d��f�yc{3���-!�I� �8�x�����)��м�I��e�&I�wF      G      x������ � �      @   �   x�u��
�@F�3Oq_`l�M�I�pR.*�\t�qd���
����-�������n]���X�Qzw3����v�C������P�D�~"�+`�.�À�� A�D����-�h��m�W�������w?��L?�;x32����HiR�U�Z��@��H)��AF      L   �   x�mͻ�0 @ѹ|3i1D�$>P �KyDJS@�|�us�g�,�Z��"�EU1�����	�_))*%a�j,#(���:��I�V�z�m��L�mXr�F�0c2��o�Ks:I�kM���U�5%)������]�<�pZ]�,�����CT�VS�(t6�ƹA�O�i��촚:^/�$I/kqLz     