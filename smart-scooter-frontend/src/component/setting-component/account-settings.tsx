
export default function AccountSettings() {
    return (
        <form>
            {/* Grid */}
            <div className="grid">
                {/* Markup example 1: input is inside label */}
                <label htmlFor="firstname">
                    First name
                    <input type="text" id="firstname" name="firstname" placeholder="First name" required />
                </label>
                <label htmlFor="lastname">
                    Last name
                    <input type="text" id="lastname" name="lastname" placeholder="Last name" required />
                </label>
            </div>
            {/* Markup example 2: input is after label */}
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" name="email" placeholder="Email address" required />
            <div className='grid'>
                <label htmlFor="home">
                    Home address
                    <input type="text" id="firstname" name="firstname" placeholder="Your address" required />
                </label>
                <label htmlFor="lastname">
                    Phone number
                    <input type="text" id="lastname" name="lastname" placeholder="Your number" required />
                </label>
            </div>
            <small>We'll never share your info with anyone else.</small>
            {/* Button */}
            <button type="submit">Save Change</button>
        </form>
    )
}