export function getRandomDateFromNow(daysBack = 30): string {
    const now = Date.now();
    const past = now - daysBack * 24 * 60 * 60 * 1000;

    const randomTimestamp =
        Math.floor(Math.random() * (now - past)) + past;

    return new Date(randomTimestamp).toISOString();
}
export function getRandomYesterdayMorningDate(): string {
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);

    const year = yesterday.getUTCFullYear();
    const month = yesterday.getUTCMonth();
    const day = yesterday.getUTCDate();

    const hour = Math.floor(Math.random() * 3) + 9; // 9, 10, or 11
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);
    const millisecond = Math.floor(Math.random() * 1000);

    const date = new Date(
        Date.UTC(year, month, day, hour, minute, second, millisecond)
    );

    return date.toISOString();
}