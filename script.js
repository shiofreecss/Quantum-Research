// Main application script for Quantum Algorithm Calculator

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Utility functions
function showResults(elementId) {
    const resultsElement = document.getElementById(elementId);
    resultsElement.classList.add('show');
}

function displayMessage(elementId, message, type = 'info') {
    const resultsElement = document.getElementById(elementId);
    resultsElement.innerHTML = `<div class="message ${type}">
        <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        ${message}
    </div>`;
    showResults(elementId);
}

function displayLoading(elementId, message = 'Calculating...') {
    const resultsElement = document.getElementById(elementId);
    resultsElement.innerHTML = `<div class="message">
        <div class="loading-spinner"></div>
        ${message}
    </div>`;
    showResults(elementId);
}

// Shor's Algorithm
function runShorAlgorithm() {
    const numberInput = document.getElementById('shor-number');
    const N = parseInt(numberInput.value);
    
    if (!N || N < 4) {
        displayMessage('shor-results', 'Please enter a valid number ≥ 4', 'error');
        return;
    }

    if (N > 10000) {
        displayMessage('shor-results', 'Number too large for simulation (max: 10000)', 'warning');
        return;
    }

    displayLoading('shor-results', 'Running Shor\'s algorithm...');

    setTimeout(() => {
        const results = QuantumMath.shorAlgorithm(N);
        
        let html = `<h3><i class="fas fa-calculator"></i> Shor's Algorithm Results</h3>`;
        
        if (results.success) {
            html += `<div class="result-item">
                <strong>✅ Factorization Successful!</strong><br>
                <span class="result-value">${N} = ${results.factors[0]} × ${results.factors[1]}</span>
            </div>`;
        } else {
            html += `<div class="result-item">
                <strong>❌ Factorization Failed</strong><br>
                This attempt didn't find factors. In practice, Shor's algorithm would be run multiple times.
            </div>`;
        }

        if (results.quantumPart) {
            html += `<div class="result-item">
                <strong>Quantum Period Finding:</strong><br>
                Base: ${results.quantumPart.base}<br>
                Modulus: ${results.quantumPart.modulus}<br>
                Period: ${results.quantumPart.period}
            </div>`;
        }

        html += `<div class="calculation-steps">
            <h4>Algorithm Steps:</h4>`;
        
        results.steps.forEach((step, index) => {
            html += `<div class="step">${index + 1}. ${step}</div>`;
        });
        
        html += `</div>`;

        // Add quantum advantage info
        const classicalComplexity = Math.pow(N, 1/3);
        const quantumComplexity = Math.pow(Math.log2(N), 3);
        
        html += `<div class="result-item">
            <strong>Complexity Comparison:</strong><br>
            Classical: ~${classicalComplexity.toFixed(0)} operations<br>
            Quantum: ~${quantumComplexity.toFixed(0)} operations<br>
            <span class="result-value">Speedup: ~${(classicalComplexity/quantumComplexity).toFixed(1)}x</span>
        </div>`;

        document.getElementById('shor-results').innerHTML = html;
    }, 1500);
}

