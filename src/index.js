module.exports = function solveSudoku(matrix) {
    var posVal = setPossibleValues(matrix);
    var h = 0;

    while(h < 100) {
        matrix = setUnos(matrix, posVal);
        posVal = checkDuos(matrix, posVal);
        matrix = setUnos(matrix, posVal);
        h++;
    }

    return matrix;
}

function setPossibleValues(matrix){
    var cellNum = 0;
    var posVal = new Array();

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(matrix[i][j] == 0){
                posVal[cellNum] = new Array(searchPosVal(matrix, i, j));
            }
            cellNum++;
        }
    }

    return posVal;
}

function searchPosVal(matrix, i, j){
    var numbers = setNumbers();

    for(let k = 0; k < 9; k++){
        if(numbers.includes(matrix[i][k])){
            numbers.splice(numbers.indexOf(matrix[i][k]), 1);
        }

        if(numbers.includes(matrix[k][j])){
            numbers.splice(numbers.indexOf(matrix[k][j]), 1);
        }
    }

    while((i + 1) % 3 != 0 && i < 2){
        i++;
    }

    while((j + 1) % 3 != 0 && j < 2){
        j++;
    }

    let m = i - 3, n = j - 3;

    for(let x = i; x > m; x--){
        for(let y = j; y > n; y--){
            if(numbers.includes(matrix[x][y])){
                numbers.splice(numbers.indexOf(matrix[x][y]), 1);
            }
        }
    }

    return numbers;
}

function setNumbers(){
    var numbers = [];

    for(let i = 1; i < 10; i++){
        numbers[i-1] = i;
    }
    return numbers;
}

function setUnos(matrix, posVal){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(matrix[i][j] == 0 && posVal[i*9+j].length == 1){
                matrix[i][j] = posVal[i*9+j][0];
            }
        }
    }
    return matrix;
}

function checkDuos(matrix, posVal){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(matrix[i][j] == 0 && posVal[i*9+j].length == 2){
                for(let k = j + 1; k < 9; k++){
                    if(posVal[i*9+k].length == 2 && posVal[i*9+k] == posVal[i*9+j]){
                        posVal = deleteFromRow(posVal, posVal[i*9+j], i);
                    }

                    if(posVal[k*9+j].length == 2 && posVal[k*9+j] == posVal[i*9+j]){
                        posVal = deleteFromColomn(posVal, posVal[i*9+j], j);
                    }
                }
                var x = i, y = j;

                while((x + 1) % 3 != 0 && x < 2){
                    x++;
                }

                while((y + 1) % 3 != 0 && y < 2){
                    y++;
                }

                let m = i - 3, n = j - 3;

                for(; x > m; x--){
                    for(; y > n; y--){
                        if(posVal[x*9+y].length == 2 && posVal[x*9+y] == posVal[i*9+j]){
                            posVal = deleteFromSegment(posVal, posVal[i*9+j], i, j);
                        }
                    }
                }
            }
        }
    }
    return posVal;
}

function deleteFromRow(posVal, values, i){
    for(let j = 0; j < 9; j++){
        for(let k = 0; k < values.length; k++) {
            if (posVal[i*9+j].includes(values[k]) && posVal[i*9+j] != values){
                posVal[i*9+j].splice(posVal[i*9+j].indexOf(values[k]), 1);
            }
        }
    }
    return posVal;
}

function deleteFromColomn(posVal, values, j){
    for(let i = 0; i < 9; i++){
        for(let k = 0; k < values.length; k++) {
            if (posVal[i*9+j].includes(values[k]) && posVal[i*9+j] != values){
                posVal[i*9+j].splice(posVal[i*9+j].indexOf(values[k]), 1);
            }
        }
    }
    return posVal;
}

function deleteFromSegment(posVal, values, i, j){
    while((i + 1) % 3 != 0 && i < 2){
        i++;
    }

    while((j + 1) % 3 != 0 && j < 2){
        j++;
    }

    let m = i - 3, n = j - 3;

    for(let x = i; x > m; x--){
        for(let y = j; y > n; y--){
            for(let k = 0; k < values.length; k++) {
                if (posVal[x*9+y].includes(values[k]) && posVal[x*9+y] != values) {
                    posVal[x*9+y].splice(posVal[x*9+y].indexOf(values[k]), 1);
                }
            }
        }
    }
    return posVal;
}

function zeroCounter(matrix){
    var zeros = 0;

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(matrix[i][j] == 0){
                zeros++;
            }
        }
    }
    return zeros;
}


