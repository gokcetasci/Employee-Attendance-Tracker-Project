# Employee Attendance Tracking Project

This project is designed so that the company manager and managers in a company can take attendance and manage their employees.

## Live preview

You can access the live preview of the project [here](https://staff-roll-call-1k48.vercel.app).

## Project Note

This project was developed using Next.js. The project progressed this way because it was desired to manage the fake data with Zustand rather than any API.

This is an internship project. It will be integrated into the project later. Therefore, we only focus on the attandance function here.

## Features

* Administrator and administrator roles
* Option for admins to change the default option of only getting attendance values ​​for today with a slider option.
* Possibility to search among all employees with the employee search section
* Possibility to select the date and view the participation value on the desired date
* Option to receive bulk attendance with checkbox option
* Use of fake data (with Zustand)
* Stylization using Tailwind CSS

## Project Overview

- **Admins:**
    - Admins can see all employees. He can take attendance of all of them and edit them.
    - By default, only attendance for that day can be taken in the project, but administrators can also manage current and past transactions with the help of the slider button if they wish.

- **Managers:**
    - Administrators can only view, receive and edit their own employees' attendance.

- **Employees:**
    - Only an employee's monthly attendance values ​​are shown on employee pages. No action can be taken on this page.

# Packages and Versions Used

- **boot**: ^5.3.3,
- **formic**: ^2.4.5,
- **next**: 14.1.3,
- **reaction**: ^18,
- **reaction-date selector**: ^6.6.0,
- **reaction-dom**: ^18,
- **reaction icons**: ^5.0.1,
- **response timer**: ^0.1.0,
- **react-fry**: ^10.0.5,
- **reaction hint**: ^5.26.3,
- **yes**: ^1.4.0,
- **zustand**: ^4.5.2

## While starting

First run the development server:

``` bash
npm run developer
# or
thread giant
# or
npm dev
# or
this giant
''''