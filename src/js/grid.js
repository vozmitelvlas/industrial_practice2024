function fix_x0_x1_positions(x0, x1){
    // исправляет позиции x0 и x1, если для их отоборажения требуется больше места
    let width_x0 = context.measureText(x0.toString()).width / 2;
    let width_x1 = context.measureText(x1.toString()).width / 2;

    if(start - width_x0 < 0){
        start += width_x0 - start
    }
    if(end + width_x1 > canvas.width){
        end -= end + width_x1 - canvas.width
    }
    if(Math.floor(start - width_x0) > 0){
        start -= start - width_x0
    }
}

function countDigits(num) {
    let count = 0;
    while (Math.floor(Math.abs(num)) > 0) {
        num = Math.floor(Math.abs(num)) / 10;
        count++;
    }
    return count;
}

function add_edges(x0, x1, res){
    for(let elem of res){
        if(JSON.stringify(elem) === JSON.stringify([x0, x1])){
            return;
        }
    }
    res.push([x0, x1]);
}

function check_width_values(x0, x1, numLabels){
    // вычисляет общую длину всех чисел
    let tmp_width = context.measureText(x0.toString()).width + context.measureText(x1.toString()).width

    for (let i = 1; i < numLabels; i++) {
        let tmp_value =  (x0 + i * ((x1 - x0) / numLabels))
        tmp_width += context.measureText(tmp_value.toString()).width
    }

    return tmp_width;
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

    let tmp = new_x0;
    if( tmp > x0 && tmp < x1){
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
            //result.push(arr)
            generateBeautifulNumbers(x0, x1, dx, numLabels);

        }
    }

    if(arr.length > 2){
        result.push(arr)
    }
}

function new_grid(ctx, arr) {
    //определение записей, позиций и отрисовка
    if(check_width_values(arr[0], arr[arr.length - 1], arr.length) > canvas.width - 50){
        result.splice(0, result.length);
        dx = Math.pow(10, countDigits((arr[arr.length - 2])) - 1);
        generateBeautifulNumbers(arr[1], arr[arr.length - 2], dx, numLabels);
        arr = result[result.length - 1]
        index = result.length - 1
    }
    if(arr.length !== 0){
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    fix_x0_x1_positions(arr[0], arr[arr.length - 1])

    for (let i = arr.length - 1; i >= 0 ; i--) {
        const dx = (end - start) / (arr.length - 1);
        let x = Math.round(start + i * dx)
        if (x >= start && x <= end) {
            ctx.fillText(arr[i], x, ctx.canvas.height - 10);
        }
    }
}

const canvas = document.getElementById('grid');
const context = canvas.getContext('2d');
context.fillStyle = 'black';
context.textAlign = 'center';
context.font = "11pt Inter";
let start = 20;
let end = context.canvas.width - 20;
let x0 = 1111;
let x1 = 13333;

let numLabels = 50;
let dx = Math.pow(10, countDigits((x1)) - 1);
let old_arrays = [];

let result = [];
generateBeautifulNumbers(x0, x1, dx, numLabels);
console.log("1res = ", result)
add_edges(x0, x1, result);
let index = result.length - 2;

new_grid(context, result[result.length - 1]);
old_arrays.push(result[result.length - 1]);
let k = 1;

const zoomIntensity = 0.2;
let scale = 1;
let originx = 0;
let originy = 0;
let visibleWidth = canvas.width;
let visibleHeight = canvas.height;
canvas.onwheel = (event) => {
    event.preventDefault();
    const mousex = event.clientX - canvas.offsetLeft;
    const mousey = event.clientY - canvas.offsetTop;
    const wheel = event.deltaY < 0 ? 1 : -1;
    const zoom = Math.exp(wheel * zoomIntensity);
    originx -= mousex / (scale * zoom) - mousex / scale;
    originy -= mousey / (scale * zoom) - mousey / scale;
    visibleWidth = canvas.width / scale;
    visibleHeight = canvas.height / scale;
    scale *= zoom;

    if(wheel === 1 && index >= 0){
        if(k !== old_arrays.length){
           // console.log("k == old_arrays.length");
            new_grid(context, old_arrays[k])
            k += 1;

        }
        else if (result[index]){
            new_grid(context, result[index]);
            if(old_arrays[old_arrays.length - 1] !== result[index]){
                k++;
                old_arrays.push(result[index]);
            }

            if(index !== 0){
                index--;
            }
        }

    }
    else if(wheel === -1 && k >= 1 && old_arrays.length !== 1){
        if(index !== result.length){
            index++;
        }
        k--;
        new_grid(context, old_arrays[k]);
    }
   // console.log(result, index)
    console.log(old_arrays, k)
}




