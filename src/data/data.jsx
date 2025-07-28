const data = [
  // Уровень 1
  {
    id: 1,
    title: { ru: "Повтор строки", kg: "Сапты кайталоо" },
    description: {
      ru: "Напишите функцию, которая повторяет строку n раз.",
      kg: "Сапты n жолу кайталаган функция жазыңыз.",
    },
    level: 1,
    difficulty: "beginner",
    type: ["string"],
    examples: [{ input: 'repeat("hi", 3)', output: "hihihi" }],
    testCases: [
      { input: '"hi", 3', expectedOutput: "hihihi" },
      { input: '"a", 5', expectedOutput: "aaaaa" },
    ],
    initialCode: "function javascript(str, n) {\n  // Ваш код здесь\n}",
  },
  {
    id: 2,
    title: { ru: "Сумма", kg: "Сумма" },
    description: {
      ru: "Функция принимает два числа и возвращает их сумму.",
      kg: "Эки санды алып, алардын суммасын кайтарат.",
    },
    level: 1,
    difficulty: "beginner",
    type: ["number"],
    examples: [{ input: "add(2, 3)", output: "5" }],
    testCases: [
      { input: "2, 3", expectedOutput: "5" },
      { input: "10, 5", expectedOutput: "15" },
    ],
    initialCode: "function javascript(a, b) {\n  // Ваш код здесь\n}",
  },
  {
    id: 3,
    title: { ru: "Первый элемент массива", kg: "Массивдын биринчи элементи" },
    description: {
      ru: "Функция возвращает первый элемент массива.",
      kg: "Массивдын биринчи элементин кайтарат.",
    },
    level: 1,
    difficulty: "beginner",
    type: ["array"],
    examples: [{ input: "first([1,2,3])", output: "1" }],
    testCases: [
      { input: "[1,2,3]", expectedOutput: "1" },
      { input: '["a","b"]', expectedOutput: "a" },
    ],
    initialCode: "function javascript(arr) {\n  // Ваш код здесь\n}",
  },
  {
    id: 4,
    title: { ru: "Получить имя", kg: "Атты алуу" },
    description: {
      ru: "Функция возвращает значение ключа 'name' из объекта.",
      kg: "Объекттеги 'name' ачкычынын маанисин кайтарат.",
    },
    level: 1,
    difficulty: "beginner",
    type: ["object"],
    examples: [{ input: '{name: "Ali"}', output: "Ali" }],
    testCases: [
      { input: '{name: "Ali"}', expectedOutput: "Ali" },
      { input: '{name: "Tom"}', expectedOutput: "Tom" },
    ],
    initialCode: "function javascript(obj) {\n  // Ваш код здесь\n}",
  },
  {
    id: 5,
    title: { ru: "Это true?", kg: "Бул true бу?" },
    description: {
      ru: "Функция проверяет, является ли значение true.",
      kg: "Мааниси true экенин текшерет.",
    },
    level: 1,
    difficulty: "beginner",
    type: ["boolean"],
    examples: [{ input: "isTrue(true)", output: "true" }],
    testCases: [
      { input: "true", expectedOutput: "true" },
      { input: "false", expectedOutput: "false" },
    ],
    initialCode: "function javascript(val) {\n  // Ваш код здесь\n}",
  },

  // Уровень 2
  {
    id: 6,
    title: { ru: "Обратная строка", kg: "Тескери сап" },
    description: {
      ru: "Функция возвращает строку в обратном порядке.",
      kg: "Сапты тескерисинен кайтарат.",
    },
    level: 2,
    difficulty: "easy",
    type: ["string"],
    examples: [{ input: 'reverse("abc")', output: "cba" }],
    testCases: [
      { input: '"abc"', expectedOutput: "cba" },
      { input: '"hello"', expectedOutput: "olleh" },
    ],
    initialCode: "function javascript(str) {\n  // Ваш код здесь\n}",
  },
  {
    id: 7,
    title: { ru: "Максимум двух чисел", kg: "Эки сандын чоңу" },
    description: {
      ru: "Функция возвращает большее из двух чисел.",
      kg: "Эки сандын чоңун кайтарат.",
    },
    level: 2,
    difficulty: "easy",
    type: ["number"],
    examples: [{ input: "max(3, 5)", output: "5" }],
    testCases: [
      { input: "3, 5", expectedOutput: "5" },
      { input: "10, 7", expectedOutput: "10" },
    ],
    initialCode: "function javascript(a, b) {\n  // Ваш код здесь\n}",
  },
  {
    id: 8,
    title: { ru: "Последний элемент массива", kg: "Акыркы элемент" },
    description: {
      ru: "Функция возвращает последний элемент массива.",
      kg: "Массивдин акыркы элементин кайтарат.",
    },
    level: 2,
    difficulty: "easy",
    type: ["array"],
    examples: [{ input: "last([1,2,3])", output: "3" }],
    testCases: [
      { input: "[1,2,3]", expectedOutput: "3" },
      { input: '["a","b","c"]', expectedOutput: "c" },
    ],
    initialCode: "function javascript(arr) {\n  // Ваш код здесь\n}",
  },
  {
    id: 9,
    title: { ru: "Получить возраст", kg: "Жашты алуу" },
    description: {
      ru: "Функция возвращает значение ключа 'age' из объекта.",
      kg: "Объекттеги 'age' ачкычынын маанисин кайтарат.",
    },
    level: 2,
    difficulty: "easy",
    type: ["object"],
    examples: [{ input: "{age: 20}", output: "20" }],
    testCases: [
      { input: "{age: 20}", expectedOutput: "20" },
      { input: "{age: 35}", expectedOutput: "35" },
    ],
    initialCode: "function javascript(obj) {\n  // Ваш код здесь\n}",
  },
  {
    id: 10,
    title: { ru: "Бул false?", kg: "Бул falseбу?" },
    description: {
      ru: "Функция проверяет, является ли значение false.",
      kg: "Мааниси false экенин текшерет.",
    },
    level: 2,
    difficulty: "easy",
    type: ["boolean"],
    examples: [{ input: "isFalse(false)", output: "true" }],
    testCases: [
      { input: "false", expectedOutput: "true" },
      { input: "true", expectedOutput: "false" },
    ],
    initialCode: "function javascript(val) {\n  // Ваш код здесь\n}",
  },

  // Уровень 3
  {
    id: 11,
    title: { ru: "Палиндром", kg: "Палиндром" },
    description: {
      ru: "Проверьте, является ли строка палиндромом (читается одинаково с обеих сторон).",
      kg: "Сап палиндромбу же жокпу текшериңиз.",
    },
    level: 3,
    difficulty: "medium",
    type: ["string"],
    examples: [{ input: 'isPalindrome("madam")', output: "true" }],
    testCases: [
      { input: '"madam"', expectedOutput: "true" },
      { input: '"hello"', expectedOutput: "false" },
    ],
    initialCode: "function javascript(str) {\n  // Ваш код здесь\n}",
  },
  {
    id: 12,
    title: { ru: "Среднее значение", kg: "Орточо мааниси" },
    description: {
      ru: "Функция возвращает среднее значение массива чисел.",
      kg: "Сандардын массивинен орточо маанисин кайтарат.",
    },
    level: 3,
    difficulty: "medium",
    type: ["number", "array"],
    examples: [{ input: "average([2,4,6])", output: "4" }],
    testCases: [
      { input: "[2, 4, 6]", expectedOutput: "4" },
      { input: "[1, 2, 3, 4]", expectedOutput: "2.5" },
    ],
    initialCode: "function javascript(arr) {\n  // Ваш код здесь\n}",
  },
  {
    id: 13,
    title: { ru: "Четные числа", kg: "Жуп сандар" },
    description: {
      ru: "Функция возвращает массив только с четными числами.",
      kg: "Массивден жалаң гана жуп сандарды кайтарат.",
    },
    level: 3,
    difficulty: "medium",
    type: ["array", "number"],
    examples: [{ input: "getEvens([1,2,3,4])", output: "[2,4]" }],
    testCases: [
      { input: "[1,2,3,4]", expectedOutput: "[2,4]" },
      { input: "[7,9,11]", expectedOutput: "[]" },
    ],
    initialCode: "function javascript(arr) {\n  // Ваш код здесь\n}",
  },
  {
    id: 14,
    title: { ru: "Количество ключей", kg: "Ачкычтардын саны" },
    description: {
      ru: "Функция возвращает количество ключей в объекте.",
      kg: "Объекттеги ачкычтардын санын кайтарат.",
    },
    level: 3,
    difficulty: "medium",
    type: ["object"],
    examples: [{ input: "{a:1, b:2}", output: "2" }],
    testCases: [
      { input: "{a:1, b:2}", expectedOutput: "2" },
      { input: "{}", expectedOutput: "0" },
    ],
    initialCode: "function javascript(obj) {\n  // Ваш код здесь\n}",
  },
  {
    id: 15,
    title: { ru: "Инвертировать булево", kg: "Булево маани тескери кылуу" },
    description: {
      ru: "Инвертируйте булево значение (true -> false, false -> true).",
      kg: "Булево маанини тескери кылуу.",
    },
    level: 3,
    difficulty: "medium",
    type: ["boolean"],
    examples: [{ input: "invert(true)", output: "false" }],
    testCases: [
      { input: "true", expectedOutput: "false" },
      { input: "false", expectedOutput: "true" },
    ],
    initialCode: "function javascript(val) {\n  // Ваш код здесь\n}",
  },

  // Уровень 4
  {
    id: 16,
    title: { ru: "Факториал", kg: "Факториал" },
    description: {
      ru: "Функция возвращает факториал числа (n!).",
      kg: "Берилген сан боюнча факториал кайтарат (n!).",
    },
    level: 4,
    difficulty: "hard",
    type: ["number"],
    examples: [{ input: "factorial(5)", output: "120" }],
    testCases: [
      { input: "3", expectedOutput: "6" },
      { input: "0", expectedOutput: "1" },
    ],
    initialCode: "function javascript(n) {\n  // Ваш код здесь\n}",
  },
  {
    id: 17,
    title: { ru: "Сортировка массива", kg: "Массивди сорттоо" },
    description: {
      ru: "Функция сортирует массив по возрастанию.",
      kg: "Массивди өсүү тартибинде сорттойт.",
    },
    level: 4,
    difficulty: "hard",
    type: ["array"],
    examples: [{ input: "sortArray([3,1,2])", output: "[1,2,3]" }],
    testCases: [
      { input: "[3,1,2]", expectedOutput: "[1,2,3]" },
      { input: "[5,4,6]", expectedOutput: "[4,5,6]" },
    ],
    initialCode: "function javascript(arr) {\n  // Ваш код здесь\n}",
  },
  {
    id: 18,
    title: { ru: "Слияние объектов", kg: "Объекттерди кошуу" },
    description: {
      ru: "Функция объединяет два объекта в один.",
      kg: "Эки объектти бириктирет.",
    },
    level: 4,
    difficulty: "hard",
    type: ["object"],
    examples: [{ input: "{a:1}, {b:2}", output: "{a:1, b:2}" }],
    testCases: [
      { input: "{a:1}, {b:2}", expectedOutput: "{a:1, b:2}" },
      { input: "{x:5}, {x:10}", expectedOutput: "{x:10}" },
    ],
    initialCode: "function javascript(obj1, obj2) {\n  // Ваш код здесь\n}",
  },
  {
    id: 19,
    title: { ru: "Сравнение строк", kg: "Саптарды салыштыруу" },
    description: {
      ru: "Функция проверяет, равны ли две строки без учета регистра.",
      kg: "Эки сап бирдейби, катасын эске албастан текшерет.",
    },
    level: 4,
    difficulty: "hard",
    type: ["string"],
    examples: [{ input: 'compare("Hi", "hi")', output: "true" }],
    testCases: [
      { input: '"Hi", "hi"', expectedOutput: "true" },
      { input: '"Hello", "HELLO"', expectedOutput: "true" },
    ],
    initialCode: "function javascript(str1, str2) {\n  // Ваш код здесь\n}",
  },
  {
    id: 20,
    title: { ru: "Булево из строки", kg: "Саптан булево кылуу" },
    description: {
      ru: 'Функция возвращает true, если строка "true", иначе false.',
      kg: 'Сап "true" болсо true, болбосо false кайтарат.',
    },
    level: 4,
    difficulty: "hard",
    type: ["string", "boolean"],
    examples: [{ input: 'toBoolean("true")', output: "true" }],
    testCases: [
      { input: '"true"', expectedOutput: "true" },
      { input: '"false"', expectedOutput: "false" },
    ],
    initialCode: "function javascript(str) {\n  // Ваш код здесь\n}",
  },

  // Уровень 5
  {
    id: 21,
    title: { ru: "Фибоначчи", kg: "Фибоначчи" },
    description: {
      ru: "Функция возвращает n-е число Фибоначчи.",
      kg: "n-санындагы Фибоначчи санын кайтарат.",
    },
    level: 5,
    difficulty: "expert",
    type: ["number"],
    examples: [{ input: "fibonacci(5)", output: "5" }],
    testCases: [
      { input: "6", expectedOutput: "8" },
      { input: "10", expectedOutput: "55" },
    ],
    initialCode: "function javascript(n) {\n  // Ваш код здесь\n}",
  },
  {
    id: 22,
    title: { ru: "Глубокое клонирование", kg: "Терең көчүрмө" },
    description: {
      ru: "Функция выполняет глубокое клонирование объекта.",
      kg: "Объектти терең көчүрмөлөйт.",
    },
    level: 5,
    difficulty: "expert",
    type: ["object"],
    examples: [{ input: "{a:1, b:{c:2}}", output: "{a:1, b:{c:2}}" }],
    testCases: [{ input: "{x:5, y:{z:7}}", expectedOutput: "{x:5, y:{z:7}}" }],
    initialCode: "function javascript(obj) {\n  // Ваш код здесь\n}",
  },
  {
    id: 23,
    title: { ru: "Уникальные значения", kg: "Уникалдуу маанилер" },
    description: {
      ru: "Функция возвращает массив уникальных значений.",
      kg: "Кайталанбаган маанилердин массивин кайтарат.",
    },
    level: 5,
    difficulty: "expert",
    type: ["array"],
    examples: [{ input: "unique([1,2,2,3])", output: "[1,2,3]" }],
    testCases: [
      { input: "[1,2,2,3]", expectedOutput: "[1,2,3]" },
      { input: "[4,4,4,4]", expectedOutput: "[4]" },
    ],
    initialCode: "function javascript(arr) {\n  // Ваш код здесь\n}",
  },
  {
    id: 24,
    title: { ru: "Глубина массива", kg: "Массивдин тереңдиги" },
    description: {
      ru: "Функция возвращает максимальную глубину вложенности массива.",
      kg: "Массивдин эң терең деңгээлин кайтарат.",
    },
    level: 5,
    difficulty: "expert",
    type: ["array"],
    examples: [{ input: "[1,[2,[3]]]", output: "3" }],
    testCases: [
      { input: "[1,2,3]", expectedOutput: "1" },
      { input: "[1,[2,[3,[4]]]]", expectedOutput: "4" },
    ],
    initialCode: "function javascript(arr) {\n  // Ваш код здесь\n}",
  },
  {
    id: 25,
    title: { ru: "Логическое ИЛИ", kg: "Логикалык ЖЕ" },
    description: {
      ru: "Функция принимает массив булевых значений и возвращает результат логического ИЛИ.",
      kg: "Булево маанилер массивинен логикалык ЖЕ операциясынын натыйжасын кайтарат.",
    },
    level: 5,
    difficulty: "expert",
    type: ["boolean", "array"],
    examples: [{ input: "[false, true, false]", output: "true" }],
    testCases: [
      { input: "[false, false]", expectedOutput: "false" },
      { input: "[false, true]", expectedOutput: "true" },
    ],
    initialCode: "function javascript(arr) {\n  // Ваш код здесь\n}",
  },

  // Уровни 3–5 будут добавлены далее
];

export default data;
