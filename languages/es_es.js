(function () {
	// Spanish
	angular.module('app').config(['$translateProvider', translate]);

	function translate($translateProvider) {
		$translateProvider.translations('es_es', {
			HELLO: 'Hola',
			WORLD: 'mundo',

			// 404 directive
			DEFAULT404_ERROR_TITLE: 'Página no encontrada',
			DEFAULT404_ERROR_MESSAGE: 'Esta página no ha podido ser encontrada, por favor comprueba la dirección de la página.',

			LOADING: 'Cargando...',
			LOADING_WAIT: 'Cargando la página. Por favor, espere',

			SIGN_IN: 'Iniciar sesión',
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

			// user profile menu in topbar
			PROFILE_MENU_ARIA_HINT: 'Abrir menú de usuario',
			PROFILE_MENU_MY_VIDEOS: 'Mis videos',
			PROFILE_MENU_LOGOUT: 'Cerrar sesión',

			GALLERY_FEATURED_VIDEOS: 'Vídeos destacados',
			GALLERY_VIEW_ALL: 'Ver todo',
			GALLERY_ORDER_BY: 'Ordenar por',
			GALLERY_ORDER_BY_SELECTOR_RELEVANCE: 'Relevancia',
			VIDEO_FEATURED: 'Destacado',
			VIDEO_VERIFIED: 'Verificado',
			VIDEO_NOT_VERIFIED: 'No verificado',
			DOWNLOAD_CODE: 'Introduce tu código de descarga',
			DOWNLOAD_VIDEO: 'Descargar',
			ERROR_DOWNLOAD_VIDEO: 'Vídeo erróneo',
			ERROR_DOWNLOAD_VIDEO_NOT_EXISTS: 'No hemos podido encontrar ese video. Por favor, comprueba que el enlace es correcto, y prueba de nuevo.',
			BACK_TO_GALLERY: 'Volver a la galería',
			ERROR_WRONG_DOWNLOAD_CODE: 'Código de descarga inválido',
			ERROR_UNABLE_TO_DOWNLOAD: 'No se ha podido descargar este vídeo',

			UPLOADED_AT: 'Fecha de subida',
			SHOW_VIDEO_DETAILS: 'Detalles técnicos',
			HIDE_VIDEO_DETAILS: 'Ocultar detalles técnicos',

			USER_PROFFESSIONAL: 'Profesional',
			PUBLISHED_VIDEOS: 'Vídeos publicados',
			UPLOADED_VIDEOS: 'Vídeos subidos',

			VIDEO_DETAIL_DATETIME: 'Fecha y hora',
			VIDEO_DETAIL_CATEGORIES: 'Categorías',
			VIDEO_DETAIL_PRODUCT_TYPE: 'Tipo',
			VIDEO_DETAIL_LENGTH: 'Duración',
			VIDEO_DETAIL_TECHNICAL_DETAILS: 'Detalles técnicos',
			VIDEO_DETAIL_TAGS: 'Etiquetas',
			VIDEO_DETAIL_LANGUAGE: 'Idioma',
			VIDEO_DETAIL_QUALITY: 'Calidad',
			VIDEO_DETAIL_CREDIBILITY: 'Credibilidad',
			VIDEO_PUBLISHED_CAPTION: 'Publicado',
			VIDEO_AUTHOR: 'Autor/a',
			'VIDEO_LANG_es-es': 'Español',
			'VIDEO_LANG_en-en': 'Inglés',
			'VIDEO_LANG_gl-es': 'Gallego',
			'VIDEO_LANG_ca-es': 'Catalán',
			'VIDEO_LANG_eu-es': 'Euskera',
			VIDEO_LANG_ambient: 'Sonido ambiente',
			VIDEO_LANG_other: 'Otro',
			VIDEO_CATEGORY_Events: 'Eventos',
			VIDEO_CATEGORY_International: 'Internacional',
			VIDEO_CATEGORY_National: 'Nacional',
			VIDEO_CATEGORY_Politics: 'Política',
			VIDEO_CATEGORY_Sports: 'Deportes',
			VIDEO_CATEGORY_Incidents: 'Sucesos',
			VIDEO_CATEGORY_Culture: 'Cultura',
			VIDEO_CATEGORY_Economy: 'Economía',
			VIDEO_CATEGORY_Health: 'Salud',
			VIDEO_CATEGORY_Tourism: 'Turismo',
			VIDEO_DELETE: 'Eliminar',
			VIDEO_CANCEL: 'Cancelar',
			VIDEO_SAVE: 'Guardar',
			VIDEO_DELETE_SUCCESS: 'Vídeo borrado con éxito',
			VIDEO_DELETE_FAILURE: 'Error borrando vídeo ',
			VIDEO_EDIT_FEATURE: 'Destacar',
			VIDEO_EDIT_VERIFY: 'Verificar',
			VIDEO_EDIT_PUBLISH: 'Publicar',
			VIDEO_EDIT_PICK_DATE: 'Fecha',
			VIDEO_EDIT_THUMBNAIL_DEFAULT: 'Miniatura por defecto',
			VIDEO_EDIT_THUMBNAIL_CUSTOM: 'Miniatura personalizada',
			VIDEO_EDIT_THUMBNAIL_CUSTOM_HINT: 'Cambiar la miniatura del vídeo',
			VIDEO_EDIT_MSG_INVALID_FORM: 'Ha habido errores procesando el formulario, por favor comprueba los campos.',
			VIDEO_EDIT_MSG_VIDEO_UPDATED: 'Vídeo actualizado!',
			VIDEO_EDIT_MSG_ERROR_UPDATING_VIDEO: 'Error actualizando vídeo!',
			VIDEO_EDIT_VIDEO_FILE: 'Fichero de vídeo',
			VIDEO_EDIT_VIDEO_FILE_HINT: 'Sustituir vídeo',
			VIDEO_EDIT_VIDEO_FILE_MAX_SIZE: 'Tamaño máximo del vídeo:',
			VIDEO_EDIT_CLICK_MAP_HINT: 'Escribe una dirección o haz click en el mapa para indicar la posición exacta del vídeo',
			VIDEO_EDIT_LOCATION_HINT: 'Usa el mapa de abajo para establecer la ubicación del vídeo.',
			VIDEO_EDIT_GOT_BROWSER_LOCATION: 'Usando la localización de su navegador',
			VIDEO_EDIT_TAG_HINT: 'Etiquetas',
			VIDEO_EDIT_TAG_HINT_SECONDARY: 'Etiquetas separadas por comas',
			VIDEO_DETAIL_PRICE_STD: 'Precio de emisión estándar',
			VIDEO_DETAIL_PRICE_COUNTRY: 'Precio de antena en país',
			VIDEO_DETAIL_PRICE_CONTINENT: 'Precio de antena continental',
			VIDEO_DETAIL_PRICE_WORLD: 'Precio de antena mundial',
			VIDEO_DETAIL_PRODUCT_TYPE_LONG: 'Tipo de producto',
			VIDEO_DETAIL_TITLE: 'Título',
			VIDEO_DETAIL_SUMMARY: 'Descripción',
			VIDEO_DETAIL_LOCATION: 'Ubicación',
			VIDEO_DETAIL_NOTES: 'Observaciones',


			VIDEO_ERROR: 'Vídeo erróneo',
			VIDEO_NOT_FOUND: 'No hemos podido encontrar ese vídeo. Por favor, comprueba que el enlace es correcto, y prueba de nuevo.',

			DROP_VIDEO: 'Arrastra tu vídeo o haz click para subirlo',
			UPLOAD_TITLE: 'Subida',
			UPLOADING_FILE: 'Subiendo tu vídeo...',
			UPLOAD_TITLE_PLACEHOLDER: 'Título',
			UPLOAD_DESCRIPTION_PLACEHOLDER: 'Descripcion',
			UPLOAD_SEND: 'Subir vídeo',
			UPLOAD_UPLOADING: 'Subiendo',
			UPLOAD_ERROR_DATA: 'Vídeo no seleccionado, o información no rellenada',

			PRODUCT_TYPE_LIVE_ON_TAPE: 'Falso directo',
			PRODUCT_TYPE_B_ROLL: 'Brutos',
			PRODUCT_TYPE_NAT_VO: 'Colas',
			PRODUCT_TYPE_INTERVIEW: 'Total',
			PRODUCT_TYPE_GRAPHICS: 'Gráfico',
			PRODUCT_TYPE_PIECE: 'Pieza',
			
			BUTTON_READ_ALL: 'Leer todo',
			BUTTON_READ_LESS: 'Leer menos',
			BUTTON_EDIT: 'Editar',
			BUTTON_DELETE: 'Borrar',

			// Search page
			SHOWING_RESULTS_FOR: 'Mostrando {{count}} resultados para',

			// User Gallery page
			USER_GALLERY_USER_VIDEOS: 'Vídeos de {{username}}',
			USER_GALLERY_USER_NOT_FOUND_TITLE: 'Usuario no encontrado',
			USER_GALLERY_USER_NOT_FOUND_DESCRIPTION: 'No hemos podido encontrar este usuario. Por favor, comprueba que el enlace es correcto, y prueba de nuevo.',
		
			// Clients
			ADD_CLIENT: 'Añadir cliente',
			CLIENT_EMPTY_LIST: 'No hay clientes a los que distribuir. Añade uno primero.',
			CLIENT_NAME: 'Nombre',
			CLIENT_HOST: 'Host',
			CLIENT_USERNAME: 'Usuario',
			CLIENT_PASSWORD: 'Contraseña',
			CLIENT_SFTP: 'SFTP',
			CLIENT_FOLDER: 'Carpeta',
			CLIENT_CANCEL: 'Cancelar',
			CLIENT_SAVE: 'Guardar',
			CLIENT_REMOVE_CONFIRM: '¿Seguro que quieres eliminar el cliente? Esta acción es permanente, y no se puede deshacer.',
			CLIENT_MANDATORY_FIELDS: 'Todos los campos son obligatorios',
			CLIENT_SAVED: 'Cliente guardado',

			// Distribution
			DISTRIBUTE: 'Distribuir',
			DISTRIBUTE_DONE: 'Vídeo distribuido',
			VIDEO_NOT_DISTRIBUTED_YET: 'Éste vídeo no se ha distribuido por FTP',
			SHOW_VIDEO_DISTRIBUTION: 'Mostrar distrbución',
			HIDE_VIDEO_DISTRIBUTION: 'Ocultar distrbución',
			
			TERMS: 'Términos y condiciones de uso'
		});
	}
}());
