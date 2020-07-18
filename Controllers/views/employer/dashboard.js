module.exports = {
  // EMPLOYER DASHBOARD
  employerDashboard: (req, res) => {
    res.render('Pages/employer-dashboard', {
      success: req.flash('success'),
      pageName: 'Employer Dashboard',
    });
  },

  //GET Employer Profile 
  employerProfile: (req, res) => {
    res.render('Pages/employer-profile-page', {
      pageName: 'Employer Dashboard',
    });
  },

  //Messaging 
  employerMessages: (req, res) => {
    /*//get messages from db
    const url = 'https://api.lancers.app/v1/message/chat-users';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJpbGxtYWwwNzFAZ21haWwuY29tIiwidXNlcklkIjoiYWE2MjRkMGYtYjgzZi00MzQ3LWIwZjAtYWQxY2Q4NTJhNzU2IiwidXNlclJvbGUiOiJST0wtRU1QTE9ZRVIiLCJ1c2VyVHlwZUlkIjpudWxsLCJpYXQiOjE1OTQyMDgxNjQsImV4cCI6MTU5NDI5NDU2NH0.tuwAyP1Zii-5JyUeqt4Qrby7V4MbYjSr4ZSCvG-FoQc';
    const allMessages = axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))*/

    res.render('Pages/employer-messages', {
      pageName: 'Employer Messages',
    });

    /*get cookies
function logCookie(cookie) {
  if (cookie) {
    console.log(cookie.value);
  }
}

function getCookie(tabs) {
  var getting = browser.cookies.get({
    url: tabs[0].url,
    name: "favourite-colour"
  });
  getting.then(logCookie);
}

var getActive = browser.tabs.query({
  active: true,
  currentWindow: true
});
getActive.then(getCookie);*/
  },

  // Employer Profile Creation 
  employerCreateProfile: (req, res) => {
    res.render('Pages/employer-profile-creation', {
      success: req.flash('success'),
      pageName: 'Create Profile',
      data: req.session.companycat,
    });
  },

  // Create Company Profile
  employerCompany: (req, res) => {
    res.render('Pages/employer-company', {
      pageName: 'Company Profile',
      EmployerInfo: req.session.details,
    });
  },

  //Documents Upload
  uploaddocsuccess: (req, res) => {
    res.render('Pages/upload-doc-success', {
      pageName: 'Document Uploaded',
      EmployerInfo: req.session.details,
    });
  },

  //Fail document and Disapprove 
  uploaddocfailure: (req, res) => {
    res.render('Pages/upload-doc-failure', {
      pageName: 'Document Disapproved',
      EmployerInfo: req.session.details,
    });
  },

  //Employer Profile 
  employerProfile: (req, res) => {
    res.render('Pages/employer-profile-page', {
      pageName: 'Profile',
      EmployerInfo: req.session.details,
      data: req.session.companycat,
    });
  },

   // Dashboard settings for employer 
  employerDashboardSettings: (req, res) => {
    res.render('Pages/employer-dash-settings.ejs', {
      pageName: 'Employer Dashboard - Settings',
      EmployerInfo: req.session.details,
    });
  },

  // Dashboard Support for employer
  employerDashboardSupport: (req, res) => {
    res.render('Pages/employer-dash-support', {
      pageName: 'Employer Dashboard',
      EmployerInfo: req.session.details,
    });
  },

  // Employer and Employee Gallary
  employerEmployeeGallery: (req, res) => {
    res.render('Pages/employer-employees-gallery', {
      pageName: 'Employee Gallery',
      EmployerInfo: req.session.details,
    });
  },

  // Employer Add Team 
  employerAddTeam: (req, res) => {
    res.render('Pages/employer-add-a-team', {
      pageName: 'Employer - Add Team',
      EmployerInfo: req.session.details,
    });
  },

  // Dashboard for Employer
  employerCompanyDashboard: (req, res) => {
    res.render('Pages/employer-company-dashboard', {
      pageName: 'Employer Dashboard',
      EmployerInfo: req.session.details,
    });
  },

  // Upload of Certificates
  employerCertificate: (req, res) => {
    res.render('Pages/employer-certificate', {
      pageName: 'Upload Certificate',
      EmployerInfo: req.session.details,
    });
  },
};
