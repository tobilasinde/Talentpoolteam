const model = require('../../Models');
const { errorResMsg, successResMsg } = require('../../Utils/response');

// Get EMPLOYER DASHBOARD
exports.dashboard = async (req, res) => {
  try {
    // GET All EMPLOYERS COUNT 
    const allEmployees = await model.Employee.count();
     
    // GET Total Number of EmployeeContacted in Team
    const employeeContacted = await model.Team.count({
      where: {
        employer_id: req.body.employer_id,
      },
    });

    // GET Total Number of EmployeeEmployed in Team 
    const employeeEmployed = await model.Team.count({
      where: {
        employer_id: req.body.employer_id,
        status: 'Accepted',
      },
    });
   
    // GET one Employer Detail
    const employer = await model.Employer.findOne({
      where: {
        employer_id: req.body.employer_id,
      },
    });

    if (!data) {
      return errorResMsg(res, 404, 'Data not found');
    }

    return successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, 'Something went wrong');
  }
};