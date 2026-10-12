import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { PiCopy, PiCheck, PiPhone, PiEnvelopeSimple, PiCheckCircle, PiHandshake, PiBriefcase, PiMapPin, PiLinkedinLogo } from 'react-icons/pi'
import PageHeader from '../components/PageHeader'
import { contact } from '../data/content'
import { productById } from '../data/products'
import { seo, site } from '../data/site'
import { usePageMeta } from '../lib/meta'
import { EASE, reveal, stagger } from '../lib/motion'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Let a long address wrap after a dot or before the @ instead of mid-word on narrow phones
const breakable = (email) => {
  const [user, domain] = email.split('@')
  return (
    <>
      {user.split('.').map((part, i) => (i ? <span key={i}>.<wbr />{part}</span> : part))}
      <wbr />@{domain}
    </>
  )
}

function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      window.location.href = `mailto:${email}`
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

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
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

// Contact details. Optional ones only show once they are filled in src/data/site.js.
function details() {
  const list = [
    { label: 'General enquiries', value: site.email, href: `mailto:${site.email}`, Icon: PiEnvelopeSimple, copy: true },
    { label: 'Phone', value: site.phone, href: site.phoneHref, Icon: PiPhone },
  ]
  if (site.partnershipsEmail)
    list.push({ label: 'Partnerships', value: site.partnershipsEmail, href: `mailto:${site.partnershipsEmail}`, Icon: PiHandshake, copy: true })
  if (site.careersEmail)
    list.push({ label: 'Careers', value: site.careersEmail, href: `mailto:${site.careersEmail}`, Icon: PiBriefcase, copy: true })
  if (site.address) list.push({ label: 'Business address', value: site.address, Icon: PiMapPin })
  if (site.social.linkedin) list.push({ label: 'LinkedIn', value: 'Vizzer Technologies', href: site.social.linkedin, Icon: PiLinkedinLogo, external: true })
  return list
}

// Which inbox an enquiry type goes to
const inboxFor = (type) => {
  if (type === 'Partnership' && site.partnershipsEmail) return site.partnershipsEmail
  if (type === 'Careers' && site.careersEmail) return site.careersEmail
  return site.email
}

export default function Contact() {
  usePageMeta(seo.contact)
  const [params] = useSearchParams()

  // Links such as /contact?enquiry=partnership or /contact?enquiry=product&product=gater preselect the form
  const initialType = contact.enquiryTypes.find((t) => t.toLowerCase() === params.get('enquiry')?.toLowerCase()) ?? ''
  const product = productById[params.get('product')]
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    type: initialType,
    message: product ? `I would like to know more about ${product.name}.\n\n` : '',
  })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Enter your full name so we know who to reply to.'
    if (!form.email.trim()) er.email = 'Enter your business email address.'
    else if (!EMAIL_RE.test(form.email.trim())) er.email = 'This email address looks incomplete. Check it and try again.'
    if (!form.type) er.type = 'Choose the type of enquiry.'
    if (form.message.trim().length < 10) er.message = 'Add a sentence or two about your enquiry.'
    return er
  }

  const submit = (e) => {
    e.preventDefault()
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) {
      const first = Object.keys(er)[0]
      document.getElementById(first === 'type' ? 'c-type-0' : `c-${first}`)?.focus()
      return
    }
    const name = form.name.trim()
    const company = form.company.trim()
    const subject = `${form.type} enquiry from ${name}${company ? `, ${company}` : ''}`
    const body = [form.message.trim(), '', name, company, form.email.trim()].filter((l, i) => i < 2 || l).join('\n')
    window.location.href = `mailto:${inboxFor(form.type)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <PageHeader eyebrow={contact.eyebrow} title={contact.headline} className="lg:pb-12">
            <p>{contact.body}</p>
          </PageHeader>

          <motion.ul variants={stagger(0.06)} initial="hidden" animate="show" className="flex flex-col gap-3 pb-12 lg:pb-32">
            {details().map(({ label, value, href, Icon, copy, external }) => (
              <motion.li key={label} variants={reveal} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="block text-base font-semibold hover:underline"
                    >
                      {copy ? breakable(value) : value}
                    </a>
                  ) : (
                    <p className="text-base font-semibold">{value}</p>
                  )}
                </div>
                {copy && <CopyEmail email={value} />}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 48, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          className="pb-24 lg:col-span-7 lg:pb-32 lg:pt-48"
        >
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8">
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
                    <a className="font-semibold text-foreground underline" href={`mailto:${inboxFor(form.type)}`}>
                      {inboxFor(form.type)}
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
                  aria-label="Contact form"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id="c-name" label="Full Name" error={errors.name}>
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
                    <Field id="c-email" label="Business Email" error={errors.email}>
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

                  <Field id="c-company" label="Company" optional>
                    <input
                      id="c-company"
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={set('company')}
                      className={inputCls(false)}
                      placeholder="Company name"
                    />
                  </Field>

                  <fieldset aria-describedby={errors.type ? 'c-type-error' : undefined}>
                    <legend className="text-sm font-semibold">Enquiry Type</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {contact.enquiryTypes.map((t, i) => {
                        const on = form.type === t
                        return (
                          <button
                            key={t}
                            id={`c-type-${i}`}
                            type="button"
                            aria-pressed={on}
                            onClick={() => {
                              setForm((f) => ({ ...f, type: on ? '' : t }))
                              if (errors.type) setErrors((er) => ({ ...er, type: undefined }))
                            }}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ease-fluid-700 active:scale-[0.97] ${
                              on
                                ? 'border-foreground bg-foreground text-background'
                                : `${errors.type ? 'border-red-500' : 'border-border'} text-foreground/80 hover:border-foreground/40 hover:text-foreground`
                            }`}
                          >
                            {t}
                          </button>
                        )
                      })}
                    </div>
                    <AnimatePresence>
                      {errors.type && (
                        <motion.p
                          id="c-type-error"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="mt-2 text-sm text-red-600 dark:text-red-400"
                        >
                          {errors.type}
                        </motion.p>
                      )}
                    </AnimatePresence>
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
                      placeholder="Tell us a little about what you have in mind."
                    />
                  </Field>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">Opens your email app with this message filled in.</p>
                    <button
                      type="submit"
                      className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-all ease-fluid-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
                    >
                      Send Message
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
