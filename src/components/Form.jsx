import { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesProvider";
import { useNavigate } from "react-router-dom";
import { flagemojiToPNG } from "../utils/flagemojitoPNG";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import Message from "./Message";

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client?`;

function Form() {
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [lat, lng] = useUrlPosition();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [emoji, setEmoji] = useState("");
    const [geoError, setGeoError] = useState("");
    const { createCity, isLoading } = useCities();
    const navigate = useNavigate();

    useEffect(
        function () {
            if (!lat && !lng) return;

            async function fetchCity() {
                try {
                    setGeoError("");
                    setIsLoadingGeocoding(true);
                    const res = await fetch(
                        `${BASE_URL}latitude=${lat}&longitude=${lng}`
                    );
                    const data = await res.json();
                    if (!data.countryCode) throw new Error("unkownPlace");
                    setCityName(data.city || data.locality || "");
                    setCountry(data.countryName || "");
                    setEmoji(data.countryCode);
                } catch (err) {
                    setGeoError(err.message);
                } finally {
                    setIsLoadingGeocoding(false);
                }
            }
            fetchCity();
        },
        [lat, lng]
    );

    async function handleSubmit(e) {
        e.preventDefault();

        if (!cityName || !date) return;

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: { lat, lng },
        };

        await createCity(newCity);
        navigate("/app/cities");
    }

    if (isLoadingGeocoding) return <Spinner />;
    if (!lat && !lng) return <Message message={"click anywhere to start"} />;
    if (geoError) return <Message message={geoError} />;

    return (
        <form
            className={`${styles.form} ${isLoading ? styles.loading : ""}`}
            onSubmit={handleSubmit}
        >
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={e => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>
                    {emoji && flagemojiToPNG(emoji)}
                </span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker
                    id="date"
                    onChange={date => setDate(date)}
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">
                    Notes about your trip to {cityName}
                </label>
                <textarea
                    id="notes"
                    onChange={e => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton />
            </div>
        </form>
    );
}

export default Form;
