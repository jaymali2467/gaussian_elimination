# Gaussian Elimination with Scaling

A web-based solver for systems of linear equations using **Gaussian elimination with row scaling**.

## What It Does

This tool solves systems of linear equations of the form **Ax = b** where:
- **A** is an n×n coefficient matrix
- **b** is an n×1 augmented column vector
- **x** is the solution vector

The algorithm uses **row scaling** to improve numerical stability and prevent overflow/underflow issues during computation.

## Algorithm Steps

1. **Scaling**: Each row of matrix A is divided by its maximum absolute element to normalize the rows
2. **Forward Elimination**: Uses Gaussian elimination to convert the system to upper triangular form
3. **Back Substitution**: Solves for x by working backwards from the last equation to the first

## Features

- Simple web interface for input
- Accepts matrices of any dimension (n×n)
- Takes float values as input
- Displays intermediate results:
  - Scaled matrix A
  - Scaled augmented vector B
  - Upper triangular form after forward elimination
  - Final solution vector X

## How to Use

1. **Select Matrix Dimension**: Choose the size (n) of your square matrix
2. **Enter Matrix A**: Input the n×n coefficient matrix as floating-point numbers
3. **Enter Vector B**: Input the n×1 augmented vector
4. **Solve**: Click the solve button to run the algorithm
5. **View Results**: See all intermediate matrices and the final solution vector

## Input Format

- All inputs are floating-point numbers
- Enter one number per field
- Examples: `1.5`, `-2.3`, `0.001`, `100`

## Output Format

The solver displays:
\`\`\`
After Scaling A:
[[...scaled matrix...]]

After Scaling B:
[[...scaled vector...]]

After Gaussian Elimination A:
[[...upper triangular matrix...]]

B:
[[...transformed vector...]]

Final Solutions by back substitution X:
[[...solution vector...]]
\`\`\`

## Limitations

- Works only for square matrices (n×n)
- Assumes the system has a unique solution
- Does not handle singular or near-singular matrices explicitly
- Numerical precision depends on floating-point arithmetic

## Running Locally

Open `public/gaussian.html` in any modern web browser. The solver runs entirely in the browser using Python and NumPy via Pyodide.

## Technologies

- **Frontend**: HTML, CSS, JavaScript
- **Backend Computation**: Python (via Pyodide), NumPy
- **Deployment**: Works in any modern web browser (Chrome, Firefox, Safari, Edge)

## Example

For a 2×2 system:
\`\`\`
A = [[2, 3], [4, 5]]
b = [8, 14]
\`\`\`

The solver will compute and display all scaling steps and output the solution vector x.
