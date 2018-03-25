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
			GALLERY_FEATURED_VIDEOS: 'Featured videos',
			GALLERY_VIEW_ALL: 'Ver todo',
			GALLERY_ORDER_BY: 'Ordenar por',
			GALLERY_ORDER_BY_SELECTOR_RELEVANCE: 'Relevancia',
			VIDEO_VERIFIED: 'Verificado',
			VIDEO_NOT_VERIFIED: 'No verificado',
			DOWNLOAD_CODE: 'Introduce un código de descarga',
			DOWNLOAD_VIDEO: 'Descargar video',
			BACK_TO_GALLERY: 'Volver a la galería',
			ERROR_WRONG_DOWNLOAD_CODE: 'Código de descarga inválido',

			SHOW_VIDEO_DETAILS: 'Mostrar detalles del video',
			HIDE_VIDEO_DETAILS: 'Ocultar detalles del video',

			USER_PROFFESSIONAL: 'Profesional',
			PUBLISHED_VIDEOS: 'Videos publicados',

			VIDEO_DETAIL_DATETIME: 'Fecha y hora',
			VIDEO_DETAIL_CATEGORIES: 'Categorías',
			VIDEO_DETAIL_PRODUCT_TYPE: 'Tipo',
			VIDEO_DETAIL_LENGTH: 'Duración',
			VIDEO_DETAIL_TECHNICAL_DETAILS: 'Detalles técnicos',
			VIDEO_DETAIL_TAGS: 'Etiquetas',
			VIDEO_DETAIL_LANGUAGE: 'Idioma',
			VIDEO_DETAIL_QUALITY: 'Calidad',
			VIDEO_DETAIL_CREDIBILITY: 'Credibilidad',
			VIDEO_AUTHOR: 'Autor/a',
			
			VIDEO_ERROR: 'Video erróneo',
			VIDEO_NOT_FOUND: 'No hemos podido encontrar ese video. Por favor, comprueba que el enlace es correcto, y prueba de nuevo.',

			DROP_VIDEO: 'Arrastra tu video o haz click para subirlo',
			UPLOADING_FILE: 'Subiendo tu video...',
			UPLOAD_TITLE_PLACEHOLDER: 'Título',
			UPLOAD_DESCRIPTION_PLACEHOLDER: 'Descripcion',
			UPLOAD_SEND: 'Subir video',

			PRODUCT_TYPE_FAKELIVE: 'Falso directo',
			PRODUCT_TYPE_RAW: 'Vídeos brutos',
			PRODUCT_TYPE_SPOOLERS: 'Colas',
			PRODUCT_TYPE_TOTAL: 'Total',
			PRODUCT_TYPE_GRAPHIC: 'Gráfico',
			PRODUCT_TYPE_PIECES: 'Piezas',
			// User Gallery page
			USER_GALLERY_USER_VIDEOS: 'Vídeos de {{username}}',
			USER_GALLERY_USER_NOT_FOUND_TITLE: 'Usuario no encontrado',
			USER_GALLERY_USER_NOT_FOUND_DESCRIPTION: 'No hemos podido encontrar este usuario. Por favor, comprueba que el enlace es correcto, y prueba de nuevo.',
			
			BUTTON_READ_ALL: 'Leer todo',
			BUTTON_EDIT: 'Editar',
		});
	}
}());
