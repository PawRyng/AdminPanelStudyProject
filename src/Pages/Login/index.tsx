import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, useActionData } from 'react-router-dom';

// logo
import logo from '../../assets/Image/logo-color-main.png'
// style
import './styles.scss'

interface ActionMessage {
  email?:string,
  password?:string,
  server?:string
}


const Login: React.FC = () => {
  const data = useActionData() as ActionMessage | undefined;
  const { t } = useTranslation();

  return (
    <div className='login-page'>
      <img className="login-page__logo" src={logo} alt="Logo" />
      <div className="login-page__form">
        <h2>{t('login')}</h2>
        <Form method="post" action="/login">
          <div className="form-row">
            <label htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              placeholder=""
              aria-label="E-mail"
              type="text"
              name="email"
            />
            {data?.email && <p className="error-message">{t(data.email)}</p>}

          </div>
          <div className="form-row">
            <label htmlFor="password">
              {t('password')}
            </label>
            <input
              id="password"
              placeholder=""
              aria-label="E-mail"
              type="password"
              name="password"
            />
            {
              data?.password && <p className="error-message">{t(data.password)}</p>
            }

          </div>
          
          {data?.server && <p className="error-message">{t(data.server)}</p>}
          <button className="login-button"  type="submit">{t('login')}</button>

        </Form>
      </div>

    </div>
  );
};

export default Login;
