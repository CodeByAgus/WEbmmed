/**
 * Vanilla.js - Framework de Utilidades UI Modular
 * Proporciona herramientas reutilizables para HTML puro sin dependencias
 */

/**
 * ============================================
 * 1. GESTIÓN DEL DOM
 * ============================================
 */

const DOM = {
  /**
   * Selecciona un elemento del DOM
   */
  select(selector) {
    return document.querySelector(selector);
  },

  /**
   * Selecciona todos los elementos que coincidan
   */
  selectAll(selector) {
    return document.querySelectorAll(selector);
  },

  /**
   * Crea un elemento HTML
   */
  create(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'class') {
        element.className = value;
      } else if (key === 'style') {
        Object.assign(element.style, value);
      } else {
        element.setAttribute(key, value);
      }
    });

    if (content) {
      element.innerHTML = content;
    }

    return element;
  },

  /**
   * Agrega una clase a un elemento
   */
  addClass(element, className) {
    element.classList.add(className);
  },

  /**
   * Remueve una clase de un elemento
   */
  removeClass(element, className) {
    element.classList.remove(className);
  },

  /**
   * Alterna una clase
   */
  toggleClass(element, className) {
    element.classList.toggle(className);
  },

  /**
   * Verifica si un elemento tiene una clase
   */
  hasClass(element, className) {
    return element.classList.contains(className);
  },

  /**
   * Establece atributos en un elemento
   */
  setAttributes(element, attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  },

  /**
   * Obtiene el valor de un atributo
   */
  getAttribute(element, attribute) {
    return element.getAttribute(attribute);
  },

  /**
   * Establece contenido HTML
   */
  setHTML(element, html) {
    element.innerHTML = html;
  },

  /**
   * Obtiene contenido HTML
   */
  getHTML(element) {
    return element.innerHTML;
  },

  /**
   * Establece contenido texto
   */
  setText(element, text) {
    element.textContent = text;
  },

  /**
   * Obtiene contenido texto
   */
  getText(element) {
    return element.textContent;
  },

  /**
   * Mostrar un elemento
   */
  show(element) {
    element.style.display = '';
  },

  /**
   * Ocultar un elemento
   */
  hide(element) {
    element.style.display = 'none';
  },

  /**
   * Verifica si un elemento es visible
   */
  isVisible(element) {
    return element.style.display !== 'none';
  },

  /**
   * Agregar elemento hijo
   */
  append(parent, child) {
    parent.appendChild(child);
  },

  /**
   * Remover elemento
   */
  remove(element) {
    element.remove();
  },

  /**
   * Limpiar contenido
   */
  clear(element) {
    element.innerHTML = '';
  },

  /**
   * Obtener elemento padre
   */
  parent(element) {
    return element.parentElement;
  },

  /**
   * Obtener elementos hijos
   */
  children(element) {
    return Array.from(element.children);
  },
};

/**
 * ============================================
 * 2. GESTIÓN DE EVENTOS
 * ============================================
 */

const Events = {
  /**
   * Agregar listener a un elemento
   */
  on(element, event, handler) {
    element.addEventListener(event, handler);
    return () => element.removeEventListener(event, handler);
  },

  /**
   * Remover listener
   */
  off(element, event, handler) {
    element.removeEventListener(event, handler);
  },

  /**
   * Agregar listener de una sola vez
   */
  once(element, event, handler) {
    element.addEventListener(event, handler, { once: true });
  },

  /**
   * Disparar evento personalizado
   */
  emit(element, eventName, detail = {}) {
    const event = new CustomEvent(eventName, { detail });
    element.dispatchEvent(event);
  },

  /**
   * Delegar eventos
   */
  delegate(parent, event, selector, handler) {
    parent.addEventListener(event, (e) => {
      const target = e.target.closest(selector);
      if (target) {
        handler.call(target, e);
      }
    });
  },
};

/**
 * ============================================
 * 3. VALIDACIÓN DE FORMULARIOS
 * ============================================
 */

