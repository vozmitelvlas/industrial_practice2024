
function check_float_part(n) {
    // возвращает кол-во знаком после запятой
    const text = n.toString();
    const index = text.indexOf(".");
    if(index === -1){
        return 0
    }
    return text.length - index - 1;
}

function generate_NumLabels(ctx, x0, x1) {
    // определяет количество записей
    const start = 20;
    const end = ctx.canvas.width - 20;
    const labelWidth = 40; // ширина подписи
    const numLabels = Math.floor((end - start) / dx)
    const requiredSpace = (x1 - x0) / numLabels * labelWidth; // необходимое пространство

    if (requiredSpace > (end - start)) {
        return Math.floor(numLabels /2)
    } else {
        return numLabels;
    }
}

function check_width_values(x0, x1, numLabels){
    // вычисляет общую длину всех чисел
    let tmp_width = context.measureText(x0.toString()).width + context.measureText(x1.toString()).width
    for (let i = 1; i < numLabels; i++) {

        let tmp_value =  (x0 + i * ((x1 - x0) / numLabels))
        if(check_float_part(tmp_value) > 2){

            tmp_value = tmp_value.toFixed(2)
        }
        tmp_width += context.measureText(tmp_value.toString()).width
    }
    return tmp_width;
}

function check_x0_x1_positions(x0, x1, numLabels){
    // исправляет позиции x0 и x1, если для их отоборажения требуется больше места
    let width_x0 = context.measureText(x0.toString()).width / 2;
    let width_x1 = context.measureText(x1.toString()).width / 2;

    if(start - width_x0 < 0){
        start += width_x0 - start
    }
    if(end + width_x1 > canvas.width){
        end -= end + width_x1 - canvas.width
    }
}

function grid(ctx, x0, x1, numLabels) {
    //определение записей, позиций и отрисовка
    if(numLabels !== 0){
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    check_x0_x1_positions(x0, x1, numLabels)

    while(check_width_values(x0, x1, numLabels) > canvas.width - 50){
        numLabels -= 1;
    }

    const dx = (end - start) / numLabels;
    for (let i = 0; i <= numLabels; i++) {
        if(i === numLabels){
            ctx.fillText(x1, start + i * dx, ctx.canvas.height - 10);
            break;
        }

        let x = start + i * dx; // позиция
        let value = x0 + i * ((x1 - x0) / numLabels); // запись
        if (i !== 0 && i !== numLabels && check_float_part(value) > 2){
            value = value.toFixed(2);
        }

        if (x >= start && x <= end) {
            ctx.fillText(value, x, ctx.canvas.height - 10);
        }
    }
}

function define_reals(cnt, x0, x1, wheel){
    let new_x0 = x0;
    let new_x1 = x1;
    if(numLabels > 2){
        if(wheel === 1){
            new_x0 = Math.round(x0 + (x1 - x0) / numLabels)
            new_x1 = Math.round(x0 + (numLabels - 1) * ((x1 - x0) / numLabels))
            arr_of_dx.push(new_x0 - real_x0)
        }
        if(wheel === -1 && arr_of_dx.length !== 0){
            let tmp_dx = arr_of_dx.pop()
            new_x0 = x0 - tmp_dx
            new_x1 = x1 + tmp_dx
        }
    }
    
    return [new_x0, new_x1];
}


const canvas = document.getElementById('grid');
const context = canvas.getContext('2d');
context.fillStyle = 'black';
context.textAlign = 'center';
context.font = "11pt Inter"


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

    if(wheel === 1 && dx > 43){
        if(dx <= 65){
            [real_x0, real_x1] = define_reals(context, real_x0, real_x1, wheel);
        }
        dx -= 2
        numLabels = generate_NumLabels(context, real_x0, real_x1)
        grid(context, real_x0, real_x1, numLabels);

    }
    else if(wheel === -1 && dx < 97){
        if(dx < 65){
            [real_x0, real_x1] = define_reals(context, real_x0, real_x1, wheel);
        }
        dx += 2
        numLabels = generate_NumLabels(context, real_x0, real_x1)
        grid(context, real_x0, real_x1, numLabels);
    }
}

let arr_of_dx = []
let start = 20;
let end = context.canvas.width - 20;
let dx = 65; // минимальное расстояние между подписями
let start_x0 = 1;
let start_x1 = 222;
let real_x0 = start_x0
let real_x1 = start_x1
let numLabels = generate_NumLabels(context, start_x0, start_x1);
grid(context, start_x0, start_x1, numLabels);