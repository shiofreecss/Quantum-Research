# Quantum Algorithm Calculator

A comprehensive web-based calculator for quantum computing algorithms with beautiful UI and advanced simulations.

## 🚀 Features

### Quantum Algorithms Implemented

1. **Shor's Algorithm** - Integer factorization using quantum period finding
2. **Grover's Algorithm** - Quantum database search with quadratic speedup
3. **Deutsch-Jozsa Algorithm** - Determine if a function is constant or balanced
4. **Simon's Algorithm** - Find hidden periods in black-box functions
5. **Quantum Fourier Transform (QFT)** - Quantum analog of discrete Fourier transform
6. **Variational Quantum Eigensolver (VQE)** - Find ground state energies of molecules

### Key Features

- 🎨 **Modern UI** - Beautiful dark theme with quantum-inspired animations
- 📊 **Interactive Visualizations** - Probability bars, state vectors, and matrices
- 🔬 **Detailed Analysis** - Step-by-step algorithm explanations
- ⚡ **Performance Metrics** - Quantum vs classical complexity comparisons
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🧮 **Advanced Math** - Complex number operations and quantum state calculations

## 🛠️ Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - runs entirely in the browser

### Usage

1. **Open the Application**
   - Open `index.html` in your web browser
   - Or serve it from a local web server

2. **Navigate Between Algorithms**
   - Use the tab navigation to switch between different quantum algorithms
   - Each tab contains a specific algorithm with its own interface

3. **Input Parameters**
   - Enter the required parameters for each algorithm
   - Follow the placeholder text and validation hints

4. **Run Calculations**
   - Click the algorithm-specific button to start calculations
   - View results with detailed explanations and visualizations

## 📖 Algorithm Guide

### 🔐 Shor's Algorithm - Integer Factorization
**Discovered**: Peter Shor (1994)  
**Purpose**: Factor large integers exponentially faster than classical algorithms  
**Key Insight**: Uses quantum period finding to reduce factoring to finding the period of a^x mod N  

**Applications**:
- Breaking RSA encryption
- Cryptanalysis
- Number theory research

**Complexity Analysis**:
- **Classical**: O(exp(n^(1/3))) - Sub-exponential (General Number Field Sieve)
- **Quantum**: O(n³) - Polynomial time
- **Qubits Required**: ~2n qubits for n-bit number
- **Circuit Depth**: O(n³) quantum gates
- **Success Probability**: High with polynomial repetitions

**Input Parameters**:
- Integer N to factor (4 ≤ N ≤ 10000)

**Example Usage**:
- Input: 15 → Output: 15 = 3 × 5

---

### 🔍 Grover's Algorithm - Database Search
**Discovered**: Lov Grover (1996)  
**Purpose**: Search unsorted databases with quadratic speedup over classical algorithms  
**Key Insight**: Amplitude amplification rotates the quantum state toward marked items  

**Applications**:
- Database search
- Optimization problems
- Satisfiability problems
- Cryptographic attacks

**Complexity Analysis**:
- **Classical**: O(N) - Linear search through all items
- **Quantum**: O(√N) - Quadratic speedup
- **Optimal Iterations**: π/4 × √(N/M) where M is marked items
- **Qubits Required**: log₂(N) qubits to represent database
- **Success Probability**: ~100% with optimal iterations
- **Geometric Interpretation**: Rotation in 2D subspace spanned by marked and unmarked states

**Input Parameters**:
- N: Total number of items
- M: Number of marked (target) items

**Example Usage**:
- Database size: 1,000,000, Marked items: 1
- Quantum iterations: ~500 (vs ~500,000 classical)

---

### ⚖️ Deutsch-Jozsa Algorithm - Function Classification
**Discovered**: David Deutsch (1985), extended by Deutsch-Jozsa (1992)  
**Purpose**: Determine if a Boolean function is constant or balanced with certainty  
**Key Insight**: Quantum parallelism evaluates function on all inputs simultaneously  

**Applications**:
- Function analysis
- Quantum algorithm design
- Oracle separation problems
- Theoretical computer science

**Complexity Analysis**:
- **Classical**: O(2^(n-1) + 1) - Up to half the inputs plus one
- **Quantum**: O(1) - Single function evaluation
- **Qubits Required**: n + 1 qubits (n for input, 1 ancilla)
- **Circuit Depth**: O(1) - Constant depth circuit
- **Success Probability**: 100% - Deterministic result
- **Historical Significance**: First quantum algorithm to show exponential speedup

**Input Parameters**:
- n: Number of input bits
- Function type: Constant or balanced

**Example Usage**:
- 3-bit function → Result: CONSTANT or BALANCED

---

### 🧩 Simon's Algorithm - Hidden Period Finding
**Discovered**: Daniel Simon (1994)  
**Purpose**: Find hidden periods in black-box functions with exponential speedup  
**Key Insight**: Exploits quantum interference to extract period information  

**Applications**:
- Cryptanalysis
- Hidden subgroup problems
- Inspired Shor's algorithm development
- Algebraic problem solving

