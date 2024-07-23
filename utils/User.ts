interface User {
  user: string
  attributes: {
    nom: string
    prenom: string
    courriel: string
    email_personnel: string
    profil: string
    nom_complet: string
    ecole: string
    diplome: string
  }
}

export type { User }

export function isUser(user: unknown): user is User {
  return (
    typeof user === 'object' &&
    user !== null &&
    'user' in user &&
    typeof user.user === 'string' &&
    'attributes' in user &&
    typeof user.attributes === 'object' &&
    user.attributes !== null &&
    'nom' in user.attributes &&
    typeof user.attributes.nom === 'string' &&
    'prenom' in user.attributes &&
    typeof user.attributes.prenom === 'string' &&
    'courriel' in user.attributes &&
    typeof user.attributes.courriel === 'string' &&
    'email_personnel' in user.attributes &&
    typeof user.attributes.email_personnel === 'string' &&
    'profil' in user.attributes &&
    typeof user.attributes.profil === 'string' &&
    'nom_complet' in user.attributes &&
    typeof user.attributes.nom_complet === 'string' &&
    'ecole' in user.attributes &&
    typeof user.attributes.ecole === 'string' &&
    'diplome' in user.attributes &&
    typeof user.attributes.diplome === 'string'
  )
}
