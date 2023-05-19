let course_path;
const courseIframe = document.getElementById('course-iframe');

const previusCMI = {
  "suspend_data": "2N8k60708090a0b0c0d0e0g0XW1001a12O01012011120121201312014120151201612017120181201a12G500000v_player.5Ya1fbQoLDO.62aHsOzVSv81^1^00~2K6~2h3l3EZ441112b101001a1a1135x0~2L134203420342034203420342034203420g6a0101^8_defaultr7a000111^h_default_Selectedg6a0101^8_defaultg6a0101^8_defaultY0W2gvO30203020dg2095A496_$E5dg2095q9w7_$E5dg2095U947_$E521102112150~2h3l3yw241112b101001a1a133UQ0~2L134203420342034203420342034203420g6a0101^8_defaultg6a0101^8_defaultg6a0101^8_defaultr7a000111^h_default_SelectedY0W2gvO30203020dg2095A496_$E5dg2095q9w7_$E5dg2095U947_$E52110211215000000",
  "launch_data": "",
  "comments": "",
  "comments_from_lms": "",
  "core": {
    "student_id": "",
    "student_name": "",
    "lesson_location": "",
    "credit": "",
    "lesson_status": "incomplete",
    "entry": "",
    "lesson_mode": "normal",
    "exit": "suspend",
    "session_time": "0000:12:16.96",
    "score": {
      "raw": "",
      "min": "",
      "max": "100"
    },
    "total_time": "00:12:16.96"
  },
  "objectives": {},
  "student_data": {
    "mastery_score": "",
    "max_time_allowed": "",
    "time_limit_action": ""
  },
  "student_preference": {
    "audio": "",
    "language": "",
    "speed": "",
    "text": ""
  },
  "interactions": {}
}



const initCourse = () => {
  // Iniciar player con SCORM 1.2
  window.API = new Scorm12API({ autocommit: true });
  const usersCMI = localStorage.getItem("cmi")

  if (usersCMI) window.API.loadFromJSON(JSON.parse(usersCMI).cmi);

  // Escuchar todos los cambios del CMI.
  window.API.on('LMSSetValue.cmi.*', function (CMIElement, value) {
    window.API.storeData(true);
    const updatedKey = CMIElement.split('.').splice(-1)[0]; // Obtener la última key de CMIElement (ej. 'cmi.core.lesson_status' -> 'lesson_status')
    console.log(`Updated CMI ${updatedKey}`, API.renderCommitCMI(true));
    localStorage.setItem('cmi', JSON.stringify(API.renderCommitCMI(true)));

    // Guardar el session_time y total_time en el localStorage
    /*  if (updatedKey === 'session_time' || updatedKey === 'total_time') {
       const sessionTime = window.API.getValue('cmi.core.session_time');
       const totalTime = window.API.getValue('cmi.core.total_time');
       localStorage.setItem('session_time', sessionTime);
       localStorage.setItem('total_time', totalTime);
     } */
  });

  // Agregar src para el primer HTML del curso al iframe
  courseIframe.src = course_path;
};

fetch('./course/modulo/imsmanifest.xml')
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xmlDocument = parser.parseFromString(data, 'text/xml');
    const hrefFirsPage = xmlDocument.querySelector('resource')?.getAttribute('href');
    course_path = `./course/modulo/${hrefFirsPage}`;
    initCourse();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
