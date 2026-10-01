import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MessageCircle,
  Users,
} from "lucide-react";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="public-page">
      <header className="public-footer">
        {/* <header className="public-header"> */}
        <Link to="/" className="public-logo">
          Good Morning Scheduler
        </Link>

        <nav className="public-nav">
          <Link to="/how-to-use">How to Use</Link>
          <Link to="/login">Login</Link>
          <Link to="/register" className="header-register">
            Register
          </Link>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-badge">WhatsApp Message Scheduler</span>

            <h1>
              Start every morning
              <span> with a good message.</span>
            </h1>

            <p>
              Schedule personalized Good Morning WhatsApp messages and let
              them be sent automatically within your chosen time window.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="primary-button">
                Get Started
              </Link>

              <Link to="/how-to-use" className="secondary-button">
                How to Use
              </Link>
            </div>

            <p className="login-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </section>

        <section className="features-section">
          <div className="section-heading">
            <span>Simple to set up</span>
            <h2>Everything you need to automate your morning messages</h2>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Clock3 size={24} />
              </div>
              <h3>Choose your time</h3>
              <p>
                Set a time window such as 5:00 AM to 5:30 AM. The actual
                message can be sent at a random time within that window.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <MessageCircle size={24} />
              </div>
              <h3>Write your message</h3>
              <p>
                Create your own personalized Good Morning message instead of
                using a fixed message.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h3>Choose recipients</h3>
              <p>
                Add your WhatsApp contacts and select one or multiple
                recipients for each schedule.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <CalendarDays size={24} />
              </div>
              <h3>Skip holidays</h3>
              <p>
                Choose your country and state, skip holidays, and exclude
                specific dates when you don't want messages sent.
              </p>
            </div>
          </div>
        </section>

        <section className="how-it-works-preview">
          <div>
            <span>How it works</span>
            <h2>Set it up once and let the scheduler handle the rest.</h2>
          </div>

          <Link to="/how-to-use" className="secondary-button">
            See How It Works
          </Link>
        </section>
      </main>

      <footer className="public-footer">
        <p>Good Morning Scheduler</p>
        <Link to="/how-to-use">How to Use</Link>
      </footer>
    </div>
  );
}

export default HomePage;