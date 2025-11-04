export function flagemojiToPNG(countryCode) {
    if (!countryCode) return null;
    let code = countryCode.toLowerCase();
    if (code === "il") code = "ps";
    return (
        <img
            src={`https://flagcdn.com/24x18/${code}.png`}
            alt={`${countryCode} flag`}
            style={{ width: "24px", height: "18px", borderRadius: "2px" }}
        />
    );
}
