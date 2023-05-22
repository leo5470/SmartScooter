import "./setting-component-css/rent-histroy-table.scoped.css"

export default function RentHistoryTable() {
    return (
        <table className="rent-history-table">
            <tbody>
                <tr>
                    <td rowSpan={3}>
                        <div className="car-plate">
                            <span className="vehicle-type">電動車</span>
                            <span className="plate-number">ABC-1234</span>
                        </div>
                    </td>
                    <td><h2>租車</h2></td>
                    <td><h2>還車</h2></td>
                    <td><h2 style={{ textAlign: "center" }}>費用</h2></td>
                    <td><h2 style={{ textAlign: "center" }}>充電次數</h2></td>
                </tr>
                <tr>
                    <td>
                        <li><h5>時間<br />2023/05/16 23:57</h5></li>
                        <li><h5>租借地<br />周冠辰超可愛</h5></li>
                    </td>
                    <td>
                        <li><h5>時間<br />2023/05/17 04:10</h5></li>
                        <li><h5>還車地<br />台北市大安區</h5></li>
                    </td>
                    <td rowSpan={2}><h2 style={{ textAlign: "center" }}>NT15</h2></td>
                    <td rowSpan={2}><h2 style={{ textAlign: "center" }}>153次</h2></td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <li><h2>總里程 32km</h2></li>
                        <li><h2>租借時長 253min</h2></li>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}