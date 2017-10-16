# Answers for the HW2

## Part1
#####  1.1: Looking at the page containing the table, what are the differences between the DOM as shown by the DOM inspector and the HTML source code? Why would you use the DOM inspector? When is the HTML source useful?     
DOM inspector ������ � ��� �������, ����� � ���� ���������� ������, �.�. ���� ����� ������� ������������ ��� ������. 
  
  




##### 1.2: Below we have partially reproduced the first lines from the table's dataset. What piece of software generates this table? Where are the original data stored?  
���������� d3 ������ json-���� � �������� ������ � ������, ��������� �� ��������.   
����� d3 ��������� ������� html-���� � ��������� �� � ��������, ������� ���������������� ���������.
���������� ������ ��������� � 2-� JSON ������ countries_1995_2012.json � countries_2012.json.  


## Part2
##### 2.1 Would you filter other columns from the table the same way? E.g. would you use checkboxes or any other HTML widget?  
������������ ����������� ������ ����� �� �������, ��������� ������ �������. �������� � ��������� �������� ��������� ��� ������� ����.  
����� ������������ ������� ������� ������������� � ������ � �������� years, ��� �������, ��� ������������ ������ �� ����� countries_1995_2012.json. �� ��� ���� ������ � ����������� range, � �� checkbox

## Part3
##### 3.1 Could you aggregate the table using other columns? If you think yes, explain which ones and how you would group values. Which HTML widgets would be appropriate?  

����� ������������� ������ �� ������� years, ��� �������, ��� ������������ ������ �� ����� countries_1995_2012.json.  
����� ���� �� �������������� GDP � population, ����� ������� life_expectancy.  
����� ���� ����������� ������������ ������� ���������� �� ����������� � �����.  
��� 2 ������ �������� ��� ������ ���� �������������, �.�. ��� �������� ������������� ��������.

## Part4
##### 4.1 Use this dataset countries_1995_2012.json as input for the previously created table. What does the new attribute years hold?  
years - ��� ������, ������� �������� �������. ������ ������ ������� ��: 
1. "gdp" (float)
2. "life_expectancy" (float)
3. "top_partners" (array of objects)
4. "year" (int)
5. "population" (float)

## Part5
##### 5.1 What are the pros and cons of using HTML vs. SVG? Give some examples in the context of creating visualizations.
1. SVG ����� �������� ��� ������������. HTML ����� ��� ������ � ������� � �������.
2. � SVG ������ ������������ ��� �������� � ������������� �����. ��� ����� ���� �������� �������� � �������� ����������.
2. SVG - ��������� �������, � HTML - ���������.
4. SVG �� ������� �� ����������, �� ��� �� ����� ������� ����������  � HTML ����� ������������������.


## Part7
##### 7.1 Give an example of a situation where visualization is appropriate, following the arguments discussed in lecture and in the textbook (the example cannot be the same as mentioned in either lecture or textbook).
������������ ���������� � �������, ����� ������ ������� �� ����� ��������� ����������� � ������. � ������� ������� ������������, ���������� ����� ���� ����� ��������������� � ������������� ������.  
��� �������� ������, ����������� �������� ������ ���������� ��������� ��������. http://www.r2d3.us/visual-intro-to-machine-learning-part-1/  
��� ��������� ������������, ������� ������  ��������� ���� ����������-��������.

##### 7.2 Which limitations of static charts can you solve using interactivity?
1. ���������� �� �������������� ����������.
2. ������������� ������� ����� �������� �������� �������� �������� ����� ��������.
3. ����� �������� ������ ������ � ������������� ������������, �.�. ���� ����������� ������������� ������ � �������� ���������������, ���������/��������� �������.

##### 7.3 What are the limitations of visualization?
1. �� ������ ���� ����������� ������� ����� �������� � ������, ������������ ������� ��������� �� ����������.
2. ������ ����� ������� ��������� ����, ��� � ������ ���� �����������, ����� ��� �� �� ����� ���� ���.
3. ���� ������ ����� �������, �� ������������ ����� ���������� ����� ������� � ����������. ����������� �� ������� ��������� ������������������� ����������� � ������.


#####  7.4 Why are data semantics important for data?
1. ��� ������������ ��������� �������������� ����������� ������ ����� ������ ���������.
2. ��� ������ ���������� ������� ����� ��������� ������ � ������� ������������ ������������.
3. �� ������� ��������� ������, ������ ����� ������ ����� ����������� ������ ���������. ����� ������ ����� ���������������� �� ��, ��� �� ���� ���������.

##### 7.5 Which relationships are defined for two attributes of  ( a ) quantitative, ( b )  categorical, or ( c ) ordinal scale?   
( a ) ����� �������� ��������, ������������� ��. ��������� �����, �������, �������, ���������
 ( b ) ����������, �����������, ����������
( c ) �����������, ����������

##### 7.6 Which visual variables are associative (i.e., allow grouping)?

�������������� ������. ���� ������ � ������� �� ����������� ��� ��������� �������� �� ������, �� ��� ������� ����������� ��� �������������.
�������:
1. ���
2. ������ ��������
3. ������� (��������� 18-25, 25-34 ...)
4. ���������

##### 7.7 Which visual variables are quantitative (i.e., allow to judge a quantitative difference between two data points)?
��������������, ��� �������� �� ����������� (����������� ���������� ����)
�������:
1. ��������
2. ���
3. ����������� ��������
4. ����������� ���������