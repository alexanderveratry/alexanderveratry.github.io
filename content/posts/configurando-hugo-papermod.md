---
title: "Configurando Hugo con el tema PaperMod"
date: 2025-08-06
draft: false
tags: ["hugo", "blog", "tutorial", "web-development"]
categories: ["Tutoriales", "Web Development"]
description: "Guía completa para configurar Hugo con el tema PaperMod y crear un blog técnico profesional"
---

# 🚀 Configurando Hugo con el tema PaperMod

En este artículo te enseñaré cómo configurar Hugo con el tema PaperMod para crear un blog técnico profesional como este.

## ¿Por qué Hugo + PaperMod?

### Ventajas de Hugo:
- ⚡ **Velocidad extrema** - Genera sitios en milisegundos
- 🎯 **SEO optimizado** - Estructura perfecta para motores de búsqueda
- 📱 **Responsive** - Se ve bien en cualquier dispositivo
- 🆓 **Gratuito** - Sin costos de hosting con GitHub Pages

### Ventajas de PaperMod:
- 🎨 **Diseño limpio y moderno**
- 🌙 **Modo oscuro/claro**
- 📊 **Optimizado para rendimiento**
- 🔍 **Búsqueda integrada**

## Pasos para la instalación

### 1. Instalar Hugo

```bash
# Windows (usando Chocolatey)
choco install hugo-extended

# macOS (usando Homebrew)
brew install hugo

# Verificar instalación
hugo version
```

### 2. Crear un nuevo sitio

```bash
hugo new site mi-blog
cd mi-blog
```

### 3. Agregar el tema PaperMod

```bash
git init
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
```

### 4. Configuración básica

Crea el archivo `config.toml`:

```toml
baseURL = 'https://tu-usuario.github.io/'
languageCode = 'es'
title = 'Mi Blog Técnico'
theme = 'PaperMod'

[params]
  homeInfoParams = { 
    Title = "¡Hola! Soy [Tu Nombre]", 
    Content = "Desarrollador apasionado por la tecnología..." 
  }

[menu]
[[menu.main]]
  name = "🏠 Inicio"
  url = "/"
  weight = 1

[[menu.main]]
  name = "📝 Blog"
  url = "/posts/"
  weight = 2
```

### 5. Crear tu primer post

```bash
hugo new posts/mi-primer-post.md
```

### 6. Ejecutar el servidor local

```bash
hugo server -D
```

## Personalización avanzada

### Configuración del menú

```toml
[menu]
[[menu.main]]
  name = "💼 Proyectos"
  url = "/proyectos/"
  weight = 3

[[menu.main]]
  name = "👨‍💻 Sobre mí"
  url = "/about/"
  weight = 4
```

### SEO y metadatos

```toml
[params]
  description = "Blog técnico sobre desarrollo y programación"
  keywords = ["desarrollo", "programación", "python", "javascript"]
  author = "Tu Nombre"
```

### Modo perfil

```toml
[params]
  profileMode = {
    enabled = true
    title = "Tu Nombre"
    subtitle = "Desarrollador Full Stack"
    imageUrl = "avatar.jpg"
    buttons = [
      {
        name = "Ver Blog",
        url = "/posts"
      }
    ]
  }
```

## Deployment en GitHub Pages

### 1. Crear repositorio

Crea un repositorio llamado `tu-usuario.github.io`

### 2. Configurar GitHub Actions

Crea `.github/workflows/hugo.yml`:

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          submodules: recursive

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true

      - name: Build
        run: hugo --minify

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

### 3. Push al repositorio

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-usuario.github.io.git
git push -u origin main
```

## Tips y mejores prácticas

### Estructura recomendada

```
content/
├── posts/           # Artículos del blog
├── proyectos.md     # Página de proyectos
├── about.md         # Sobre mí
├── contacto.md      # Contacto
└── _index.md        # Página de inicio
```

### Front matter para posts

```yaml
---
title: "Título del artículo"
date: 2025-08-06
draft: false
tags: ["tag1", "tag2"]
categories: ["Categoría"]
description: "Descripción SEO"
---
```

### Comandos útiles

```bash
# Crear nuevo post
hugo new posts/nuevo-articulo.md

# Servidor con drafts
hugo server -D

# Build para producción
hugo --minify

# Limpiar cache
hugo --gc
```

## Conclusión

Hugo con PaperMod es una combinación perfecta para crear blogs técnicos. Es rápido, flexible y completamente gratuito con GitHub Pages.

### Próximos pasos:
- ✅ Personalizar el diseño
- ✅ Agregar más contenido
- ✅ Configurar analytics
- ✅ Optimizar SEO

¿Tienes alguna pregunta sobre la configuración? ¡No dudes en [contactarme](/contacto/)!

---

**Tags:** #hugo #blog #tutorial #webdev #github-pages
