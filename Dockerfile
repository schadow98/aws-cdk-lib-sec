# --- Stage 1: Build Stage ---
    FROM node:22.4.0 AS builder

    # Arbeitsverzeichnis festlegen
    WORKDIR /app
    
    # package.json und package-lock.json kopieren und Abhängigkeiten installieren
    COPY package*.json ./
    RUN npm install
    
    # Quellcode kopieren und bauen (z.B. TypeScript kompilieren)
    COPY . .
    RUN npm run build
    
    # --- Stage 2: Production Stage ---
    FROM node:22.4.0-slim
    
    WORKDIR /app
    
    # Nur die notwendigen Dateien aus der Build-Stage übernehmen
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/app.js ./app.js
    # Falls dein Build-Ausgabeverzeichnis z. B. "dist" heißt, dann:
    # COPY --from=builder /app/dist ./dist
       
    # Standardkommando zum Starten der Anwendung
    CMD ["npm", "start"]
    