# TechDegreeProject-8

This project introduces Gulp as a task manager and build tool. It emphasizes the importance of preparing front-end source files for use over the web by concatenating and minifying their contents to reduce overall file sizes. More importantly, it focuses on making the developer's job easier.

### What does it do?

This project is intended for developer use. As a user, the developer can quickly run repetitive tasks, such as: compiling SASS to CSS, concatenating files, minifying files, compressing images, deleting previous build files, serving the project and much more.

### Additional Project Info for Grading

This project focuses on setting up Gulp as a task manager to streamline the workflow of the user.

To use this project file, you must file install all dependencies by running:
```
npm install
```

Once all dependencies are installed, the following tasks will be available to run:
1. gulp scripts - Concatenates and minifies .js files. Includes a map file.
2. gulp styles - Compiles .scss files into a .css file and minifies. Includes a map file.
3. gulp images - Compresses images.
4. gulp clean - Deletes all files/folders that were created by tasks.
5. gulp build - Runs the clean task before running all other tasks to build a complete production folder (dist).
6. gulp - Runs the build task before serving the files and watching for changes to .scss files.
