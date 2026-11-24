import './style.css'

const WHATSAPP_NUMBER = '5541987739216'
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`

/* ---------- Scroll reveal ---------- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.14, rootMargin: '0px 0px -60px 0px' },
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
}

/* ---------- Header state on scroll ---------- */
const header = document.getElementById('site-header')
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8)
updateHeader()
window.addEventListener('scroll', updateHeader, { passive: true })

/* ---------- Booking form → WhatsApp ---------- */
const form = document.getElementById('booking-form')
const dayInput = document.getElementById('day')

if (dayInput) {
  dayInput.min = new Date().toISOString().split('T')[0]
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const service = form.querySelector('#service').value
    const day = form.querySelector('#day').value
    const time = form.querySelector('#time').value

    const lines = [
      'Olá Fran! Vi seu site e gostaria de agendar um horário.',
      '',
      `Serviço: ${service}`,
    ]

    if (day) {
      const [y, m, d] = day.split('-')
      lines.push(`Dia preferido: ${d}/${m}/${y}`)
    }

    if (time) lines.push(`Horário: ${time}`)
    lines.push('', 'Pode confirmar a disponibilidade?')

    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener')
  })
}

/* ---------- Footer year ---------- */
const yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = String(new Date().getFullYear())
