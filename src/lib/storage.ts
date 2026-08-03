export function getStorage<T>(
    key: string,
    defaultValue: T
): T {

    try {

        const value = localStorage.getItem(key);

        if (!value) {

            return defaultValue;

        }

        return JSON.parse(value);

    } catch {

        return defaultValue;

    }

}

export function setStorage<T>(
    key: string,
    value: T
): void {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}