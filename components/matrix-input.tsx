"use client"

// Basic matrix/vector inputs with HTML inputs and Tailwind tokens.
type Props = {
  n: number
  A: number[][]
  B: number[]
  onChangeA: (A: number[][]) => void
  onChangeB: (B: number[]) => void
}

export default function MatrixInput({ n, A, B, onChangeA, onChangeB }: Props) {
  const handleAChange = (i: number, j: number, val: number) => {
    const next = A.map((row) => row.slice())
    next[i][j] = val
    onChangeA(next)
  }
  const handleBChange = (i: number, val: number) => {
    const next = B.slice()
    next[i] = val
    onChangeB(next)
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_auto_260px] items-start">
      <div className="rounded-lg border bg-card p-4 overflow-auto">
        <h3 className="text-base font-medium mb-3">Matrix A (n×n)</h3>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(64px, 1fr))`, gap: "0.5rem" }}>
          {Array.from({ length: n }).map((_, i) =>
            Array.from({ length: n }).map((__, j) => (
              <input
                key={`${i}-${j}`}
                type="number"
                step="any"
                value={Number.isFinite(A[i]?.[j]) ? A[i][j] : 0}
                onChange={(e) => handleAChange(i, j, Number(e.target.value))}
                className="h-9 rounded-md border bg-background px-2 text-sm"
                aria-label={`A[${i + 1},${j + 1}]`}
              />
            )),
          )}
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center text-2xl font-semibold select-none">×</div>

      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-base font-medium mb-3">Vector B (n×1)</h3>
        <div className="grid" style={{ gridTemplateColumns: `repeat(1, minmax(128px, 1fr))`, gap: "0.5rem" }}>
          {Array.from({ length: n }).map((_, i) => (
            <input
              key={`b-${i}`}
              type="number"
              step="any"
              value={Number.isFinite(B[i]) ? B[i] : 0}
              onChange={(e) => handleBChange(i, Number(e.target.value))}
              className="h-9 rounded-md border bg-background px-2 text-sm"
              aria-label={`B[${i + 1}]`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