// Grover's Algorithm
function runGroverAlgorithm() {
    const itemsInput = document.getElementById('grover-items');
    const markedInput = document.getElementById('grover-marked');
    
    const N = parseInt(itemsInput.value);
    const M = parseInt(markedInput.value);
    
    if (!N || !M || N < 2 || M < 1 || M > N) {
        displayMessage('grover-results', 'Please enter valid values (N ≥ 2, 1 ≤ M ≤ N)', 'error');
        return;
    }

    displayLoading('grover-results', 'Simulating Grover\'s search...');

    setTimeout(() => {
        const results = QuantumMath.groverAlgorithm(N, M);
        
        let html = `<h3><i class="fas fa-search"></i> Grover's Algorithm Results</h3>`;
        
        html += `<div class="result-item">
            <strong>Search Parameters:</strong><br>
            Database size: ${N.toLocaleString()} items<br>
            Target items: ${M.toLocaleString()}<br>
            <span class="result-value">Success probability: ${(results.successProbability * 100).toFixed(2)}%</span>
        </div>`;

        html += `<div class="result-item">
            <strong>Quantum Advantage:</strong><br>
            Optimal iterations: ${results.optimalIterations}<br>
            Classical queries needed: ~${Math.ceil(N/2).toLocaleString()}<br>
            <span class="result-value">Speedup: ~${results.quantumAdvantage.toFixed(1)}x</span>
        </div>`;

        // Probability visualization
        html += `<div class="result-item">
            <strong>Success Probability:</strong><br>
            <div class="probability-bar">
                <div class="probability-fill" style="width: ${results.successProbability * 100}%"></div>
                <div class="probability-label">${(results.successProbability * 100).toFixed(1)}%</div>
            </div>
        </div>`;

        html += `<div class="calculation-steps">
            <h4>Algorithm Analysis:</h4>`;
        
        results.steps.forEach((step, index) => {
            html += `<div class="step">${index + 1}. ${step}</div>`;
        });
        
        html += `</div>`;

        document.getElementById('grover-results').innerHTML = html;
    }, 1000);
}

// Deutsch-Jozsa Algorithm
function runDeutschJozsa() {
    const bitsInput = document.getElementById('deutsch-bits');
    const functionSelect = document.getElementById('deutsch-function');
    
    const n = parseInt(bitsInput.value);
    const functionType = functionSelect.value;
    
    if (!n || n < 1 || n > 10) {
        displayMessage('deutsch-results', 'Please enter number of bits (1-10)', 'error');
        return;
    }

    displayLoading('deutsch-results', 'Running Deutsch-Jozsa algorithm...');

    setTimeout(() => {
        const results = QuantumMath.deutschJozsa(n, functionType);
        
        let html = `<h3><i class="fas fa-balance-scale"></i> Deutsch-Jozsa Results</h3>`;
        
        html += `<div class="result-item">
            <strong>Function Analysis:</strong><br>
            Input bits: ${n}<br>
            Function type: ${functionType}<br>
            <span class="result-value">Result: ${results.result}</span>
        </div>`;

        html += `<div class="result-item">
            <strong>Measurement Outcome:</strong><br>
            <div class="vector-display">|${results.measurements.join('')}⟩</div><br>
            Interpretation: ${results.result === 'CONSTANT' ? 'All zeros → Constant function' : 'Contains ones → Balanced function'}
        </div>`;

        html += `<div class="result-item">
            <strong>Quantum Advantage:</strong><br>
            Classical queries needed: ${Math.pow(2, n-1) + 1} (worst case)<br>
            Quantum queries needed: 1<br>
            <span class="result-value">Exponential speedup achieved!</span>
        </div>`;

        html += `<div class="calculation-steps">
            <h4>Algorithm Steps:</h4>`;
        
        results.steps.forEach((step, index) => {
            html += `<div class="step">${index + 1}. ${step}</div>`;
        });
        
        html += `</div>`;

        document.getElementById('deutsch-results').innerHTML = html;
    }, 800);
}

