const AWS = require("aws-sdk");
const SES_CONFIG = require("./AWS/Config");

const AWS_SES = new AWS.SES(SES_CONFIG);

var Database = require("./Database/Database.js");

Database.execute = function (callback) {
  const database = new Database();
  return callback(database).then(
    (result) => database.close().then(() => result),
    (err) =>
      database.close().then(() => {
        throw err;
      })
  );
};

module.exports = class Utilities {
  static getDomain(email) {
    return email.replace(/.*@/, "");
  }

  static createCondition(queries, mode) {
    let query = [];

    Object.keys(queries).forEach((key) => {
      query.push(`${key} LIKE \'%${queries[key]}%\'`);
    });

    return query.join(" AND ");
  }

  static CreateResponse(success, data) {
    return { success: success, result: data };
  }

  static GenerateCode(length) {
    return Math.round(
      Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)
    )
      .toString(36)
      .slice(1);
  }

  static SendEmailTemplate(recipientEmail, source, template, templateData) {
    let params = {
      Source: source,
      Template: template,
      Destination: {
        ToAddresses: recipientEmail,
      },
      TemplateData: templateData,
    };
    return AWS_SES.sendTemplatedEmail(params).promise();
  }

  static async GenerateDays(monthLong) {
    let days = [];

    for(let i = 1; i <= monthLong; i++){
      days.push(i);
    }

    return days;
  }

  static async GenerateCalendar(year, month) {
    let arr = new Array(6); // set weeks row

    for (let x = 0; x < arr.length; x++) {
      arr[x] = new Array(7);
    }

    let startDayInWeek = new Date(year, month, 0).getDay() + 1;
    let monthLong = new Date(year, month + 1, 0).getDate() + 1;

    let beforCount = 0;
    let counter = 1;
    let startCount = false;

    let now = new Date();

    for (let x = 0; x < arr.length; x++) {
      for (let y = 0; y < arr[x].length; y++) {
        if (beforCount == startDayInWeek) {
          startCount = true;
        } else {
          beforCount++;
        }

        if (startCount == true) {
          let events = await Database.Execute((database) =>
            database
              .query(`SELECT * FROM sk_school_event WHERE \`on\` = '${year}-${month + 1}-${counter}' `)
              .then((row) => {
                return JSON.parse(JSON.stringify(row));
              })
              .catch((err) => {
                throw err;
              })
          );

          arr[x][y] = {
            day: counter,
            present:
              month == now.getMonth() && year == now.getFullYear() && counter == now.getDate()
                ? true
                : false,
            events: events.length > 0 ? events : null
          };
          counter++;
        } else {
          arr[x][y] = "";
        }

        if (counter > monthLong) {
          arr[x][y] = "";
        }
      }
    }

    return arr;
  }
};
