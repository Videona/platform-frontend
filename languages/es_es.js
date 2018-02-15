(function () {
	// English
	angular.module('app').config(['$translateProvider', translate]);

	function translate($translateProvider) {
		$translateProvider.translations('es_es', {
			HELLO: 'Hola',
			WORLD: 'mundo',

			LOADING: 'cargando...',

			LOGIN: 'Acceder',
			REGISTER: 'Registro',
			USERNAME: 'Usuario',
			PASSWORD: 'Contraseña',
			EMAIL: 'Correo electrónico',
			FORGOTTEN_PASSWORD: '¿Has olvidado tu contraseña?',
			LOGIN_ACTION: 'Inicia sesión',
			REGISTER_ACTION: 'Regístrate',
			NEXT_ACTION: 'Siguiente',
			WRONG_LOGIN: 'Usuario o contraseña incorrectos. Inténtalo de nuevo, por favor.',
			WRONG_REGISTER: 'Los datos de registro son incorrectos. Revísalos, e inténtalo de nuevo, por favor.',
			REGISTER_SLOGAN: 'Aplicación de periodismo móvil\nRompiendo la barrera de edición en móvil.',
			QUESTION_AGE: '¿Cuántos años tienes?',
			ACCEPT_CONDITIONS_1: 'He leído, entiendo y acepto ',
			CONDITIONS: 'las condiciones del servicio',
			ACCEPT_CONDITIONS_2: ' de Vimojo',
			COMPLETED: '¡Listo!',
			ERROR_USERNAME_EMPTY: 'El nombre de usuario no puede estar vacío.',
			ERROR_USERNAME_MIN_LENGTH: 'El nombre de usuario necesita ser mas largo.',
			ERROR_USERNAME_MAX_LENGTH: 'El nombre de usuario necesita ser menos largo',
			ERROR_USERNAME_ALREADY_IN_USE: 'El nombre de usuario ya está en uso. Prueba con uno nuevo.',
			ERROR_PASSWORD_EMPTY: 'La contraseña no puede estar vacía.',
			ERROR_PASSWORD_MIN_LENGTH: 'La contraseña necesita ser mas larga.',
			ERROR_PASSWORD_MAX_LENGTH: 'La contraseña necesita ser menos larga.',
			ERROR_EMAIL_EMPTY: 'El email no puede estar vacío.',
			ERROR_EMAIL_MIN_LENGTH: 'El email necesita ser mas largo.',
			ERROR_EMAIL_MAX_LENGTH: 'El email necesita ser menos largo.',
			ERROR_EMAIL_NOT_VALID: 'El email no es válido.',
			ERROR_EMAIL_ALREADY_IN_USE: 'El email ya está en uso. Prueba con uno nuevo.',
			ERROR_AGE_EMPTY: 'La edad no puede estar vacía.',
			ERROR_AGE_WRONG: 'La edad tiene que ser válida.',
			ERROR_TERMS_EMPTY: 'Tienes que aceptar los términos y condiciones de uso.',
			ERROR_RECAPTCHA_NOT_CHECKED: 'En esta aplicación solo aceptamos humanos ¿Acaso eres un robot?',
			DOWNLOAD_CODE: 'Introduce un código de descarga',
			VERIFIED: 'Video verificado',
			DOWNLOAD_VIDEO: 'Descargar video',
			BACK_TO_GALLERY: 'Volver a la galería',
			ERROR_WRONG_DOWNLOAD_CODE: 'Código de descarga inválido'
		});
	}
}());
