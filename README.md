# Proyecto NOC (Network Operation Center)

El objetivo es crear una serie de tareas (un NOC) utilizando Arquitectura Limpia con TypeScript, CRON Tasks. Y trabajar con el patron "Repository" (Repository Pattern) para poder construir una forma intercambiable de orígenes de datos (data sources). Además del manejo de:

- Entidades
- DataSources
- Repositorios
- Clases Abstractas
- Implementaciones
- Variables de entorno
- Validación de variables de entorno
- Envío de correos electrónicos con y sin adjuntos
- Configuración de password en Gmail (secret keys)
- NodeMailer

# dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando ```npm install```
4. Levantar las bases de datos con el commando
   ```
   docker compose up -d
   ```
5. Ejecutar el comando ```npm run dev```