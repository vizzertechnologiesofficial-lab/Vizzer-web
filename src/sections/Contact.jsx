import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PiCopy, PiCheck, PiPhone, PiEnvelopeSimple, PiCheckCircle } from 'react-icons/pi'
import { site } from '../data/site'
import { EASE, reveal, stagger } from '../lib/motion'

const topics = ['Mobile app', 'Web platform', 'Backend and hosting', 'Gater for my site', 'Something else']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      window.location.href = `mailto:${site.email}`
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition-all ease-fluid-700 hover:bg-muted active:scale-95"
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'y' : 'n'}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {copied ? <PiCheck size={18} className="text-emerald-500" /> : <PiCopy size={18} />}
        </motion.span>
      </AnimatePresence>
      <span role="status" className="sr-only">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-2 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls = (err) =>
  `w-full rounded-xl border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-all ease-fluid-700 focus:outline-none focus:ring-2 ${
    err ? 'border-red-500 focus:ring-red-500/30' : 'border-border hover:border-foreground/30 focus:border-foreground/40 focus:ring-signal/40'
  }`

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Enter your name so we know who to reply to.'
    if (!form.email.trim()) er.email = 'Enter your email address.'
    else if (!EMAIL_RE.test(form.email.trim())) er.email = 'This email address looks incomplete. Check it and try again.'
    if (form.message.trim().length < 10) er.message = 'Add a sentence or two about what you need.'
    return er
  }

  const submit = (e) => {
    e.preventDefault()
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) {
      const first = Object.keys(er)[0]
      document.getElementById(`c-${first}`)?.focus()
      return
    }
    const subject = `${form.topic || 'Project enquiry'} from ${form.name.trim()}`
    const body = `${form.message.trim()}\n\n${form.name.trim()}\n${form.email.trim()}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-24 pt-8 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pb-32">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="lg:col-span-5"
        >
          <motion.h2 variants={reveal} id="contact-title" className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl sm:leading-none">
            Tell us what you want to build.
          </motion.h2>
          <motion.p variants={reveal} className="mt-6 max-w-md text-lg text-muted-foreground">
            Send a rough idea, a deadline or just a question. A person on our team replies, usually within a working
            day.
          </motion.p>

          <motion.ul variants={reveal} className="mt-10 flex flex-col gap-3">
            <li className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted">
                <PiEnvelopeSimple size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <a href={`mailto:${site.email}`} className="block truncate text-base font-semibold hover:underline">
                  {site.email}
                </a>
              </div>
              <CopyEmail />
            </li>
            <li className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted">
                <PiPhone size={18} aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Phone</p>
                <a href={site.phoneHref} className="text-base font-semibold hover:underline">
                  {site.phone}
                </a>
              </div>
            </li>
          </motion.ul>
        </motion.div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex min-h-96 flex-col items-start justify-center"
                  role="status"
                >
                  <PiCheckCircle size={48} className="text-signal" aria-hidden="true" />
                  <p className="mt-6 text-2xl font-semibold tracking-tight">Your email app should now be open.</p>
                  <p className="mt-3 max-w-md text-base text-muted-foreground">
                    Your message is filled in and ready to send. If nothing opened, write to us directly at{' '}
                    <a className="font-semibold text-foreground underline" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-8 rounded-full border border-border px-5 py-3 text-base font-semibold transition-all ease-fluid-700 hover:bg-muted active:scale-[0.98]"
                  >
                    Edit message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex flex-col gap-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id="c-name" label="Your name" error={errors.name}>
                      <input
                        id="c-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={set('name')}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'c-name-error' : undefined}
                        className={inputCls(errors.name)}
                        placeholder="Meera Thomas"
                      />
                    </Field>
                    <Field id="c-email" label="Email" error={errors.email}>
                      <input
                        id="c-email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={form.email}
                        onChange={set('email')}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'c-email-error' : undefined}
                        className={inputCls(errors.email)}
                        placeholder="meera@company.in"
                      />
                    </Field>
                  </div>

                  <fieldset>
                    <legend className="text-sm font-semibold">What do you need?</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {topics.map((t) => {
                        const on = form.topic === t
                        return (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setForm((f) => ({ ...f, topic: on ? '' : t }))}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ease-fluid-700 active:scale-[0.97] ${
                              on
                                ? 'border-foreground bg-foreground text-background'
                                : 'border-border text-foreground/80 hover:border-foreground/40 hover:text-foreground'
                            }`}
                          >
                            {t}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  <Field id="c-message" label="Message" error={errors.message}>
                    <textarea
                      id="c-message"
                      rows={5}
                      value={form.message}
                      onChange={set('message')}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'c-message-error' : undefined}
                      className={`${inputCls(errors.message)} resize-y`}
                      placeholder="We run three clinics and want patients to book and pay for slots from their phone."
                    />
                  </Field>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">Opens your email app with this message filled in.</p>
                    <button
                      type="submit"
                      className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-all ease-fluid-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
                    >
                      Send by email
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
