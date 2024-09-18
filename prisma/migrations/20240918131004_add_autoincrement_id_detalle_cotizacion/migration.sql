-- AlterTable
CREATE SEQUENCE detalle_cotizaciones_id_seq;
ALTER TABLE "detalle_cotizaciones" ALTER COLUMN "id" SET DEFAULT nextval('detalle_cotizaciones_id_seq');
ALTER SEQUENCE detalle_cotizaciones_id_seq OWNED BY "detalle_cotizaciones"."id";
