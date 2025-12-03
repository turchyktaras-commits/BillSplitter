/**
 * Клас, що зберігає дані сесії розрахунку (Model)
 */
class BillSession {
    constructor(amount, tipPercent, people) {
        this.amount = parseFloat(amount);
        this.tipPercent = parseInt(tipPercent);
        this.people = parseInt(people);
    }

    isValid() {
        return !isNaN(this.amount) && this.amount > 0 && this.people > 0;
    }

    calculate() {
        const tipAmount = this.amount * (this.tipPercent / 100);
        const total = this.amount + tipAmount;
        return {
            total: total.toFixed(2),
            perPerson: (total / this.people).toFixed(2)
        };
    }
}

/**
 * Клас управління інтерфейсом (Controller)
 */
class SplitManager {
    constructor() {
        this.initEventListeners();
    }

    initEventListeners() {
        // Обробка вибору чайових
        document.querySelectorAll('.tip-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tip-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById('selectedTip').value = e.target.dataset.value;
            });
        });
    }

    adjustPeople(delta) {
        const input = document.getElementById('peopleCount');
        let val = parseInt(input.value) + delta;
        if (val < 1) val = 1;
        input.value = val;
    }

    calculate() {
        const amount = document.getElementById('totalAmount').value;
        const tip = document.getElementById('selectedTip').value;
        const people = document.getElementById('peopleCount').value;

        const session = new BillSession(amount, tip, people);

        if (session.isValid()) {
            const result = session.calculate();
            this.showResult(result);
        } else {
            alert("Будь ласка, введіть коректну суму!");
        }
    }

    showResult(data) {
        document.getElementById('amountPerPerson').innerText = data.perPerson + " ₴";
        document.getElementById('totalWithTip').innerText = data.total + " ₴";
        document.getElementById('resultArea').classList.remove('hidden');
    }
}

// Ініціалізація додатку
const app = new SplitManager();