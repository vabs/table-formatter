# Table Formatter

Table Formatter is a React application that allows users to dynamically add, remove, and edit rows and columns in a table. The table can be copied in Markdown format or in a format suitable for Slack messages.

## Features

- Add and remove columns
- Add and remove rows
- Edit table headers and cells
- Copy table to clipboard in Markdown format
- Copy table to clipboard in Slack format
- Keyboard shortcuts for quick actions


### Table Structure
<img width="968" alt="s1" src="https://github.com/user-attachments/assets/afc4b1f8-abc3-44e2-8cad-1db1fb890989">


### Slack Message Format
```
+-----------------------------------+--------------+
| Movie Name                        | Release Year |
+-----------------------------------+--------------+
| Ant-Man and the Wasp: Quantumania | 2023         |
| Guardians of the Galaxy Vol. 3    | 2023         |
| The Marvels                       | 2023         |
| Deadpool & Wolverine              | 2024         |
| Captain America: Brave New World  | 2025         |
+-----------------------------------+--------------+
```

### Markdown Format
```
| Movie Name | Release Year |
| --- | --- |
| Ant-Man and the Wasp: Quantumania | 2023 |
| Guardians of the Galaxy Vol. 3 | 2023 |
| The Marvels | 2023 |
| Deadpool & Wolverine | 2024 |
| Captain America: Brave New World | 2025 |

```



## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/vabs/table-formatter.git

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
