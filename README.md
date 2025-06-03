# Introducción a los MCP

En este proyecto se han seguido los pasos del vídeo de Midudev: https://www.youtube.com/watch?v=wnHczxwukYY junto con otra documentación educativa para aprender sobre los MCP (Model Context Protocol) y crear mi primer MCP.

## Descripción

Se han hecho pruebas con Claude para comprobar el funcionamiento de los MCP con los archivos de mi equipo y una base de datos postgress junto con la creación de un MCP personalizado.

**Herramientas/tecnologías utilizadas**:

- Node.js
- pnpm
- Visual Studio Code
- Claude
- @modelcontextprotocol/sdk 
- zod
- tsx

## Creación del proyecto

```bash
mkdir mcp-weather
cd mcp-weather
pnpm init # Creará el package.json
```

A partir de este punto quedaría crear el archivo `main.ts` y seguir los pasos del video.

## Dependencias

```bash
pnpm add @modelcontextprotocol/sdk zod
pnpm add -D tsx`
```


## Estructura del proyecto

- `main.ts`: Código fuente del servidor MCP.
- `package.json`: Dependencias y scripts del proyecto.
- `.gitignore`: Archivos y carpetas ignorados por git.
- `pnpm-lock.yaml`: Archivo de bloqueo de dependencias (ignorado en git).
- `README.md`: Documentación del proyecto.
