import "./settings.css"

export default function Password() {
  return (
    <main className="container">
      <article className="grid">
        <div>
          <hgroup>
            <h1>Sign in</h1>
            <h2>A minimalist layout for Login pages</h2>
          </hgroup>
          <form>
            <table>
              <tr>
                name
                <td><input
                  type="text"
                  name="login"
                  placeholder="First name"
                  aria-label="Login"
                  autoComplete="nickname"
                  required /></td>
                <td><input
                  type="text"
                  name="login"
                  placeholder="First name"
                  aria-label="Login"
                  autoComplete="nickname"
                  required /></td>
              </tr>
            </table>
            <input
              type="text"
              name="login"
              placeholder="First name"
              aria-label="Login"
              autoComplete="nickname"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
              autoComplete="current-password"
              required
            />
            <fieldset>
              <label htmlFor="remember">
                <input type="checkbox" role="switch" id="remember" name="remember" />
                Remember me
              </label>
            </fieldset>
            <button type="submit" className="contrast">Save Changes</button>
          </form>
        </div>
        <div></div>
      </article>
    </main>
  )
}