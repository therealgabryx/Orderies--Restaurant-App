function firstSelectionAdd(selector) {
    var num = document.getElementById(`${selector}`).innerText

    if (isNaN(num)) {
        document.getElementById(`${selector}`).innerText = 1
    } 
    else {
        document.getElementById(`${selector}`).innerText = (parseInt(num) + 1)
    }
}

function firstSelectionDel(selector) {
    var num = document.getElementById(`${selector}`).innerText

    if (!isNaN(num)) {
        if (num == 1) {
            document.getElementById(`${selector}`).innerText = '-'
        }
        else {
            document.getElementById(`${selector}`).innerText = (parseInt(num) - 1)
        }
    } 
}
