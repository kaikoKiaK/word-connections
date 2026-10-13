# Juego de Conexiones de Palabras

Un juego de palabras en español inspirado en el Connections del New York Times. Agrupa 16 palabras en 4 categorías de 4 palabras cada una, donde cada categoría comparte un tema común.

## Cómo Jugar

1. **16 palabras** se muestran en una cuadrícula, reorganizadas al azar cada juego
2. **Selecciona 4 palabras** que crees que pertenecen a la misma categoría
3. Haz clic en **"Comprobar"** (Check) para verificar tu selección
4. Si es correcta, la categoría se elimina y esas palabras ya no son seleccionables
5. Si es incorrecta, pierdes un **intento** (attempt) — tienes 4 intentos en total
6. Cuando selecciones 2+ palabras que pertenecen a la misma categoría sin resolver, se **resaltan en verde** como una pista (hint)
7. Usa **"Revelar"** para mostrar todas las categorías si te atascaste

## Condiciones de Victoria/Derrota

- **Victoria**: Resuelve las 4 categorías dentro de 4 intentos incorrectos
- **Derrota**: Agotados los 4 intentos incorrectos

## Características

- 10 puzzles diarios con categorías de palabras en español
- Dificultad codificada por colores: amarillo (más fácil) → verde → azul → morado (más difícil)
- Sistema dinámico de hints con resaltado en verde
- Navegación circular de puzzles (siguiente/anterior)
- Diseño responsive con Tailwind CSS v4

## Puzzles Disponibles

El juego incluye 10 puzzles (del 1 al 10 de junio de 2024), cada uno con 4 categorías:

- Alguien que no encaja
- Lugares en los que quedarse atrapado
- Cosas que se obtienen de animales
- Cosas pegajosas
- Y más: herramientas, instrumentos, animales, elementos de playa, piedras preciosas, bailes, plantas, planetas, técnicas de pintura, asignaturas, animales domésticos, quesos y más...

## Pila Tecnológica

- **Next.js 16** con App Router
- **React 19**
- **Tailwind CSS v4**
- **TypeScript 5**
- Datos de palabras en español en `data/words.json`

## Cómo Empezar

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Más Información

Para aprender más sobre Next.js, consulta la [Documentación de Next.js](https://nextjs.org/docs) - aprende sobre las features y API de Next.js.

Puedes consultar el [repositorio de Next.js en GitHub](https://github.com/vercel/next.js) - tus comentarios y contribuciones son bienvenidos!

## Despliegue en Vercel

La forma más fácil de desplegar tu aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.
