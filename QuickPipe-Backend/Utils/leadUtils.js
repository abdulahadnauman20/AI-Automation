const moment = require("moment-timezone");
const axios = require("axios");

exports.ExtractTitleAndLocation = (description) => {
    // Improved: handle 'all [title]' and 'search all [title]' patterns
    let title = null;
    let location = null;

    // Check for 'all [title]' or 'search all [title]' patterns
    const allTitlePattern = /^(search\s+)?all\s+([a-zA-Z ]+)$/i;
    const allTitleMatch = description.match(allTitlePattern);
    if (allTitleMatch) {
        title = allTitleMatch[2].trim();
    }

    // If not matched, try to extract both title and location from patterns like 'TITLE in LOCATION'
    if (!title) {
        // Try to match '[title] in [location]' or '[title] at [location]' or '[title] from [location]'
        const titleLocationPattern = /^([a-zA-Z\s]+?)\s+(in|at|from)\s+([a-zA-Z\s]+)$/i;
        const titleLocationMatch = description.match(titleLocationPattern);
        if (titleLocationMatch) {
            title = titleLocationMatch[1].trim();
            location = titleLocationMatch[3].trim();
        }
    }

    // If still not matched, use existing patterns
    if (!title) {
        // Common job title patterns - improved to capture standalone titles
        const titlePatterns = [
            /\b(Developer|Software Engineer|Architect|Designer|Analyst|Specialist|Manager|Director|Consultant|Engineer|Scientist)\b/i,
            /\b(CEO|CTO|CFO|COO|CMO|CIO|CHRO|CSO)\b/i,
            /\b(Chief\s+[A-Za-z]+(\s+Officer)?)\b/i,
            /\b(VP|Vice\s+President)(\s+of)?\s+([A-Za-z]+(\s+[A-Za-z]+)?)\b/i,
            /\b(Director)(\s+of)?\s+([A-Za-z]+(\s+[A-Za-z]+)?)\b/i,
            /\b(Head)(\s+of)?\s+([A-Za-z]+(\s+[A-Za-z]+)?)\b/i,
            /\b(Manager)(\s+of)?\s+([A-Za-z]+(\s+[A-Za-z]+)?)\b/i,
            /\b([A-Za-z]+)\s+(Engineer|Developer|Architect|Designer|Analyst|Specialist|Scientist)\b/i,
            /\b(([A-Za-z]+(\s+[A-Za-z]+)?)\s+)?(Engineer|Developer|Scientist)\b/i
        ];
        // Try to find the longest match for title
        let longestMatch = null;
        for (const pattern of titlePatterns) {
            const match = description.match(pattern);
            if (match && (!longestMatch || match[0].length > longestMatch.length)) {
                longestMatch = match[0];
            }
        }
        if (longestMatch) {
            title = longestMatch.trim();
        }
    }

    // Location extraction: look for 'in [location]' or 'at [location]' or 'from [location]' if not already set
    if (!location) {
        const locationPattern = /\b(?:in|at|from)\s+([A-Za-z\s]+)$/i;
        const locationMatch = description.match(locationPattern);
        if (locationMatch) {
            location = locationMatch[1].trim();
        }
    }

    // Fallback to previous location patterns if still not set
    if (!location) {
        const locationPatterns = [
            /\b([A-Za-z\s]+),\s+([A-Za-z]{2})\b/i, // City, State abbreviation
            /\b([A-Za-z\s]+),\s+([A-Za-z\s]+)\b/i, // City, State/Country
            /\b(in|at|from)\s+([A-Za-z\s]+),\s+([A-Za-z\s]+)\b/i, // in/at/from City, State/Country
            /\b(in|at|from)\s+([A-Za-z\s]+)\b/i // in/at/from Location
        ];
        for (const pattern of locationPatterns) {
            const match = description.match(pattern);
            if (match) {
                if (match[1] && (match[1].toLowerCase() === 'in' || match[1].toLowerCase() === 'at' || match[1].toLowerCase() === 'from')) {
                    location = match.slice(2).join(', ').trim();
                } else {
                    location = match[0].trim();
                }
                break;
            }
        }
    }
    return { title, location };
}

