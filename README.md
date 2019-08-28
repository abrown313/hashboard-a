# About The Hashboard (Version A, the A is for Adrianna)
Credit for the original design and implementation goes to Timothy J. Aveni.
## Features
* Pulls office hours from a Google Calendar
* Pulls TA pictures from a local folder
* Pulls students from a local spreadsheet
* Allows students in and out of the course to add themselves to the queue
* Allows dequeuing by rescanning Buzzzcard (remove specific student) or hitting backspace (remove next student)
***
# Setting Up The Hashboard
## Set Up Students
1. Export the roster csv from Canvas (get it from GT Roster on Canvas)
2. Open the file and delete all columns except for Name and GTID (leave them in the order of Name then GTID)
3. Save this file as `students.csv` and put it in the `src/references` directory
4. To enable scanning, you'll need to supply some kind of card scanner. The behavior of the one we use and what the code expects is for the scanner to individually input the digits followed by enter/return. You can simulate this behavior without the scanner by just manually inputting the digits followed by enter/return.
## Set Up TA Photos
1. In the `/src/references/ta_pics` folder, save square photos of all the TAs (accepted formats: png, jpg, JPG, jpeg, gif)
2. Each photo should be named with the first name of the TA (all lowercase) and match the string used on the Google Calendar (not case sensitive)
## Set Up the Google Calendar
1. Create a Google Calendar for all the office hours (make sure the privacy settings are set to public, otherwise you'll get a 404 error)
2. Add all of the office hours of the TAs by titling the events with the first names of the TAs (this is important for getting the TA pictures)
3. If the Hashboard stops reloading the TAs on duty, the calendar data may have overflowed and you'll need to limit each instance of office hours to a few weeks only.
## Set Up the Google Calendar API Calls
1. Create a json file in the `src` directory (this file is untracked via git, so make sure to add it locally):
```json
    {
        "cal_id": "yourcalendarid@group.calendar.google.com",
        "api_key": "yourgooglecloudplatformapikey"
    }
```
2. To get the calendar ID, go to the office hours calendar's settings and look under the "Integrate calendar" heading
3. To get a Google API key, follow these steps: https://developers.google.com/calendar/quickstart/js
***
## Run the Code
1. Clone the repository
2. Add your own `secret.config.json` file to the `src` directory (see **Set Up the Google Calendar API Calls** section)
3. Navigate to the `hashboard-a` directory
4. Run `npm i` to install all the necessary node modules
5. Run `npm start` to run the app