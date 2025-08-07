# 🚀 Alexander Vera, Portafolio Tecnico

[![Deploy Hugo site to Pages](https://github.com/alexanderveratry/alexanderveratry.github.io/actions/workflows/hugo.yml/badge.svg)](https://github.com/alexanderveratry/alexanderveratry.github.io/actions/workflows/hugo.yml)

Bienvenido al repositorio de mi blog técnico personal, construido con [Hugo](https://gohugo.io/) y el tema [PaperMod](https://github.com/adityatelange/hugo-PaperMod).

## 🌐 Sitio Web

**URL:** [https://alexanderveratry.github.io/](https://alexanderveratry.github.io/)

## 📝 Sobre el Blog

Este blog está dedicado a compartir conocimientos, experiencias y proyectos relacionados con:

- 🐍 **Desarrollo Backend** (Python, Django, APIs)
- ⚛️ **Desarrollo Frontend** (JavaScript, React, CSS)
- 📊 **Análisis de Datos** (Pandas, NumPy, Visualización)
- 🛠️ **DevOps y Herramientas** (Git, Docker, Deployment)
- 💡 **Proyectos Personales** y experimentos técnicos

## 🛠️ Tecnologías Utilizadas

- **[Hugo](https://gohugo.io/)** - Generador de sitios estáticos
- **[PaperMod](https://github.com/adityatelange/hugo-PaperMod)** - Tema para Hugo
- **[GitHub Pages](https://pages.github.com/)** - Hosting gratuito
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD automático
- **Markdown** - Escritura de contenido

## 🚦 Estado del Proyecto

- ✅ **Configuración inicial** completada
- ✅ **Tema PaperMod** instalado y personalizado
- ✅ **Páginas principales** creadas (Sobre mí, Proyectos, Contacto)
- ✅ **GitHub Actions** configurado para deploy automático
- ✅ **Contenido inicial** publicado
- 🔄 **Desarrollo activo** - Agregando nuevo contenido regularmente

## 📁 Estructura del Proyecto

```
blog-alex/
├── .github/workflows/          # GitHub Actions para deployment
│   └── hugo.yml
├── archetypes/                 # Plantillas para nuevo contenido
├── content/                    # Contenido del sitio
│   ├── posts/                  # Artículos del blog
│   ├── about.md               # Página "Sobre mí"
│   ├── proyectos.md           # Portafolio de proyectos
│   ├── tecnologias.md         # Stack tecnológico
│   ├── contacto.md            # Información de contacto
│   └── _index.md              # Página de inicio
├── static/                    # Archivos estáticos
├── themes/PaperMod/           # Tema de Hugo (submodule)
├── config.toml                # Configuración principal
└── README.md                  # Este archivo
```

## 🏃‍♂️ Desarrollo Local

### Prerrequisitos

- [Hugo Extended](https://gohugo.io/installation/) v0.148.2 o superior
- [Git](https://git-scm.com/)

### Clonar el repositorio

```bash
git clone --recursive https://github.com/alexanderveratry/alexanderveratry.github.io.git
cd alexanderveratry.github.io
```

### Ejecutar localmente

```bash
# Modo desarrollo (incluye drafts)
hugo server -D

# Modo producción
hugo server
```

El sitio estará disponible en `http://localhost:1313/`

### Crear nuevo contenido

```bash
# Nuevo post
hugo new posts/mi-nuevo-articulo.md

# Nueva página
hugo new mi-nueva-pagina.md
```

## 🚀 Deployment

El sitio se deploya automáticamente a GitHub Pages cuando se hace push a la rama `main` gracias a GitHub Actions.

### Proceso automático:
1. Push a la rama `main`
2. GitHub Actions ejecuta el workflow
3. Hugo construye el sitio estático
4. Se deploya automáticamente a GitHub Pages

## 📊 Métricas del Blog

- **Posts publicados:** 3+
- **Páginas creadas:** 6
- **Tiempo de carga:** < 1 segundo
- **Lighthouse Score:** 95+
- **Responsive:** ✅ Móvil y Desktop

## 🤝 Contribuciones

¿Encontraste un error? ¿Tienes una sugerencia? ¡Las contribuciones son bienvenidas!

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📬 Contacto

- **Email:** alex.vera.dev@gmail.com
- **GitHub:** [@alexanderveratry](https://github.com/alexanderveratry)
- **LinkedIn:** [alex-vera-dev](https://linkedin.com/in/alex-vera-dev)
- **Blog:** [alexanderveratry.github.io](https://alexanderveratry.github.io/)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

⭐ **¡Si te gusta este proyecto, dale una estrella en GitHub!** ⭐

*Hecho con ❤️ por Alex Vera*
