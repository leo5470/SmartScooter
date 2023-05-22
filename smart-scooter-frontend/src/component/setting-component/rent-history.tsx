import RentHistoryTable from "./rent-history-table";

export default function RentHistory() {
    return (
        <div>
            <article>
                <hgroup>
                    <h1>Rent History</h1>
                    <h2></h2>
                </hgroup>
                <select>
                    <option value="time" placeholder="Sort by">Sort: 由舊到新</option>
                </select>
                <article style={{ backgroundColor: "#8F9491" }}>
                    <RentHistoryTable />
                </article>
            </article>
        </div>
    );
}
