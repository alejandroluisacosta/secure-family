// The checklist: every safety step, in priority order.
// Edit the text freely. Each item has English (en) and Spanish (es) versions.
//
// Item fields:
//   id       unique key, also used by the check-up questions
//   section  'important' | 'next' | 'extra'
//   minutes  rough time it takes
//   title, why, tip   { en, es }
//   guide    either { steps: { en: [], es: [] } }
//            or     { tabs: [{ id, label: { en, es }, steps: { en: [], es: [] } }] }
//   link     optional { url, label: { en, es } }

export const checklist = [
  {
    id: 'email',
    section: 'important',
    minutes: 5,
    title: {
      en: 'Protect your main email account',
      es: 'Protege tu cuenta de correo principal',
    },
    why: {
      en: 'Your email can reset all your other passwords, so it is the key to everything. Give it a strong password and turn on two-step verification.',
      es: 'Con tu correo se pueden cambiar todas tus otras contraseñas: es la llave de todo. Ponle una contraseña fuerte y activa la verificación en dos pasos.',
    },
    tip: {
      en: 'A strong password is long, like three or four random words together: lamp-river-orange-cloud.',
      es: 'Una contraseña fuerte es larga, como tres o cuatro palabras al azar juntas: lámpara-río-naranja-nube.',
    },
    guide: {
      tabs: [
        {
          id: 'gmail',
          label: { en: 'Gmail', es: 'Gmail' },
          steps: {
            en: [
              'Go to myaccount.google.com and sign in.',
              'Tap Security.',
              'Find 2-Step Verification and tap it.',
              'Tap Turn on and follow the steps. Google will send a code to your phone.',
              'If Google shows you backup codes, write them on paper and keep them at home.',
            ],
            es: [
              'Entra en myaccount.google.com e inicia sesión.',
              'Toca Seguridad.',
              'Busca Verificación en dos pasos y tócala.',
              'Toca Activar y sigue los pasos. Google enviará un código a tu móvil.',
              'Si Google te muestra códigos de seguridad, apúntalos en papel y guárdalos en casa.',
            ],
          },
        },
        {
          id: 'apple',
          label: { en: 'iCloud / Apple', es: 'iCloud / Apple' },
          steps: {
            en: [
              'Open Settings on your iPhone and tap your name at the top.',
              'Tap Sign-In & Security.',
              'Check that Two-Factor Authentication says On.',
              'If it is off, tap it and follow the steps.',
            ],
            es: [
              'Abre Ajustes en tu iPhone y toca tu nombre arriba del todo.',
              'Toca Inicio de sesión y seguridad.',
              'Comprueba que Autenticación de doble factor aparece como activada.',
              'Si está desactivada, tócala y sigue los pasos.',
            ],
          },
        },
        {
          id: 'microsoft',
          label: { en: 'Outlook / Hotmail', es: 'Outlook / Hotmail' },
          steps: {
            en: [
              'Go to account.microsoft.com and sign in.',
              'Open Security.',
              'Look for Two-step verification (it may be under Advanced security options).',
              'Turn it on and follow the steps.',
            ],
            es: [
              'Entra en account.microsoft.com e inicia sesión.',
              'Abre Seguridad.',
              'Busca Verificación en dos pasos (puede estar en Opciones de seguridad avanzadas).',
              'Actívala y sigue los pasos.',
            ],
          },
        },
      ],
    },
  },
  {
    id: 'recovery',
    section: 'important',
    minutes: 3,
    title: {
      en: 'Check your recovery phone and email',
      es: 'Revisa tu teléfono y correo de recuperación',
    },
    why: {
      en: 'If you are ever locked out, this is how you get back in. Make sure the phone number and email are still yours.',
      es: 'Si alguna vez no puedes entrar, así recuperas tu cuenta. Asegúrate de que el número y el correo siguen siendo tuyos.',
    },
    guide: {
      tabs: [
        {
          id: 'gmail',
          label: { en: 'Gmail', es: 'Gmail' },
          steps: {
            en: [
              'Go to myaccount.google.com and tap Security.',
              'Find Recovery phone and Recovery email.',
              'Check they are correct. If not, tap each one and update it.',
            ],
            es: [
              'Entra en myaccount.google.com y toca Seguridad.',
              'Busca Teléfono de recuperación y Correo de recuperación.',
              'Comprueba que son correctos. Si no, toca cada uno y actualízalo.',
            ],
          },
        },
        {
          id: 'apple',
          label: { en: 'iCloud / Apple', es: 'iCloud / Apple' },
          steps: {
            en: [
              'Open Settings and tap your name at the top.',
              'Tap Sign-In & Security.',
              'Check the email addresses and phone numbers listed. Remove any you no longer use.',
              'If you can, add the phone number of a family member you trust.',
            ],
            es: [
              'Abre Ajustes y toca tu nombre arriba del todo.',
              'Toca Inicio de sesión y seguridad.',
              'Revisa los correos y números de teléfono que aparecen. Quita los que ya no uses.',
              'Si puedes, añade el número de un familiar de confianza.',
            ],
          },
        },
        {
          id: 'microsoft',
          label: { en: 'Outlook / Hotmail', es: 'Outlook / Hotmail' },
          steps: {
            en: [
              'Go to account.microsoft.com and open Security.',
              'Look at the ways Microsoft can contact you (often under Advanced security options).',
              'Remove old phone numbers or emails and add your current ones.',
            ],
            es: [
              'Entra en account.microsoft.com y abre Seguridad.',
              'Mira las formas en que Microsoft puede contactarte (suelen estar en Opciones de seguridad avanzadas).',
              'Quita los teléfonos o correos antiguos y añade los actuales.',
            ],
          },
        },
      ],
    },
  },
  {
    id: 'whatsapp',
    section: 'important',
    minutes: 2,
    title: {
      en: 'Turn on WhatsApp two-step verification',
      es: 'Activa la verificación en dos pasos de WhatsApp',
    },
    why: {
      en: 'This stops someone from taking over your WhatsApp, even if they trick you into sharing the 6-digit SMS code.',
      es: 'Evita que alguien se quede con tu WhatsApp, incluso si te engaña para que le des el código de 6 cifras del SMS.',
    },
    tip: {
      en: 'Never share the code WhatsApp sends you by SMS, not even with someone who says they are from WhatsApp or a friend.',
      es: 'Nunca compartas el código que WhatsApp te envía por SMS, ni siquiera con alguien que dice ser de WhatsApp o un amigo.',
    },
    guide: {
      tabs: [
        {
          id: 'iphone',
          label: { en: 'iPhone', es: 'iPhone' },
          steps: {
            en: [
              'Open WhatsApp and tap Settings (bottom right).',
              'Tap Account, then Two-step verification.',
              'Tap Turn on and choose a 6-digit PIN you will remember.',
              'Add an email address in case you ever forget the PIN.',
            ],
            es: [
              'Abre WhatsApp y toca Configuración (abajo a la derecha).',
              'Toca Cuenta y luego Verificación en dos pasos.',
              'Toca Activar y elige un PIN de 6 cifras que vayas a recordar.',
              'Añade un correo por si algún día olvidas el PIN.',
            ],
          },
        },
        {
          id: 'android',
          label: { en: 'Android', es: 'Android' },
          steps: {
            en: [
              'Open WhatsApp, tap the three dots (top right), then Settings.',
              'Tap Account, then Two-step verification.',
              'Tap Turn on and choose a 6-digit PIN you will remember.',
              'Add an email address in case you ever forget the PIN.',
            ],
            es: [
              'Abre WhatsApp, toca los tres puntos (arriba a la derecha) y luego Ajustes.',
              'Toca Cuenta y luego Verificación en dos pasos.',
              'Toca Activar y elige un PIN de 6 cifras que vayas a recordar.',
              'Añade un correo por si algún día olvidas el PIN.',
            ],
          },
        },
      ],
    },
  },
  {
    id: 'bank',
    section: 'important',
    minutes: 10,
    title: {
      en: 'Turn on two-step verification for your bank and social media',
      es: 'Activa la verificación en dos pasos en tu banco y redes sociales',
    },
    why: {
      en: 'With a second step, a stolen password alone is no longer enough for someone to get in.',
      es: 'Con un segundo paso, una contraseña robada ya no basta para entrar.',
    },
    guide: {
      tabs: [
        {
          id: 'bank',
          label: { en: 'Bank', es: 'Banco' },
          steps: {
            en: [
              "Open your bank's app and look in Settings or Security.",
              'Turn on notifications for every payment and card purchase.',
              'If you can confirm payments in the app instead of by SMS, choose the app.',
              'Remember: your bank will never ask for your passwords or codes by phone, SMS or email.',
            ],
            es: [
              'Abre la app de tu banco y busca en Ajustes o Seguridad.',
              'Activa los avisos de cada pago y compra con tarjeta.',
              'Si puedes confirmar los pagos en la app en lugar de por SMS, elige la app.',
              'Recuerda: tu banco nunca te pedirá contraseñas ni códigos por teléfono, SMS o correo.',
            ],
          },
        },
        {
          id: 'meta',
          label: { en: 'Facebook & Instagram', es: 'Facebook e Instagram' },
          steps: {
            en: [
              'Open the app and go to Settings.',
              'Open Accounts Center, then Password and security.',
              'Tap Two-factor authentication and choose your account.',
              'Choose an authentication app or text message (SMS) and follow the steps.',
            ],
            es: [
              'Abre la app y ve a Configuración.',
              'Abre Centro de cuentas y luego Contraseña y seguridad.',
              'Toca Autenticación en dos pasos y elige tu cuenta.',
              'Elige una app de autenticación o un mensaje de texto (SMS) y sigue los pasos.',
            ],
          },
        },
      ],
    },
  },
  {
    id: 'manager',
    section: 'next',
    minutes: 15,
    title: {
      en: 'Set up a password manager',
      es: 'Usa un gestor de contraseñas',
    },
    why: {
      en: "It remembers a different strong password for every account, so you don't have to.",
      es: 'Recuerda una contraseña fuerte y distinta para cada cuenta, para que tú no tengas que hacerlo.',
    },
    tip: {
      en: "Change your passwords little by little, as you use each site. You don't need to do them all today.",
      es: 'Cambia las contraseñas poco a poco, cuando vayas usando cada web. No hace falta hacerlas todas hoy.',
    },
    guide: {
      tabs: [
        {
          id: 'iphone',
          label: { en: 'iPhone', es: 'iPhone' },
          steps: {
            en: [
              'Open the Passwords app (it comes with your iPhone).',
              'Go to Settings › General › AutoFill & Passwords and turn on AutoFill Passwords and Passkeys.',
              'Next time you sign in to a website or app, tap Save Password when your iPhone asks.',
              'Open the Passwords app now and then: it warns you about reused or leaked passwords.',
            ],
            es: [
              'Abre la app Contraseñas (viene en tu iPhone).',
              'Ve a Ajustes › General › Autorrelleno y contraseñas y activa Autorrellenar contraseñas y llaves de acceso.',
              'La próxima vez que inicies sesión en una web o app, toca Guardar contraseña cuando el iPhone te lo pregunte.',
              'Abre la app Contraseñas de vez en cuando: te avisa de contraseñas repetidas o filtradas.',
            ],
          },
        },
        {
          id: 'android',
          label: { en: 'Android', es: 'Android' },
          steps: {
            en: [
              'Open Settings and search for "Google Password Manager".',
              'Make sure Offer to save passwords is turned on.',
              'Next time you sign in to a website or app, tap Save when Google asks.',
              'Use Password Checkup inside Google Password Manager to find reused or leaked passwords.',
            ],
            es: [
              'Abre Ajustes y busca «Gestor de contraseñas de Google».',
              'Asegúrate de que Ofrecer guardar contraseñas está activado.',
              'La próxima vez que inicies sesión en una web o app, toca Guardar cuando Google te lo pregunte.',
              'Usa Revisión de contraseñas dentro del Gestor de contraseñas de Google para encontrar contraseñas repetidas o filtradas.',
            ],
          },
        },
        {
          id: 'bitwarden',
          label: { en: 'Bitwarden (any device)', es: 'Bitwarden (cualquier dispositivo)' },
          steps: {
            en: [
              'Install Bitwarden from the App Store or Google Play. The free plan is enough.',
              'Create an account with one long master password, like four random words.',
              'Write the master password on paper and keep it somewhere safe at home. Nobody can recover it for you.',
              'Install Bitwarden on your computer too, so your passwords are with you everywhere.',
            ],
            es: [
              'Instala Bitwarden desde App Store o Google Play. El plan gratuito es suficiente.',
              'Crea una cuenta con una contraseña maestra larga, como cuatro palabras al azar.',
              'Apunta la contraseña maestra en papel y guárdala en un lugar seguro de casa. Nadie puede recuperarla por ti.',
              'Instala Bitwarden también en tu ordenador, para tener tus contraseñas en todas partes.',
            ],
          },
        },
      ],
    },
  },
  {
    id: 'leaks',
    section: 'next',
    minutes: 2,
    title: {
      en: 'Check if your email appeared in a data leak',
      es: 'Comprueba si tu correo ha aparecido en una filtración',
    },
    why: {
      en: 'If it has, the password you used on those websites is no longer secret.',
      es: 'Si ha aparecido, la contraseña que usabas en esas webs ya no es secreta.',
    },
    tip: {
      en: "Being on the list is very common and doesn't mean you did anything wrong.",
      es: 'Aparecer en la lista es muy común y no significa que hayas hecho nada mal.',
    },
    link: {
      url: 'https://haveibeenpwned.com/',
      label: { en: 'Open haveibeenpwned.com', es: 'Abrir haveibeenpwned.com' },
    },
    guide: {
      steps: {
        en: [
          'Go to haveibeenpwned.com.',
          'Type your email address and tap Check.',
          'If it shows a warning, look at which websites leaked your data.',
          'Change the password on those websites, and anywhere you used the same one. Then turn on two-step verification there.',
        ],
        es: [
          'Entra en haveibeenpwned.com (la web está en inglés).',
          'Escribe tu correo y toca Check (comprobar).',
          'Si aparece un aviso, mira qué webs han filtrado tus datos.',
          'Cambia la contraseña en esas webs y en cualquier otra donde usaras la misma. Después, activa allí la verificación en dos pasos.',
        ],
      },
    },
  },
  {
    id: 'updates',
    section: 'next',
    minutes: 5,
    title: {
      en: 'Turn on automatic updates',
      es: 'Activa las actualizaciones automáticas',
    },
    why: {
      en: 'Updates fix the holes criminals use to get into phones and computers.',
      es: 'Las actualizaciones cierran los agujeros que usan los delincuentes para entrar en móviles y ordenadores.',
    },
    guide: {
      tabs: [
        {
          id: 'iphone',
          label: { en: 'iPhone', es: 'iPhone' },
          steps: {
            en: [
              'Open Settings › General › Software Update.',
              'Tap Automatic Updates and turn everything on.',
              'Then go to Settings › App Store and turn on App Updates.',
            ],
            es: [
              'Abre Ajustes › General › Actualización de software.',
              'Toca Actualizaciones automáticas y actívalo todo.',
              'Después ve a Ajustes › App Store y activa Actualizaciones de apps.',
            ],
          },
        },
        {
          id: 'android',
          label: { en: 'Android', es: 'Android' },
          steps: {
            en: [
              'Open Settings and search for "Software update" (the name changes by brand).',
              'Turn on automatic download of updates over Wi-Fi.',
              'Open the Play Store, tap your profile picture, then Settings › Network preferences › Auto-update apps.',
            ],
            es: [
              'Abre Ajustes y busca «Actualización de software» (el nombre cambia según la marca).',
              'Activa la descarga automática de actualizaciones por Wi-Fi.',
              'Abre Play Store, toca tu foto de perfil y luego Ajustes › Preferencias de red › Actualizar apps automáticamente.',
            ],
          },
        },
        {
          id: 'computer',
          label: { en: 'Computer', es: 'Ordenador' },
          steps: {
            en: [
              'Windows: open Settings › Windows Update and make sure updates are on.',
              'Mac: open System Settings › General › Software Update and turn on Automatic updates.',
              'Keep your browser (Chrome, Safari, Edge) up to date too: restart it when it asks.',
            ],
            es: [
              'Windows: abre Configuración › Windows Update y comprueba que las actualizaciones están activadas.',
              'Mac: abre Ajustes del Sistema › General › Actualización de software y activa las actualizaciones automáticas.',
              'Mantén también tu navegador (Chrome, Safari, Edge) al día: reinícialo cuando te lo pida.',
            ],
          },
        },
      ],
    },
  },
  {
    id: 'lock',
    section: 'next',
    minutes: 2,
    title: {
      en: 'Use a screen lock (PIN, fingerprint or face)',
      es: 'Usa un bloqueo de pantalla (PIN, huella o cara)',
    },
    why: {
      en: 'If your phone is lost or stolen, nobody can open it.',
      es: 'Si pierdes el móvil o te lo roban, nadie podrá abrirlo.',
    },
    guide: {
      tabs: [
        {
          id: 'iphone',
          label: { en: 'iPhone', es: 'iPhone' },
          steps: {
            en: [
              'Open Settings › Face ID & Passcode (or Touch ID & Passcode).',
              'Tap Turn Passcode On and choose 6 digits.',
              'Avoid easy codes like 123456 or your birth date.',
              'Set up Face ID or Touch ID so unlocking stays quick.',
            ],
            es: [
              'Abre Ajustes › Face ID y código (o Touch ID y código).',
              'Toca Activar código y elige 6 cifras.',
              'Evita códigos fáciles como 123456 o tu fecha de nacimiento.',
              'Configura Face ID o Touch ID para desbloquear rápido.',
            ],
          },
        },
        {
          id: 'android',
          label: { en: 'Android', es: 'Android' },
          steps: {
            en: [
              'Open Settings and search for "Screen lock".',
              'Choose PIN and use at least 6 digits.',
              'Avoid easy codes like 123456 or your birth date.',
              'Add your fingerprint or face so unlocking stays quick.',
            ],
            es: [
              'Abre Ajustes y busca «Bloqueo de pantalla».',
              'Elige PIN y usa al menos 6 cifras.',
              'Evita códigos fáciles como 123456 o tu fecha de nacimiento.',
              'Añade tu huella o tu cara para desbloquear rápido.',
            ],
          },
        },
      ],
    },
  },
  {
    id: 'codeword',
    section: 'next',
    minutes: 5,
    title: {
      en: 'Agree on a family code word',
      es: 'Acordad una palabra clave familiar',
    },
    why: {
      en: "Scammers can fake a relative's voice or phone number. A secret word proves it's really them.",
      es: 'Los estafadores pueden imitar la voz o el número de un familiar. Una palabra secreta demuestra que de verdad es él o ella.',
    },
    guide: {
      steps: {
        en: [
          "Choose a word or short phrase nobody could guess. Don't use something you post online, like a pet's name.",
          'Share it in person, not by message.',
          'If someone calls or writes in a hurry asking for money, ask for the word, even if the voice sounds familiar.',
          "If they don't know it, hang up and call your relative on their usual number.",
        ],
        es: [
          'Elegid una palabra o frase corta que nadie pueda adivinar. No uséis algo que publicáis en internet, como el nombre de una mascota.',
          'Compartidla en persona, no por mensaje.',
          'Si alguien llama o escribe con prisa pidiendo dinero, pídele la palabra, aunque la voz te suene familiar.',
          'Si no la sabe, cuelga y llama a tu familiar a su número de siempre.',
        ],
      },
    },
  },
  {
    id: 'backup',
    section: 'next',
    minutes: 10,
    title: {
      en: 'Back up your photos and documents',
      es: 'Haz copia de seguridad de tus fotos y documentos',
    },
    why: {
      en: 'If your phone breaks or is stolen, your memories are safe.',
      es: 'Si el móvil se rompe o te lo roban, tus recuerdos estarán a salvo.',
    },
    guide: {
      tabs: [
        {
          id: 'iphone',
          label: { en: 'iPhone', es: 'iPhone' },
          steps: {
            en: [
              'Open Settings, tap your name, then iCloud.',
              'Turn on iCloud Backup.',
              'Turn on Photos (iCloud Photos) so your photos are saved too.',
              'If iCloud says it is full, you can buy more storage or ask a relative to help you choose.',
            ],
            es: [
              'Abre Ajustes, toca tu nombre y luego iCloud.',
              'Activa Copia en iCloud.',
              'Activa Fotos (Fotos en iCloud) para guardar también tus fotos.',
              'Si iCloud dice que está lleno, puedes comprar más espacio o pedir ayuda a un familiar para elegir.',
            ],
          },
        },
        {
          id: 'android',
          label: { en: 'Android', es: 'Android' },
          steps: {
            en: [
              'Open Settings and search for "Backup".',
              "Turn on Backup by Google One (or your phone brand's backup).",
              'Open the Google Photos app, tap your profile picture and turn on Backup.',
              'If your storage is full, you can buy more or ask a relative to help you choose.',
            ],
            es: [
              'Abre Ajustes y busca «Copia de seguridad».',
              'Activa la copia de seguridad de Google One (o la de la marca de tu móvil).',
              'Abre Google Fotos, toca tu foto de perfil y activa la copia de seguridad.',
              'Si el espacio está lleno, puedes comprar más o pedir ayuda a un familiar para elegir.',
            ],
          },
        },
      ],
    },
  },
  {
    id: 'passkeys',
    section: 'extra',
    minutes: 10,
    title: {
      en: 'Use passkeys where you can',
      es: 'Usa llaves de acceso cuando puedas',
    },
    why: {
      en: "Sign in with your face or fingerprint instead of a password. Fake websites can't steal them.",
      es: 'Entra con tu cara o tu huella en lugar de una contraseña. Las webs falsas no pueden robarlas.',
    },
    guide: {
      steps: {
        en: [
          'When a website or app offers to "Create a passkey", say yes.',
          'For Google: go to myaccount.google.com › Security › Passkeys and tap Create a passkey.',
          'Your phone saves it for you. Next time, just use your face, fingerprint or PIN.',
        ],
        es: [
          'Cuando una web o app te ofrezca «Crear una llave de acceso», acepta.',
          'En Google: entra en myaccount.google.com › Seguridad › Llaves de acceso y toca Crear una llave de acceso.',
          'El móvil la guarda por ti. La próxima vez, solo tendrás que usar tu cara, tu huella o tu PIN.',
        ],
      },
    },
  },
  {
    id: 'keys',
    section: 'extra',
    minutes: 20,
    title: {
      en: 'Optional: a security key (like a YubiKey)',
      es: 'Opcional: una llave de seguridad (como YubiKey)',
    },
    why: {
      en: "A small physical key for your most important accounts. It's the strongest protection against fake websites.",
      es: 'Una pequeña llave física para tus cuentas más importantes. Es la protección más fuerte contra las webs falsas.',
    },
    tip: {
      en: 'Always buy two. If you lose your only key and your backup codes, you can be locked out of your account.',
      es: 'Compra siempre dos. Si pierdes tu única llave y tus códigos de seguridad, puedes quedarte sin acceso a tu cuenta.',
    },
    guide: {
      steps: {
        en: [
          'Buy two keys that work with your phone (USB-C or NFC). One is for daily use, one is a backup.',
          'Add both keys to your main email account. Look for Security keys or Passkeys in its security settings.',
          'Keep the backup key and your backup codes at home, in a safe place.',
          "Ask a relative to help you the first time. It's easy once it's set up.",
        ],
        es: [
          'Compra dos llaves que funcionen con tu móvil (USB-C o NFC). Una para el día a día y otra de reserva.',
          'Añade las dos llaves a tu cuenta de correo principal. Busca Llaves de seguridad o Llaves de acceso en sus ajustes de seguridad.',
          'Guarda la llave de reserva y tus códigos de seguridad en casa, en un lugar seguro.',
          'Pide ayuda a un familiar la primera vez. Una vez configurada, es muy fácil.',
        ],
      },
    },
  },
];
