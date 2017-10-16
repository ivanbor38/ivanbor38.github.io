# Answers for the HW2

## Part1
#####  1.1: Looking at the page containing the table, what are the differences between the DOM as shown by the DOM inspector and the HTML source code? Why would you use the DOM inspector? When is the HTML source useful?     
DOM inspector удобен в тех случаях, когда в коде появляются ошибки, т.к. есть много удобных инструментов для дебага. 
  
  




##### 1.2: Below we have partially reproduced the first lines from the table's dataset. What piece of software generates this table? Where are the original data stored?  
Библиотека d3 парсит json-файл и собирает данные в массив, состоящий из объектов.   
Далее d3 формирует создает html-тэги и добавляет их в документ, который интерпретируется браузером.
Изначально данные хранились в 2-х JSON файлах countries_1995_2012.json и countries_2012.json.  


## Part2
##### 2.1 Would you filter other columns from the table the same way? E.g. would you use checkboxes or any other HTML widget?  
Бессмысленно фильтровать данные таким же образом, используя другие колонки. Значения в остальных колонках уникальны для каждого ряда.  
Можно использовать похожую систему классификации в случае с колонкой years, при условии, что используются данные из файла countries_1995_2012.json. Но для этой задачи я использовал range, а не checkbox

## Part3
##### 3.1 Could you aggregate the table using other columns? If you think yes, explain which ones and how you would group values. Which HTML widgets would be appropriate?  

Можно аггрегировать данные по колонке years, при условии, что используются данные из файла countries_1995_2012.json.  
Можно было бы просуммировать GDP и population, взять среднее life_expectancy.  
Также есть возможность изпользовать двойную аггрегацию по континентам и годам.  
Эти 2 колоки подходят для такого типа классификации, т.к. они содержат повторяющиеся значения.

## Part4
##### 4.1 Use this dataset countries_1995_2012.json as input for the previously created table. What does the new attribute years hold?  
years - это массив, который содержит объекты. Каждый объект состоит из: 
1. "gdp" (float)
2. "life_expectancy" (float)
3. "top_partners" (array of objects)
4. "year" (int)
5. "population" (float)

## Part5
##### 5.1 What are the pros and cons of using HTML vs. SVG? Give some examples in the context of creating visualizations.
1. SVG лучше подходит для визуализации. HTML лучше для работы с текстом и верстки.
2. У SVG больше возможностей для анимации и интерактивных опций. Это может быть решающим фактором в создании приложений.
2. SVG - векторная графика, в HTML - растровая.
4. SVG не зависит от разрешения, но при не очень высоком разрешении  у HTML лучше производительность.


## Part7
##### 7.1 Give an example of a situation where visualization is appropriate, following the arguments discussed in lecture and in the textbook (the example cannot be the same as mentioned in either lecture or textbook).
Визуализация необходима в случаях, когда сложно увидеть не самую очевидную зависимость в данных. С помощью средств визуализации, информация может быть лучше интерпретируема и воспринимаема мозгом.  
Мне нравится пример, описывающий принципы работы алгоритмов машинного обучения. http://www.r2d3.us/visual-intro-to-machine-learning-part-1/  
Без наглядной демонстрации, принцип работы  перестает быть интуитивно-понятным.

##### 7.2 Which limitations of static charts can you solve using interactivity?
1. Фильтрация по категориальным переменным.
2. Интерактивная графика может показать динамику развития процесса более нагладно.
3. Можно включить больше данных в интерактивную визуализацию, т.к. есть возможность отфильтровать лишнее в процессе взаимодейсмтвия, увеличить/уменьшить масштаб.

##### 7.3 What are the limitations of visualization?
1. Не всегда есть возможность выявить такие паттерны в данных, визуализация которых облегчила бы восприятие.
2. График может создать видимость того, что в данных есть зависимость, тогда как ее на самом деле нет.
3. Если данные очень сложные, то визуализация может получиться также сложной и запутанной. Потребитель не сможеть корректно проинтерпретировать зависимости в данных.


#####  7.4 Why are data semantics important for data?
1. Без необходимого контекста объяснительная способность данных может сильно снизиться.
2. Без знания предметной области можно совершить ошибку и сделать некорректную визуализацию.
3. Не понимая специфику данных, сложно будет понять какие зависимости важнее остальных. Такой график будет интерпретировать не то, что от него требуется.

##### 7.5 Which relationships are defined for two attributes of  ( a ) quantitative, ( b )  categorical, or ( c ) ordinal scale?   
( a ) Можно сравнить значения, отсортировать их. Вычислить сумму, медиану, среднее, дисперсию
 ( b ) Сортировка, группировка, фильтрация
( c ) Группировка, фильтрация

##### 7.6 Which visual variables are associative (i.e., allow grouping)?

Категориальные данные. Если данные в колонке не повторяются для некоторых примеров из набора, то это создает возможность для кластеризации.
Примеры:
1. Пол
2. Страна рождения
3. Возраст (интервалы 18-25, 25-34 ...)
4. Континент

##### 7.7 Which visual variables are quantitative (i.e., allow to judge a quantitative difference between two data points)?
Предполагается, что значения не повторяются (вероятность повторения мала)
Примеры:
1. Скорость
2. Вес
3. Атмосферное давление
4. Численность населения