**Complexity Analysis**:
- **Classical**: O(2^(n/2)) - Birthday paradox bound
- **Quantum**: O(n) - Linear in problem size
- **Expected Queries**: n - 1 quantum queries to oracle
- **Qubits Required**: 2n qubits (n input, n output)
- **Success Probability**: High with linear number of measurements
- **Mathematical Foundation**: Linear algebra over GF(2) finite fields

**Input Parameters**:
- n: Number of bits
- Secret string: Binary string representing the period

**Example Usage**:
- n = 3, Secret: "101" → Period found through linear equations

---

### 🌊 Quantum Fourier Transform (QFT)
**Discovered**: Don Coppersmith (1994), formalized by various researchers  
**Purpose**: Quantum analog of discrete Fourier transform for quantum states  
**Key Insight**: Efficiently computes Fourier transform on quantum amplitudes  

**Applications**:
- Period finding algorithms
- Shor's algorithm (core subroutine)
- Quantum phase estimation
- Signal processing

**Complexity Analysis**:
- **Classical FFT**: O(n × 2^n) operations on 2^n classical data
- **Quantum QFT**: O(n²) quantum gates on n-qubit quantum state
- **Circuit Depth**: O(n²) gate layers with nearest-neighbor connectivity
- **Qubits Required**: n qubits for 2^n dimensional transform
- **Gate Types**: Hadamard gates and controlled phase rotations
- **Measurement**: Provides Fourier coefficients as measurement probabilities

**Input Parameters**:
- n: Number of qubits
- State vector: Input quantum state (optional)

**Example Usage**:
- 3 qubits, Input: |000⟩ → Superposition of all basis states

---

### ⚛️ Variational Quantum Eigensolver (VQE)
**Discovered**: Peruzzo et al. (2014), building on variational principles  
**Purpose**: Find ground state energies of quantum systems using hybrid quantum-classical optimization  
**Key Insight**: Combines quantum state preparation with classical optimization  

**Applications**:
- Quantum chemistry
- Materials science
- Drug discovery
- Optimization problems
- Molecular simulation

**Complexity Analysis**:
- **Classical Exact**: O(4^n) - Exponential scaling with system size
- **VQE Scaling**: Polynomial in measurements, problem-dependent accuracy
- **Ansatz Depth**: Varies by molecular system and desired accuracy
- **Qubits Required**: Typically 2-50 qubits for small molecules
- **Optimization**: Classical optimizer (COBYLA, SPSA, gradient descent)
- **NISQ Ready**: Designed for near-term quantum devices with limited coherence

**Input Parameters**:
- Molecule: H₂, HeH⁺, LiH, or BeH₂
- Bond distance: Internuclear distance in Angstroms

**Example Usage**:
- Molecule: H₂, Distance: 0.74 Å → Ground state energy in Hartree

## 🎯 Technical Details

### Architecture
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design principles
- **Mathematics**: Custom quantum mathematics library
- **Animations**: CSS keyframes and JavaScript interactions

### Browser Compatibility
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Performance
- Optimized for real-time calculations
- Responsive animations and transitions
- Efficient quantum state representations

## 🔧 Customization

### Adding New Algorithms
1. Add HTML structure in `index.html`
2. Implement algorithm logic in `quantum-math.js`
3. Add UI interaction in `script.js`
4. Style with CSS in `styles.css`

### Modifying Existing Algorithms
- Algorithm implementations are in the `QuantumMath` class
- UI logic is in individual functions in `script.js`
- Styling can be customized in `styles.css`

## 🧪 Examples and Use Cases

### Educational
- Learn quantum algorithm principles
- Visualize quantum speedups
- Understand complexity differences

### Research
- Prototype quantum algorithms
- Analyze algorithm performance
- Demonstrate quantum advantages

### Development
- Test quantum algorithm implementations
- Validate quantum circuit designs
- Explore parameter spaces

## 🚀 Advanced Features

### Complex Number Operations
- Full complex arithmetic support
- Quantum state normalization
- Probability calculations

### Matrix Operations
- Quantum gate representations
- State transformations
- Unitary operations

### Visualization
- Probability amplitude displays
- State vector representations
- Convergence plots

## 📊 Performance Metrics

The calculator provides detailed performance analysis:

- **Classical Complexity**: Traditional algorithm requirements
- **Quantum Complexity**: Quantum algorithm requirements
- **Speedup Factors**: Quantum advantage calculations
- **Resource Requirements**: Qubit counts and circuit depths

## 🎨 Design Philosophy

- **Quantum Aesthetic**: Dark theme with quantum-inspired colors
- **Intuitive Interface**: Clear navigation and input validation
- **Educational Focus**: Detailed explanations and step-by-step results
- **Professional Quality**: Production-ready code and design

## 🔮 Future Enhancements

- Additional quantum algorithms (QAOA, HHL, etc.)
- Quantum circuit visualizations
- Real quantum hardware integration
- Advanced molecular chemistry calculations
- Interactive quantum state manipulations

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for improvements.

---

**Built with ❤️ for the quantum computing community** 