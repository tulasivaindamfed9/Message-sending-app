import { Link } from "react-router-dom";
import {
  UserPlus,
  Users,
  MessageSquareText,
  CalendarCheck,
  Settings,
  History,
  ShieldCheck,
} from "lucide-react";
import "./HowToUsePage.css";

function HowToUsePage() {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create your account",
      description:
        "Register with your email and password. Your schedules and recipient information will belong to your account.",
    },
    {
      number: "02",
      icon: Users,
      title: "Add recipients",
      description:
        "Add the WhatsApp phone numbers you want to send your Good Morning messages to.",
    },
    {
      number: "03",
      icon: MessageSquareText,
      title: "Create a schedule",
      description:
        "Write your message, choose the recipients, and select the time window for the daily message.",
    },
    {
      number: "04",
      icon: CalendarCheck,
      title: "Set holidays and exclusions",
      description:
        "Choose your country and state so holidays can be handled. You can also add individual dates that should be skipped.",
    },
    {
      number: "05",
      icon: Settings,
      title: "Enable the schedule",
      description:
        "Review your settings and enable the schedule. The scheduler will handle the daily sending process.",
    },
    {
      number: "06",
      icon: History,
      title: "Check your history",
      description:
        "Use the History page to see messages that were sent, failed, or skipped.",
    },
  ];

  return (
    <div className="how-to-use-page">
      <header className="public-header">
        <Link to="/" className="public-logo">
          Good Morning Scheduler
        </Link>

        <nav className="public-nav">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register" className="header-register">
            Register
          </Link>
        </nav>
      </header>

      <main>
        <section className="how-to-hero">
          <span>Getting Started</span>
          <h1>How to use Good Morning Scheduler</h1>
          <p>
            Follow these simple steps to set up your daily WhatsApp Good
            Morning messages.
          </p>
        </section>

        <section className="steps-section">
          <div className="steps-list">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div className="how-to-step" key={step.number}>
                  <div className="step-number">{step.number}</div>

                  <div className="step-icon">
                    <Icon size={24} />
                  </div>

                  <div className="step-content">
                    <h2>{step.title}</h2>
                    <p>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="important-note">
          <h2>How the sending time works</h2>

          <p>
            Suppose you select a sending window from <strong>5:00 AM</strong>{" "}
            to <strong>5:30 AM</strong>.
          </p>

          <p>
            The message is not necessarily sent exactly at 5:00 AM. The
            scheduler can select a random time within your chosen window.
          </p>

          <div className="time-example">
            <span>5:00 AM</span>
            <div className="time-line">
              <div className="time-point" />
            </div>
            <span>5:30 AM</span>
          </div>

          <p className="note-text">
            The actual scheduling and WhatsApp sending will be handled by the
            backend service when the application is connected to the backend.
          </p>
        </section>

        <section className="privacy-info">
  <div className="privacy-info-icon">
    <ShieldCheck size={26} />
  </div>

  <div>
    <h2>Your recipient information is private</h2>
    <p>
      Phone numbers you enter are intended only for your schedules and
      message delivery. They are not visible to other users.
    </p>
  </div>
</section>

        <section className="getting-started">
          <h2>Ready to get started?</h2>
          <p>Create your account and set up your first schedule.</p>

          <Link to="/register" className="primary-button">
            Create Account
          </Link>
        </section>
      </main>
    </div>
  );
}

export default HowToUsePage;