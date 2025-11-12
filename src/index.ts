#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Define the server
const server = new McpServer({
  name: "sample-server",
  version: "1.0.0",
  description: "MCP server for adding two numbers",
});

const AddArgsShape = {
  a: z.number(),
  b: z.number(),
};

const AddArgsSchema = z.object(AddArgsShape);

server.tool("plus", "Add two numbers", AddArgsShape, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a + b) }],
}));

// Start the server
async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("sample-mcp-server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});