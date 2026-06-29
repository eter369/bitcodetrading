# Patrimonio Cripto · Omraam

Panel de **patrimonio cripto en vivo** con precios en tiempo real desde la API pública de **Binance** (REST + WebSocket), calculadora de cartera y escenarios. Una sola página estática — sin framework ni build.

> No es asesoría financiera.

## Características

- **Tickers en vivo** (BTC, ETH, SOL, PEPE) con cambio 24h y mini-gráficos (sparklines)
- **Marcador en ETH y en USD**, recalculado en tiempo real
- **Calculadora** de valor de cartera y **Escenarios 2027** interactivos
- Reconexión robusta del WebSocket, hosts REST de respaldo y validación de datos
- Fondo en video, tema oscuro, accesible (roles ARIA, `prefers-reduced-motion`, contraste AA)

## Stack

HTML + CSS + JavaScript puro (vanilla). No requiere Node ni paso de build.

## Despliegue

Sitio estático: el archivo [`index.html`](index.html) se sirve en la raíz. Desplegado con **Cloudflare Pages**.

- Build command: _(ninguno)_
- Output directory: `/` (raíz del repo)

## Desarrollo local

Abre `index.html` directamente en el navegador (doble clic) — la API de Binance permite CORS, así que funciona desde `file://`.
