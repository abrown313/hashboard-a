import React, { Component } from "react";
import '../style/StudentQueue.css';

const studentCSV = require('../references/students.csv');

class StudentQueue extends Component {
    state = {
        queue: [],
        entry: []
    }
    
    keyDown = event => {
        if (event.keyCode === 13) { // enter
            this.submitGTID();
        } else if (event.keyCode === 8) { // backspace
            this.dequeue();
        } else if ('1234567890'.includes(event.key)) {
            this.state.entry.push(event.key);
        }
    }
    
    dequeue() {
        this.state.queue.shift();
        this.updateState();
        console.log(this.state.queue);
    }
    
    updateState() {
        this.setState({
          queue: this.state.queue,
          entry: this.state.entry
        });
    }
    
    submitGTID = async () => {
        // parse GTID from scanner input
        const gtid = this.state.entry.join('');
        this.setState({
          queue: this.state.queue,
          entry: []
        });  
        // check for behavior (enqueue or dequeue)
        let i, student;
        let inQ = false;
        for (i = 0; i < this.state.queue.length && !inQ; i++) {
            student = this.state.queue[i];
            if (student.gtid === gtid) {
                inQ = true;
            }
        }
        if (inQ) {
            this.state.queue.splice(i - 1, 1);
        } else {
            let name;
            await this.getNameFromGTID(gtid)
                .then(response => name = response);
            if (!name) {
                name = prompt("Not enrolled in the course? Please enter your name to be added to the queue:", "Guest");
            }
            this.state.queue.push({
                name: name,
                gtid: gtid
            });
        }
        this.updateState();
    }
    
    getNameFromGTID = async (gtid) => {
        let content = '';
        await fetch(studentCSV)
          .then(response => response.text())
          .then(text => content = text);
        let lines = content.split(/[\r\n]+/g);
        let found = false;
        let curr, currLine;
        // linear search bc yall should not have more than 600 students
        for (curr = 0; curr < lines.length & !found; curr++) {
            currLine = lines[curr].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (currLine[1] === gtid) {
                found = true;
            }
        }
        if (!found) {
          return null;
        } else {
          // currLine[0] is in format "Last, First Middle" OR "Last, First"
          return currLine[0].split(',')[1].split(' ')[1].split('"')[0];
        }
    }
    
    componentDidMount() {
        document.addEventListener('keydown', this.keyDown);
    }

    render() {
        return (
            <div className="StudentQueue">
                <div id="studentq_title">Queue</div>
                <div id="studentq_info">Scan your Buzzcard to enqueue/dequeue yourself!</div>
                <div id="studentq_names">
                {
                    this.state.queue && 
                    this.state.queue.map((value, index) => (
                        <div id="studentq_name" key={index}>{value.name}</div>
                    )) 
                }
                </div>
            </div>
        );
    }
}

export default StudentQueue;