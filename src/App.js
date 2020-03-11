import React, { useState } from 'react';

import AddStudentsForm from './components/AddStudentsForm/AddStudentsForm';
import Button from './components/shared/Button';
import ButtonsGroups from './components/ButtonSGroup/ButtonsGroup';

import { fullClass } from './utils/students';
import { shuffle } from './utils/functions';
import './App.css';


const App = () => {

  let [students, setStudents] = useState([])
  let [splittedGroups, setSplittedGroups] = useState([])
  let [studentName, setStudentName] = useState("")

  const getFullClass = () => setStudents(students = fullClass)

  const addStudent = e => setStudentName(studentName = e.target.value)

  const getSingleStudent = e => {
    e.preventDefault();
    let studentsCopy = [...students]
    studentsCopy.push(studentName)
    setStudents(students = studentsCopy)
    setStudentName(studentName = "")
  }

  const splitInGroups = e => {
    let copyOfStudents = [...students];
    shuffle(copyOfStudents)
    let arrayHelper = [];
    while (copyOfStudents.length > 0) arrayHelper.push(copyOfStudents.splice(0, e.target.id))
    setSplittedGroups(splittedGroups = arrayHelper)
  }

  return (
    <div>
      <div className="starting-form-container">
        <div className="add-students-form">
          <AddStudentsForm
            getSingleStudent={getSingleStudent}
            studentName={studentName}
            addStudent={addStudent}
          />
        </div>
        <div>
          <Button
            action={getFullClass}
            buttonText={"Upload full class"}
            className="add-button"
          />
        </div>
      </div>
      <div className="show-students">
        {students.map(student => <p className="student-name">* {student}</p>)}
      </div>
      {students.length > 0 &&
        <div className="split-container">
          <hr />
          <div className="split-button-options">
            <ButtonsGroups
              splitInGroups={splitInGroups}
              halfLength={students.length / 2}
            />
          </div>
          <hr />
          <div className="groups-displayed">
            {splittedGroups.map(group =>
              <p className="student-name">{group.map(person =>
                ` - ${person}`)}
              </p>
            )}
          </div>
        </div>
      }
    </div>
  )
}


export default App;
