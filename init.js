
const main = function () {

    let id = 0;
    const listBranches = [
        {
            id: 0,
            label: 0,
            parent: null,
            kids: []
        }
    ];

    getNextId = () => {
        return ++id;
    };
    getId = () => {
        return id;
    };

    addBranch = () => {
        const id = Number(inputAdd.value);
        if (getBranch(listBranches, id) && inputAdd.value !== '') {
            pushBranch(listBranches, id)
        };
    };

    pushBranch = (array, id) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                const branch = createBranch(array[i], array[i].kids.length)
                array[i].kids.push(branch);
                drawTree();
                return;
            };
        };
        for (let i = 0; i < array.length; i++) {
            if (array[i].kids.length > 0) {
                return pushBranch(array[i].kids, id);
            };
        };
    };

    getBranch = function (obj, id) {
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].id === id) {
                return obj[i]
            }
        }
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].kids.length > 0) {
                return getBranch(obj[i].kids, id);
            }
        }
    };

    createBranch = (obj, i) => {
        return {
            id: getNextId(),
            parent: obj.id,
            label: obj.label + 1,
            kids: []
        };
    };

    recurseAllString = (branch) => {
        let html = `<h3>${branch.id}(p:${branch.parent})</h3>`;

        if (branch.kids.length === 0)
            return html;

        return html +
            `<div style="border: 1px solid black; padding: 5px 5px 5px 5px;margin: 5px;">
            ${ branch.kids.map(child => `<div style="border: 1px solid black;padding: 5px;margin: 5px;">${recurseAllString(child)}</div>`).join('')}
          </div>`;
    };

    getAllStrings = () => {
        return `<div style='border: 1px solid black;padding: 10px;margin: 10px;'>${recurseAllString(listBranches[0])}</div>`
    };

    pushReplacedBranch = (array, id, branch) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                array[i].kids.push(branch);
                drawTree();
                return;
            };
        };
        for (let i = 0; i < array.length; i++) {
            if (array[i].kids.length > 0) {
                return pushReplacedBranch(array[i].kids, id, branch);
            };
        };
    };

    deleteBranch = (array, id) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                array.splice(i, 1);
                return;
            };
        };
        for (let i = 0; i < array.length; i++) {
            if (array[i].kids.length > 0) {
                return deleteBranch(array[i].kids, id);
            };
        };
    };

    deleteFullBranch = () => {
        const id = Number(inputDelete.value);
        if (inputDelete.value !== '' && getBranch(listBranches, id)) {
            deleteBranch(listBranches, id);
            drawTree();
        };
    };

    replaceBranch = () => {
        const from = Number(inputFrom.value);
        const to = Number(inputTo.value);
        if (getBranch(listBranches, from) && getBranch(listBranches, to) && inputFrom.value !== '' && inputTo.value !== '') {
            let newObj = JSON.parse(JSON.stringify(getBranch(listBranches, from)));
            newObj.parent = to;
            deleteBranch(listBranches, from);
            pushReplacedBranch(listBranches, to, newObj);
            drawTree();
        };
    };

    replaceKids = () => {
        const id = Number(inputReplaceKids.value);
        if (getBranch(listBranches, id) && inputReplaceKids.value !== '') {
            const branch = getBranch(listBranches, id);
            for (let i = 0; i < branch.kids.length; i++) {
                pushReplacedBranch(listBranches, branch.parent, branch.kids[i]);
            }
            deleteBranch (listBranches, id)
            drawTree();
        };

    };

    drawTree = () => {
        inputAdd.value = '';
        inputFrom.value = '';
        inputTo.value = ''
        inputDelete.value = '';
        inputReplaceKids.value = '';
        fieldTree.innerHTML = getAllStrings();
    };
    btnAdd.addEventListener('click', addBranch, true);
    btnReplace.addEventListener('click', replaceBranch, true);
    btnDelete.addEventListener('click', deleteFullBranch, true);
    btnReplaceKids.addEventListener('click', replaceKids, true);
    drawTree();
};

window.onload = function () {
    main();
};
