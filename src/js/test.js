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
        return Math.floor(numLabels - 2)
    } else {
        return numLabels;
    }
}

function grid(ctx, x0, x1, numLabels) {
    //определение позиций и отрисовка
    context.clearRect(0, 0, canvas.width, canvas.height);

    const start = 20;
    const end = ctx.canvas.width - 20;
    const dx = (end - start) / numLabels;
    for (let i = 0; i <= numLabels; i++) {

        if(i === numLabels){
            ctx.fillText(x1, start + i * dx, ctx.canvas.height - 10);
            break
        }

        let x = start + i * dx; // позиция
        let value = x0 + i * ((x1 - x0) / numLabels); // запись

        if (i !== 0 && i !== numLabels && check_float_part(value) > 2){
            value = value.toFixed(2)
        }

        if (x >= start && x <= end) {
            ctx.fillText(value, x, ctx.canvas.height - 10);
        }
    }
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
    scale *= zoom;
    visibleWidth = canvas.width / scale;
    visibleHeight = canvas.height / scale;

    if(wheel === 1 && dx > 43){
        dx -= 2
    }
    else if(wheel === -1 && dx < 97){
        dx += 2
    }

    const numLabels = generate_NumLabels(context, x0, x1);
    grid(context, x0, x1, numLabels);

}

let dx = 65; // минимальное расстояние между подписями
const x0 = 0;
const x1 = 120;
const numLabels = generate_NumLabels(context, x0, x1);
grid(context, x0, x1, numLabels);