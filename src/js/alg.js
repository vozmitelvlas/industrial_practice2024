function countDigits(num) {
    let count = 0;
    while (Math.floor(Math.abs(num)) > 0) {
        num = Math.floor(Math.abs(num)) / 10;
        count++;
    }
    return count;
}

function generateBeautifulNumbers(x0, x1, dx, numLabels) {
    let arr = [x0];
    while( Number(x0.toString()[0]) * dx + dx > x1){
        dx /= 2;
    }
    let new_x0 = dx;
    while(new_x0 < x0){
        new_x0 += dx
    }
    // new_x0 = Number(x0.toString()[0]) * dx;
    // let new_x1 = (Number(x1.toString()[0]) + 1) * dx;

    let tmp = new_x0;
    if( tmp > x0){
        arr.push(tmp);
    }
    tmp += dx;
    while(tmp < x1){
        if(tmp < x0){
            tmp += dx;
            continue;
        }
        arr.push(tmp);
        tmp += dx;
    }

    arr.push(x1);
    if(arr.length < numLabels){
        if(dx % 10 === 0){
            dx /= 2;
            generateBeautifulNumbers(x0, x1, dx, numLabels);
        }
    }
    console.log("arr = ", arr);
}


let x0 = 121;
let x1 = 3000;
let numLabels = 33;
let dx = Math.pow(10, countDigits((x1 - x0)) - 1);
generateBeautifulNumbers(x0, x1, dx, numLabels);

