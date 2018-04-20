const events = require('events');
const { last, sumBy, filter } = require('lodash');
const consoleLog = require('../hometask1/utils/consoleLog');

class Student extends events {
  constructor(name = '', surname = '', yearOfBirth = 0) {
    super();
    process.nextTick(() => this.emit('created'));
    this.checkOuterListeners();

    this.name = name;
    this.surname = surname;
    this.yearOfBirth = yearOfBirth;
    this.attendanceAndGrades = [];

    this.setUpListeners();
  }

  setUpListeners() {
    this.listenOnceToGetAge();
    this.listenToSetPresent();
    this.listenToSetPoint();
    this.listenToAveragePoint();
    this.listenToMaxPoint();
  }

  listenOnceToGetAge() {
    const age = new Date().getFullYear() - this.yearOfBirth;

    this.once('userAge', callback => callback(`user age is ${age}`));
  }

  listenToSetPresent() {
    this.on('present', isPresent => this.attendanceAndGrades.push({ isPresent }));
  }

  listenToSetPoint() {
    this.on('point', (point) => {
      last(this.attendanceAndGrades).point = point;
    });
  }

  getAveragePoint() {
    const countOfPoint = filter(this.attendanceAndGrades, 'point').length;

    if (countOfPoint === 0) return 0;

    const sumOfPoint = sumBy(this.attendanceAndGrades, 'point');

    return Number((sumOfPoint / countOfPoint).toFixed(2));
  }

  getMaxPoint() {
    return this.attendanceAndGrades.reduce(
      (maxPoint, { point = 0 }) => (point > maxPoint ? point : maxPoint),
      0,
    );
  }

  checkOuterListeners() {
    setTimeout(() => {
      if (this.listenerCount() === 0) this.emit('check');
    }, 1000);
  }

  listenToAveragePoint() {
    this.on('averagePoint', callback => callback(`average point is ${this.getAveragePoint()}`));
  }

  listenToMaxPoint() {
    this.on('maxPoint', callback => callback(`max point is ${this.getMaxPoint()}`));
  }
}

const firstStudent = new Student('Oxxxy', 'Miron', 1985);
const secondStudent = new Student('Oxxxy', 'Miron', 1985);

firstStudent.on('created', () => consoleLog('created'));
firstStudent.emit('userAge', consoleLog);
firstStudent.emit('userAge', consoleLog);
firstStudent.emit('present', true);
firstStudent.emit('present', true);
firstStudent.emit('point', 5);
firstStudent.emit('present', true);
firstStudent.emit('point', 4);
firstStudent.emit('present', true);
firstStudent.emit('point', 5);
firstStudent.emit('present', true);
firstStudent.emit('averagePoint', consoleLog);
firstStudent.emit('maxPoint', consoleLog);

secondStudent.on('check', () => consoleLog('Check me!', 'red'));
