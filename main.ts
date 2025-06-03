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
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)
        const data = await response.json();

        if (data.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: `No se encontró información del clima para la ciudad: ${city}.`
                    },
                ],
            };
        }

        const { latitude, longitude } = data.results[0]

        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,is_day,precipitation,rain&forecast_days=1`)

        const weatherData = await weatherResponse.json();

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(weatherData, null, 2),
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