// Simon's Algorithm
function runSimonAlgorithm() {
    const bitsInput = document.getElementById('simon-bits');
    const secretInput = document.getElementById('simon-secret');
    
    const n = parseInt(bitsInput.value);
    const secretString = secretInput.value;
    
    if (!n || n < 2 || n > 8) {
        displayMessage('simon-results', 'Please enter number of bits (2-8)', 'error');
        return;
    }

    if (!secretString || !/^[01]+$/.test(secretString) || secretString.length !== n) {
        displayMessage('simon-results', `Please enter a valid ${n}-bit binary string`, 'error');
        return;
    }

    displayLoading('simon-results', 'Running Simon\'s algorithm...');

    setTimeout(() => {
        const results = QuantumMath.simonAlgorithm(n, secretString);
        
        let html = `<h3><i class="fas fa-puzzle-piece"></i> Simon's Algorithm Results</h3>`;
        
        html += `<div class="result-item">
            <strong>Period Finding:</strong><br>
            Function dimension: ${n} bits<br>
            Secret string: <span class="result-value">${secretString}</span><br>
            Found period: <span class="result-value">${results.secretFound}</span>
        </div>`;

        html += `<div class="result-item">
            <strong>Linear Equations:</strong><br>`;
        
        results.equations.forEach((eq, index) => {
            html += `<div class="vector-display">y${index + 1} = ${eq.join('')}</div>`;
        });
        
        html += `<br>All equations satisfy: y · s = 0 (mod 2)
        </div>`;

        html += `<div class="result-item">
            <strong>Quantum Advantage:</strong><br>
            Expected quantum queries: ${results.expectedQueries}<br>
            Classical complexity: O(2^${n/2}) ≈ ${Math.pow(2, n/2)} operations<br>
            <span class="result-value">Exponential speedup achieved!</span>
        </div>`;

        html += `<div class="calculation-steps">
            <h4>Algorithm Steps:</h4>`;
        
        results.steps.forEach((step, index) => {
            html += `<div class="step">${index + 1}. ${step}</div>`;
        });
        
        html += `</div>`;

        document.getElementById('simon-results').innerHTML = html;
    }, 1200);
}

// Quantum Fourier Transform
function runQFT() {
    const qubitsInput = document.getElementById('qft-qubits');
    const stateInput = document.getElementById('qft-state');
    
    const n = parseInt(qubitsInput.value);
    let inputState = null;
    
    if (!n || n < 1 || n > 10) {
        displayMessage('qft-results', 'Please enter number of qubits (1-10)', 'error');
        return;
    }

    if (stateInput.value.trim()) {
        try {
            inputState = stateInput.value.split(',').map(x => parseFloat(x.trim()));
            if (inputState.length !== Math.pow(2, n)) {
                throw new Error(`Expected ${Math.pow(2, n)} amplitudes for ${n} qubits`);
            }
        } catch (e) {
            displayMessage('qft-results', `Invalid state vector: ${e.message}`, 'error');
            return;
        }
    }

    displayLoading('qft-results', 'Applying Quantum Fourier Transform...');

    setTimeout(() => {
        const results = QuantumMath.quantumFourierTransform(n, inputState);
        
        let html = `<h3><i class="fas fa-wave-square"></i> Quantum Fourier Transform Results</h3>`;
        
        html += `<div class="result-item">
            <strong>Transform Parameters:</strong><br>
            Qubits: ${n}<br>
            Dimension: ${Math.pow(2, n)}<br>
            Circuit depth: ${results.circuitDepth} layers
        </div>`;

        // Show input state
        const inputDisplay = inputState || Array(Math.pow(2, n)).fill(0).map((_, i) => i === 0 ? 1 : 0);
        html += `<div class="result-item">
            <strong>Input State:</strong><br>
            <div class="vector-display">${QuantumMath.formatVector(inputDisplay.map(x => QuantumMath.complex(x)))}</div>
        </div>`;

        // Show output state (first few significant amplitudes)
        html += `<div class="result-item">
            <strong>Output State:</strong><br>
            <div class="matrix-display">`;
        
        results.outputState.forEach((amp, i) => {
            const prob = QuantumMath.measurementProbability(amp);
            if (prob > 0.001) {
                const binaryState = i.toString(2).padStart(n, '0');
                html += `|${binaryState}⟩: ${QuantumMath.formatComplex(amp)} (prob: ${prob.toFixed(4)})\n`;
            }
        });
        
        html += `</div></div>`;

        html += `<div class="result-item">
            <strong>Quantum Advantage:</strong><br>
            Classical FFT: O(${n} × 2^${n}) = ${n * Math.pow(2, n)} operations<br>
            Quantum QFT: O(${n}²) = ${n * n} quantum gates<br>
            <span class="result-value">Exponential speedup for quantum states!</span>
        </div>`;

        html += `<div class="calculation-steps">
            <h4>Transform Analysis:</h4>`;
        
        results.steps.forEach((step, index) => {
            html += `<div class="step">${index + 1}. ${step}</div>`;
        });
        
        html += `</div>`;

        document.getElementById('qft-results').innerHTML = html;
    }, 1500);
}

