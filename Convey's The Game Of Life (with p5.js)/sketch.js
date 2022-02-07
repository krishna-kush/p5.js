function setup() {
    createCanvas(600, 600);
    background(220);
    grid_len = 100
    drawGrid(grid_len)
    pos = make2dArray(grid_len)


    // pos[row][column] = 1

    // // Glider
    pos[1][3] = 1
    pos[2][4] = 1
    pos[3][2] = 1
    pos[3][3] = 1
    pos[3][4] = 1

    // // Three in line
    // pos[3][2] = 1
    // pos[3][3] = 1
    // pos[3][4] = 1

    pos[7][7] = 1

    // For all random
    for ([i, k] of pos.entries()) {
        for ([j, l] of k.entries()) {
            // console.log(floor(random(2)))
            pos[i][j] = floor(random(2))
        }
    }
}

function draw() {
    background(0);
    stroke(0);

    // drawGrid(grid_len)

    drawLife()

    // console.log(pos)

    new_pos = make2dArray(grid_len)
        /* if not make new array and simply put new_pos = pos the any changes in new_pos will be changes in pos too,  cuz they are same obj., so make new obj...
           Example=> a=[0,1]; b=a; a[0]=1; console.log(b);
           */

    checkNeighbour()

    pos = new_pos

    // drawUpDown()

    // console.log(new_pos)

    // noLoop()
}

function checkNeighbour() {
    for (let [index_i, value_i] of pos.entries()) {
        for (let [index_j, value_j] of value_i.entries()) {
            // if (value_j == 0) {
            //     continue
            // }

            if (index_i == 0 || index_j == 0) { continue }
            if (index_i > grid_len || index_j > grid_len) { continue }

            temp = []

            for (let k = index_i - 1; k < index_i + 2; k++) {
                for (let l = index_j - 1; l < index_j + 2; l++) {
                    if (index_i == k && index_j == l) {
                        continue
                    }
                    // console.log(k,l)
                    temp.push(pos[k][l])
                }
            }
            neighbour = 0
            for (i of temp) {
                neighbour += i
            }
            // console.log(neighbour);
            rules(index_i, index_j, neighbour)
        }
    }
}

function rules(row, column, neighbour) {
    if (neighbour <= 1) {
        new_pos[row][column] = 0
    } else if (neighbour == 3) {
        new_pos[row][column] = 1
    } else if (neighbour >= 4) {
        new_pos[row][column] = 0
    } else {
        new_pos[row][column] = pos[row][column]
    }
}

function drawGrid(grid_len) {
    // VERTICAL
    grid_gapX = width / grid_len
    for (let i = 1; i < grid_len; i++) {
        line(grid_gapX * i, 0, grid_gapX * i, height)
    }
    // HORIZONTAL
    grid_gapY = height / grid_len
    for (let i = 1; i < grid_len; i++) {
        line(0, grid_gapY * i, width, grid_gapY * i)
    }
}

function make2dArray(grid_len) {
    let arr = []
    let grid_lenX = grid_len + 2 // for leaving both x columns
    let grid_lenY = grid_len + 2 // for leaving both y rows
    for (let i = 0; i < grid_lenX; i++) {
        temp = []
        for (let j = 0; j < grid_lenY; j++) {
            temp.push(0)
        }
        arr.push(temp)
    }
    return arr


    // // Not this way cuz if we make temp obj. first and push it then again and again all the sub list are same temp obj not diff. obj.. So, if i change values like (a[2][2]), all the 2 indexing of all rows change cuz every row is temp obj not diff...

    // let arr = []
    // let temp = []
    // for (let i=0; i<grid_len; i++) {
    //     temp.push(0)
    // }
    // for (let i=0; i<grid_len; i++) {
    //     arr.push(temp)
    // }
    // return arr
}

function _drawLife(row, column, trueORfalse) {
    if (trueORfalse) {
        rect(column * grid_gapX, row * grid_gapY, grid_gapX, grid_gapY)
    }
}

function drawLife() {
    for (let [i, con_i] of pos.entries()) { // [index, value]
        for (let [j, con_j] of con_i.entries()) {
            if (i == 0 || j == 0) { continue }
            if (i > grid_len || j > grid_len) { continue } // see the array in tabular form and you'll understand...

            _drawLife(i - 1, j - 1, con_j) // see the array in tabular form and you'll understand...
        }
    }
}

function drawUpDown() {
    // taking everything in ratio because if I changes the size of the Canvas it'll adjust according to it...

    temp = height / 10
    rect(width - temp, 0, temp, temp)
    rect(width - (temp * 2), 0, temp, temp)
    textSize(temp - 15);
    text('↑', width - (temp * 2) + (temp / 3.4), temp - (temp / 3))
    text('↓', width - temp + (temp / 3.4), temp - (temp / 3))
}

function mousePressed() {
    temp = height / 10
    if (mouseX > width - temp && mouseX < width && mouseY > 0 && mouseY < temp) {
        console.log('Down');
        // set this right

        // grid_len -= 2
        // _pos = make2dArray(grid_len)
        // pos = _pos
    } else if (mouseX > width - (temp * 2) && mouseX < width - temp && mouseY > 0 && mouseY < temp) {
        // grid_len += 2
        console.log('Up');
    }
}

function ratio() {
    let zero = 0
    let one = 0
    for (let i of pos) {
        for (let j of i) {
            if (j == 0) { zero++ } else if (j == 1) { one++ }
        }
    }
    console.log((zero - ((grid_len + 2) + (grid_len + 2) + (grid_len) + (grid_len))) / one)

    /* All write (too much approxiation values are very far apart... But as we go down and increse plain size it'll come to fix value 30)
    10 => 20 approx
    20 => 20 approx
    30 => 25 approx
    40 => 30 approx
    80 => 30 approx
    100 => 30 approx
    200 => 30 approx
    300 => 30 approx
    */
}