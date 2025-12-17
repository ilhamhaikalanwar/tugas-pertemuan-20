// --- ANIMASI PARTIKEL KURSOR ---
const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `#00d2ff`;
        this.opacity = 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.02;
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.opacity <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
}
animate();

// --- LOGIKA SHELL SORT ---
document.getElementById('btnSort').addEventListener('click', function() {
    const input = document.getElementById('inputData').value;
    let nilai = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));

    if (nilai.length === 0) {
        Swal.fire('Oops!', 'Masukkan angka yang benar ya.', 'error');
        return;
    }

    const resultArea = document.getElementById('result-area');
    resultArea.innerHTML = "";

    // Algoritma Shell Sort
    let n = nilai.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            let temp = nilai[i];
            let j;
            for (j = i; j >= gap && nilai[j - gap] > temp; j -= gap) {
                nilai[j] = nilai[j - gap];
            }
            nilai[j] = temp;
        }
        
        // Tampilkan Step
        const div = document.createElement('div');
        div.className = 'step-item';
        div.innerHTML = `<strong>Gap ${gap}:</strong> [${nilai.join(', ')}]`;
        resultArea.appendChild(div);
    }

    Swal.fire('Sukses!', 'Data berhasil diurutkan dengan Shell Sort.', 'success');
});