# Динамическая разметка оси X для графика
## Описание проекта/задачи
Создать функцию, которая генерирует расположенные на одинаковом расстоянии записи для "красивые" оси X для графика с учетом различных факторов, таких как: scaling, масштаб графика, ширина, высота и размер шрифта.

## Входные данные:

* minMax: массив из двух чисел, представляющих минимальное и максимальное значение на оси.
* realMinMax: массив из двух чисел, представляющих текущие минимальное и максимальное значения графика.
* relativeX: число от 0 до 1, указывающее, насколько далеко по оси x график находится от левого края.
* ширина: число, представляющее исходную ширину графика.
* scaleX: число, указывающее, насколько масштабирован график (ширина * scaleX = фактическая ширина).
* height: число, представляющее исходную высоту графика.
* font: строка, представляющая название шрифта (например, "Inter 11").
* source: объект CanvasRenderingContext2D, представляющий текущий контекст canvas.

## Ожидаемый результат

* Функция должна генерировать записи, которые легко читаются и понятны пользователю.
* Записи должны располагаться на равном расстоянии друг от друга, за исключением меток по оси x в начале и в конце графика, которые могут располагаться на разном расстоянии друг от друга.
* Функция должна выполняться быстро, ее выполнение должно занимать не более 1 миллисекунды (без учета времени рендеринга, которое должно занимать не более 2-3 миллисекунд).
* Надписи не должны перекрывать друг друга.
* Функция должна реагировать на изменения уровня масштабирования графика (т.е. когда пользователь увеличивает или уменьшает масштаб).
* Функция должна реагировать на изменения ширины экрана (т.е. когда пользователь изменяет размер окна или разрешение экрана).
* Реализация должна быть представлена на GitHub.

