import toast from "react-hot-toast";


export const handleError = (error: unknown) => {
    if (error instanceof Error) {
        toast.error(error.message);
    } else if (typeof error === "string") {
        toast.error(error);
    } else {
        toast.error("Something went wrong");
    }
}

export const getFlagEmoji = (language: string) => {
    const map: Record<string, string> = {
        'english': '🇬🇧',
        'spanish': '🇪🇸',
        'french': '🇫🇷',
        'german': '🇩🇪',
        'italian': '🇮🇹',
        'portuguese': '🇵🇹',
        'japanese': '🇯🇵',
        'chinese': '🇨🇳',
        'mandarin': '🇨🇳',
        'korean': '🇰🇷',
        'russian': '🇷🇺',
        'arabic': '🇸🇦',
        'hindi': '🇮🇳',
        'turkish': '🇹🇷',
        'dutch': '🇳🇱',
        'swedish': '🇸🇪',
        'polish': '🇵🇱',
    }
    return map[language.toLowerCase()] || '🏳️'
}

/**
 * Maps language names to country codes for flagcdn API
 */
const getLanguageCountryCode = (language: string): string => {
    const map: Record<string, string> = {
        'english': 'gb',
        'spanish': 'es',
        'french': 'fr',
        'german': 'de',
        'italian': 'it',
        'portuguese': 'pt',
        'japanese': 'jp',
        'chinese': 'cn',
        'mandarin': 'cn',
        'korean': 'kr',
        'russian': 'ru',
        'arabic': 'sa',
        'hindi': 'in',
        'turkish': 'tr',
        'dutch': 'nl',
        'swedish': 'se',
        'polish': 'pl',
    }
    return map[language.toLowerCase()] || 'un'
}

/**
 * Returns the flagcdn API URL for a given language
 * @param language - The language name (e.g., 'English', 'Spanish')
 * @param size - The size of the flag (default: 'w20' for 20px width)
 * @returns The flagcdn API URL
 */
export const getFlagUrl = (language: string, size: string = 'w20'): string => {
    const countryCode = getLanguageCountryCode(language)
    return `https://flagcdn.com/${size}/${countryCode}.png`
}