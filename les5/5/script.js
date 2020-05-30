let script = {
    config: {
        rows: [1, 2, 3, 4, 5, 6, 7, 8],
        columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    },

    run() {
        let board = this.generateBoard();
        document.body.innerHTML = board;
        this.insertRowsColumns();
    },

    generateBoard() {
        let board = "";
        let rowStartWithColor = 'white';
        for (let i = 0; i < this.config.rows.length; i++) {
            let row = "";
            if (rowStartWithColor == 'white') {
                row = this.generateRow(rowStartWithColor, this.config.rows[i]);
                rowStartWithColor = 'black';
            } else {
                row = this.generateRow(rowStartWithColor, this.config.rows[i]);
                rowStartWithColor = 'white';
            }
            board += row;
        }
        return `<table>${board}</table>`;
    },

    generateRow(startWithColor, rowNum) {
        let currentColorClass = startWithColor;
        let row = "";
        for (let i = 0; i < this.config.columns.length; i++) {
            let field = "";
            if (currentColorClass === 'white') {
                field = this.generateField('white', rowNum, this.config.columns[i]);
                currentColorClass = 'blackField';
            } else {
                field = this.generateField('black', rowNum, this.config.columns[i]);
                currentColorClass = 'white';
            }
            row += field;
        }
        return `<tr>${row}</tr>`;
    },

    generateField(color, rowNum, colChar) {
        return `<td data-rownum="${rowNum}" data-colchar="${colChar}" class="${color}"></td>`;
    },

    insertRowsColumns() {
        let trs = document.querySelectorAll('tr');
        for (let i = 0; i < trs.length; i++) {
            let td = document.createElement('td');
            td.innerText = this.config.rows[i];
            trs[i].insertAdjacentElement("afterbegin", td);
        }
        let tr = document.createElement('tr');
        tr.innerHTML += '<td></td>';
        for (let i = 0; i < this.config.columns.length; i++) {
            tr.innerHTML += `<td>${this.config.columns[i]}</td>`;
        }
        let tbody = document.querySelector('tbody');
        tbody.insertAdjacentElement("beforeend", tr);
    },
}

script.run();
