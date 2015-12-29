# Description
1. Folder "/build" contains final result; for sources look to "/raw/project/".
2. "raw/build.cmd" - start file for document generation, rebuilding of project, testing etc.
3. "raw/run-tests.cmd" - start file only for tests (for results look to console and "/raw/project/tests/coverage/report" - coverage report); need installed karma.
4. Folder "/docs" contains documentation (generation on build.cmd execution).

Execute files only for OS Windows; commands in files - common for different OS.

##Folders
1. mocks - task and mocks
2. build - ready project
3. docs - documentation
4. raw - project sources, dependencies and libs
5. raw/libs - using libraries
6. raw/node_modules - using modules for node.js
7. raw/server - index file for HTTP server
8. raw/project - project files
9. raw/html - html files, raw/images - images, raw/js - javascript, raw/styles - less based styles
10. raw/tests - unit testing files 

--------------------------------

# Что запускать
1. В папке build находится конечный результат; исходники - в raw/project/
2. raw/build.cmd - запускает генерацию документации, пересборку проекта, тестирование
3. raw/run-tests.cmd - также позволяет запустить тесты (требует предустановленной karma)
4. docs - сгенерированная документация; перегенерируется при запуске build.cmd

Запускающие файлы - только для ОС Windows; при необходимости запустить в другой системе - достаточно использовать указанные там команды.

# Описание содержимого файлов и папок проекта

## папка mocks

Содержит само задание, а также прототипы всплывающих окон и общую концепцию работы приложения

## папка build

Содержит непосредственно решение. Для полноценной работы требуется веб-сервер.
js - файлы внутри данной папки прошли небольшую минимизацию.

## папка docs

Содержит сгенерированную документацию средствами ngDoc. Как генерировать документацию - будет написано ниже.

## папка raw

Содержит основные файлы проекта, которые используются при разработке. Именно здесь находятся все файлы. 
Файлы:
* build.cmd - запускает сервер сборки, unit-тестирование, генерацию документации, копирование нужных файлов итп
* start-server.cmd - запускает web-сервер, для папки /build
* run-tests.cmd - запускает karma для тестирования кода; отчёты сохраняются в project/tests/coverage/report
* install.cmd - устанавливает все зависимости (в основном модули node.js)

### libs
Библиотеки, которые используются для работы приложения; требуемые приложению файлы просто копируются в соответствующую папку в /build

### node_modules
Установленные (используемые) модули node.js -> для Grunt, Express.js и Karma

### server
Содержит файл настройки HTTP-сервера (express.js)

### project
Папка с проектом:

#### html
Основной файл и шаблон всплывающего сообщения

#### images
Используемые изображения

#### js
Файлы javascript приложения (при сборке они объединяются в один); файлы разделены по функционалу.

#### styles
*.less - файлы стилей; в последствии собираются в css файл

#### tests
Содержит unit-тесты. 
Внутри, в папке coverage/report - отчёт о покрытии проекта тестами.
Также внутри 2 настроечных файла для запуска тестирования: для сервера сборки и отдельно.



