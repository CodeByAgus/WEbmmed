# Nuevaweb.vaini - Vanilla.js Framework

Estructura moderna de desarrollo web sin dependencias usando **Vanilla.js** puro.

## 📁 Estructura del Proyecto

```
Nuevaweb.vaini/
├── index.html              # Página de inicio
├── login.html              # Página de login
├── register.html           # Página de registro
├── vanilla.js              # Framework de utilidades UI
├── auth.js                 # Módulo de autenticación con Supabase
└── README.md               # Este archivo
```

## 🚀 Inicio Rápido

### 1. Configurar Credenciales de Supabase

Edita el archivo `auth.js` y reemplaza las líneas 8-9:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### 2. Ejecutar Localmente

Desde la carpeta raíz del proyecto (`/Web`):

```bash
npm run dev
# o
python -m http.server 8000
```

Luego accede a: `http://localhost:8000/Nuevaweb.vaini/`

## 📚 Uso de Vanilla.js

### Gestión del DOM

```javascript
const { DOM } = Vanilla;

// Seleccionar elementos
const element = DOM.select('#myId');
const elements = DOM.selectAll('.myClass');

// Crear elementos
const div = DOM.create('div', { class: 'container' }, 'Contenido');

// Manipular clases
DOM.addClass(element, 'active');
DOM.removeClass(element, 'inactive');
DOM.toggleClass(element, 'highlight');

// Manipular contenido
DOM.setText(element, 'Nuevo texto');
DOM.setHTML(element, '<strong>HTML</strong>');

// Mostrar/Ocultar
DOM.show(element);
DOM.hide(element);
```

### Eventos

```javascript
const { Events } = Vanilla;

// Agregar listener
Events.on(element, 'click', (e) => console.log('Click!'));

// Listener de una sola vez
Events.once(element, 'click', handler);

// Delegar eventos
Events.delegate(parent, 'click', '.btn', handler);

// Disparar evento personalizado
Events.emit(element, 'custom-event', { data: 'valor' });
```

### Validación de Formularios

```javascript
const { Form, Validators } = Vanilla;

// Obtener datos del formulario
const data = Form.getData(formElement);

// Establecer datos
Form.setData(formElement, { email: 'test@example.com' });

// Validar
const rules = {
    email: [
        { validator: (v) => Validators.required(v), message: 'Email requerido' },
        { validator: (v) => Validators.email(v), message: 'Email inválido' },
    ],
};

const validation = Form.validate(formElement, rules);
if (!validation.isValid) {
    console.log(validation.errors);
}

// Obtener/Establecer valor de campo
const email = Form.getValue(formElement, 'email');
Form.setValue(formElement, 'email', 'new@example.com');
```

### Notificaciones (Toast)

```javascript
const { Toast } = Vanilla;

// Diferentes tipos
Toast.success('Operación exitosa');
Toast.error('Ocurrió un error');
Toast.warning('Advertencia');
Toast.info('Información');

// Con duración personalizada
Toast.success('¡Listo!', 5000); // 5 segundos
```

### Almacenamiento Local

```javascript
const { Storage } = Vanilla;

// Guardar datos
Storage.set('user', { name: 'Juan', email: 'juan@example.com' });

// Obtener datos
const user = Storage.get('user');

// Remover dato
Storage.remove('user');

// Verificar existencia
if (Storage.has('user')) {
    console.log('Usuario existe');
}

// Limpiar todo
Storage.clear();
```

### Peticiones HTTP

```javascript
const { HTTP } = Vanilla;

// GET
const result = await HTTP.get('/api/users');
if (result.success) {
    console.log(result.data);
}

// POST
const result = await HTTP.post('/api/users', {
    name: 'Juan',
    email: 'juan@example.com'
});

// PUT
const result = await HTTP.put('/api/users/1', {
    name: 'Juan Actualizado'
});

// DELETE
const result = await HTTP.delete('/api/users/1');
```

### Utilidades

```javascript
const { Utils } = Vanilla;

// Esperar
await Utils.delay(1000); // 1 segundo

// Generar ID único
const id = Utils.generateId();

// Debounce
const debouncedSearch = Utils.debounce(searchFunction, 300);

// Throttle
const throttledScroll = Utils.throttle(scrollHandler, 200);

// Clonar objeto
const copy = Utils.clone(originalObject);

// Verificar si está vacío
if (Utils.isEmpty(value)) {
    console.log('Valor vacío');
}
```

### Animaciones

```javascript
const { Animations } = Vanilla;

// Fade in/out
Animations.fadeIn(element, 300);
Animations.fadeOut(element, 300);

// Slide in
Animations.slideIn(element, 'left', 300);
Animations.slideIn(element, 'top', 300);

// Pulse
Animations.pulse(element, 500);
```

## 🔐 Módulo de Autenticación

Importa funciones de `auth.js`:

```javascript
import {
    loginWithEmail,
    signUpWithEmail,
    logout,
    getCurrentUser,
    resetPassword,
    loginWithGoogle,
    loginWithFacebook,
} from './auth.js';

// Login
const result = await loginWithEmail('user@example.com', 'password');
if (result.success) {
    console.log('Autenticado:', result.user);
}

// Registro
const result = await signUpWithEmail(
    'user@example.com',
    'password',
    { full_name: 'Juan' }
);

// Obtener usuario actual
const user = await getCurrentUser();

// Logout
await logout();

// Recuperar contraseña
const result = await resetPassword('user@example.com');

// Escuchar cambios de sesión
const unsubscribe = await onAuthStateChange((event, session) => {
    console.log('Evento:', event);
    console.log('Sesión:', session);
});

// Desuscribirse
unsubscribe();
```

## 📝 Crear Nueva Página

### Estructura Básica

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Página</title>
    <style>
        /* Tu CSS aquí */
    </style>
</head>
<body>
    <div id="app">
        <!-- Tu HTML aquí -->
    </div>

    <!-- Importar Vanilla.js -->
    <script src="./vanilla.js"></script>
    
    <!-- Si necesitas autenticación -->
    <script src="./auth.js" type="module"></script>
    
    <!-- Tu código -->
    <script type="module">
        const { DOM, Form, Toast } = Vanilla;
        
        // Tu código aquí
    </script>
</body>
</html>
```

## 🔧 Configuración

### Variables de Entorno

Edita `.env.local` en la raíz de `/Web`:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Package.json

Para instalar Supabase localmente:

```bash
npm install
```

## 📦 Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Dispositivos móviles

## 🐛 Resolución de Problemas

### "Supabase no está cargado"
Verifica que `auth.js` está correctamente cargado en el HTML con `type="module"`.

### CORS Error
Asegúrate de que tu dominio está permitido en Supabase.

### Variables de entorno no se cargan
Para desarrollo local, reemplaza directamente en `auth.js` con tus credenciales.

## 📚 Documentación Official

- [Supabase Docs](https://supabase.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript ES6+](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)

## 💡 Tips

1. **Reutiliza componentes**: Crea funciones que retornen elementos del DOM
2. **Modulariza tu código**: Crea módulos separados para cada funcionalidad
3. **Usa CSS Grid/Flexbox**: Para layouts responsivos sin necesidad de frameworks
4. **Aprovecha ES Modules**: Importa/exporta código entre archivos
5. **Valida siempre**: Usa los validadores de Vanilla.js antes de enviar datos

## 📄 Licencia

MIT - Libre para usar en proyectos personales y comerciales

## 👨‍💻 Autor

Desarrollado para AgendaMédica

---

**¿Necesitas ayuda?** Revisa los archivos de ejemplo: `login.html`, `register.html`, `index.html`
