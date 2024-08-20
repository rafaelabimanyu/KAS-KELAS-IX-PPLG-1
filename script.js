document.getElementById('kasForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (description && amount && type) {
        addEntry(description, amount, type);
        updateTotal();
        document.getElementById('kasForm').reset();
    }
});

function addEntry(description, amount, type) {
    const table = document.getElementById('kasTable');
    const row = table.insertRow();

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.textContent = description;
    cell2.textContent = amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    cell3.textContent = type === 'income' ? 'Pemasukan' : 'Pengeluaran';
    cell3.className = type === 'income' ? 'text-success' : 'text-danger';

    row.dataset.amount = amount;
    row.dataset.type = type;
}

function updateTotal() {
    const rows = document.querySelectorAll('#kasTable tr');
    let total = 0;

    rows.forEach(row => {
        const amount = parseFloat(row.dataset.amount);
        const type = row.dataset.type;

        if (type === 'income') {
            total += amount;
        } else {
            total -= amount;
        }
    });

    document.getElementById('totalAmount').textContent = total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}
