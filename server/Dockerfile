# Base image
FROM node:18

# App directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest code
COPY . .

# Port expose
EXPOSE 5000

# Start app
CMD ["npm", "start"]