import RegistrationForm from '../components/registration-form/RegistrationForm';
import './RegisterPage.scss';

const RegisterPage: React.FC<{}> = () => {
  return (
    <main id="register">
      <section>
        <div className="overlay">
          <div className="header">
            <img src="./../assets/reg-cover.jpg" alt="Logo" />
            <p>FooDrop</p>
          </div>
          <RegistrationForm />
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