exports.getRandomSendingTime = (schedule, delay = 0) => {
    const { TimingFrom, TimingTo, Days, Timezone } = schedule;

    const now = moment.tz(Timezone);
    const delayFromNow = now.clone().add(delay, 'days').startOf('day'); // Earliest allowed date

    // Convert allowed day names to ISO weekday numbers (1 = Monday, ..., 7 = Sunday)
    const allowedWeekdays = Days.map(day => moment().isoWeekday(day).isoWeekday());

    // Collect next valid dates that are at least `delay` days ahead
    let validDates = [];
    for (let i = 0; i < 14; i++) { // Look 2 weeks ahead
        const checkDate = delayFromNow.clone().add(i, 'days');
        if (allowedWeekdays.includes(checkDate.isoWeekday())) {
            validDates.push(checkDate);
        }
    }

    if (validDates.length === 0) {
        throw new Error("No valid dates available based on schedule and delay");
    }

    // Pick a random valid date
    const targetDate = validDates[Math.floor(Math.random() * validDates.length)];

    // Create moment objects for from and to times
    const fromTime = moment.tz(`${targetDate.format("YYYY-MM-DD")} ${TimingFrom}`, "YYYY-MM-DD HH:mm:ss", Timezone);
    const toTime = moment.tz(`${targetDate.format("YYYY-MM-DD")} ${TimingTo}`, "YYYY-MM-DD HH:mm:ss", Timezone);

    // Generate random timestamp between from and to
    const randomTimestamp = new Date(fromTime.valueOf() + Math.random() * (toTime.valueOf() - fromTime.valueOf()));

    // Format final datetime
    const sendingTime = moment.tz(randomTimestamp, Timezone).format("YYYY-MM-DD HH:mm:ss");

    return sendingTime;
};

exports.EnrichLeadWithApollo = async (apolloId) => {
    const APOLLO_ENRICH_URL = 'https://api.apollo.io/v1/people/match';
    if (!process.env.APOLLO_API_KEY) {
        console.error('Apollo API key is missing for enrichment!');
        throw new Error('Apollo API key is not set on the server.');
    }
    try {
        const response = await axios.post(APOLLO_ENRICH_URL, {
            api_key: process.env.APOLLO_API_KEY,
            id: apolloId,
            reveal_personal_emails: false
        });
        if (!response.data || !response.data.person) {
            throw new Error('Invalid response from Apollo enrichment API');
        }
        return response.data.person;
    } catch (error) {
        console.error('Apollo enrichment API error:', error?.response?.data || error.message || error);
        throw new Error(`Failed to enrich lead: ${error?.response?.data?.message || error.message || error}`);
    }
}

// Flexible extraction for quick/general searches
exports.ExtractAllPossible = (description) => {
    // Use the improved title and location extraction
    const { title, location } = exports.ExtractTitleAndLocation(description);

    // Company extraction: look for words after 'at', 'from', or 'in' if not already used for location
    let company = null;
    let keyword = null;

    // Try to extract company name (e.g., "Manager at Google")
    const companyPattern = /(?:at|from|in)\s+([A-Za-z0-9&.\- ]{2,})/i;
    const companyMatch = description.match(companyPattern);
    if (companyMatch && (!location || companyMatch[1] !== location)) {
        company = companyMatch[1].trim();
    }

    // Keyword extraction: fallback to any word(s) not matched as title/location/company
    // (very basic: just use the whole query if nothing else is found)
    if (!title && !location && !company) {
        // Remove common stopwords for better keyword extraction
        const stopwords = ['in', 'at', 'from', 'the', 'a', 'an', 'for', 'to', 'with', 'and', 'or', 'of'];
        keyword = description
            .split(/\s+/)
            .filter(word => !stopwords.includes(word.toLowerCase()))
            .join(' ')
            .trim();
        if (keyword.length < 2) keyword = null;
    }

    return { title, location, company, keyword };
};