const Validators = {
  /**
   * Validar email
   */
  email(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  },

  /**
   * Validar contraseña
   */
  password(value, minLength = 6) {
    return value.length >= minLength;
  },

  /**
   * Validar teléfono
   */
  phone(value) {
    return /^[0-9\s\-\+\(\)]{7,}$/.test(value);
  },

  /**
   * Validar número
   */
  number(value) {
    return !isNaN(value) && value !== '';
  },

  /**
   * Validar URL
   */
  url(value) {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validar que no esté vacío
   */
  required(value) {
    return value.trim().length > 0;
  },

  /**
   * Validar longitud mínima
   */
  minLength(value, min) {
    return value.length >= min;
  },

  /**
   * Validar longitud máxima
   */
  maxLength(value, max) {
    return value.length <= max;
  },

  /**
   * Validar patrón regex
   */
  pattern(value, regex) {
    return regex.test(value);
  },

  /**
   * Validar coincidencia entre dos valores
   */
  match(value1, value2) {
    return value1 === value2;
  },
};

/**
 * ============================================
 * 4. GESTIÓN DE FORMULARIOS
 * ============================================
 */

const Form = {
  /**
   * Obtener datos de un formulario
   */
  getData(formElement) {
    const formData = new FormData(formElement);
    return Object.fromEntries(formData);
  },

  /**
   * Establecer datos en un formulario
   */
  setData(formElement, data) {
    Object.entries(data).forEach(([key, value]) => {
      const input = formElement.elements[key];
      if (input) {
        if (input.type === 'checkbox' || input.type === 'radio') {
          input.checked = value;
        } else {
          input.value = value;
        }
      }
    });
  },

  /**
   * Limpiar formulario
   */
  clear(formElement) {
    formElement.reset();
  },

  /**
   * Deshabilitar formulario
   */
  disable(formElement, disabled = true) {
    Array.from(formElement.elements).forEach((element) => {
      element.disabled = disabled;
    });
  },

  /**
   * Validar formulario
   */
  validate(formElement, rules) {
    const errors = {};
    const data = this.getData(formElement);

    Object.entries(rules).forEach(([fieldName, fieldRules]) => {
      const value = data[fieldName] || '';
      const fieldErrors = [];

      fieldRules.forEach((rule) => {
        if (typeof rule === 'function') {
          if (!rule(value)) {
            fieldErrors.push(`Campo ${fieldName} es inválido`);
          }
        } else if (typeof rule === 'object') {
          const { validator, message } = rule;
          if (!validator(value)) {
            fieldErrors.push(message || `Campo ${fieldName} es inválido`);
          }
        }
      });

      if (fieldErrors.length > 0) {
        errors[fieldName] = fieldErrors;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  /**
   * Obtener valor de un campo
   */
  getValue(formElement, fieldName) {
    const input = formElement.elements[fieldName];
    if (!input) return null;

    if (input.type === 'checkbox') {
      return input.checked;
    } else if (input.type === 'radio') {
      return formElement.querySelector(`input[name="${fieldName}"]:checked`)?.value;
    }
    return input.value;
  },

  /**
   * Establecer valor de un campo
   */
  setValue(formElement, fieldName, value) {
    const input = formElement.elements[fieldName];
    if (!input) return;

    if (input.type === 'checkbox' || input.type === 'radio') {
      input.checked = value;
    } else {
      input.value = value;
    }
  },

  /**
   * Marcar campo como inválido
   */
  markInvalid(input, message = '') {
    DOM.addClass(input, 'is-invalid');
    if (message) {
      input.dataset.error = message;
    }
  },

  /**
   * Remover marca de inválido
   */
  markValid(input) {
    DOM.removeClass(input, 'is-invalid');
    delete input.dataset.error;
  },
};

/**
 * ============================================
 * 5. NOTIFICACIONES Y MENSAJES
 * ============================================
 */

const Toast = {
  container: null,

  /**
   * Inicializar contenedor de notificaciones
   */
  init() {
    if (!this.container) {
      this.container = DOM.create('div', {
        class: 'toast-container',
        style: {
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: '9999',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        },
      });
      document.body.appendChild(this.container);
    }
  },

  /**
   * Mostrar notificación
   */
  show(message, type = 'info', duration = 3000) {
    this.init();

    const toast = DOM.create(
      'div',
      {
        class: `toast toast-${type}`,
        style: {
          padding: '15px 20px',
          borderRadius: '5px',
          color: 'white',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          animation: 'slideIn 0.3s ease-out',
          backgroundColor:
            type === 'success'
              ? '#10b981'
              : type === 'error'
                ? '#ef4444'
                : type === 'warning'
                  ? '#f59e0b'
                  : '#3b82f6',
        },
      },
      message
    );

    DOM.append(this.container, toast);

    if (duration > 0) {
      setTimeout(() => {
        DOM.removeClass(toast, 'show');
        setTimeout(() => DOM.remove(toast), 300);
      }, duration);
    }

    return toast;
  },

  /**
   * Mostrar notificación de éxito
   */
  success(message, duration = 3000) {
    return this.show(message, 'success', duration);
  },

  /**
   * Mostrar notificación de error
   */
  error(message, duration = 5000) {
    return this.show(message, 'error', duration);
  },

  /**
   * Mostrar notificación de advertencia
   */
  warning(message, duration = 4000) {
    return this.show(message, 'warning', duration);
  },

  /**
   * Mostrar notificación informativa
   */
  info(message, duration = 3000) {
    return this.show(message, 'info', duration);
  },
};

/**
 * ============================================
 * 6. ALMACENAMIENTO LOCAL
 * ============================================
 */

const Storage = {
  /**
   * Guardar en localStorage
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  },

  /**
   * Obtener de localStorage
   */
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error al leer localStorage:', error);
      return null;
    }
  },

  /**
   * Remover de localStorage
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error al remover de localStorage:', error);
    }
  },

  /**
   * Limpiar todo localStorage
   */
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error al limpiar localStorage:', error);
    }
  },

  /**
   * Verificar si existe una clave
   */
  has(key) {
    return localStorage.getItem(key) !== null;
  },
};

/**
 * ============================================
 * 7. UTILIDADES HTTP
 * ============================================
 */

const HTTP = {
  /**
   * Realizar petición GET
   */
  async get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  },

  /**
   * Realizar petición POST
   */
  async post(url, data = {}, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Realizar petición PUT
   */
  async put(url, data = {}, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Realizar petición DELETE
   */
  async delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  },

  /**
   * Petición genérica
   */
  async request(url, options = {}) {
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

/**
 * ============================================
 * 8. UTILIDADES GENERALES
 * ============================================
 */

const Utils = {
  /**
   * Esperar tiempo especificado
   */
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  /**
   * Generar ID único
   */
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  },

  /**
   * Debounce una función
   */
  debounce(func, delay = 300) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  },

  /**
   * Throttle una función
   */
  throttle(func, limit = 300) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * Clonar objeto
   */
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Fusionar objetos
   */
  merge(...objects) {
    return Object.assign({}, ...objects);
  },

  /**
   * Obtener tipo de dato
   */
  getType(value) {
    return typeof value === 'object'
      ? Array.isArray(value)
        ? 'array'
        : value === null
          ? 'null'
          : 'object'
      : typeof value;
  },

  /**
   * Validar si es vacío
   */
  isEmpty(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  },
};

/**
 * ============================================
 * 9. ANIMACIONES
 * ============================================
 */

const Animations = {
  /**
   * Fade in
   */
  fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-in`;
    setTimeout(() => {
      element.style.opacity = '1';
    }, 10);
  },

  /**
   * Fade out
   */
  fadeOut(element, duration = 300) {
    element.style.opacity = '1';
    element.style.transition = `opacity ${duration}ms ease-out`;
    element.style.opacity = '0';
  },

  /**
   * Slide in
   */
  slideIn(element, direction = 'left', duration = 300) {
    const transform =
      direction === 'left'
        ? 'translateX(-100%)'
        : direction === 'right'
          ? 'translateX(100%)'
          : direction === 'top'
            ? 'translateY(-100%)'
            : 'translateY(100%)';

    element.style.transform = transform;
    element.style.transition = `transform ${duration}ms ease-out`;
    setTimeout(() => {
      element.style.transform = 'translate(0, 0)';
    }, 10);
  },

  /**
   * Pulse
   */
  pulse(element, duration = 500) {
    element.style.animation = `pulse ${duration}ms ease-in-out`;
    setTimeout(() => {
      element.style.animation = '';
    }, duration);
  },
};

/**
 * ============================================
 * 10. EXPORTAR MÓDULO
 * ============================================
 */

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DOM,
    Events,
    Validators,
    Form,
    Toast,
    Storage,
    HTTP,
    Utils,
    Animations,
  };
}

/**
 * Hacer disponible globalmente en navegador
 */
window.Vanilla = {
  DOM,
  Events,
  Validators,
  Form,
  Toast,
  Storage,
  HTTP,
  Utils,
  Animations,
};
