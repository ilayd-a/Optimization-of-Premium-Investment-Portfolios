type NotebookFigureProps = {
  src: string
  alt: string
  title?: string
  className?: string
}

export function NotebookFigure({ src, alt, title, className = '' }: NotebookFigureProps) {
  return (
    <figure className={`mx-auto ${className}`}>
      {title ? (
        <figcaption className="sr-only">
          {title}
        </figcaption>
      ) : null}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
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
