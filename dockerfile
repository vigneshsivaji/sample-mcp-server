# Use a lightweight Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install the MCP server package globally for faster startup (optional but recommended)
RUN npm install -g sample-mcp-server@latest

# Expose stdio (Docker handles this implicitly with -i -t flag)
# Run the server via npx (fallback if not installed globally)
CMD ["npx", "-y", "sample-mcp-server@latest"]