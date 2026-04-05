type NotebookFigureProps = {
  src: string
  alt: string
  title?: string
  className?: string
  /** `paper`: light frame for white-background figures (e.g. Qiskit mpl circuits). */
  variant?: 'default' | 'paper'
}

export function NotebookFigure({
  src,
  alt,
  title,
  className = '',
  variant = 'default',
}: NotebookFigureProps) {
  const frame =
    variant === 'paper'
      ? 'overflow-hidden rounded-xl border border-zinc-300/25 bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.65)]'
      : 'overflow-hidden rounded-xl border border-white/10 bg-black/30'

  return (
    <figure className={`mx-auto ${className}`}>
      {title ? (
        <figcaption className="sr-only">
          {title}
        </figcaption>
      ) : null}
      <div className={frame}>
        <img
          src={src}
          alt={alt}
          className="mx-auto block h-auto w-full max-w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    </figure>
  )
}
