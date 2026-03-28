# Pera — Frontend
 
> Sistema de administración de bancos virtuales y cuentas bancarias.  
> Proyecto final de **Seminario Integrador** — UTN Facultad Regional Mendoza  
> Ingeniería en Sistemas de Información · 2024
 
---
 
## Descripción
 
**Pera** es un sistema de software que permite a los usuarios crear y administrar bancos virtuales, así como abrir y gestionar cuentas bancarias pertenecientes a dichos bancos. Soporta transferencias de dinero ficticio entre cuentas de un mismo banco, y entre cuentas y su banco.
 
Pensado como herramienta de apoyo para actividades grupales que requieran administrar economía ficticia: juegos de mesa, división de gastos, gestión de saldos en grupos, etc.
 
Este repositorio contiene el **Front-End** del sistema.
 
---
 
## Autores
 
| Nombre | Legajo |
|---|---|
| Sebastián Andrés Ogás | 47075 |
| Facundo Gabriel Olea | 47855 |
 
**Docentes:** Dr. Ing. Raúl Omar Moralejo · Lic. Gustavo Manino
 
---
 
## Diseño e interfaz
 
La interfaz fue prototipada en **Figma** siguiendo una guía de estilo consistente a lo largo de todo el sistema:
 
| Elemento | Valor |
|---|---|
| **Fuente** | Tahoma |
| **Color muy claro** | `#F5F5F5` |
| **Color claro** | `#9DF069` |
| **Color oscuro** | `#76951F` |
| **Color muy oscuro** | `#142D2D` |
| **Tamaños de texto** | 12px · 16px · 24px · 28px · 48px · 64px · 128px |
| **Tamaño de íconos** | 24px |
 
---
 
## Vistas del sistema
 
El front-end cubre las interfaces de los siguientes módulos:
 
| Módulo | Descripción |
|---|---|
| **Usuarios** | Registración, inicio de sesión, modificación de datos, cambio de contraseña y suscripción a Premium. |
| **Transferencias** | Realización de transferencias entre cuentas, visualización de movimientos y emisión de dinero. |
| **Bancos** | Creación y administración de bancos, apertura y gestión de cuentas bancarias. |
| **Reportes** | Visualización de informes generales del sistema (solo para administradores). |
| **Parámetros** | Gestión de parámetros del sistema (solo para administradores). |
 
---
 
## Arquitectura
 
El front-end forma la capa superior del sistema multicapa de Pera:
 
```
┌─────────────────────────────────────┐
│        Clases Página (GUI)          │  ← Front-End
├─────────────────────────────────────┤
│       Clases Servicio (HTTP)        │  ← Front-End
├─────────────────────────────────────┤
│      Clases Controlador (HTTP)      │  ← Back-End (repo separado)
├─────────────────────────────────────┤
│        Clases Experto (Lógica)      │  ← Back-End (repo separado)
├─────────────────────────────────────┤
│       Clases Repositorio (BD)       │  ← Back-End (repo separado)
├─────────────────────────────────────┤
│           Base de Datos             │  ← Back-End (repo separado)
└─────────────────────────────────────┘
```
 
La comunicación con el back-end se realiza mediante **solicitudes HTTP** generadas desde las clases Servicio.
 
---
 
## Cómo ejecutar el proyecto
 
### Prerrequisitos
 
- Node.js 18+
- npm o yarn
- Back-End de Pera corriendo (ver [pera-backend](https://github.com/Facustriker/Pera-Back-End/tree/main))
 
### Pasos
 
```bash
# 1. Clonar el repositorio
git clone https://github.com/SebaOgas/Pera-Front-End.git
cd pera-frontend
 
# 2. Instalar dependencias
npm install
 
# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL del back-end
 
# 4. Iniciar en modo desarrollo
npm run dev
```
 
La aplicación estará disponible en `http://localhost:5173` (o el puerto configurado).
 
---
 
## Configuración
 
Variables de entorno disponibles en `.env`:
 
```env
# URL base del back-end
VITE_API_URL=http://localhost:8080
 
# Otras configuraciones
VITE_APP_NAME=Pera
```
 
---
 
## Estructura del proyecto
 
```
pera-frontend/
├── public/                   # Archivos estáticos
├── src/
│   ├── assets/               # Imágenes, íconos, fuentes
│   ├── components/           # Componentes reutilizables
│   ├── pages/                # Vistas por caso de uso
│   │   ├── auth/             # Login, registro
│   │   ├── bancos/           # Mis bancos, detalle, crear, administrar
│   │   ├── cuentas/          # Mis cuentas, abrir cuenta
│   │   ├── transferencias/   # Transferir, emitir dinero, movimientos
│   │   ├── reportes/         # Reportes (admin)
│   │   └── parametros/       # Parámetros (admin)
│   ├── services/             # Llamadas HTTP al back-end
│   ├── router/               # Definición de rutas
│   ├── store/                # Estado global (si aplica)
│   └── main.js               # Punto de entrada
├── .env.example
├── package.json
└── README.md
```
 
---
 
## Rutas principales
 
| Ruta | Descripción | Acceso |
|---|---|---|
| `/LoguearUsuario` | Inicio de sesión y registro | Público |
| `/Usuario` | Perfil del usuario | Usuario |
| `/MisBancos` | Listado de bancos propios | Usuario |
| `/MisBancos/:id` | Detalle de un banco | Usuario / Banquero |
| `/CrearBanco` | Formulario de creación de banco | Usuario |
| `/MisCuentasBancarias` | Listado de cuentas bancarias | Usuario |
| `/AbrirCuentaBancaria` | Flujo de apertura de cuenta | Usuario |
| `/EmitirDinero/:id` | Emisión de dinero desde un banco | Banquero |
| `/VerReportes` | Reportes del sistema | Administrador |
| `/ABMPSM` | ABM de símbolo de moneda | Administrador |
 
---
 
## Seguridad y permisos
 
El front-end gestiona el acceso a las rutas según el rol del usuario autenticado. Los roles disponibles son:
 
| Rol | Acceso en el front |
|---|---|
| `Usuario` | Bancos propios, cuentas y transferencias |
| `Premium` | Igual que Usuario, con límites ampliados |
| `Banquero` | Además puede emitir dinero y auditar movimientos |
| `Administrador` | Acceso completo, incluyendo Usuarios, Parámetros y Reportes |
 
Las rutas protegidas redirigen a `/` si el usuario no tiene el permiso requerido.
 
---
 
## Estrategia de branches
 
```
main          ← producción (estable)
├── sebasOgas ← desarrollo de Sebastián
└── facuOlea  ← desarrollo de Facundo
```
 
El versionado se gestiona mediante **GitHub**. Los cambios pasan por la rama personal del desarrollador antes de integrarse a `main`.
 
---
