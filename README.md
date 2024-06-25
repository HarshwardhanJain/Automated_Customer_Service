# Automated_Customer_Service



### Microsoft Azure Project



## Overview
Medical_QA_Bot is a Node.js-based bot application that assists users in obtaining medical information by leveraging QnA Maker and Conversational Language Understanding (CLU) services. The bot can answer medical questions, recognize user intents, and provide relevant information from various medical datasets.



## Data Overview
**1. Conversational Language Understanding Dataset** <br>
   This dataset includes formatted intents for training the bot's understanding of user queries:

* **Reduced_Formated_Intents.json**: Contains a simplified set of intents for streamlined training.

**2. Medical Q&A Dataset** <br>
The dataset comprises various Excel files with comprehensive medical question-answer pairs:

* **OtherQA.xlsx**: Contains miscellaneous medical questions and answers.
* **SeniorHealthQA.xlsx**: Focuses on health-related queries specific to senior citizens.
* **Disease_Control_and_PreventionQA.xlsx**: Focuses on disease control and prevention queries.



## Table of Contents
1. [Installation](#installation)
2. [Setup](#setup)
3. [Running the Application](#running-the-application)
4. [File Structure](#file-structure)



## Installation

### Clone the Repository
```sh
git clone https://github.com/HarshwardhanJain/Automated_Customer_Service.git
cd medical-bot
```

### Uninstall Dependencies
* **To prevent conflicts between libraries, uninstall the following packages:**
```sh
npm uninstall -g botbuilder
npm uninstall -g axios
npm uninstall -g dotenv
npm uninstall -g restify
```

### Install Dependencies
```sh
npm install 
```



## Setup



## Running the Application

### Run the Bot Application

```sh
node index.js
```
* **Access the bot via the Bot Framework Emulator at http://localhost:3978/api/messages**.



## File Structure
```
Medical_QA_Bot/
│
├── Conversational Language Understanding Dataset/
│   └── Reduced_Formated_Intents.json
│
├── Medical Q&A Dataset/
│   ├── Disease_Control_and_PreventionQA.xlsx
│   ├── OtherQA.xlsx
│   └── SeniorHealthQA.xlsx
│
├── medical-bot/
│   ├── deploymentTemplates/
│   ├── .env
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── index.js
│   ├── medicalbot.js
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
│
├── Medical-Bot.bot
├── Prediction URLs For CustomQuestionAnswering And ConversationLanguageUnderstanding.txt
└── README.md
```



## Note
* **Utilize Visual Studio Code throughout the entire process.**
* **Ensure that the library versions are accurately installed and that the processes are carefully followed.**
* **Ensure all file paths are correct.**
