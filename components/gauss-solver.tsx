"use client"

import { useMemo, useState } from "react"
import MatrixInput from "./matrix-input"
import { gaussEliminationWithLogs, formatVector } from "@/lib/gauss"

export default function GaussSolver() {
  const [n, setN] = useState(3)
  const [A, setA] = useState<number[][]>(() => Array.from({ length: 3 }, () => Array(3).fill(0)))
  const [B, setB] = useState<number[]>(() => Array(3).fill(0))
  const [output, setOutput] = useState<string>("")

  // Reset A and B when n changes
  const handleChangeN = (next: number) => {
    const safe = Math.max(1, Math.min(10, Math.floor(next || 1)))
    setN(safe)
    setA(Array.from({ length: safe }, () => Array(safe).fill(0)))
    setB(Array(safe).fill(0))
    setOutput("")
  }

  const handleSolve = () => {
    try {
      const { logs, X } = gaussEliminationWithLogs(A, B)

      const final = [...logs, "\\nFinal Solutions by back substition X:\\n", formatVector(X), ""].join("\n")
      setOutput(final)
    } catch (e: any) {
      setOutput(`Error: ${e?.message ?? "Unknown error"}`)
    }
  }

  const headerNote = useMemo(() => `Select the dimension n (A is n×n, B is n×1), then fill out the matrices.`, [])

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border bg-card text-card-foreground p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <label htmlFor="dim" className="text-sm font-medium">
              Dimension n
            </label>
            <input
              id="dim"
              type="number"
              min={1}
              max={10}
              value={n}
              onChange={(e) => handleChangeN(Number(e.target.value))}
              className="h-9 w-24 rounded-md border bg-background px-3 text-sm"
            />
          </div>
          <p className="text-sm text-muted-foreground">{headerNote}</p>
        </div>
      </div>

      <MatrixInput n={n} A={A} B={B} onChangeA={setA} onChangeB={setB} />

      <div className="flex items-center gap-3">
        <button
          onClick={handleSolve}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm font-medium hover:opacity-90"
        >
          Solve
        </button>
        <button
          onClick={() => setOutput("")}
          className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-secondary-foreground text-sm font-medium hover:opacity-90"
        >
          Clear Output
        </button>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <h2 className="text-lg font-semibold mb-2">Output</h2>
        <pre className="whitespace-pre-wrap text-sm leading-relaxed">{output || "Results will appear here..."}</pre>
      </div>
    </div>
  )
}
