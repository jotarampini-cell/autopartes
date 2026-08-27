# Logotipos de marca

Los logos de esta carpeta se muestran en la sección "Marcas Líderes en la Industria".

## Cómo conectar un logo

1. Coloca el archivo aquí, por ejemplo `bosch.svg`.
2. En `src/data/autoparts-data.ts`, agrega `logoSrc` a esa marca:

```ts
{ name: "Bosch", logo: "BOSCH", logoSrc: "/brands/bosch.svg", country: "Alemania", desc: "..." }
```

Si una marca no tiene `logoSrc`, o el archivo no carga, se muestra
automáticamente un monograma con las iniciales. No hace falta tener las
doce marcas listas para que la sección funcione.

## Formato recomendado

- **SVG** de preferencia, o PNG con fondo transparente.
- Alto útil de al menos 96 px para que se vea nítido.
- Se muestran sobre una placa blanca, así que los logos de tinta oscura
  o a color funcionan bien; los de tinta blanca no se verían.

## Sobre derechos de uso

Los logotipos de fabricantes son marcas registradas de sus respectivos
propietarios. Usa únicamente archivos que tengas licencia o autorización
para publicar — normalmente provienen del kit de marca oficial del
fabricante o de tu acuerdo de distribución.
