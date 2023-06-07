# Freerium

Thank you for checking out my project README! Freerium is a wellness app inspired by Quora. On Freerium, users can interact with others by initially posting questions, answers, and voting on others' posts.

Visit the live site here ------> [Freerium](https://freerium.onrender.com)


## Technologies Used

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Python](https://img.shields.io/badge/Python-%233776AB.svg?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-%23FCA121.svg?style=for-the-badge&logo=sqlalchemy&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)


## Splash Page

![Screen Shot 2023-06-07 at 4 25 32 PM](https://github.com/adamchristoph18/Freerium/assets/110206190/832adb4c-970a-4c39-b63b-fc4b39de4ec6)

## Home Page
![ezgif com-optimize](https://github.com/adamchristoph18/Freerium/assets/110206190/0c4bd176-6a2f-43f9-8d43-998cba203eae)

![Screen Shot 2023-06-07 at 6 24 58 PM](https://github.com/adamchristoph18/Freerium/assets/110206190/2174715d-ee6b-44d5-a15e-808b53dc0b4a)

## Individual Question Page / New Question Modal

![Screen Shot 2023-06-07 at 4 37 00 PM](https://github.com/adamchristoph18/Freerium/assets/110206190/024b0ad9-9805-42ca-a274-0f7a4498c72c)


## Getting Started

1. Clone this repository
      https://github.com/adamchristoph18/Freerium
      
2. Install dependencies into the frontend once inside react-app directory
      - npm install

3. Install dependencies into the backend from the root of the repository
      pipenv install -r requirements.txt 
      pipenv install boto3 IF USING AWS S3 BUCKET FOR IMAGE STORAGE

4. Create a .env file using the .envexample provided

5. Enter the virtual environment from the root (pipenv shell), then run the following commands to create, migrate, and seed your database:
      - flask db migrate
      - flask db upgrade
      - flask seed all
 
6. Start the app
      - From the root, type 'flask run' into the CLI and hit enter
      - In another terminal, in the react-app directory, type 'npm start' and hit enter

7. Now you can use the Demo User account, or create your own!

8. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
