export default function Page() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-6 py-10 flex flex-col gap-6">
        <header className="text-center">
          <h1 className="text-3xl font-semibold text-balance">
            {"Welcome to Jay's website for Gaussian Elimination with row pivoting and scaling"}
          </h1>
          <p className="text-muted-foreground mt-2">
            Using this, you can directly give your matrix and copy all the matrices in the assignments, hehe
            Open the Python-powered page, choose dimension n, enter A (n×n) and B (n×1) as floats, then view every step
            printed like your Assignment answer.
          </p>
        </header>

        <div className="flex justify-center">
          <a
            href="/gaussian.html"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm font-medium hover:opacity-90"
          >
            Open Gaussian Elimination (Python)
          </a>
        </div>

        {/* Optional reference image of desired print style */}
        <figure className="mt-4">
          {/* Embed the reference image using the provided Source URL */}
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OwesdaBPnp0tvFhhUofk16veBgb0Ug.png"
            alt="Example of the desired printed matrices after scaling and row pivoting, and the final B vector formatting."
            className="mx-auto rounded-md border"
          />
          <figcaption className="text-center text-xs text-muted-foreground mt-2">
            Example print formatting target
          </figcaption>
        </figure>
      </section>
    </main>
  )
}
