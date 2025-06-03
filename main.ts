import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"

// 1. Crear el servidor MCP
// Interfaz principal con el protocolo MCP para manejar la comunicación entre el cliente y el servidor.
const server = new McpServer({
    name: "weather-mcp",
    version: "1.0.0",
})

// 2. Definir las herramientas
// Las herramientas permiten al LLM hacer acciones a través del servidor.
server.tool(
    'fetch-weather',
    'Tool to fetch the weather of a city',
    {
        city: z.string().describe('Nombre de la ciudad'),
    },
    async ({ city }) => {
        return {
            content: [
                {
                    type: "text",
                    text: `El clima actual en ${city} es soleado con 25 grados Celsius.`,
                },
            ],
        };
    }
);


// 3. Escuchar las conexiones a este servidor por parte del cliente
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch(console.error);