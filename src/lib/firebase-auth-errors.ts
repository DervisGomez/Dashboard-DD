import { FirebaseError } from "firebase/app";

export function getFirebaseAuthErrorMessage(
  error: unknown
): string {
  if (
    error instanceof Error &&
    error.message === "NOT_ADMIN"
  ) {
    return (
      "Esta cuenta no tiene acceso al panel administrativo. " +
      "Debe existir un documento activo en la colección admins."
    );
  }

  if (
    error instanceof Error &&
    error.message === "ADMIN_INACTIVE"
  ) {
    return "Tu cuenta de administrador está desactivada.";
  }

  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Correo o contraseña incorrectos. Verifica tus datos e intenta de nuevo.";

      case "auth/invalid-email":
        return "El formato del correo no es válido.";

      case "auth/too-many-requests":
        return "Demasiados intentos fallidos. Espera un momento e inténtalo otra vez.";

      case "auth/network-request-failed":
        return "Sin conexión. Revisa tu red e intenta de nuevo.";

      case "auth/user-disabled":
        return "Esta cuenta ha sido deshabilitada.";

      default:
        return "No se pudo iniciar sesión. Intenta de nuevo.";
    }
  }

  return "No se pudo iniciar sesión. Intenta de nuevo.";
}
