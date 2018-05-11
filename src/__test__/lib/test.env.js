process.env.NODE_ENV = 'development';
process.env.PORT = 7000;
process.env.MONGODB_URI = 'mongodb://localhost/testing';
process.env.PDF_SECRET = 'LeFs@zxEY0*a$$FW!%^60BKryq@9mLO*S^*YwJrN3CjzAANN5@fdP8r@DWiR7N%ea2Ryh$2ZzQf1rjzrJUWU0Afd68@Jou6YOl';

const isAwsMock = true;

if (isAwsMock) {
  process.env.AWS_BUCKET = 'fake';
  process.env.AWS_SECRET_ACCESS_KEY = 'poqwi1v8e21nfdw234qwdf';
  process.env.AWS_ACCESS_KEY_ID = 'fakefakefakefakefake';
  require('./setup');
} else {
  require('dotenv').config();
}
