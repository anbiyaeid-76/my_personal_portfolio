/* =========================
   STUDENT DATA
========================= */

let students = [];

let editIndex = null;



/* =========================
   GET HTML ELEMENTS
========================= */

const studentForm =
    document.getElementById("studentForm");

const studentName =
    document.getElementById("studentName");

const studentEmail =
    document.getElementById("studentEmail");

const studentAge =
    document.getElementById("studentAge");

const studentCourse =
    document.getElementById("studentCourse");

const studentTableBody =
    document.getElementById("studentTableBody");

const studentCount =
    document.getElementById("studentCount");

const searchInput =
    document.getElementById("searchInput");

const formMessage =
    document.getElementById("formMessage");

const formTitle =
    document.getElementById("formTitle");

const submitBtn =
    document.getElementById("submitBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const emptyState =
    document.getElementById("emptyState");



/* =========================
   FORM SUBMIT
========================= */

studentForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            studentName.value.trim();

        const email =
            studentEmail.value.trim();

        const age =
            studentAge.value;

        const course =
            studentCourse.value;



        /* =========================
           EMPTY FIELD VALIDATION
        ========================== */

        if (
            name === "" ||
            email === "" ||
            age === "" ||
            course === ""
        ) {

            showMessage(
                "Please fill in all fields.",
                "error"
            );

            return;

        }



        /* =========================
           NAME VALIDATION
        ========================== */

        const namePattern =
            /^[A-Za-zÀ-ÿ\s]+$/;


        if (!namePattern.test(name)) {

            showMessage(
                "Student name can only contain letters and spaces.",
                "error"
            );

            return;

        }



        /* =========================
           AGE VALIDATION
           MINIMUM = 17
           MAXIMUM = 99
        ========================== */

        const numericAge =
            Number(age);


        if (
            numericAge < 17 ||
            numericAge > 99
        ) {

            showMessage(
                "Age must be between 17 and 99.",
                "error"
            );

            return;

        }



        /* =========================
           CREATE STUDENT OBJECT
        ========================== */

        const student = {

            name: name,

            email: email,

            age: numericAge,

            course: course

        };



        /* =========================
           UPDATE STUDENT
        ========================== */

        if (editIndex !== null) {

            students[editIndex] =
                student;


            showMessage(
                "Student updated successfully!",
                "success"
            );

        }



        /* =========================
           ADD STUDENT
        ========================== */

        else {

            students.push(student);


            showMessage(
                "Student added successfully!",
                "success"
            );

        }



        /* =========================
           RESET & DISPLAY
        ========================== */

        resetForm();

        displayStudents();

    }
);



/* =========================
   DISPLAY STUDENTS
========================= */

function displayStudents(
    studentList = students
) {

    studentTableBody.innerHTML = "";


    studentCount.textContent =
        students.length;



    /* =========================
       NO STUDENTS
    ========================== */

    if (studentList.length === 0) {

        emptyState.style.display =
            "block";

        return;

    }


    emptyState.style.display =
        "none";



    /* =========================
       LOOP THROUGH STUDENTS
    ========================== */

    studentList.forEach(
        function (student) {


            const originalIndex =
                students.indexOf(student);


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${originalIndex + 1}
                </td>

                <td>
                    <strong>
                        ${student.name}
                    </strong>
                </td>

                <td>
                    ${student.email}
                </td>

                <td>
                    ${student.age}
                </td>

                <td>
                    ${student.course}
                </td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        onclick="editStudent(${originalIndex})"
                    >
                        Edit
                    </button>


                    <button
                        class="action-btn delete-btn"
                        onclick="deleteStudent(${originalIndex})"
                    >
                        Delete
                    </button>

                </td>

            `;


            studentTableBody.appendChild(row);

        }
    );

}



/* =========================
   EDIT STUDENT
========================= */

function editStudent(index) {

    const student =
        students[index];


    studentName.value =
        student.name;


    studentEmail.value =
        student.email;


    studentAge.value =
        student.age;


    studentCourse.value =
        student.course;


    editIndex =
        index;


    formTitle.textContent =
        "Update Student";


    submitBtn.textContent =
        "Update Student";


    cancelBtn.style.display =
        "inline-block";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



/* =========================
   DELETE STUDENT
========================= */

function deleteStudent(index) {

    const student =
        students[index];


    const confirmed =
        confirm(
            `Are you sure you want to delete ${student.name}?`
        );


    if (!confirmed) {

        return;

    }


    students.splice(
        index,
        1
    );


    displayStudents();


    showMessage(
        "Student deleted successfully.",
        "success"
    );

}



/* =========================
   SEARCH STUDENTS
========================= */

searchInput.addEventListener(
    "input",
    function () {


        const searchValue =
            searchInput.value
                .toLowerCase()
                .trim();


        const filteredStudents =
            students.filter(
                function (student) {


                    return (

                        student.name
                            .toLowerCase()
                            .includes(searchValue)

                        ||

                        student.email
                            .toLowerCase()
                            .includes(searchValue)

                        ||

                        student.course
                            .toLowerCase()
                            .includes(searchValue)

                    );

                }
            );


        displayStudents(
            filteredStudents
        );

    }
);



/* =========================
   CANCEL EDIT
========================= */

cancelBtn.addEventListener(
    "click",
    function () {

        resetForm();

    }
);



/* =========================
   RESET FORM
========================= */

function resetForm() {

    studentForm.reset();


    editIndex = null;


    formTitle.textContent =
        "Add New Student";


    submitBtn.textContent =
        "Add Student";

}



/* =========================
   DISPLAY MESSAGE
========================= */

function showMessage(
    message,
    type
) {

    formMessage.textContent =
        message;


    if (type === "success") {

        formMessage.style.color =
            "#16a34a";

    }

    else {

        formMessage.style.color =
            "#dc2626";

    }


    setTimeout(
        function () {

            formMessage.textContent =
                "";

        },
        3000
    );

}



/* =========================
   INITIAL DISPLAY
========================= */

displayStudents();