// Variational Quantum Eigensolver
function runVQE() {
    const moleculeSelect = document.getElementById('vqe-molecule');
    const distanceInput = document.getElementById('vqe-distance');
    
    const molecule = moleculeSelect.value;
    const bondDistance = parseFloat(distanceInput.value);
    
    if (!bondDistance || bondDistance < 0.1 || bondDistance > 5.0) {
        displayMessage('vqe-results', 'Please enter a valid bond distance (0.1-5.0 Å)', 'error');
        return;
    }

    displayLoading('vqe-results', 'Running VQE optimization...');

    setTimeout(() => {
        const results = QuantumMath.vqeSimulation(molecule, bondDistance);
        
        let html = `<h3><i class="fas fa-atom"></i> VQE Results</h3>`;
        
        html += `<div class="result-item">
            <strong>Molecular System:</strong><br>
            Molecule: ${molecule}<br>
            Bond distance: ${bondDistance} Å<br>
            <span class="result-value">Ground state energy: ${results.groundStateEnergy.toFixed(6)} Hartree</span>
        </div>`;

        html += `<div class="result-item">
            <strong>Energy Conversion:</strong><br>
            Hartree: ${results.groundStateEnergy.toFixed(6)}<br>
            eV: ${(results.groundStateEnergy * 27.211).toFixed(3)}<br>
            kcal/mol: ${(results.groundStateEnergy * 627.5).toFixed(1)}
        </div>`;

        html += `<div class="result-item">
            <strong>Optimization:</strong><br>
            Iterations: ${results.iterations.length}<br>
            Converged: ${results.converged ? '✅ Yes' : '❌ No'}<br>
            Final parameters: [${results.iterations[results.iterations.length - 1].parameters.map(p => p.toFixed(3)).join(', ')}]
        </div>`;

        // Energy convergence plot (simplified)
        html += `<div class="result-item">
            <strong>Energy Convergence:</strong><br>`;
        
        const energies = results.iterations.slice(-10); // Last 10 iterations
        energies.forEach((iter, index) => {
            const width = Math.abs(iter.energy / results.groundStateEnergy) * 100;
            html += `<div class="probability-bar" style="margin: 2px 0;">
                <div class="probability-fill" style="width: ${Math.min(width, 100)}%; background: linear-gradient(90deg, #f59e0b, #ef4444);"></div>
                <div class="probability-label">Iter ${iter.iteration}: ${iter.energy.toFixed(4)}</div>
            </div>`;
        });
        
        html += `</div>`;

        html += `<div class="calculation-steps">
            <h4>VQE Process:</h4>`;
        
        results.steps.forEach((step, index) => {
            html += `<div class="step">${index + 1}. ${step}</div>`;
        });
        
        html += `</div>`;

        document.getElementById('vqe-results').innerHTML = html;
    }, 2000);
}

// Add some visual enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add quantum pulse effect to algorithm cards
    const cards = document.querySelectorAll('.algorithm-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('quantum-pulse');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('quantum-pulse');
        });
    });

    // Add particle effect to header (optional enhancement)
    createQuantumParticles();
});

function createQuantumParticles() {
    const header = document.querySelector('.header');
    if (!header) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            animation: quantumFloat ${3 + Math.random() * 4}s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        header.appendChild(particle);
    }

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes quantumFloat {
            0%, 100% { 
                opacity: 0;
                transform: translateY(0px) scale(0.5);
            }
            50% { 
                opacity: 0.8;
                transform: translateY(-20px) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}