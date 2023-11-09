## Правила и регламент

- [Экзамен: правила, рекомендации и порядок проведения](https://hexly.notion.site/d9289c18871c44508bc7c7f05a51d94f)

## Задание

Ваша задача написать валидатор, в котором есть ряд методов и свойств и экспортировать его из файла *src/index.js*. Валидатор позволяет проверять аргументы на соответствие необходимым условиям, которые были заданы с помощью методов валидатора.

Пример использования:

```javascript
// создаем экземпляр валидатора
const v = new Validator();
// определяем метод для валидации чисел и связываем его с валидатором, обращаясь к нему через переменную.
const schema = v.number();

// проверяем данные на соответствие числовому типу, с помощью метода isValid()
schema.isValid('Hexlet'); // false
schema.isValid(''); // false
schema.isValid(null); // false
schema.isValid(123); // true
```

### Примечания

Вы можете самостоятельно протестировать работу валидатора. В каталоге *src* разрешено использовать любые файлы и создавать новые, если это делает вашу разработку более удобной.

Для тестирования валидатора, достаточно создать экземпляр валидатора, настроить валидацию с помощью методов и вызвать метод `validate()` с необходимым аргументом, после чего написать в терминале:

```bash
node src/index.js
```

## 1 задача

Вам необходимо создать валидатор, который способен принимать аргумент и проводить его проверку на соответствие определенным условиям. В данной задаче мы ограничиваемся валидацией оценки. Для этого в вашем валидаторе должен быть метод `grade()`, который создает экземпляр валидатора чисел. Этот экземпляр обладает методом `isValid()`, который принимает данные на вход и возвращает значение true или false в зависимости от того, являются ли входные данные числом, которое соответствует формату оценки. То есть число должно быть в пределах от 2 до 5 и быть целым.

```javascript
const v = new Validator();
const schema = v.grade();

schema.isValid(null); // false
schema.isValid(''); // false
schema.isValid(true); // false
schema.isValid(123); // false
schema.isValid(0); // false
schema.isValid(2); // true
schema.isValid(-3); // false
schema.isValid(4.1); // false
schema.isValid(5); // true
```

После добавления методов `grade()` и `isValid()`, экземпляр валидатора будет проверять является ли аргумент целым числом в пределах от 2 до 5 включительно.

## 2 задача

Вам необходимо создать валидатор записей с урока, который будет возвращаться при вызове метода  `lessonData()`, который возвращает экземпляр валидатора журнальной записи урока. Этот экземпляр обладает методом `isValid()`, который принимает данные на вход и возвращает значение true или false. Валидатор `lessonData()` возвращает true, если на вход приходит объект, следующего формата:
{
  lesson: 'programming',
  date: 11.02.12,
  grade: 3,
}

В данном объекте всегда должно быть три указанных ключа (`lesson, date, grade`), значением в первом должна быть строка, во втором строка, которая состоит из 3 двухзначных чисел, разделенных точкой. Значением в третьем ключе должна быть оценка, которая валидируется валидатором оценок.

```javascript
const v = new Validator();

const schema = v.lessonData();

schema.isValid(11); // false;

schema.isValid({
  lesson: 'programming',
  date: 11.02.12,
  grade: 3,
}); // true;

schema.isValid({
  lesson: 'programming',
  date: 11.02.12,
}); // false;

schema.isValid({
  lesson: 'programming',
  date: 11.02.12,
  grade: 3,
  playingGames: true
}); // false;

schema.isValid({
  lesson: 'programming',
  date: 111.02.12,
  grade: 3,
}); // false;

schema.isValid({
  lesson: 'programming',
  date: 11.02.12,
  grade: 1,
}); // false;

schema.isValid({
  lesson: 'programming',
  date: 11.02.32,
  grade: 5,
}); // true;
```

## 3 задача

Сделайте валидатор `lessonData()` более строгим, добавив в него валидацию поля `lesson`, которое должно всегда быть одним из указанных значений: `['math', 'english', 'programming', 'history', 'philosophy', 'sports', 'arts']`.

Также необходимо расширить функциональность валидатора `lessonData()`, добавив в него метод `passed(num)`, который добавляет проверку на то, что оценка выше указанного числа. Аргумент может быть только число от 2 до 4;

```javascript
const v = new Validator();
const schema1 = v.lessonData();

schema1.isValid({
  lesson: 'programming',
  date: 11.02.12,
  grade: 2,
}); // true;

schema1.isValid({
  lesson: 'bobaibiba',
  date: 11.02.12,
  grade: 3,
}); // false;

schema1.isValid({
  lesson: 'history',
  date: 11.02.12,
  grade: 6,
}); // false;

const schema2 = v.lessonData().passed(2);

schema2.isValid({
  lesson: 'programming',
  date: 11.02.12,
  grade: 3,
}); // true;

schema2.isValid({
  lesson: 'history',
  date: 11.02.12,
  grade: 2,
}); // false;

const schema3 = v.lessonData().passed(4);

schema3.isValid({
  lesson: 'history',
  date: 11.02.12,
  grade: 2,
}); // false;
schema3.isValid({
  lesson: 'history',
  date: 11.02.12,
  grade: 5,
}); // true;
```

## 4 задача

Вам необходимо создать валидатор полей объекта, используя методы, представленные в предыдущих задачах. Для этого необходимо создать метод `object()`, который проверяет не сам объект, а данные внутри него на соответствием заданным валидаторам. Метод `Validator.object()` должен содержать метод `shape()`, позволяющий задать поля, подлежащие валидации, для объекта. Метод `shape()` принимает объект, в котором ключи представляют поля, которые требуется проверить, а значения - экземпляры валидаторов.

**Методы**

- метод валидатора (экземпляр класса *Validator*) `object()`, который проверяет данные внутри объекта (поля объекта)
- метод `shape()`, который вызывается у экземпляра `object()`. Он позволяет задать поля валидации для объекта

```javascript
const v = new Validator();

// Позволяет описывать валидацию для свойств объекта
const schema = v.object().shape({
  lesson1: v.lessonData().passed(3), // теперь, при валидации объекта с ключом lesson, значение этого ключа пройдет валидацию в соответствии с текущими методами
  lesson2: v.lessonData().passed(4),
});

schema.isValid({ lesson1: {
  lesson: 'history',
  date: 11.02.12,
  grade: 3,
}, lesson2: {
  lesson: 'history',
  date: 11.02.12,
  grade: 4,
}}); // true
schema.isValid({ lesson1: {
  lesson: 'history',
  date: 11.02.12,
  grade: 2,
}, lesson2: {
  lesson: 'history',
  date: 11.02.12,
  grade: 4,
}}); // false
schema.isValid({ lesson1: {
  lesson: 'history',
  date: 11.02.12,
  grade: 3,
}, lesson2: {
  lesson: 'beba',
  date: 11.02.12,
  grade: 4,
}}); // false
```

## 5 задача

Вам дополнить валидатор полей объекта, добавив в него возможность валидировать вложенные объекты на любом уровне глубины.

```javascript
const v = new Validator();

// Позволяет описывать валидацию для свойств объекта
const schema = v.object().shape({
  lesson1: v.lessonData().passed(3),
  lesson2: {
    part1: v.lessonData()
    part2: {
      subpart1: v.grade()
    }
  }
});

schema.isValid({ lesson1: {
  lesson: 'history',
  date: 11.02.12,
  grade: 3,
}, 
  lesson2: {
    part1: {
      lesson: 'history',
      date: 11.02.12,
      grade: 4,
    },
    part2: {
      subpart1: 4
    }
}}); // true
