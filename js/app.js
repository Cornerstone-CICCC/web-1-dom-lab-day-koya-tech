document.getElementsByTagName('form')[0].addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    const entriesArray = Array.from(formData.entries());
    entriesArray.sort(([keyA], [keyB]) => {
        if (keyA === 'photo') return -1;
        if (keyB === 'photo') return 1;
        return 0;
    });
    const reorderedFormData = new FormData();
    entriesArray.forEach(([key, value]) => {
        reorderedFormData.append(key, value);
    });

    const tableContent = document.createElement('tr');

    for (let [key, value] of reorderedFormData.entries()) {
        console.log(key, value);
        const td = document.createElement('td');
        if (key === 'photo') {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(value);
            img.width = 50;
            td.appendChild(img);
        } else {
            td.textContent = value;
        }
        tableContent.appendChild(td);
    }

    const actionsTd = document.createElement('td');
    actionsTd.innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
    tableContent.appendChild(actionsTd);

    document.getElementById('employeeList').appendChild(tableContent);
});

function deleteRow(button) {
    if (!confirm('Are you sure you want to delete this row?')) {
        return;
    }
    const row = button.closest('tr');
    row.remove();
}