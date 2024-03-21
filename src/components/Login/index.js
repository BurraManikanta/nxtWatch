import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showsubmitError, setshowsubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showpassword, setShowpassword] = useState(false)

  const navigate = useNavigate()

  const onChangeUser = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const isShowpassword = () => {
    setShowpassword(prev => !prev)
  }

  const onSubmitSucess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/')
  }

  const onSubmitFailure = errorMsg => {
    setshowsubmitError(true)
    setErrorMsg(errorMsg)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    // console.log(fetchedData)
    if (response.ok) {
      onSubmitSucess(fetchedData.jwt_token)
    } else {
      onSubmitFailure(fetchedData.error_msg)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" />

        <h1>USERNAME</h1>
        <input type="text" placeholder="Username" onChange={onChangeUser} />
        <h1>PASSWORD</h1>
        <input
          type={showpassword ? 'text' : 'password'}
          placeholder="Password"
          onClick={onChangePassword}
        />
        <br />
        <label>
          <input
            type="checkbox"
            checked={showpassword}
            onChange={isShowpassword}
          />
          Show Password
        </label>

        <button type="submit">Login</button>
        {showsubmitError && <p>*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default LoginForm
