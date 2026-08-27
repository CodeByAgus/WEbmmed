import { supabase } from "./lib/supabase";

/**
 * Módulo de Autenticación con Supabase
 * Gestiona la conexión y autenticación de usuarios
 */

// Inicializar cliente de Supabase
let supabaseClient = null;

/**
 * Inicializa el cliente de Supabase
 * @returns {Promise<void>}
 */
async function initSupabase() {
  try {
    if (!supabase) {
      throw new Error('Supabase no está cargado. Asegúrate de incluir la librería.');
    }

    supabaseClient = supabase;
    console.log('✓ Cliente Supabase inicializado correctamente');
    return supabaseClient;
  } catch (error) {
    console.error('✗ Error al inicializar Supabase:', error);
    throw error;
  }
}

/**
 * Obtiene el cliente de Supabase
 * @returns {Promise<object>} Cliente de Supabase
 */
async function getSupabaseClient() {
  if (!supabaseClient) {
    await initSupabase();
  }
  return supabaseClient;
}

/**
 * Autentica un usuario con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<object>} Datos del usuario autenticado
 */
async function loginWithEmail(email, password) {
  try {
    const client = await getSupabaseClient();

    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✓ Sesión iniciada:', data.user.email);
    return {
      success: true,
      user: data.user,
      session: data.session,
    };
  } catch (error) {
    console.error('✗ Error al iniciar sesión:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Registra un nuevo usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @param {object} metadata - Datos adicionales del usuario (opcional)
 * @returns {Promise<object>} Datos del usuario registrado
 */
async function signUpWithEmail(email, password, metadata = {}) {
  try {
    const client = await getSupabaseClient();

    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✓ Usuario registrado:', data.user.email);
    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    console.error('✗ Error al registrar usuario:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Cierra la sesión del usuario actual
 * @returns {Promise<void>}
 */
async function logout() {
  try {
    const client = await getSupabaseClient();
    const { error } = await client.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    console.log('✓ Sesión cerrada');
    return { success: true };
  } catch (error) {
    console.error('✗ Error al cerrar sesión:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Obtiene el usuario actual
 * @returns {Promise<object>} Datos del usuario actual o null
 */
async function getCurrentUser() {
  try {
    const client = await getSupabaseClient();
    const { data, error } = await client.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  } catch (error) {
    console.error('✗ Error al obtener usuario actual:', error.message);
    return null;
  }
}

/**
 * Obtiene la sesión actual
 * @returns {Promise<object>} Datos de sesión o null
 */
async function getCurrentSession() {
  try {
    const client = await getSupabaseClient();
    const { data, error } = await client.auth.getSession();

    if (error) {
      throw new Error(error.message);
    }

    return data.session;
  } catch (error) {
    console.error('✗ Error al obtener sesión:', error.message);
    return null;
  }
}

/**
 * Envía un email para recuperar contraseña
 * @param {string} email - Email del usuario
 * @returns {Promise<object>} Resultado de la operación
 */
async function resetPassword(email) {
  try {
    const client = await getSupabaseClient();

    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/forgot-password/update`,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✓ Email de recuperación enviado');
    return { success: true };
  } catch (error) {
    console.error('✗ Error al enviar email:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Autentica con Google (OAuth)
 * @returns {Promise<object>} Resultado de la autenticación
 */
async function loginWithGoogle() {
  try {
    const client = await getSupabaseClient();

    const { data, error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✓ Autenticación con Google iniciada');
    return { success: true };
  } catch (error) {
    console.error('✗ Error al autenticar con Google:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Autentica con Facebook (OAuth)
 * @returns {Promise<object>} Resultado de la autenticación
 */
async function loginWithFacebook() {
  try {
    const client = await getSupabaseClient();

    const { data, error } = await client.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✓ Autenticación con Facebook iniciada');
    return { success: true };
  } catch (error) {
    console.error('✗ Error al autenticar con Facebook:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Guarda datos del usuario en la tabla 'profiles'
 * @param {string} userId - ID del usuario
 * @param {object} profile - Datos del perfil
 * @returns {Promise<object>} Resultado de la operación
 */
async function updateUserProfile(userId, profile) {
  try {
    const client = await getSupabaseClient();

    const { data, error } = await client
      .from('profiles')
      .upsert({
        id: userId,
        ...profile,
        updated_at: new Date(),
      });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✓ Perfil actualizado');
    return { success: true, data };
  } catch (error) {
    console.error('✗ Error al actualizar perfil:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Configura un oyente de cambios de autenticación
 * @param {function} callback - Función a ejecutar cuando cambia el estado de autenticación
 * @returns {function} Función para desuscribirse
 */
async function onAuthStateChange(callback) {
  try {
    const client = await getSupabaseClient();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });

    console.log('✓ Oyente de autenticación configurado');

    // Retornar función para desuscribirse
    return () => {
      subscription?.unsubscribe();
    };
  } catch (error) {
    console.error('✗ Error al configurar oyente:', error.message);
  }
}

// Exportar funciones del módulo
export {
  initSupabase,
  getSupabaseClient,
  loginWithEmail,
  signUpWithEmail,
  logout,
  getCurrentUser,
  getCurrentSession,
  resetPassword,
  loginWithGoogle,
  loginWithFacebook,
  updateUserProfile,
  onAuthStateChange,
};
