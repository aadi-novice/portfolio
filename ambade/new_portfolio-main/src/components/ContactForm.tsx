import { useId, useRef, useState, type FormEvent } from 'react';

const ADDRESS = 'aditya@ambade.me';

/**
 * The enquiry form. It has no server endpoint: on submit it opens the visitor's
 * mail app with the message filled in, addressed to Aditya. Nothing is sent from here.
 */
export default function ContactForm({ submitLabel = 'Write the email' }: { submitLabel?: string }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [help, setHelp] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea'));
    fields.forEach((field) => field.removeAttribute('aria-invalid'));
    const firstInvalid = fields.find((field) => !field.checkValidity());
    if (firstInvalid) {
      firstInvalid.setAttribute('aria-invalid', 'true');
      firstInvalid.setAttribute('aria-describedby', `${id}-help`);
      setHelp(
        firstInvalid.type === 'email'
          ? 'That address looks incomplete. Write it as name@example.com.'
          : 'Fill in your name, your email and a message.',
      );
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = `Project enquiry from ${name}`;
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:${ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setHelp(`Your mail app should open with this message to ${ADDRESS}. If it does not, write to that address directly.`);
  }

  return (
    <form ref={formRef} className="form" onSubmit={handleSubmit} noValidate data-endpoint="">
      <div className="field">
        <label htmlFor={`${id}-name`}>Your name</label>
        <input id={`${id}-name`} name="name" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor={`${id}-email`}>Email</label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" inputMode="email" required />
      </div>
      <div className="field">
        <label htmlFor={`${id}-message`}>What are you building?</label>
        <textarea id={`${id}-message`} name="message" rows={5} required />
      </div>
      <div className="form__foot">
        <button className="btn" type="submit">{submitLabel}</button>
        <p className="form__help" id={`${id}-help`} aria-live="polite">
          {help || 'Opens your mail app with the message filled in.'}
        </p>
      </div>
    </form>
  );
}
