// The check-up questions. Edit the text freely.
//
// Question fields:
//   id          unique key
//   item        the checklist item this question checks (see checklist.js)
//   safeAnswer  'yes' or 'no': the answer that means the person is already protected
//   category, text, hint, why   { en, es }
//
// "I don't know" always counts as not protected yet.

export const questions = [
  {
    id: 'email-2fa',
    item: 'email',
    safeAnswer: 'yes',
    category: { en: 'Email', es: 'Correo' },
    text: {
      en: 'When you sign in to your email on a new device, does it ask for a code or a confirmation on your phone?',
      es: 'Cuando entras en tu correo desde un dispositivo nuevo, ¿te pide un código o una confirmación en el móvil?',
    },
    hint: {
      en: 'This is called two-step verification.',
      es: 'Esto se llama verificación en dos pasos.',
    },
    why: {
      en: 'Your email can reset all your other passwords. If someone gets into it, they can get into everything.',
      es: 'Con tu correo se pueden cambiar todas tus contraseñas. Si alguien entra en él, puede entrar en todo.',
    },
  },
  {
    id: 'recovery',
    item: 'recovery',
    safeAnswer: 'yes',
    category: { en: 'Email', es: 'Correo' },
    text: {
      en: 'Is the recovery phone number on your email account your current number?',
      es: '¿El teléfono de recuperación de tu correo es tu número actual?',
    },
    hint: {
      en: 'It is the number used to get your account back if you forget your password.',
      es: 'Es el número que se usa para recuperar la cuenta si olvidas la contraseña.',
    },
    why: {
      en: 'An old number may now belong to someone else, who could use it to get into your account.',
      es: 'Un número antiguo puede ser ahora de otra persona, que podría usarlo para entrar en tu cuenta.',
    },
  },
  {
    id: 'whatsapp',
    item: 'whatsapp',
    safeAnswer: 'yes',
    category: { en: 'WhatsApp', es: 'WhatsApp' },
    text: {
      en: 'Have you set a PIN for two-step verification in WhatsApp?',
      es: '¿Has puesto un PIN de verificación en dos pasos en WhatsApp?',
    },
    hint: {
      en: 'It is a 6-digit PIN that WhatsApp asks for now and then.',
      es: 'Es un PIN de 6 cifras que WhatsApp te pide de vez en cuando.',
    },
    why: {
      en: 'Stealing WhatsApp accounts is one of the most common scams. The PIN stops it.',
      es: 'Robar cuentas de WhatsApp es una de las estafas más comunes. El PIN lo impide.',
    },
  },
  {
    id: 'password-reuse',
    item: 'manager',
    safeAnswer: 'no',
    category: { en: 'Passwords', es: 'Contraseñas' },
    text: {
      en: 'Do you use the same password for more than one account?',
      es: '¿Usas la misma contraseña en más de una cuenta?',
    },
    hint: {
      en: 'For example, the same password for your email and your bank.',
      es: 'Por ejemplo, la misma contraseña para tu correo y tu banco.',
    },
    why: {
      en: 'When one website is hacked, criminals try the same password on your other accounts.',
      es: 'Cuando hackean una web, los delincuentes prueban esa misma contraseña en tus otras cuentas.',
    },
  },
  {
    id: 'bank-2fa',
    item: 'bank',
    safeAnswer: 'yes',
    category: { en: 'Bank', es: 'Banco' },
    text: {
      en: 'When you log in to your bank or social media, do you also need a code or a confirmation in an app?',
      es: 'Cuando entras en tu banco o tus redes sociales, ¿necesitas también un código o una confirmación en una app?',
    },
    hint: {
      en: 'Something more than just your password.',
      es: 'Algo más que tu contraseña.',
    },
    why: {
      en: 'With a second step, a stolen password alone is not enough to get in.',
      es: 'Con un segundo paso, una contraseña robada no basta para entrar.',
    },
  },
  {
    id: 'updates',
    item: 'updates',
    safeAnswer: 'yes',
    category: { en: 'Phone', es: 'Móvil' },
    text: {
      en: 'Does your phone install updates automatically?',
      es: '¿Tu móvil instala las actualizaciones automáticamente?',
    },
    hint: {
      en: 'Including updates for your apps.',
      es: 'Incluidas las actualizaciones de las apps.',
    },
    why: {
      en: 'Updates fix the holes criminals use to get into phones.',
      es: 'Las actualizaciones cierran los agujeros que usan los delincuentes para entrar en los móviles.',
    },
  },
  {
    id: 'screen-lock',
    item: 'lock',
    safeAnswer: 'yes',
    category: { en: 'Phone', es: 'Móvil' },
    text: {
      en: 'Does your phone ask for a PIN, fingerprint or face to unlock?',
      es: '¿Tu móvil pide un PIN, tu huella o tu cara para desbloquearse?',
    },
    hint: {
      en: 'Just swiping to unlock does not count.',
      es: 'Desbloquear solo deslizando el dedo no cuenta.',
    },
    why: {
      en: 'If you lose your phone, the lock protects your messages, photos and bank app.',
      es: 'Si pierdes el móvil, el bloqueo protege tus mensajes, tus fotos y la app del banco.',
    },
  },
  {
    id: 'leaks',
    item: 'leaks',
    safeAnswer: 'yes',
    category: { en: 'Passwords', es: 'Contraseñas' },
    text: {
      en: 'Have you checked if your email appeared in a data leak?',
      es: '¿Has comprobado si tu correo ha aparecido en alguna filtración de datos?',
    },
    hint: {
      en: 'Websites get hacked often, and lists of emails end up online.',
      es: 'Las webs sufren ataques a menudo y las listas de correos acaban en internet.',
    },
    why: {
      en: 'If your email appeared in a leak, you will know which passwords to change first.',
      es: 'Si tu correo aparece en una filtración, sabrás qué contraseñas cambiar primero.',
    },
  },
  {
    id: 'code-word',
    item: 'codeword',
    safeAnswer: 'yes',
    category: { en: 'Scams', es: 'Estafas' },
    text: {
      en: 'Does your family have a code word to prove it is really them on an urgent call or message?',
      es: '¿Tu familia tiene una palabra clave para demostrar que de verdad son ellos en una llamada o mensaje urgente?',
    },
    hint: {
      en: 'For example, if "your son" writes from a new number asking for money.',
      es: 'Por ejemplo, si «tu hijo» te escribe desde un número nuevo pidiendo dinero.',
    },
    why: {
      en: 'Scammers pretend to be family, and can even copy a voice with AI.',
      es: 'Los estafadores se hacen pasar por familiares e incluso pueden copiar una voz con IA.',
    },
  },
  {
    id: 'backup',
    item: 'backup',
    safeAnswer: 'yes',
    category: { en: 'Phone', es: 'Móvil' },
    text: {
      en: 'Are the photos on your phone backed up somewhere else?',
      es: '¿Las fotos de tu móvil tienen una copia en otro sitio?',
    },
    hint: {
      en: 'For example in iCloud, Google Photos or on a computer.',
      es: 'Por ejemplo en iCloud, Google Fotos o un ordenador.',
    },
    why: {
      en: 'If your phone breaks or is stolen, you will not lose your memories.',
      es: 'Si el móvil se rompe o te lo roban, no perderás tus recuerdos.',
    },
  },
];
