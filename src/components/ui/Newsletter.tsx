'use client'

export default function Newsletter() {
  return (
    <div className="w-full lg:w-auto">
      <h3 className="mb-3 text-xs font-medium uppercase tracking-[.3em] text-current">
        Subscribe to the Newsletter
      </h3>
      <p className="mb-5 text-sm font-light text-current">
        Offers and stories from the heritage, straight to your inbox.
      </p>
      <form
        className="group flex w-full max-w-sm items-center border-b border-current/30 transition-colors focus-within:border-current"
        action="https://hoteldiamondpalace.us6.list-manage.com/subscribe/post?u=013497d3d7f06885d7c80d1ef&amp;id=c55687e25d&amp;f_id=00d3eee5f0"
        method="post"
        name="mc-embedded-subscribe-form"
        target="_blank"
        rel="noreferrer"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="EMAIL"
          placeholder="Your email address"
          autoComplete="email"
          required
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-current placeholder:text-current/60 focus:outline-none"
        />
        <button
          type="submit"
          name="subscribe"
          aria-label="Subscribe to newsletter"
          className="flex shrink-0 items-center gap-2 py-3 pl-4 text-xs font-medium uppercase tracking-[.25em] text-current transition-colors hover:text-light-orange"
        >
          Subscribe
          <span aria-hidden className="transition-transform group-focus-within:translate-x-1">→</span>
        </button>
      </form>
    </div>
  )
}
