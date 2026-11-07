import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <h1>Let’s build.</h1>
        </div>
      </header>

      <section className="section--s" aria-label="Write to Aditya">
        <div className="container">
        <div className="grid12 contact contact--page opens">
          <div className="contact__form">
            <ContactForm submitLabel="Send the message" />
          </div>
          <dl className="facts contact__facts">
            <div>
              <dt>Availability</dt>
              <dd>Currently screening high-impact projects for Q3 and Q4.</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>India, open to relocation or remote</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a className="link" href="mailto:aditya@ambade.me">aditya@ambade.me</a></dd>
            </div>
            <div>
              <dt>Elsewhere</dt>
              <dd>
                <ul>
                  <li><a className="link" href="https://github.com/aadi-novice">GitHub</a></li>
                  <li><a className="link" href="https://www.are.na/aditya-ambade/channels">Are.na</a></li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
        </div>
      </section>
    </>
  );
}
