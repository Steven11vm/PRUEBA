# Gestión de Asistentes IA - Funnelhot

Sistema de gestión de asistentes IA para automatizar interacciones con leads. Aplicación web responsive desarrollada con Next.js, TypeScript y persistencia local.

##  Características Implementadas

###  Funcionalidades Principales

1. **Página Principal (Listado de Asistentes)**
   - Visualización de asistentes en formato de tarjetas
   - Cada tarjeta muestra: nombre, idioma y tono/personalidad
   - Menú de acciones por asistente (Editar, Eliminar, Entrenar)
   - Botón para crear nuevo asistente
   - Estado vacío cuando no hay asistentes

2. **Modal de Creación/Edición (2 Pasos)**
   - **Paso 1: Datos Básicos**
     - Nombre del asistente (requerido, mínimo 3 caracteres)
     - Idioma (requerido: Español, Inglés, Portugués)
     - Tono/Personalidad (requerido: Formal, Casual, Profesional, Amigable)
   - **Paso 2: Configuración de Respuestas**
     - Longitud de respuestas (Cortas, Medianas, Largas) con validación de suma = 100%
     - Habilitación de respuestas de audio (opcional)
   - Indicador visual de pasos
   - Validaciones en tiempo real
   - Botones de navegación (Siguiente, Atrás, Guardar, Cancelar)

3. **Página de Entrenamiento**
   - Ruta dinámica: `/{id}` donde `id` es el identificador del asistente
   - Sección de entrenamiento con textarea para datos de entrenamiento
   - Persistencia en localStorage
   - Chat simulado con:
     - Interfaz de mensajes (usuario y asistente)
     - Campo de entrada para mensajes
     - Botón para reiniciar conversación
     - Respuestas simuladas con delay de 1-2 segundos
     - Respuestas basadas en configuración de longitud del asistente

4. **Funcionalidad de Eliminación**
   - Confirmación antes de eliminar
   - Mensaje de éxito tras eliminar
   - Actualización inmediata de la lista

###  Diseño

- **Paleta de colores**: Blanco y negro profesional
- **Responsive**: Diseño adaptativo para móvil y desktop
- **Estados interactivos**: Hover, focus, active, disabled
- **Feedback visual**: Animaciones sutiles y transiciones suaves
- **Iconografía**: React Icons para mejorar la comprensión
- **Tipografía**: Jerarquía clara y legible

###  Requisitos Técnicos

- ✅ Framework: Next.js 14 con App Router
- ✅ Lenguaje: TypeScript
- ✅ Persistencia: LocalStorage
- ✅ Diseño: Responsive (mobile y desktop)
- ✅ Manejo de estados: Loading states, estados de error, validaciones en tiempo real
- ✅ Componentes reutilizables
- ✅ Estructura de carpetas clara y escalable
- ✅ Nombres descriptivos para variables y funciones
- ✅ Comentarios donde es necesario

##  Instalación

1. Clona el repositorio o descarga el proyecto

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

##  Estructura del Proyecto

```
├── app/
│   ├── [id]/              # Página dinámica de entrenamiento
│   │   ├── page.tsx
│   │   └── page.module.css
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal (listado)
├── components/
│   ├── ui/                # Componentes reutilizables
│   │   ├── Alert.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Select.tsx
│   │   └── Textarea.tsx
│   ├── AssistantCard.tsx  # Tarjeta de asistente
│   └── CreateEditModal.tsx # Modal de creación/edición
├── lib/
│   ├── responses.ts       # Lógica de respuestas simuladas
│   └── storage.ts         # Utilidades de localStorage
├── types/
│   └── assistant.ts       # Tipos TypeScript
└── README.md
```

## 🎯 Decisiones Técnicas

### 1. Next.js con App Router
- **Razón**: App Router ofrece mejor rendimiento y soporte para Server Components
- **Beneficio**: Mejor SEO y carga inicial más rápida

### 2. TypeScript
- **Razón**: Type safety y mejor experiencia de desarrollo
- **Beneficio**: Menos errores en tiempo de ejecución y mejor autocompletado

### 3. CSS Modules
- **Razón**: Encapsulación de estilos sin dependencias adicionales
- **Beneficio**: Estilos scoped y sin conflictos de nombres

### 4. LocalStorage
- **Razón**: Requerimiento del proyecto para persistencia local
- **Beneficio**: Datos persisten entre sesiones sin necesidad de backend

### 5. Componentes Reutilizables
- **Razón**: DRY (Don't Repeat Yourself) y mantenibilidad
- **Beneficio**: Consistencia visual y fácil mantenimiento

### 6. React Icons
- **Razón**: Librería ligera y completa de iconos
- **Beneficio**: Iconos consistentes sin aumentar significativamente el bundle

### 7. Validaciones en Tiempo Real
- **Razón**: Mejor UX, feedback inmediato al usuario
- **Beneficio**: Menos errores y mejor experiencia de usuario

## 📝 Características Adicionales Implementadas

1. **Estados de carga**: Indicadores visuales durante operaciones asíncronas
2. **Manejo de errores**: Mensajes claros y apropiados
3. **Animaciones**: Transiciones suaves para mejor UX
4. **Accesibilidad**: Labels, aria-labels y navegación por teclado
5. **Responsive design**: Adaptación completa a diferentes tamaños de pantalla
6. **Confirmaciones**: Diálogos de confirmación para acciones destructivas
7. **Feedback visual**: Alertas de éxito/error para todas las operaciones

## 🧪 Uso de la Aplicación

### Crear un Asistente
1. Haz clic en "Crear Asistente"
2. Completa el Paso 1 (Datos Básicos)
3. Haz clic en "Siguiente"
4. Configura las respuestas en el Paso 2
5. Haz clic en "Guardar"

### Editar un Asistente
1. Haz clic en el ícono de "Editar" en la tarjeta del asistente
2. Modifica los datos necesarios
3. Guarda los cambios

### Entrenar un Asistente
1. Haz clic en el ícono de "Entrenar" en la tarjeta del asistente
2. Ingresa los datos de entrenamiento en el textarea
3. Haz clic en "Guardar"
4. Prueba el asistente en el chat simulado

### Eliminar un Asistente
1. Haz clic en el ícono de "Eliminar" en la tarjeta del asistente
2. Confirma la eliminación en el diálogo

## ⏱️ Tiempo Aproximado de Desarrollo

- **Configuración inicial**: 30 minutos
- **Componentes UI base**: 2 horas
- **Página principal y listado**: 1.5 horas
- **Modal de creación/edición**: 3 horas
- **Página de entrenamiento**: 2 horas
- **Estilos y responsive**: 2 horas
- **Testing y ajustes**: 1 hora
- **Documentación**: 30 minutos

**Total aproximado**: ~12 horas

## 🚧 Priorización

Todas las funcionalidades requeridas fueron implementadas. No se dejó fuera ninguna característica principal del requerimiento.


# PRUEBA
