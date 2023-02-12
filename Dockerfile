# Our Node base image
FROM node:14.16.1 as build

# Change our current working directory
WORKDIR /app

# Copy over `package.json` and lock files to optimize the build process
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# Install Node modules
RUN npm install 

# Copy over rest of the project files
COPY . .

# Set the build args and app env
ARG API_ENDPOINT
ARG BLOCK_NETWORK
ARG MARKETPLACE_ADDRESS
ARG WZIL_ADDRESS
ARG TAX_AMOUNT
ARG MAX_ROYALTY_BPS
ARG CDN_BASE_URL
ARG DOCS_URL
ENV ZILKROAD_API_ENDPOINT=$API_ENDPOINT
ENV ZILKROAD_BLOCK_NETWORK=$BLOCK_NETWORK
ENV ZILKROAD_MARKETPLACE_ADDRESS=$MARKETPLACE_ADDRESS
ENV ZILKROAD_WZIL_ADDRESS=$WZIL_ADDRESS
ENV ZILKROAD_TAX_AMOUNT=$TAX_AMOUNT
ENV ZILKROAD_MAX_ROYALTY_BPS=$MAX_ROYALTY_BPS
ENV ZILKROAD_CDN_BASE_URL=$CDN_BASE_URL
ENV ZILKROAD_DOCS_URL=$DOCS_URL
RUN echo "VITE_ZILKROAD_API_ENDPOINT=$ZILKROAD_API_ENDPOINT" > .env \
    && echo "VITE_ZILKROAD_BLOCK_NETWORK=$ZILKROAD_BLOCK_NETWORK"  >> .env \
    && echo "VITE_ZILKROAD_MARKETPLACE_ADDRESS=$ZILKROAD_MARKETPLACE_ADDRESS"  >> .env \
    && echo "VITE_ZILKROAD_WZIL_ADDRESS=$ZILKROAD_WZIL_ADDRESS"  >> .env \
    && echo "VITE_ZILKROAD_TAX_AMOUNT=$ZILKROAD_TAX_AMOUNT"  >> .env \
    && echo "VITE_ZILKROAD_MAX_ROYALTY_BPS=$ZILKROAD_MAX_ROYALTY_BPS"  >> .env \
    && echo "VITE_ZILKROAD_CDN_BASE_URL=$ZILKROAD_CDN_BASE_URL"  >> .env \
    && echo "VITE_ZILKROAD_DOCS_URL=$ZILKROAD_DOCS_URL"  >> .env

# Just to be safe
RUN rm -f .env.local .env.local.example

RUN npm run build

###
# Only copy over the Node pieces we need
###
FROM node:14.16.1

WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY package.json .

# Set the port env
ENV PORT=3050

EXPOSE 3050
CMD ["node", "./build/index.js"]

