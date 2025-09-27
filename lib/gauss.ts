// Port of your Python gauss_elimination with detailed logs.

export function gaussEliminationWithLogs(Ain: number[][], Bin: number[]) {
  const n = Ain.length
  if (n === 0 || Ain.some((r) => r.length !== n) || Bin.length !== n) {
    throw new Error("A must be n×n and B must be length n")
  }

  // Deep copies
  const A = Ain.map((row) => row.map((v) => Number(v)))
  const B = Bin.map((v) => Number(v))
  const logs: string[] = []

  for (let i = 0; i < n; i++) {
    // Scaling each row by its row max (as in your code, repeated on each i)
    for (let j = 0; j < n; j++) {
      const row = A[j]
      if (!row || row.length !== n) throw new Error("Invalid matrix row")
      // Note: Python np.max(row) returns the maximum element (not abs). We replicate that.
      const rowMax = Math.max(...row)
      // Avoid division by zero if an entire row is zeros
      const scale = rowMax === 0 ? 1 : rowMax
      for (let c = 0; c < n; c++) row[c] = row[c] / scale
      B[j] = B[j] / scale
    }

    logs.push("\\nAfter Scaling A: ")
    logs.push(formatMatrix(A))
    logs.push("\\nAfter Scaling B: ")
    logs.push(formatVector(B))

    // Forward elimination for column i
    const pivot = A[i][i]
    // If pivot is zero, this mirrors the original behavior (no row swap). We could swap rows here if desired.
    for (let k = i + 1; k < n; k++) {
      const x = pivot === 0 ? 0 : A[k][i] / pivot
      for (let c = i; c < n; c++) {
        A[k][c] = A[k][c] - x * A[i][c]
      }
      B[k] = B[k] - x * B[i]
    }

    logs.push("\\nAfter Row pivoting A:")
    logs.push(formatMatrix(A))
    logs.push("\\nB: ")
    logs.push(formatVector(B))
  }

  // Back substitution (corrected to divide by diagonal)
  const X = Array(n).fill(0) as number[]
  for (let i = 0; i < n; i++) {
    let subs = 0
    for (let k = 0; k < i; k++) {
      subs += A[n - i - 1][n - k - 1] * X[n - k - 1]
    }
    const diag = A[n - 1 - i][n - 1 - i]
    const rhs = B[n - 1 - i] - subs
    X[n - 1 - i] = diag === 0 ? (rhs === 0 ? 0 : Number.NaN) : rhs / diag
  }

  return { logs, X }
}

// Pretty printers to resemble Python array printing in a compact way
export function formatMatrix(M: number[][]): string {
  if (!M.length) return "[]"
  const rows = M.map((row) => `[ ${row.map(fmt).join(", ")} ]`)
  return `[\\n${rows.map((r) => "  " + r).join(",\\n")}\\n]`
}

export function formatVector(v: number[]): string {
  if (!v.length) return "[]"
  return `[ ${v.map(fmt).join(", ")} ]`
}

function fmt(x: number): string {
  if (!Number.isFinite(x)) return String(x)
  // Keep 6 significant digits similar to many Python printouts
  const absx = Math.abs(x)
  if (absx === 0) return "0"
  if (absx >= 1e6 || absx < 1e-4) return x.toExponential(6)
  return Number(x.toPrecision(6)).toString()
}
