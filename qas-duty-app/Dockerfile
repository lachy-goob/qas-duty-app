#Sets the Base Stage
#node:22-slim is just NPM and Node
FROM node:23.9-slim AS base

#Sets default Port as 3000, however can be overridden later
ARG PORT=3000

#Disabled Telemtry data to Vercel Serves
ENV NEXT_TELEMETRY_DISABLED = 1

#Sets the Default Work Directory
WORKDIR /app

## Dependencies
#Install dependencies - Copying only the packages insures that docker can efficiently cache the build process
# and only run `npm ci`
FROM base AS dependencies

#Copies to app directory (which we set above)
COPY package.json package-lock.json ./
RUN npm ci


#Build
FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .


#Public build-time environment variables (if they are required/needed)
##ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
##ARG NEXT_PUBLICSTRIPE_PUBLISHABLE_KEY = $NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

RUN npm run build



# Run
FROM base AS run

#Makes Node Run in Production Mode
ENV NODE_ENV=production
ENV PORT=$PORT


# This creates the user groups for the docker container
# Add group nodejs + nextjs: chown gives .next directory ownership to nextjs user and nodejs group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE $PORT

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]





