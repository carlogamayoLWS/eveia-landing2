function normalizeForMatch(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[\u2018\u2019']/g, '')
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/7/g, 't')
    .replace(/\$/g, 's')
    .replace(/@/g, 'a')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const FOUL_WORDS = [
  'shit', 'shitty', 'shitting', 'bullshit', 'horseshit',
  'fuck', 'fucking', 'fucked', 'fucker', 'motherfuck', 'motherfucker',
  'bitch', 'bitches', 'bitching', 'sonofabitch',
  'asshole', 'assholes', 'asshat', 'dumbass', 'jackass',
  'bastard', 'bastards',
  'damn', 'damned', 'dammit', 'goddamn', 'goddamnit',
  'crap', 'crappy',
  'dick', 'dicks', 'dickhead',
  'pussy', 'pussies',
  'cock', 'cocks', 'cocksucker',
  'piss', 'pissed', 'pissing',
  'slut', 'sluts', 'slutty',
  'whore', 'whores', 'whoring',
  'cunt', 'cunts',
  'fag', 'faggot', 'faggots',
  'nigger', 'nigga', 'niggas',
  'kike', 'spic', 'chink', 'wetback', 'towelhead', 'raghead',
  'retard', 'retarded', 'retards',
  'putang', 'putangina', 'putang ina', 'putang-ina', 'potang', 'potangina',
  'gago', 'gaga', 'gagong', 'gagu',
  'tangina', 'tang ina', 'tang-ina', 'tanginamo', 'tanginamoka',
  'ulol', 'ulul', 'olol',
  'tanga', 'tangang',
  'bobo', 'bobong', 'tarantado', 'tarantada',
  'walanghiya', 'walang hiya',
  'punyeta', 'punyemas', 'leche', 'lechugas',
  'buang', 'buangit', 'kupal', 'kupals',
  'pakyu', 'pak yu', 'pakyew', 'pak you',
  'lintik', 'shet', 'puta', 'puke', 'pokpok',
  'hindot', 'hinayupak', 'hayupak', 'hayupaka', 'hayop',
  'demonyo', 'diyablo', 'yawa', 'pesteng yawa',
  'kingina', 'king ina', 'kang ina',
  'salsal', 'jabol', 'jakol', 'bayag', 'titi', 'kantot', 'iyot', 'libog', 'pepe',
  'animal ka', 'lintik ka',
  'mierda', 'carajo', 'pendejo', 'estupido',
  'merde', 'putain', 'connard',
  'scheisse', 'arschloch',
  'klootzak', 'idioot',
  'cazzo', 'stronzo',
  'porra', 'caralho', 'merda',
  'kurwa', 'blyat', 'suka',
  'puki', 'pukimak', 'lancau', 'bodoh', 'bangsat', 'brengsek', 'anjing',
]

export const PROFANITY_ERROR =
  'Please remove inappropriate language and try again with professional details.'

export function containsFoulLanguage(value) {
  const normalized = normalizeForMatch(value)
  if (!normalized) return false
  const compact = normalized.replace(/[\s-]/g, '')
  const tokens = new Set(normalized.split(' '))

  for (const word of FOUL_WORDS) {
    const w = word.replace(/\s+/g, ' ')
    if (tokens.has(w)) return true
    if (normalized.includes(` ${w} `) || normalized === w || normalized.startsWith(`${w} `) || normalized.endsWith(` ${w}`)) {
      return true
    }
    const compactWord = w.replace(/[\s-]/g, '')
    if (compactWord.length >= 4 && compact.includes(compactWord)) return true
  }
  return false
}

export function containsUnsafeInput(value) {
  if (!value) return false
  if ((/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/).test(value)) return true
  if ((/<\s*\/?\s*[a-z!]/i).test(value)) return true
  if ((/javascript\s*:/i).test(value)) return true
  if ((/data\s*:\s*text\/html/i).test(value)) return true
  if ((/\bon\w+\s*=/i).test(value)) return true
  if ((/&#x?[0-9a-f]+;?/i).test(value)) return true
  if ((/%3c\s*script/i).test(value)) return true
  if ((/expression\s*\(/i).test(value)) return true
  return false
}

export const UNSAFE_INPUT_ERROR =
  'That input looks unsafe or invalid. Please enter plain text without scripts or special markup.'
