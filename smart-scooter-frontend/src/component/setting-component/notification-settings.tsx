export default function NotificationSettings() {
    return (
        <div>
            <article>
                <hgroup>
                    <h1>Notification Settings</h1>
                    <h2></h2>
                </hgroup>
                <div className="notification-list">
                    {/* Example notification */}
                    <div className="notification-item">
                        <div className="notification-details">
                            <h3>Notification Title</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <p>Received on: 2023-05-01</p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}