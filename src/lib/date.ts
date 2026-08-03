export function formatDateTime(
    value?: string | null,
    locale = "en-IN"
) {
    if (!value) {
        return "-";
    }

    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
    }).format(new Date(value));
}

export function formatDate(
    value?: string | null,
    locale = "en-IN"
) {
    if (!value) {
        return "-";
    }

    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
    }).format(new Date(value));
}